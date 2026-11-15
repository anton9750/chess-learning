/**
 * Thin wrapper around the Stockfish WASM engine running in a Web Worker.
 * Talks UCI (Universal Chess Interface) under the hood.
 */
// (Dansk: Dette er en tynd "wrapper" omkring Stockfish-skakmotoren, som
// kører i en Web Worker (en baggrundstråd), så den ikke blokerer resten af
// siden. Kommunikationen foregår via UCI-protokollen, hvor man sender
// tekstkommandoer og får tekstlinjer tilbage.)

// Resultatet af at bede motoren om et træk: selve trækket (i UCI-format,
// f.eks. "e2e4") samt motorens vurdering af stillingen bagefter.
export interface EngineMoveResult {
  bestMove: string;
  evalCp: number | null; // vurdering i "hundrededele af en bonde" (centipawns)
  mate: number | null; // antal træk til mat, hvis motoren ser et matnet
}

// En funktion, der bliver kaldt med hver tekstlinje, motoren sender tilbage.
type Listener = (line: string) => void;

export class StockfishEngine {
  private worker: Worker;
  private listeners: Listener[] = [];
  private currentElo = 1800;
  public ready: Promise<void>; // løst, når motoren har sagt "uciok" og er klar

  // Starter Web Worker'en med selve Stockfish-motoren og sender "uci" for at
  // starte UCI-håndtrykket. "ready" bliver først løst, når motoren svarer
  // "uciok" tilbage.
  constructor() {
    this.worker = new Worker("/stockfish/stockfish-19-lite-single.js");
    this.ready = new Promise((resolve) => {
      const onReady: Listener = (line) => {
        if (line.includes("uciok")) {
          this.offMessage(onReady);
          resolve();
        }
      };
      this.onMessage(onReady);
      this.worker.postMessage("uci");
    });
    // Videresender alle beskeder fra motoren til de lyttere, der er
    // tilmeldt via onMessage.
    this.worker.onmessage = (e: MessageEvent<string>) => {
      this.listeners.forEach((fn) => fn(e.data));
    };
  }

  // Tilmelder en funktion, der skal kaldes for hver linje, motoren sender.
  private onMessage(fn: Listener) {
    this.listeners.push(fn);
  }

  // Fjerner en tidligere tilmeldt lytter igen.
  private offMessage(fn: Listener) {
    this.listeners = this.listeners.filter((l) => l !== fn);
  }

  // Sender en rå UCI-kommando videre til motoren.
  send(command: string) {
    this.worker.postMessage(command);
  }

  /**
   * Limits engine strength to roughly the given Elo. 1320-3190 is Stockfish's
   * native UCI_Elo range, so for bots rated below that we also layer in
   * artificial blunders (see pickMoveForElo) — otherwise every sub-1320 bot
   * would collapse onto the same near-optimal 1320 floor and never make a
   * human-like mistake.
   */
  // (Dansk: Sætter motorens styrke ud fra en Elo-rating. Stockfish kan kun
  // begrænse sig selv ned til ca. 1320 Elo via UCI_Elo — for botter under
  // det niveau lægger vi derfor et ekstra lag af "menneskelige fejl" oven på
  // i pickMoveForElo nedenfor, ellers ville alle lave botter spille lige
  // stærkt og aldrig lave en fejl.)
  setElo(elo: number) {
    this.currentElo = Math.max(100, Math.min(elo, 2800));
    const uciElo = Math.max(this.currentElo, 1320);
    this.send("setoption name UCI_LimitStrength value true");
    this.send(`setoption name UCI_Elo value ${uciElo}`);
  }

  /**
   * Picks a move for the bot to play out of the engine's ranked candidates.
   * Below 1320 Elo, UCI_Elo alone can't weaken Stockfish further, so we
   * simulate weaker play by sometimes choosing a worse candidate instead of
   * the top one — the chance and how far down the list we reach both scale
   * with how far below 1320 the bot's rating is.
   */
  private pickMoveForElo(
    candidates: { move: string; cp: number | null; mate: number | null }[]
  ): string | null {
    // Fjerner tomme/ugyldige kandidater.
    const valid = candidates.filter((m) => m && m.move);
    if (valid.length === 0) return null;
    // Over 1320 Elo klarer Stockfishs egen UCI_Elo svækkelsen fint, så der
    // spilles bare det bedste træk fra listen.
    if (valid.length === 1 || this.currentElo >= 1320) return valid[0].move;

    // Chancen for at lave en "fejl" (ikke spille det bedste træk) stiger jo
    // længere under 1320 Elo botten er.
    const mistakeChance = Math.max(0, Math.min(0.85, (1300 - this.currentElo) / 1500));
    if (Math.random() >= mistakeChance) return valid[0].move;

    // Når der laves en fejl, afgør "severity", hvor langt ned i listen af
    // alternative (dårligere) træk vi må gå — jo lavere Elo, jo værre træk.
    const severity = Math.max(0, Math.min(1, (1000 - this.currentElo) / 1000));
    const maxIndex = Math.min(valid.length - 1, Math.round(severity * (valid.length - 1)) + 1);
    const index = 1 + Math.floor(Math.random() * maxIndex);
    return valid[Math.min(index, valid.length - 1)].move;
  }

  // Beder motoren om det bedste træk i en given stilling (angivet som FEN).
  // Bruger MultiPV til at få flere kandidat-træk tilbage (ikke kun ét), så
  // pickMoveForElo har noget at vælge imellem for de svagere botter.
  async getBestMove(fen: string, thinkTimeMs = 600): Promise<EngineMoveResult> {
    await this.ready;
    // Svage botter får 5 kandidat-træk at vælge iblandt (for at kunne lave
    // "menneskelige" fejl); stærke botter nøjes med motorens ene bedste træk.
    const multipv = this.currentElo < 1320 ? 5 : 1;
    this.send(`setoption name MultiPV value ${multipv}`);

    return new Promise((resolve) => {
      // Samler de kandidat-træk (og deres vurdering), motoren løbende
      // rapporterer, mens den tænker.
      const pvMoves: { move: string; cp: number | null; mate: number | null }[] = [];
      let evalCp: number | null = null;
      let mate: number | null = null;

      const listener: Listener = (line) => {
        // Linjer der starter med "info" og indeholder " pv " beskriver et
        // kandidat-træk og dets vurdering.
        if (line.startsWith("info") && line.includes(" pv ")) {
          const pvIndexMatch = line.match(/multipv (\d+)/);
          const moveMatch = line.match(/ pv (\S+)/);
          if (pvIndexMatch && moveMatch) {
            const idx = parseInt(pvIndexMatch[1], 10) - 1;
            const scoreMatch = line.match(/score cp (-?\d+)/);
            const mateMatch = line.match(/score mate (-?\d+)/);
            pvMoves[idx] = {
              move: moveMatch[1],
              cp: scoreMatch ? parseInt(scoreMatch[1], 10) : null,
              mate: mateMatch ? parseInt(mateMatch[1], 10) : null,
            };
            // Den første kandidat (idx 0) er motorens egentlige vurdering
            // af selve stillingen.
            if (idx === 0) {
              evalCp = pvMoves[idx].cp;
              mate = pvMoves[idx].mate;
            }
          }
        }

        // Når motoren er færdig med at tænke, sender den "bestmove" — her
        // vælger vi det faktiske træk, botten skal spille.
        if (line.startsWith("bestmove")) {
          this.offMessage(listener);
          const chosen = this.pickMoveForElo(pvMoves) ?? line.split(" ")[1];
          resolve({ bestMove: chosen, evalCp, mate });
        }
      };

      this.onMessage(listener);
      this.send("position fen " + fen);
      this.send(`go movetime ${thinkTimeMs}`);
    });
  }

  // Lukker Web Worker'en helt ned (kaldes når spillet forlades).
  terminate() {
    this.worker.terminate();
  }
}
