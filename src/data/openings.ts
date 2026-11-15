// En åbning, der vises på /openings-siden. Indeholder trækrækken (i SAN,
// det normale skak-notationssystem) og en kort forklaring af idéen bag den.
export interface Opening {
  id: string;
  name: string;
  side: "white" | "black";
  eco: string; // ECO-kode: det officielle klassifikationsnummer for åbningen
  moves: string[]; // SAN moves from the starting position
  description: string;
}

// 30 åbninger i alt: 15 til at spille som hvid og 15 til at spille som sort.
export const openings: Opening[] = [
  // --- Hvid repertoire (15) ---
  {
    id: "italian-game",
    name: "Italian Game",
    side: "white",
    eco: "C50",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
    description:
      "One of the oldest openings on record. White develops quickly and aims the bishop straight at f7, the weakest square in Black's camp.",
  },
  {
    id: "ruy-lopez",
    name: "Ruy Lopez",
    side: "white",
    eco: "C60",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
    description:
      "The most respected e4 opening at every level. The bishop pressures the knight defending e5, and White builds a long-term space advantage.",
  },
  {
    id: "scotch-game",
    name: "Scotch Game",
    side: "white",
    eco: "C45",
    moves: ["e4", "e5", "Nf3", "Nc6", "d4"],
    description:
      "White grabs the centre immediately with d4, trading pawns and opening the position for quick piece activity instead of a slow buildup.",
  },
  {
    id: "kings-gambit",
    name: "King's Gambit",
    side: "white",
    eco: "C30",
    moves: ["e4", "e5", "f4"],
    description:
      "A romantic, sharp gambit. White sacrifices a pawn to rip open the centre and the f-file for a fast attack on the black king.",
  },
  {
    id: "vienna-game",
    name: "Vienna Game",
    side: "white",
    eco: "C25",
    moves: ["e4", "e5", "Nc3"],
    description:
      "A flexible way to meet 1...e5 that can transpose into gambit lines or a quieter build-up, while avoiding well-mapped Ruy Lopez theory.",
  },
  {
    id: "london-system",
    name: "London System",
    side: "white",
    eco: "D02",
    moves: ["d4", "d5", "Bf4"],
    description:
      "A favourite of club players and grandmasters alike for its low-maintenance plans: develop Bf4, Nf3, e3, Bd3/Be2, 0-0, and you're rarely worse.",
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    side: "white",
    eco: "D06",
    moves: ["d4", "d5", "c4"],
    description:
      "White offers the c-pawn to pull Black's d-pawn away from the centre. It isn't really a gambit — the pawn almost always comes back.",
  },
  {
    id: "catalan-opening",
    name: "Catalan Opening",
    side: "white",
    eco: "E00",
    moves: ["d4", "Nf6", "c4", "e6", "g3"],
    description:
      "Combines Queen's Gambit central control with a fianchettoed bishop on g2, giving White long-lasting pressure on the long diagonal.",
  },
  {
    id: "english-opening",
    name: "English Opening",
    side: "white",
    eco: "A10",
    moves: ["c4"],
    description:
      "A flexible flank opening that can reach reversed Sicilian structures, symmetrical pawn skirmishes, or a transposition into the Queen's Gambit family.",
  },
  {
    id: "reti-opening",
    name: "Réti Opening",
    side: "white",
    eco: "A04",
    moves: ["Nf3"],
    description:
      "A hypermodern approach: White delays committing the central pawns and instead pressures the centre with pieces first.",
  },
  {
    id: "birds-opening",
    name: "Bird's Opening",
    side: "white",
    eco: "A02",
    moves: ["f4"],
    description:
      "An offbeat way to grab kingside space early and steer the game away from heavily analysed main lines from move one.",
  },
  {
    id: "colle-system",
    name: "Colle System",
    side: "white",
    eco: "D05",
    moves: ["d4", "d5", "Nf3", "Nf6", "e3"],
    description:
      "A solid, repeatable setup for White: Nf3, e3, Bd3, 0-0, Nbd2, and then break with e4 once pieces are coordinated.",
  },
  {
    id: "trompowsky-attack",
    name: "Trompowsky Attack",
    side: "white",
    eco: "A45",
    moves: ["d4", "Nf6", "Bg5"],
    description:
      "An early Bg5 avoids huge chunks of main-line theory and immediately asks Black an uncomfortable question about the f6 knight.",
  },
  {
    id: "four-knights",
    name: "Four Knights Game",
    side: "white",
    eco: "C47",
    moves: ["e4", "e5", "Nf3", "Nc6", "Nc3", "Nf6"],
    description:
      "A symmetrical, classical developing scheme that leads to rich strategic middlegames without immediate tactical fireworks.",
  },
  {
    id: "danish-gambit",
    name: "Danish Gambit",
    side: "white",
    eco: "C21",
    moves: ["e4", "e5", "d4", "exd4", "c3"],
    description:
      "White sacrifices two pawns to open both diagonals toward the black king — a high-risk, high-reward attacking weapon.",
  },

  // --- Sort repertoire (15) ---
  {
    id: "sicilian-defense",
    name: "Sicilian Defense",
    side: "black",
    eco: "B20",
    moves: ["e4", "c5"],
    description:
      "The most popular and best-scoring reply to 1.e4 at the top level. Black fights for the centre asymmetrically, avoiding a mirrored structure.",
  },
  {
    id: "french-defense",
    name: "French Defense",
    side: "black",
    eco: "C00",
    moves: ["e4", "e6"],
    description:
      "A solid, resilient setup where Black accepts a slightly cramped position in exchange for a sturdy pawn chain and a later pawn-break with ...c5 or ...f6.",
  },
  {
    id: "caro-kann-defense",
    name: "Caro-Kann Defense",
    side: "black",
    eco: "B10",
    moves: ["e4", "c6"],
    description:
      "Similar aims to the French but without blocking in the light-squared bishop — a favourite of players who want a safe, well-structured game.",
  },
  {
    id: "scandinavian-defense",
    name: "Scandinavian Defense",
    side: "black",
    eco: "B01",
    moves: ["e4", "d5"],
    description:
      "Black challenges the centre immediately. After 2.exd5 Qxd5, the queen comes out early but Black gets quick, simple development.",
  },
  {
    id: "pirc-defense",
    name: "Pirc Defense",
    side: "black",
    eco: "B07",
    moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6"],
    description:
      "Black lets White occupy the centre and strikes back later with ...Bg7, ...0-0 and a well-timed ...c5 or ...e5 counter-break.",
  },
  {
    id: "modern-defense",
    name: "Modern Defense",
    side: "black",
    eco: "B06",
    moves: ["e4", "g6"],
    description:
      "A hypermodern setup where Black fianchettoes the bishop before deciding where the central pawns and knights belong.",
  },
  {
    id: "alekhines-defense",
    name: "Alekhine's Defense",
    side: "black",
    eco: "B02",
    moves: ["e4", "Nf6"],
    description:
      "Black provokes White's pawns forward, planning to undermine the resulting centre later — a fighting, double-edged try for a black win.",
  },
  {
    id: "kings-indian-defense",
    name: "King's Indian Defense",
    side: "black",
    eco: "E60",
    moves: ["d4", "Nf6", "c4", "g6"],
    description:
      "Black lets White take space in the centre, then counters on the kingside with ...Bg7, ...0-0, ...d6/e5 and a famous pawn storm.",
  },
  {
    id: "nimzo-indian-defense",
    name: "Nimzo-Indian Defense",
    side: "black",
    eco: "E20",
    moves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"],
    description:
      "Black pins White's knight before the centre is fully set, fighting for the e4 square and often landing White with doubled pawns.",
  },
  {
    id: "queens-indian-defense",
    name: "Queen's Indian Defense",
    side: "black",
    eco: "E12",
    moves: ["d4", "Nf6", "c4", "e6", "Nf3", "b6"],
    description:
      "A hyper-solid setup that fights for the long light diagonal with ...Bb7 while keeping the position flexible and hard to attack.",
  },
  {
    id: "grunfeld-defense",
    name: "Grünfeld Defense",
    side: "black",
    eco: "D80",
    moves: ["d4", "Nf6", "c4", "g6", "Nc3", "d5"],
    description:
      "Black invites White to build a big centre and then undermines it immediately with piece pressure — dynamic and double-edged.",
  },
  {
    id: "dutch-defense",
    name: "Dutch Defense",
    side: "black",
    eco: "A80",
    moves: ["d4", "f5"],
    description:
      "An ambitious, slightly risky try for a kingside space advantage and attacking chances, at the cost of a small hole on e6/weak e-file.",
  },
  {
    id: "benoni-defense",
    name: "Benoni Defense",
    side: "black",
    eco: "A56",
    moves: ["d4", "Nf6", "c4", "c5"],
    description:
      "Black concedes central space but gets a long-term queenside majority and open lines for active piece play.",
  },
  {
    id: "slav-defense",
    name: "Slav Defense",
    side: "black",
    eco: "D10",
    moves: ["d4", "d5", "c4", "c6"],
    description:
      "Black supports the d5 pawn without blocking in the light-squared bishop, a rock-solid choice against 1.d4.",
  },
  {
    id: "queens-gambit-declined",
    name: "Queen's Gambit Declined",
    side: "black",
    eco: "D30",
    moves: ["d4", "d5", "c4", "e6"],
    description:
      "The classical reply to the Queen's Gambit: Black keeps the centre firm and develops naturally, happy to play a long strategic game.",
  },
];
