// Statisk liste over verdens bedste skakspillere (stormestre), vist på
// /grandmasters-siden sammen med deres foretrukne åbninger.
export interface Grandmaster {
  rank: number;
  name: string;
  country: string;
  favoriteOpenings: string[];
}

// Data for de 30 stormestre, sorteret efter rangering (rank).
export const grandmasters: Grandmaster[] = [
  { rank: 1, name: "Magnus Carlsen", country: "Norway", favoriteOpenings: ["Ruy Lopez", "London System", "Sicilian Defense"] },
  { rank: 2, name: "Fabiano Caruana", country: "USA", favoriteOpenings: ["Italian Game", "Petrov Defense", "Queen's Gambit"] },
  { rank: 3, name: "Hikaru Nakamura", country: "USA", favoriteOpenings: ["English Opening", "Sicilian Defense", "Reti Opening"] },
  { rank: 4, name: "Gukesh Dommaraju", country: "India", favoriteOpenings: ["Ruy Lopez", "Nimzo-Indian Defense"] },
  { rank: 5, name: "Arjun Erigaisi", country: "India", favoriteOpenings: ["Catalan Opening", "King's Indian Defense"] },
  { rank: 6, name: "Ding Liren", country: "China", favoriteOpenings: ["Queen's Gambit Declined", "Berlin Defense"] },
  { rank: 7, name: "Ian Nepomniachtchi", country: "Russia", favoriteOpenings: ["Ruy Lopez", "Grünfeld Defense"] },
  { rank: 8, name: "Alireza Firouzja", country: "France", favoriteOpenings: ["Sicilian Defense", "King's Indian Defense"] },
  { rank: 9, name: "Wesley So", country: "USA", favoriteOpenings: ["Catalan Opening", "Queen's Indian Defense"] },
  { rank: 10, name: "Anish Giri", country: "Netherlands", favoriteOpenings: ["Queen's Gambit", "Catalan Opening"] },
  { rank: 11, name: "Levon Aronian", country: "USA", favoriteOpenings: ["Queen's Indian Defense", "English Opening"] },
  { rank: 12, name: "Maxime Vachier-Lagrave", country: "France", favoriteOpenings: ["Sicilian Defense", "Grünfeld Defense"] },
  { rank: 13, name: "Richard Rapport", country: "Hungary", favoriteOpenings: ["Dutch Defense", "Trompowsky Attack"] },
  { rank: 14, name: "Vincent Keymer", country: "Germany", favoriteOpenings: ["Catalan Opening", "Italian Game"] },
  { rank: 15, name: "Nodirbek Abdusattorov", country: "Uzbekistan", favoriteOpenings: ["Scotch Game", "Sicilian Defense"] },
  { rank: 16, name: "Praggnanandhaa R", country: "India", favoriteOpenings: ["Ruy Lopez", "Sicilian Defense"] },
  { rank: 17, name: "Teimour Radjabov", country: "Azerbaijan", favoriteOpenings: ["King's Indian Defense", "French Defense"] },
  { rank: 18, name: "Shakhriyar Mamedyarov", country: "Azerbaijan", favoriteOpenings: ["King's Indian Defense", "Catalan Opening"] },
  { rank: 19, name: "Leinier Dominguez", country: "USA", favoriteOpenings: ["Queen's Gambit", "Italian Game"] },
  { rank: 20, name: "Jan-Krzysztof Duda", country: "Poland", favoriteOpenings: ["Italian Game", "Sicilian Defense"] },
  { rank: 21, name: "Vidit Gujrathi", country: "India", favoriteOpenings: ["Queen's Gambit Declined", "Ruy Lopez"] },
  { rank: 22, name: "Dmitry Andreikin", country: "Russia", favoriteOpenings: ["Sicilian Defense", "French Defense"] },
  { rank: 23, name: "Vladimir Fedoseev", country: "Slovenia", favoriteOpenings: ["London System", "Sicilian Defense"] },
  { rank: 24, name: "Sam Shankland", country: "USA", favoriteOpenings: ["Queen's Gambit", "Slav Defense"] },
  { rank: 25, name: "Alexander Grischuk", country: "Russia", favoriteOpenings: ["Grünfeld Defense", "Sicilian Defense"] },
  { rank: 26, name: "Bogdan-Daniel Deac", country: "Romania", favoriteOpenings: ["English Opening", "Italian Game"] },
  { rank: 27, name: "Yu Yangyi", country: "China", favoriteOpenings: ["Sicilian Defense", "Caro-Kann Defense"] },
  { rank: 28, name: "David Navara", country: "Czechia", favoriteOpenings: ["Italian Game", "Queen's Gambit"] },
  { rank: 29, name: "Pentala Harikrishna", country: "India", favoriteOpenings: ["Catalan Opening", "Ruy Lopez"] },
  { rank: 30, name: "Baadur Jobava", country: "Georgia", favoriteOpenings: ["Bird's Opening", "Trompowsky Attack"] },
];
