// Simpel bund-tekst, der vises nederst på alle sider.
import styled from "styled-components";

const Wrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.85rem;
  margin-top: 3rem;
`;

export default function Footer() {
  return (
    <Wrap>
      Chess Learning — a school project built with React, Vite, TypeScript and
      Stockfish. Not affiliated with Chess.com or Lichess.
    </Wrap>
  );
}
