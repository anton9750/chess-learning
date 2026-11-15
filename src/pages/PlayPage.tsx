// Hovedsiden for at spille et rigtigt parti mod en Stockfish-bot: brugeren
// spiller altid hvid, botten (sort) styres af StockfishEngine, og
// "Foxie"-maskotten kommenterer kvaliteten af brugerens træk undervejs.
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import type { Move } from "chess.js";
import styled from "styled-components";
import ChessBoard from "../components/ChessBoard";
import EloBar from "../components/EloBar";
import FoxieMessage, { type MoveQuality } from "../components/FoxieMessage";
import { StockfishEngine } from "../lib/stockfishEngine";
import { bots, type Bot } from "../data/bots";
import { getCurrentUser, addSavedGame } from "../lib/auth";
import { pageContainer, card, buttonBase } from "../styles/mixins";

const Layout = styled.div`
  ${pageContainer}
  display: grid;
  grid-template-columns: auto 1fr 300px;
  gap: 1.6rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BoardCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Panel = styled.div`
  ${({ theme }) => card(theme)}
  padding: 1rem 1.2rem;
`;

const BotSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgAlt};
  color: ${({ theme }) => theme.colors.text};
`;

const ResetButton = styled.button`
  ${({ theme }) => buttonBase(theme)}
  width: 100%;
`;

const Status = styled.p`
  font-weight: 700;
`;

// Oversætter, hvor meget evaluering brugeren tabte ved sit seneste træk
// (cpLoss, i centipawns) til en kvalitetskategori og en Foxie-kommentar.
function qualityFromCpLoss(cpLoss: number): { quality: MoveQuality; text: string } {
  if (cpLoss < 20) return { quality: "great", text: "Great move! That's close to the engine's top choice." };
  if (cpLoss < 70) return { quality: "good", text: "Good move, solid and sound." };
  if (cpLoss < 150) return { quality: "inaccuracy", text: "That's a slight inaccuracy — there was something better." };
  if (cpLoss < 300) return { quality: "mistake", text: "Mistake! That gave up a real chunk of your advantage." };
  return { quality: "blunder", text: "Blunder!! That move loses a lot — be careful next time." };
}

// Stockfish svarer med træk i UCI-format (f.eks. "e2e4" eller "e7e8q" ved
// forfremmelse) — denne funktion splitter det op i de felter, chess.js'
// move()-funktion forventer.
function uciToMove(uci: string): { from: string; to: string; promotion?: string } {
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    promotion: uci.length > 4 ? uci.slice(4, 5) : undefined,
  };
}

export default function PlayPage() {
  const [engine] = useState(() => new StockfishEngine());
  const [bot, setBot] = useState<Bot>(bots[2]);
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [whiteEval, setWhiteEval] = useState<number | null>(20);
  const [mate, setMate] = useState<number | null>(null);
  const [botThinking, setBotThinking] = useState(false);
  const [foxie, setFoxie] = useState<{ text: string; quality: MoveQuality } | null>(null);
  const [status, setStatus] = useState("Your move — you're playing White.");
  const [savedThisGame, setSavedThisGame] = useState(false);

  // Lukker Stockfish-motoren ned, når man forlader siden.
  useEffect(() => {
    return () => engine.terminate();
  }, [engine]);

  // Motoren vurderer altid "set fra den side, der skal trække nu" — denne
  // funktion vender fortegnet om, så evalueringen altid er set fra hvids
  // side (så EloBar og Foxie-logikken kan regne konsekvent).
  function evalForWhite(cp: number | null, mateScore: number | null, sideToMove: "w" | "b") {
    if (mateScore !== null) return { cp: null, mate: sideToMove === "w" ? mateScore : -mateScore };
    if (cp === null) return { cp: null, mate: null };
    return { cp: sideToMove === "w" ? cp : -cp, mate: null };
  }

  // Tjekker om partiet er slut, opdaterer statusteksten, og gemmer
  // resultatet på brugerens profil (hvis man er logget ind), én gang pr. parti.
  function checkGameOver(current: Chess) {
    if (!current.isGameOver()) return;
    let result: "win" | "loss" | "draw" = "draw";
    if (current.isCheckmate()) {
      result = current.turn() === "b" ? "win" : "loss";
    }
    setStatus(
      current.isCheckmate()
        ? result === "win"
          ? "Checkmate — you win!"
          : "Checkmate — the bot wins."
        : current.isDraw()
        ? "Draw."
        : "Game over."
    );
    const user = getCurrentUser();
    if (user && !savedThisGame) {
      addSavedGame(user.email, {
        id: `${Date.now()}`,
        opponent: bot.name,
        result,
        date: new Date().toLocaleDateString(),
        pgn: current.pgn(),
      });
      setSavedThisGame(true);
    }
  }

  // Lader botten spille sit træk: sætter motorens styrke til botten's Elo,
  // beder om det bedste træk, udfører det på brættet, og beder derefter om
  // endnu en vurdering af den nye stilling (til EloBar).
  async function playBotMove(afterGame: Chess) {
    if (afterGame.isGameOver()) return;
    setBotThinking(true);
    engine.setElo(bot.elo);
    const result = await engine.getBestMove(afterGame.fen(), 500);
    afterGame.move(uciToMove(result.bestMove));
    setFen(afterGame.fen());
    setBotThinking(false);
    checkGameOver(afterGame);

    const nextEval = await engine.getBestMove(afterGame.fen(), 400);
    const forWhite = evalForWhite(nextEval.evalCp, nextEval.mate, afterGame.turn());
    setWhiteEval(forWhite.cp);
    setMate(forWhite.mate);
  }

  // Kaldes, når brugeren selv har gennemført et træk. Beder motoren om en
  // vurdering (altid i fuld styrke, uanset botten's Elo), regner ud hvor
  // meget evaluering brugeren tabte siden sidste træk (for Foxies
  // kommentar), og lader derefter botten svare igen.
  async function handleUserMove(move: Move) {
    const evalBefore = whiteEval ?? 20;
    setFen(game.fen());
    checkGameOver(game);

    const result = await engine.getBestMove(game.fen(), 500);
    const forWhite = evalForWhite(result.evalCp, result.mate, game.turn());
    if (forWhite.cp !== null) {
      const cpLoss = Math.max(0, evalBefore - forWhite.cp);
      setFoxie(qualityFromCpLoss(cpLoss));
    }
    setWhiteEval(forWhite.cp);
    setMate(forWhite.mate);

    if (!game.isGameOver()) {
      setStatus(`Bot is thinking... (${move.san} played)`);
      await playBotMove(game);
      if (!game.isGameOver()) setStatus("Your move.");
    }
  }

  // Starter et helt nyt parti fra bunden.
  function resetGame() {
    const fresh = new Chess();
    setGame(fresh);
    setFen(fresh.fen());
    setWhiteEval(20);
    setMate(null);
    setFoxie(null);
    setSavedThisGame(false);
    setStatus("Your move — you're playing White.");
  }

  return (
    <Layout>
      <EloBar whiteEvalCp={whiteEval} mate={mate} />

      <BoardCol>
        <ChessBoard
          game={game}
          fen={fen}
          interactive={!botThinking && game.turn() === "w" && !game.isGameOver()}
          onUserMove={handleUserMove}
          size={480}
        />
        <Status>{status}</Status>
      </BoardCol>

      <SideCol>
        <Panel>
          <h3>Choose your opponent</h3>
          <BotSelect
            value={bot.name}
            onChange={(e) => setBot(bots.find((b) => b.name === e.target.value)!)}
          >
            {bots.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name} ({b.elo} Elo)
              </option>
            ))}
          </BotSelect>
          <ResetButton onClick={resetGame}>New game</ResetButton>
        </Panel>

        <Panel>
          <h3>Foxie</h3>
          <FoxieMessage text={foxie?.text ?? null} quality={foxie?.quality ?? null} />
        </Panel>
      </SideCol>
    </Layout>
  );
}
