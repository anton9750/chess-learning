// Genbrugelige styled-components CSS-"mixins" (små byggeklodser af CSS), så
// man ikke skal skrive den samme styling igen og igen i hver komponent.
import { css } from "styled-components";
import type { Theme } from "./theme";

// Centrerer indhold både vandret og lodret med flexbox.
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Flexbox-række med indhold spredt ud til hver sin side.
export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Udseendet for et "kort"/panel (baggrund, kant, afrunding og skygge),
// brugt på stort set alle bokse i appen.
export const card = (theme: Theme) => css`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
`;

// Grundlæggende knap-styling (bruges direkte eller som udgangspunkt for
// accentButton nedenfor).
export const buttonBase = (theme: Theme) => css`
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.6rem 1.1rem;
  border-radius: ${theme.radius};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.bgAlt};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: transform 0.12s ease, background 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// En "fremhævet" knap (f.eks. hovedhandlingen på en side) med accentfarve.
export const accentButton = (theme: Theme) => css`
  ${buttonBase(theme)}
  background: ${theme.colors.accent};
  color: ${theme.colors.accentText};
  border: none;
`;

// Standard sidelayout: centreret indhold med en maks-bredde og luft i siderne.
export const pageContainer = css`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
`;

// Tilpasset udseende for scrollbaren (kun relevant i WebKit-browsere som
// Chrome/Edge).
export const scrollbar = (theme: Theme) => css`
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 8px;
  }
`;
