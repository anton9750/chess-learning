// Den interaktive øvelse, der vises som sidste side i hvert kursus. Lader
// brugeren prøve selv at finde det træk, kurset netop har forklaret, direkte
// på et rigtigt, klikbart skakbræt (genbruger ChessBoard-komponenten).
import { useState } from "react";
import styled from "styled-components";
import { Chess } from "chess.js";
import type { Move } from "chess.js";
import ChessBoard from "./ChessBoard";
import { buttonBase } from "../styles/mixins";
import type { Puzzle } from "../data/courses";

interface CoursePuzzleProps {
  puzzle: Puzzle;
}

// "pending" = venter på et træk, "correct" = løst, "incorrect" = forkert
// træk (stillingen nulstilles automatisk, så man kan prøve igen).
type Status = "pending" | "correct" | "incorrect";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Feedback = styled.p<{ $status: Status }>`
  font-weight: 600;
  min-height: 1.3rem;
  color: ${({ $status, theme }) =>
    $status === "correct" ? theme.colors.accent : $status === "incorrect" ? theme.colors.bad : theme.colors.textDim};
`;

const ResetButton = styled.button`
  ${({ theme }) => buttonBase(theme)}
  align-self: flex-start;
`;

export default function CoursePuzzle({ puzzle }: CoursePuzzleProps) {
  // "game" er selve skak-logikken for øvelsen; starter altid i den
  // stilling, øvelsen definerer (puzzle.fen).
  const [game, setGame] = useState(() => new Chess(puzzle.fen));
  const [fen, setFen] = useState(puzzle.fen);
  const [status, setStatus] = useState<Status>("pending");

  // Kaldes, når brugeren har gennemført et træk på brættet. Tjekker om
  // trækket (i SAN-notation, f.eks. "Nc7+") matcher en af de godkendte
  // løsninger på øvelsen.
  function handleUserMove(move: Move) {
    if (puzzle.solutions.includes(move.san)) {
      setFen(game.fen());
      setStatus("correct");
      return;
    }

    // Forkert træk: nulstiller stillingen til udgangspunktet, så brugeren
    // kan prøve igen uden at skulle trykke på en knap selv.
    const fresh = new Chess(puzzle.fen);
    setGame(fresh);
    setFen(fresh.fen());
    setStatus("incorrect");
  }

  // Nulstiller øvelsen manuelt (knappen "Reset position").
  function reset() {
    const fresh = new Chess(puzzle.fen);
    setGame(fresh);
    setFen(fresh.fen());
    setStatus("pending");
  }

  return (
    <Wrap>
      <h3>Try it yourself</h3>
      <p>{puzzle.instruction}</p>
      <BoardRow>
        {/* Brættet låses (interactive=false), så snart øvelsen er løst
            korrekt, så brugeren ikke roder stillingen til bagefter. */}
        <ChessBoard
          game={game}
          fen={fen}
          interactive={status !== "correct"}
          onUserMove={handleUserMove}
          size={320}
        />
      </BoardRow>
      <Feedback $status={status}>
        {status === "correct"
          ? puzzle.success
          : status === "incorrect"
          ? "Not quite — the position reset. Give it another try."
          : "Make your move on the board above."}
      </Feedback>
      <ResetButton onClick={reset}>Reset position</ResetButton>
    </Wrap>
  );
}
