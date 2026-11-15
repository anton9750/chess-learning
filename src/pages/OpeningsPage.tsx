// Siden hvor man kan udforske de 30 åbninger: vælge en fra listen, se
// trækkene spillet på brættet, og få Stockfishs løbende vurdering af
// stillingen, mens man selv spiller videre.
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import styled from "styled-components";
import ChessBoard from "../components/ChessBoard";
import { openings, type Opening } from "../data/openings";
import { StockfishEngine } from "../lib/stockfishEngine";
import { pageContainer, card, buttonBase } from "../styles/mixins";

const Layout = styled.div`
  ${pageContainer}
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.8rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ListCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 640px;
  overflow-y: auto;
`;

const ColTitle = styled.h3`
  margin: 0 0 0.3rem;
`;

const OpeningButton = styled.button<{ $active: boolean }>`
  ${({ theme }) => buttonBase(theme)}
  text-align: left;
  ${(p) => p.$active && `border-color: ${p.theme.colors.accent};`}
`;

const BoardCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
`;

const Info = styled.div`
  ${({ theme }) => card(theme)}
  padding: 1rem 1.2rem;
  width: 100%;
  max-width: 480px;
`;

const EvalLine = styled.p`
  font-weight: 700;
`;

// Opretter et nyt spil og spiller åbningens trækrække igennem, så brættet
// starter i netop den stilling, åbningen fører til.
function loadOpening(opening: Opening) {
  const game = new Chess();
  for (const san of opening.moves) {
    game.move(san);
  }
  return game;
}

export default function OpeningsPage() {
  const [engine] = useState(() => new StockfishEngine());
  const [selectedId, setSelectedId] = useState<string>(openings[0].id);
  const [game, setGame] = useState(() => loadOpening(openings[0]));
  const [fen, setFen] = useState(game.fen());
  const [evalCp, setEvalCp] = useState<number | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  // Lukker motoren ned igen, når man forlader siden.
  useEffect(() => {
    return () => engine.terminate();
  }, [engine]);

  // Beder motoren om en ny vurdering, hver gang stillingen (fen) ændrer
  // sig — både når man skifter åbning, og når man selv spiller et træk.
  useEffect(() => {
    setEvaluating(true);
    engine.getBestMove(fen, 500).then((result) => {
      setEvalCp(result.evalCp);
      setEvaluating(false);
    });
  }, [fen, engine]);

  // Skifter til en anden åbning: opretter en ny stilling og nulstiller
  // brættet til den.
  function selectOpening(opening: Opening) {
    const newGame = loadOpening(opening);
    setSelectedId(opening.id);
    setGame(newGame);
    setFen(newGame.fen());
  }

  // Når brugeren selv flytter en brik på brættet, skal vi bare opdatere
  // "fen", så resten af siden (og motor-evalueringen) følger med.
  function handleUserMove() {
    setFen(game.fen());
  }

  const selected = openings.find((o) => o.id === selectedId)!;
  const whiteOpenings = openings.filter((o) => o.side === "white");
  const blackOpenings = openings.filter((o) => o.side === "black");

  // Formaterer evalueringen som f.eks. "+0.35 (White)".
  const evalText =
    evalCp === null
      ? "..."
      : `${evalCp > 0 ? "+" : ""}${(evalCp / 100).toFixed(2)} (${
          evalCp > 0 ? "White" : evalCp < 0 ? "Black" : "equal"
        })`;

  return (
    <Layout>
      <ListCol>
        <ColTitle>White openings</ColTitle>
        {whiteOpenings.map((o) => (
          <OpeningButton
            key={o.id}
            $active={o.id === selectedId}
            onClick={() => selectOpening(o)}
          >
            {o.name}
          </OpeningButton>
        ))}
      </ListCol>

      <BoardCol>
        <ChessBoard game={game} fen={fen} onUserMove={handleUserMove} size={440} />
        <Info>
          <h3>{selected.name} ({selected.eco})</h3>
          <p>{selected.description}</p>
          <EvalLine>
            Stockfish eval: {evaluating ? "thinking..." : evalText}
          </EvalLine>
        </Info>
      </BoardCol>

      <ListCol>
        <ColTitle>Black openings</ColTitle>
        {blackOpenings.map((o) => (
          <OpeningButton
            key={o.id}
            $active={o.id === selectedId}
            onClick={() => selectOpening(o)}
          >
            {o.name}
          </OpeningButton>
        ))}
      </ListCol>
    </Layout>
  );
}
