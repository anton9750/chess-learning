// Globale CSS-regler, der gælder for hele siden (indsættes én gang i App.tsx).
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Gør det nemmere at regne bredde/højde ud, når padding/border er med. */
  * {
    box-sizing: border-box;
  }

  /* Fjerner browserens standard-margin/padding. */
  html, body {
    margin: 0;
    padding: 0;
  }

  /* Baggrund og tekstfarve styres af det aktuelle tema og skifter blødt,
     når brugeren skifter tema. */
  body {
    font-family: "Segoe UI", Roboto, system-ui, sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.2s ease, color 0.2s ease;
  }

  /* Overskrifter bruger en anden (serif) skrifttype end resten af siden. */
  h1, h2, h3, h4 {
    font-family: Georgia, "Times New Roman", serif;
    line-height: 1.2;
  }

  /* Links bruger temaets accentfarve og er ikke understreget som standard. */
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  p {
    line-height: 1.7;
  }
`;
