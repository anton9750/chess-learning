// Liste over computer-modstandere ("botter"), man kan spille imod på
// /play-siden. Hver bot har et navn og en Elo-rating, som sendes videre til
// StockfishEngine (se lib/stockfishEngine.ts) for at style styrken.
export interface Bot {
  name: string;
  elo: number;
}

// Sorteret fra svagest til stærkest.
export const bots: Bot[] = [
  { name: "Rookie Rick", elo: 200 },
  { name: "Pawn Pusher Pam", elo: 400 },
  { name: "Club Player Cole", elo: 600 },
  { name: "Tactical Tara", elo: 800 },
  { name: "Solid Sam", elo: 1000 },
  { name: "Sharp Sofia", elo: 1200 },
  { name: "Strategic Stan", elo: 1400 },
  { name: "Expert Elin", elo: 1600 },
  { name: "Master Mo", elo: 1800 },
];
