// "Foxie" er den lille ræve-maskot, der kommenterer brugerens træk på
// /play-siden, med en talebobel farvet efter hvor godt trækket var.
import styled from "styled-components";

// Hvor god/dårlig et træk var, vurderet ud fra hvor meget evaluering man
// tabte i forhold til motorens bedste træk (se qualityFromCpLoss i PlayPage).
export type MoveQuality = "great" | "good" | "inaccuracy" | "mistake" | "blunder";

interface FoxieMessageProps {
  text: string | null;
  quality: MoveQuality | null;
}

const Wrap = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
`;

const FoxAvatar = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

// Talebobelens tekstfarve afspejler trækkets kvalitet: grøn for gode træk,
// rød for fejl/blunders, og normal tekstfarve for alt midt imellem
// (f.eks. en lille unøjagtighed).
const Bubble = styled.div<{ $quality: MoveQuality | null }>`
  ${({ theme }) => `
    background: ${theme.colors.bgAlt};
    border: 1px solid ${theme.colors.border};
  `}
  border-radius: 10px;
  padding: 0.6rem 0.9rem;
  font-size: 0.92rem;
  min-height: 1.4rem;
  color: ${({ theme, $quality }) =>
    $quality === "great" || $quality === "good"
      ? theme.colors.good
      : $quality === "blunder" || $quality === "mistake"
      ? theme.colors.bad
      : theme.colors.text};
`;

export default function FoxieMessage({ text, quality }: FoxieMessageProps) {
  return (
    <Wrap>
      <FoxAvatar>🦊</FoxAvatar>
      <Bubble $quality={quality}>{text ?? "Foxie is watching the game..."}</Bubble>
    </Wrap>
  );
}
