// Et IKKE-interaktivt skakdiagram: viser en fastlåst stilling (fra en FEN)
// med en billedtekst, brugt til at illustrere idéer i kursernes slides.
// I modsætning til ChessBoard kan man ikke klikke eller flytte brikker her.
import styled from "styled-components";
import { Chess } from "chess.js";
import type { Square } from "chess.js";

interface PositionDiagramProps {
  fen: string; // stillingen der skal vises
  caption: string; // forklarende tekst under diagrammet
  highlights?: string[]; // felter der skal have en orange ramme
  orientation?: "white" | "black";
  size?: number;
}

// Samme opslagstabel over brik-symboler som i ChessBoard.
const unicodePieces: Record<string, string> = {
  wp: "♙", wn: "♘", wb: "♗", wr: "♖", wq: "♕", wk: "♔",
  bp: "♟", bn: "♞", bb: "♝", br: "♜", bq: "♛", bk: "♚",
};

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

// <figure> er den semantisk rigtige HTML-tag til "et billede med en
// billedtekst" (her: brættet + Caption nedenfor).
const Wrap = styled.figure`
  margin: 1.3rem 0 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

// Samme fast-pixel-pr-felt-tilgang som ChessBoard, for at sikre perfekt
// kvadratiske og ensartede felter uanset indhold.
const Board = styled.div<{ $size: number }>`
  display: grid;
  grid-template-columns: repeat(8, ${(p) => p.$size / 8}px);
  grid-template-rows: repeat(8, ${(p) => p.$size / 8}px);
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  max-width: 100%;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
`;

// Et enkelt felt i diagrammet. Fremhævede felter får en orange ramme via et
// separat ::after-pseudoelement (frem for box-shadow direkte på feltet),
// så rammen ikke "spiser" af pladsen, brikken bliver tegnet i.
const Cell = styled.div<{ $light: boolean; $highlight: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $light, theme }) => ($light ? theme.colors.boardLight : theme.colors.boardDark)};
  font-size: clamp(1.2rem, 3.2vw, 1.9rem);
  user-select: none;

  ${(p) =>
    p.$highlight &&
    `&::after {
      content: "";
      position: absolute;
      inset: 2px;
      border-radius: 4px;
      box-shadow: inset 0 0 0 3px rgba(255, 180, 0, 0.85);
      pointer-events: none;
    }`}
`;

// Billedteksten under diagrammet, der forklarer hvad man kigger på.
const Caption = styled.figcaption`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textDim};
  text-align: center;
  max-width: 420px;
`;

export default function PositionDiagram({
  fen,
  caption,
  highlights = [],
  orientation = "white",
  size = 300,
}: PositionDiagramProps) {
  // Opretter en chess.js-instans ud fra FEN'en, kun for at kunne læse hvilke
  // brikker der står på hvilke felter (der spilles aldrig nogen træk her).
  const game = new Chess(fen);
  const orderedFiles = orientation === "white" ? files : [...files].reverse();
  const orderedRanks = orientation === "white" ? ranks : [...ranks].reverse();

  return (
    <Wrap>
      <Board $size={size}>
        {/* Tegner alle 64 felter, uanset om der er en brik på dem. */}
        {orderedRanks.map((rank) =>
          orderedFiles.map((file) => {
            const square = `${file}${rank}` as Square;
            const piece = game.get(square);
            const light = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
            return (
              <Cell key={square} $light={light} $highlight={highlights.includes(square)}>
                {piece && unicodePieces[`${piece.color}${piece.type}`]}
              </Cell>
            );
          })
        )}
      </Board>
      <Caption>{caption}</Caption>
    </Wrap>
  );
}
