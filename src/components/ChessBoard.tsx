// Det interaktive skakbræt. Bruges både til at spille rigtige partier mod
// en bot (PlayPage) og til øvelserne i kurserne (CoursePuzzle) — styres af
// "interactive"-prop'en, om man må klikke og flytte brikker.
import { useState } from "react";
import styled from "styled-components";
import type { Chess, Square, Move } from "chess.js";

interface ChessBoardProps {
  game: Chess; // selve skak-logikken (chess.js), ejes af den overordnede komponent
  fen: string; // only used to force a re-render when the parent updates the game
  orientation?: "white" | "black"; // hvilken side der vender nedad på skærmen
  interactive?: boolean; // om brugeren må klikke og flytte brikker
  onUserMove?: (move: Move) => void; // kaldes, når brugeren har gennemført et træk
  size?: number; // brættets bredde/højde i pixels
}

// Unicode-symboler for hver brik, opslået via farve+type (f.eks. "wp" = hvid bonde).
const unicodePieces: Record<string, string> = {
  wp: "♙", wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔",
  bp: "♟", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚",
};

// Felternes bogstaver og tal, i den rækkefølge de vises, når hvid vender nedad.
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

// Selve brættet: et 8x8 CSS-grid med en fast pixel-størrelse pr. felt
// (udregnet som $size/8), så alle felter garanteret bliver lige store og
// kvadratiske.
const Board = styled.div<{ $size: number }>`
  display: grid;
  grid-template-columns: repeat(8, ${(p) => p.$size / 8}px);
  grid-template-rows: repeat(8, ${(p) => p.$size / 8}px);
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
`;

// Et enkelt felt på brættet. Farven afhænger af om feltet er lyst/mørkt, og
// der tegnes visuel markering for: det valgte felt (guld), seneste træk
// (blå) og lovlige mål-felter (en lille mørk prik via ::after).
const Square = styled.div<{
  $light: boolean;
  $selected: boolean;
  $legal: boolean;
  $lastMove: boolean;
  $interactive: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $light, theme }) =>
    $light ? theme.colors.boardLight : theme.colors.boardDark};
  cursor: ${(p) => (p.$interactive ? "pointer" : "default")};
  font-size: clamp(1.6rem, 4.5vw, 2.6rem);
  user-select: none;

  ${(p) =>
    p.$selected &&
    `box-shadow: inset 0 0 0 3px rgba(255, 215, 0, 0.85);`}

  ${(p) =>
    p.$lastMove &&
    `box-shadow: inset 0 0 0 3px rgba(80, 160, 255, 0.6);`}

  &::after {
    content: "";
    display: ${(p) => (p.$legal ? "block" : "none")};
    position: absolute;
    width: 28%;
    height: 28%;
    border-radius: 50%;
    background: rgba(20, 20, 20, 0.35);
  }
`;

// Selve brik-symbolet inde i et felt.
const Piece = styled.span<{ $moving: boolean }>`
  transition: transform 0.15s ease;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.35));
`;

export default function ChessBoard({
  game,
  orientation = "white",
  interactive = true,
  onUserMove,
  size = 480,
}: ChessBoardProps) {
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalTargets, setLegalTargets] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  // Vender filer/rækker om, hvis brættet skal vises med sort nederst.
  const orderedFiles = orientation === "white" ? files : [...files].reverse();
  const orderedRanks = orientation === "white" ? ranks : [...ranks].reverse();

  // Håndterer klik på et felt. Opfører sig forskelligt afhængigt af om der
  // allerede er valgt en brik:
  // 1) Klikker man på den allerede valgte brik igen, fravælges den.
  // 2) Klikker man på et lovligt mål-felt, gennemføres trækket.
  // 3) Ellers forsøges det at vælge brikken på det klikkede felt (hvis det
  //    er ens egen brik, og det er ens tur).
  function handleClick(square: Square) {
    if (!interactive) return;

    if (selected === square) {
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    if (selected && legalTargets.includes(square)) {
      const piece = game.get(selected);
      // Forfremmer altid til dronning, hvis en bonde når sidste række —
      // der er ingen valgmulighed for andre brikker i denne version.
      const isPromotion =
        piece?.type === "p" && (square[1] === "8" || square[1] === "1");
      const move = game.move({
        from: selected,
        to: square,
        promotion: isPromotion ? "q" : undefined,
      });
      if (move) {
        setLastMove({ from: move.from, to: move.to });
        onUserMove?.(move);
      }
      setSelected(null);
      setLegalTargets([]);
      return;
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      // Vælger brikken og udregner, hvilke felter den lovligt kan flyttes til.
      setSelected(square);
      const moves = game.moves({ square, verbose: true }) as Move[];
      setLegalTargets(moves.map((m) => m.to));
    } else {
      setSelected(null);
      setLegalTargets([]);
    }
  }

  return (
    <Board $size={size}>
      {/* Går igennem alle 64 kombinationer af række og linje for at tegne
          hvert felt, uanset om der står en brik på det eller ej. */}
      {orderedRanks.map((rank) =>
        orderedFiles.map((file) => {
          const square = `${file}${rank}` as Square;
          const piece = game.get(square);
          const light = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
          const isLast =
            lastMove && (lastMove.from === square || lastMove.to === square);

          return (
            <Square
              key={square}
              $light={light}
              $selected={selected === square}
              $legal={legalTargets.includes(square)}
              $lastMove={!!isLast}
              $interactive={interactive}
              onClick={() => handleClick(square)}
            >
              {piece && (
                <Piece $moving={false}>
                  {unicodePieces[`${piece.color}${piece.type}`]}
                </Piece>
              )}
            </Square>
          );
        })
      )}
    </Board>
  );
}
