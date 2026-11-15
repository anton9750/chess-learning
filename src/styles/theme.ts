// Beskriver formen på et tema: alle farver og afrundingsradius som resten
// af appen bruger via styled-components' ThemeProvider.
export interface Theme {
  name: string;
  colors: {
    bg: string; // baggrund for hele siden
    bgAlt: string; // alternativ baggrund (f.eks. inputfelter)
    surface: string; // baggrund for kort/paneler
    text: string; // normal tekstfarve
    textDim: string; // dæmpet/sekundær tekstfarve
    accent: string; // accentfarve til knapper og links
    accentText: string; // tekstfarve oven på accentfarven
    border: string; // kantfarve
    boardLight: string; // lyse felter på skakbrættet
    boardDark: string; // mørke felter på skakbrættet
    good: string; // farve for positive beskeder (f.eks. gode træk)
    bad: string; // farve for negative beskeder (f.eks. fejl/blunders)
  };
  radius: string;
}

// Lyst tema (standard).
export const lightTheme: Theme = {
  name: "light",
  colors: {
    bg: "#f3f1ea",
    bgAlt: "#ffffff",
    surface: "#ffffff",
    text: "#1f1b16",
    textDim: "#6b6257",
    accent: "#9a6b3f",
    accentText: "#ffffff",
    border: "#ddd6c9",
    boardLight: "#f0d9b5",
    boardDark: "#b58863",
    good: "#3f8f5f",
    bad: "#b5493f",
  },
  radius: "10px",
};

// Mørkt tema.
export const darkTheme: Theme = {
  name: "dark",
  colors: {
    bg: "#171411",
    bgAlt: "#201c17",
    surface: "#241f1a",
    text: "#f1ece3",
    textDim: "#a79d8f",
    accent: "#d99a56",
    accentText: "#201a12",
    border: "#39322a",
    boardLight: "#e8c99b",
    boardDark: "#7a4f32",
    good: "#5fbf84",
    bad: "#e06b5c",
  },
  radius: "10px",
};

// Grønt "skov"-tema, et tredje farvevalg ud over lys/mørk.
export const forestTheme: Theme = {
  name: "forest",
  colors: {
    bg: "#101c17",
    bgAlt: "#152521",
    surface: "#1b2e28",
    text: "#e9f3ec",
    textDim: "#8fae9f",
    accent: "#4caf7d",
    accentText: "#0b1512",
    border: "#2a4038",
    boardLight: "#cfe3c6",
    boardDark: "#4f7a5e",
    good: "#6fd79a",
    bad: "#e0786b",
  },
  radius: "10px",
};

// Opslagstabel, så man kan vælge tema ud fra et navn (bruges af Nav-komponenten).
export const themes: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  forest: forestTheme,
};

// Typen for et gyldigt temanavn, udledt direkte fra nøglerne i themes-objektet.
export type ThemeName = keyof typeof themes;
