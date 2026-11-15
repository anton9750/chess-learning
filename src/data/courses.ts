// Alt indholdet til /learn-sektionen: 25 kurser, hver med en række "sider"
// (slides) med tekst og nogle gange et skakdiagram, samt én interaktiv
// øvelse (puzzle) til sidst i kurset.

// Et skakdiagram, der kan vises midt i en side: en stilling (FEN), en
// billedtekst der forklarer, hvad man ser, og evt. nogle felter der skal
// fremhæves med en orange ramme.
export interface Diagram {
  fen: string;
  caption: string;
  highlights?: string[];
  orientation?: "white" | "black";
}

// En side i et kursus er enten bare en tekststreng, eller et objekt med
// tekst + et tilhørende diagram.
export type Slide = string | { text: string; diagram: Diagram };

// Hjælpefunktion, der altid giver teksten for en side, uanset om den er en
// ren streng eller et objekt med tekst+diagram.
export function slideText(slide: Slide): string {
  return typeof slide === "string" ? slide : slide.text;
}

// Hjælpefunktion, der giver diagrammet for en side, hvis der er et
// (returnerer undefined for almindelige tekst-sider).
export function slideDiagram(slide: Slide): Diagram | undefined {
  return typeof slide === "string" ? undefined : slide.diagram;
}

// Den interaktive øvelse til sidst i hvert kursus: en startstilling (FEN),
// en instruktion til brugeren, de(t) træk der regnes som korrekt løsning
// (i SAN-notation), og en sejrsbesked der vises, når man løser den.
export interface Puzzle {
  fen: string;
  instruction: string;
  solutions: string[];
  success: string;
}

// Et helt kursus: titel, sværhedsgrad (Elo-interval), alle siderne, og den
// afsluttende øvelse.
export interface Course {
  id: number;
  title: string;
  level: string;
  slides: Slide[];
  puzzle: Puzzle;
}

// De 25 kurser. De første 20 (id 1-20) dækker 800-1800 Elo; de sidste 5
// (id 21-25) er mere avancerede (1800-2400 Elo) og bygger på kendte,
// offentligt kendte råd fra stærke spillere/kommentatorer.
export const courses: Course[] = [
  {
    id: 1,
    title: "Pawn Structures and Pawn Play",
    level: "800-1800",
    puzzle: {
      fen: "4k3/8/3pp3/2p5/3P4/2P5/8/4K3 b - - 0 1",
      instruction:
        "You're Black. White's pawn chain runs c3–d4–e5. Attack the base of the chain, not the well-defended tip.",
      solutions: ["cxd4"],
      success:
        "cxd4! You went straight for the base of the chain instead of the strongly defended e5 pawn at the tip — exactly the plan this course teaches.",
    },
    slides: [
      `Pawns look like the weakest pieces on the board, but they decide more games than any other piece. Every pawn move is permanent — pawns can never go backward or sideways, so each push opens some squares forever and closes others forever. Before you move a pawn, it helps to ask: what square am I giving up control of, and am I ready for that?

In the opening, the most common mistake below 1200 is pushing pawns on the side of the board where you plan to castle. If you intend to castle kingside, moving your f-, g-, or h-pawns early creates permanent holes next to your own king. Save those pawn moves for when you have a concrete reason to make them, such as kicking away an annoying piece.`,
      {
        text: `A pawn chain is a diagonal line of pawns that defend each other, like pawns on d4 and e5 for White. The base of the chain — the pawn furthest back, closest to your own side — is the chain's weak point, because nothing defends it from in front. A classic plan in closed positions is to attack the base of your opponent's pawn chain rather than attacking higher up, where the chain is naturally strongest.

For example, in many French Defense structures White has pawns on d4 and e5. Black's natural plan is to challenge the base of that chain with ...c5 or ...f6, rather than trying to attack e5 directly where it's well defended.`,
        diagram: {
          fen: "4k3/8/4p3/2ppP3/3P4/8/8/4K3 w - - 0 1",
          caption:
            "White's pawn chain d4–e5: the base on d4 is the weak link. Black's plan is …c5 and …cxd4, attacking the base rather than the well-defended tip on e5.",
          highlights: ["d4"],
        },
      },
      `Isolated pawns — pawns with no friendly pawn on an adjacent file — are a recurring theme, especially the isolated queen's pawn (IQP) that appears from many Queen's Gambit and Caro-Kann lines. An isolated pawn can be a weakness in the endgame, because it can never be defended by another pawn and enemy pieces can blockade the square in front of it.

But in the middlegame, the same isolated pawn is often a strength: it opens the file next to it for a rook, and it opens diagonals for the bishops because there's no neighbouring pawn blocking them. The rule of thumb: the more pieces are on the board, the better an IQP tends to be for the side that has it; the fewer pieces remain, the worse it becomes.`,
      `Doubled pawns (two pawns on the same file, stacked after a capture) are usually a long-term structural weakness, because the front pawn blocks the back one from ever being defended by it, and together they only control the squares of one pawn's worth of width. They are not always bad — sometimes you accept doubled pawns to win the bishop pair or to open a file for your rook — but you should always know you are accepting a weakness and have a reason for it.

Passed pawns — pawns with no enemy pawn in front of them on their file or the two adjacent files — are extremely valuable in the endgame, because nothing but a piece can stop them from reaching the back rank and promoting. "Push the passed pawn" is one of the oldest and most reliable pieces of endgame advice.`,
      `A useful habit: before every pawn move, picture the position five moves later with that pawn structure locked in, and ask whether your pieces will have good squares to stand on. Bishops love open diagonals, so pawn structures that stay flexible tend to help bishops; knights love fixed outposts near the enemy camp, so a more closed structure with clear holes (like d5 or e5) tends to help knights.

Try this in your own games: before you play any pawn move other than a capture or a forced reaction, say out loud (or in your head) which square you are permanently giving up, and whether that trade is worth it. This one habit alone will cut down on careless weaknesses more than almost anything else at this level.`,
    ],
  },
  {
    id: 2,
    title: "Piece Activity and Coordination",
    level: "800-1800",
    puzzle: {
      fen: "4k3/2p1p3/8/8/4PN2/8/8/4K3 w - - 0 1",
      instruction:
        "You're White. Your knight on f4 is doing nothing. Reroute it to the one square Black's pawns can never challenge.",
      solutions: ["Nd5"],
      success:
        "Nd5! A knight on a permanent outpost like this is worth far more than one stuck on the rim — this is piece activity in action.",
    },
    slides: [
      `A piece's value isn't fixed — it depends entirely on how active it is. A knight stuck on b1 behind its own pawns is nearly worthless; the same knight on d5, supported and impossible to kick away, can be worth more than a rook in practice. The single biggest jump in strength between a beginner and an intermediate player is learning to ask "where does this piece want to be?" instead of just "can this piece move here?"

Development isn't about moving pieces off the back rank quickly for its own sake — it's about moving them to squares where they influence the game. A knight developed to a3 or h3 "to get it out" but doing nothing there is barely better than leaving it at home.`,
      `Coordination means your pieces are working together rather than getting in each other's way. A very common pattern at the club level is a bishop and a rook pointed down the same file or diagonal, so that if the piece in front moves or gets traded, the piece behind immediately creates a threat. This is sometimes called a "battery."

Another coordination pattern is overprotection: putting an extra defender on a key square (like a strong knight outpost) even though it's already defended once, because that extra defender lets you use the first defender for something else, like a pin or a sacrifice, without losing the key square.`,
      {
        text: `Outposts are squares, usually in or near enemy territory, that can never be attacked by an enemy pawn because of the structure. A knight on an outpost square is exceptionally strong because knights, unlike bishops, don't lose value when the position is closed — in fact closed positions are exactly where knights shine, since there are fewer open lines for enemy bishops and rooks to challenge them.

To find outposts, look at the enemy pawn structure and ask: which squares in front of their camp can no longer ever be attacked by one of their pawns? Those squares are where you want your knights, and defending them is often worth several tempo of "slower" development.`,
        diagram: {
          fen: "4k3/2p1p3/8/3N4/4P3/8/8/4K3 w - - 0 1",
          caption:
            "A knight parked on d5, supported by the pawn on e4, can't be challenged by any black pawn — a textbook outpost that's often worth more than a rook once it's firmly established.",
          highlights: ["d5"],
        },
      },
      `Bishops want open diagonals and long-range targets. The "bad bishop" is a bishop blocked in by its own pawns of the same colour — for example a light-squared bishop behind a locked chain of your own light-squared pawns. Before you fix your pawn structure, think about whether you are locking in your own bishop permanently.

The bishop pair (keeping both bishops when the opponent has traded one of theirs away) is a known long-term asset, especially in open positions, because two bishops together can control squares of both colours and dominate an open board in a way a single bishop or a knight pair cannot.`,
      `Rooks are long-range pieces that need open files and ranks to show their strength — this is why "rooks belong on open files" is such common advice, and why rooks are usually the last pieces you activate, once some pawns and minor pieces have been traded or advanced. A rook on the seventh rank (for White) or second rank (for Black) attacking pawns from the side is one of the most powerful pieces on the board.

The queen is your most valuable and most mobile piece, but bringing her out too early, before your other pieces are developed, usually means she becomes a target for cheap tempo-gaining attacks from minor pieces and pawns. A good general guideline: develop knights and bishops first, castle, connect your rooks, and only then look for an active square for the queen unless there's a concrete tactical reason to bring her out sooner.`,
      `Practical exercise for this course: in your next five games, after move 10, pause and look at each of your own pieces one at a time. For each one, ask "is this piece doing something right now, or is it just sitting there?" If a piece has been passive for several moves, make a plan — in the next two or three moves — to give it a job: an open file, a diagonal, an outpost, or a direct threat.`,
    ],
  },
  {
    id: 3,
    title: "Basic Tactical Patterns",
    level: "800-1800",
    puzzle: {
      fen: "r3k3/8/8/1N6/8/8/8/4K3 w - - 0 1",
      instruction:
        "You're White. Find the knight move that hits the king and the rook at the same time.",
      solutions: ["Nc7+"],
      success:
        "Nc7+! A textbook fork — Black has to answer check first, and the rook on a8 falls right after.",
    },
    slides: [
      `Tactics are short sequences of forcing moves — checks, captures, and threats — that win material or deliver checkmate. Nearly every decisive game below 1800 is decided by a tactic, not by slow strategic outplay, which is why pattern recognition is the single highest-value skill you can train at this level.

The good news is that the vast majority of tactics are built from a small number of recurring building blocks: the pin, the fork, the skewer, the discovered attack, and the removal of the defender. Once you can spot these instantly, you'll start finding combinations that used to feel invisible.`,
      `A pin happens when a piece cannot move without exposing a more valuable piece (or the king) behind it to attack. An absolute pin is against the king and is completely illegal to break by moving the pinned piece — the pinned piece is, for the moment, as good as frozen. A relative pin is against a piece other than the king; moving the pinned piece is legal, but it costs material.

Pinned pieces are weak defenders — if a piece is pinned, treat it as if it isn't defending anything behind the pin line, because often it genuinely can't afford to capture. A very common winning pattern is "attack the piece that's already pinned" — pile on extra attackers against a pinned piece until it falls, since it often cannot be reinforced without breaking the pin.`,
      {
        text: `A fork is a single piece attacking two (or more) enemy pieces at once, so that the opponent cannot save both. Knights are the classic forking piece because of their unusual movement, but any piece can fork. The most common knight fork pattern beginners miss is the fork of the king and queen, or the king and a rook, especially on squares like c7, f7, e6, or d6 against an uncastled king.

When you're looking for forks, scan for squares where one of your pieces would attack two valuable enemy pieces simultaneously, and then check: can that square be reached in one move, and is it actually safe to land on (not defended by a pawn or piece)?`,
        diagram: {
          fen: "r3k3/2N5/8/8/8/8/8/4K3 b - - 0 1",
          caption:
            "Nc7+ forks the king on e8 and the rook on a8. Black has to deal with the check first — then the rook simply falls.",
          highlights: ["c7", "a8", "e8"],
        },
      },
      `A skewer is like a reversed pin: it's a single attacking move along a rank, file, or diagonal that threatens two enemy pieces lined up behind each other, where the more valuable piece is in front. If the front piece moves away, the piece behind is now hit. Skewers are especially common in rook and queen endgames, where lining up the enemy king and a pawn (or the enemy king and a rook) on the same rank or file can win material outright.`,
      `A discovered attack happens when you move one piece out of the way, revealing an attack from a different piece that was hidden behind it. Discovered checks are the most dangerous version — because check is forced to be dealt with immediately, you often get a completely free extra move to do damage with the piece that moved, since the opponent's entire attention goes to escaping check.

To find discovered attacks, look at your own pieces that are on the same line (rank, file, or diagonal) as an enemy king or valuable piece, with one of your own pieces in between. Ask: if I move my piece in the middle somewhere useful, does the piece behind it suddenly attack something big?`,
      `Removing the defender (also called "elimination of the guard") means capturing or deflecting the one piece that's protecting a key square or piece, so that a follow-up capture becomes winning. It's less flashy than a fork or a pin, but it's extremely common in practical games: before taking on a square, always check who defends it, and consider whether you can remove that defender first, even at a small material cost, if the follow-up wins more back.

Final practice habit for this course: in every position before you move, spend five seconds scanning for checks, captures, and threats — in that order — for both yourself and your opponent. This simple routine, done consistently, is one of the most reliable ways to stop missing one-move tactics and to start finding your own.`,
    ],
  },
  {
    id: 4,
    title: "Pins, Skewers and Discovered Attacks in Practice",
    level: "800-1800",
    puzzle: {
      fen: "4k3/8/2n5/8/8/3B4/8/4K3 w - - 0 1",
      instruction:
        "You're White. Place your bishop so the knight on c6 can't move without exposing the king on e8 behind it.",
      solutions: ["Bb5"],
      success:
        "Bb5! The knight on c6 is now pinned to the king — treat it as frozen and start piling up attackers on it.",
    },
    slides: [
      `Course 3 introduced pins, skewers and discovered attacks as isolated patterns. This course is about actually finding them over the board, in the middle of a normal, messy position where nothing is labeled for you. The patterns themselves are simple; the hard part is training your eyes to notice when the position allows one.

The first habit to build is noticing alignment. Any time three pieces — yours or your opponent's — sit on the same rank, file, or diagonal, with at most one piece in between, that's a line worth a second look. It doesn't matter whether the pieces look unrelated at first glance; if they're lined up, a pin, skewer, or discovered attack might be hiding there.`,
      {
        text: `Let's work through a pin in practice. Say your opponent's king is on g8, their rook sits on f8, and your bishop is on a diagonal that could reach a square attacking the f8 rook with the king right behind it. Even if the rook looks "defended enough" by other pieces, a pin changes the maths: the rook can no longer move to block or escape without exposing check, so now you can bring a second attacker — a knight hop, a doubled rook, a queen — to win it outright, because it's effectively frozen.

This is why strong players often play seemingly "slow" pinning moves before the real attack begins: the pin itself does no damage, but it removes one of the opponent's defenders from the game for several moves, which is often worth more than winning a pawn immediately.`,
        diagram: {
          fen: "4k3/8/2n5/1B6/8/8/8/4K3 w - - 0 1",
          caption:
            "A relative pin: the knight on c6 can't step aside without exposing the king on e8 behind it — treat it as frozen until the pin is broken.",
          highlights: ["b5", "c6", "e8"],
        },
      },
      `Skewers show up constantly in rook endgames, and recognizing them early can save or win games that otherwise look drawn or lost. A simple example: your opponent's king and an undefended pawn are on the same file, your king is far away, but your rook can swing onto that file from the side. One move, and you're threatening to win the pawn no matter what they do, because moving the king off the file (the natural response to a check) simply exposes the pawn behind it.

Train yourself to check files and ranks for enemy king + enemy piece combinations whenever rooks are still on the board — this single scan catches an enormous number of tactics that otherwise look like nothing is happening.`,
      `Discovered attacks reward you for looking at your own pieces, not just the opponent's. Ask: which of my pieces, if it moved out of the way, would reveal an attack from a piece behind it? This is a completely different scanning direction from most beginners' instincts, which focus entirely on what the opponent threatens.

A discovered check is the strongest version of this idea because it comes with forced tempo: the opponent must respond to check before doing anything else, even if the moving piece itself is just hopping to a square that also wins material or sets up mate. Look specifically for your own knight, bishop, or rook sitting between your other long-range piece and the enemy king — that's the signature shape of a discovered check waiting to happen.`,
      `A practical routine for this course: in every one of your games this week, before you play any "normal" developing or improving move, spend five seconds checking for alignment — three pieces on a line, yours or theirs. If you find one, work out whether moving the front piece, attacking the pinned piece, or threatening a discovery wins something. Most of the time nothing is there yet. But when it is, this routine is what turns an invisible tactic into an obvious one.`,
    ],
  },
  {
    id: 5,
    title: "Forks and Double Attacks",
    level: "800-1800",
    puzzle: {
      fen: "2q1k3/8/8/1N6/8/8/8/4K3 w - - 0 1",
      instruction:
        "You're White. Jump your knight to the classic fork square that hits both the king on e8 and the queen on c8.",
      solutions: ["Nd6+"],
      success:
        "Nd6+! King and queen forked at once — this is exactly the 'c7/d6/e6/f7' fork pattern this course trains you to spot.",
    },
    slides: [
      `A fork wins material because the opponent only gets one move per turn, and a fork presents them with two problems that both need solving right now. The defending side is forced to choose which piece to save, and whichever one they pick, the other one falls. This course goes deeper than "knights fork well" — it's about training a systematic scan for every piece's forking potential, not just the knight's.

Knights fork because of their unusual movement: a knight attacks up to eight squares that are often completely unrelated to each other visually, which makes knight forks the hardest pattern for the human eye to spot and the most commonly missed tactic at the club level, in both directions — missed as opportunities and walked into as blunders.`,
      {
        text: `The classic knight fork targets are the king and queen, the king and a rook, or two undefended minor pieces. Certain squares near an uncastled king are fork hotspots precisely because the king hasn't tucked away yet: c7, d6, e6 and f7 (and their mirror squares c2, d3, e3, f2) show up again and again in games below 1800, especially against opponents who delay castling.

Whenever you see an opponent's king still on its home square after move eight or so, specifically check whether any of your knights can jump to one of these squares safely. "Safely" matters — a fork that gets captured for free isn't a fork, it's a blunder, so always check what defends the landing square before committing.`,
        diagram: {
          fen: "2q1k3/8/3N4/8/8/8/8/4K3 b - - 0 1",
          caption:
            "Nd6 forks the king on e8 and the queen on c8 — the classic 'c7/d6/e6/f7' fork family against a king that never castled.",
          highlights: ["d6", "e8", "c8"],
        },
      },
      `Double attacks aren't limited to a single piece hitting two targets — a move can also create two separate threats at once that the opponent can't both answer. A queen move that simultaneously threatens checkmate and attacks an undefended rook is a double attack even though the queen itself only "forks" in the loose sense. The unifying idea behind every fork and double attack is the same: find a move that creates more than one problem, because one move can only solve one problem.`,
      `A pawn can fork too, and pawn forks are routinely missed because pawns look passive. If an enemy knight and bishop sit on adjacent squares one rank apart in a way a single pawn push would attack both, that's a pawn fork, and it's often completely free because nobody expects a pawn to be the attacking piece. Scanning for these takes discipline: look at every pawn push you're considering and ask not just "is this safe" but "does this also attack something."`,
      `To practice, take any five of your recent games (win or lose) and go through them move by move looking only for missed forks — yours and your opponent's. You'll almost always find at least one knight fork that was available and unplayed. This kind of after-the-fact hunting trains the exact pattern recognition you need in real time, because you're forcing your brain to notice the shape once it already knows where to look, which makes it much faster to notice next time before the game is over.`,
    ],
  },
  {
    id: 6,
    title: "Sacrifices and Attacking the King",
    level: "800-1800",
    puzzle: {
      fen: "6k1/6pp/8/8/8/3B4/8/4K3 w - - 0 1",
      instruction:
        "You're White. Rip open the king's shelter with the classic sacrifice on h7.",
      solutions: ["Bxh7+"],
      success:
        "Bxh7+! The classical Greek-gift sacrifice — once the pawn shelter is gone, the queen and a knight can pour in behind it.",
    },
    slides: [
      `A sacrifice is giving up material on purpose because what you get in return — a checkmate, a decisive attack, or overwhelming compensation — is worth more than the material. The biggest mental shift at this stage of chess is realizing that material is a means to an end (winning the game), not the goal itself. A queen is worth roughly nine points in the textbooks, but a king that's about to be checkmated is worth everything, and no amount of material saves you from that.

This doesn't mean sacrifice recklessly. Every sound sacrifice should come with a concrete follow-up you can calculate, not just a hope that "something will turn up." The difference between a brilliant sacrifice and a game-losing blunder is often just whether you checked the forcing lines all the way to the end before playing it.`,
      `The classic attacking pattern against an uncastled or weakly defended king is to open lines toward it, even at a material cost. A common example is sacrificing a knight or bishop to rip open the f-file, h-file, or a key diagonal, so that your rook or queen can deliver check after check while the opponent's king has nowhere safe to run. Before any sacrifice like this, count the number of attackers you have aimed at the king's area versus the number of real defenders — if you're significantly ahead on attackers, the sacrifice is usually at least worth serious calculation.`,
      {
        text: `One of the most common and learnable sacrifices is giving up a bishop or knight to remove a key defensive pawn in front of the castled king — for example, sacrificing on h7 or h2 to rip open the king's shelter. This works because, once that pawn is gone, your queen and any other piece aimed at that diagonal or file suddenly have a direct path to the king, and the opponent's own pieces are often too far away or too poorly placed to plug the hole in time.`,
        diagram: {
          fen: "6k1/6pp/8/8/8/3B4/8/4K3 w - - 0 1",
          caption:
            "The classical Bxh7+ sacrifice: the bishop on d3 already eyes h7 — once it takes, the queen and a knight join in to rip open the king's shelter.",
          highlights: ["d3", "h7", "g8"],
        },
      },
      `When you're on the receiving end of a sacrifice, the single most important skill is staying calm and calculating rather than panicking and grabbing the free material automatically. Before taking a sacrificed piece, always ask: what did they open up by giving me this, and can I survive what comes next? Sometimes declining a "free" piece and consolidating is the correct defense, because taking it walks straight into the mating net it was designed to create.`,
      `Attacking the king isn't only about sacrifices — it's about bringing enough pieces into the fight. A single piece almost never delivers checkmate alone against a well-defended king; you typically need at least two or three coordinated attackers. Before launching an attack, do a quick headcount: how many of my pieces can actually reach the king's area in the next few moves, and how many defenders does my opponent have there? If the numbers favor you, it's time to look for forcing moves — checks, captures, and threats — in that order, every single move, until the attack either breaks through or runs out of fuel.`,
      `Practical exercise: next time you're clearly ahead on development and your opponent's king is stuck in the center or hasn't castled, resist the urge to "just develop one more piece." Instead, actively look for a way to sacrifice something to rip the position open right now. You'll be wrong sometimes — that's normal and part of learning where the real threshold is — but you'll also start finding attacks you would have missed by playing it safe every single time.`,
    ],
  },
  {
    id: 7,
    title: "Building an Attack",
    level: "800-1800",
    puzzle: {
      fen: "6k1/5ppp/8/8/8/8/8/4KR2 w - - 0 1",
      instruction:
        "You're White. Before anything forcing, bring your rook into the attack on the fourth rank.",
      solutions: ["Rf4"],
      success:
        "Rf4! A rook lift — a quiet, patient move that brings a fresh attacker into range before you force anything.",
    },
    slides: [
      `Course 6 looked at sacrifices as a single decisive moment. This course is about the groundwork that comes before that moment — how a real attack is actually assembled, move by move, rather than appearing out of nowhere. Most attacks that succeed below 1800 aren't the result of one brilliant idea; they're the result of a player quietly improving their pieces' attacking potential for five or six moves before anything forcing happens at all.

The first question to ask before starting any attack is simple: where is the enemy king, and which pieces of mine can realistically reach that area? If the honest answer is "none of them, not for a while," then starting with checks and sacrifices is premature — you need to spend a few moves repositioning first. Patience here is not passive; it's the actual work of attacking.`,
      `A good attack usually needs three ingredients: a target (the king, or a weak square near it), a way in (an open file, diagonal, or weakened pawn structure near that target), and enough attackers (pieces that can actually reach the target through that way in). If any one of these three is missing, forcing moves tend to fail or simply trade pieces without producing real damage.

Identifying the "way in" is often the most overlooked step. Look at the pawns directly in front of the enemy king. Are any of them already moved, creating a hole? Is there a half-open file pointed at the king already, or could one be created with a timely pawn break or a well-placed trade? Strong attacking players treat this question as seriously as any other part of their plan — the attack is built around the hole, not the other way around.`,
      {
        text: `Once you've identified the target and the way in, the next job is bringing attackers to the right squares before you commit to anything forcing. This usually means repositioning a knight toward the kingside, swinging a rook to an open file, or maneuvering the queen to a diagonal that bears on the target — all without giving your opponent time to patch the hole or trade off your attackers.

A useful habit is counting attackers versus defenders near the target square before every forcing move. If you have three pieces that can reach the king's area and your opponent only has two real defenders there (pieces that aren't doing something else more important), the math favors a breakthrough. If it's even or in your opponent's favor, it usually pays to bring one more piece into the attack before forcing anything.`,
        diagram: {
          fen: "6k1/5ppp/8/8/5R2/8/8/4K3 w - - 0 1",
          caption:
            "A rook lift to f4: bringing a fresh attacker onto the open f-file before committing to anything forcing against the king on g8.",
          highlights: ["f4", "g8"],
        },
      },
      `Tempo matters enormously once an attack starts. Every move you spend on something that doesn't add a threat is a free move for your opponent to defend, trade off an attacker, or counterattack. This is why, once the attack is truly underway, players look almost exclusively for checks, captures, and real threats — "quiet" improving moves belong to the buildup phase, not the execution phase.

A common mistake at this level is switching too early from buildup to execution — throwing in a sacrifice or a forcing sequence before enough attackers have arrived, out of excitement or impatience. The fix is almost mechanical: before any forcing move, re-ask the attacker-versus-defender question from the previous slide. If the numbers aren't there yet, spend one more move improving your worst-placed piece instead.`,
      `Attacks also need a secondary target. If your first idea gets defended accurately, a strong attacker already has a follow-up threat ready — a different weak square, a pawn lever, or a piece that's now overloaded trying to defend two things at once. Before committing to your main idea, briefly scan for a second weakness in the opponent's camp. Even if you never need it, knowing it's there changes how confidently and quickly you can play the critical moves.`,
      `Practical exercise for this course: in your next several games, the moment you notice your opponent's king is even slightly exposed, stop and explicitly answer three questions out loud or on paper: what's my target, what's my way in, and how many real attackers do I have versus real defenders they have? Doing this consciously, even slowly, trains the exact judgment that strong attacking players eventually do automatically and instantly.`,
    ],
  },
  {
    id: 8,
    title: "Defending Difficult Positions",
    level: "800-1800",
    puzzle: {
      fen: "6k1/3n2pp/8/7Q/8/8/8/4K3 b - - 0 1",
      instruction:
        "You're Black, under attack from the queen on h5. Find the knight move that blocks the diagonal and defends your king.",
      solutions: ["Nf6"],
      success:
        "Nf6! A single move that blockades the long diagonal and covers g8/h7 at once — exactly the kind of defensive resource this course is about.",
    },
    slides: [
      `Defense is the least glamorous skill in chess and also one of the most valuable, because games below 1800 are won and lost constantly on whether the defender keeps their composure or collapses under pressure. The single biggest defensive mistake at this level isn't a bad move — it's panic, which leads to rushed moves that make the position worse than careful calculation would have.

The first defensive habit to build is slowing down the moment you sense danger, rather than speeding up. When you feel your position getting uncomfortable, that feeling is useful information: it's telling you to spend extra time, not less, on your next move. Fast, anxious moves under pressure are how small disadvantages turn into lost games.`,
      `When facing a direct attack, the most important question is not "how do I get my pieces to safety" but "what is actually being threatened, concretely, right now?" Many defenders retreat or trade pieces reflexively without first identifying the real threat, which sometimes means they defend against an imaginary danger while a real one goes unnoticed, or they give up material or position unnecessarily against a threat that wasn't actually dangerous.

A reliable method is to assume it's your opponent's turn twice in a row (ignore your own move for a second) and ask what their best follow-up would be if you did nothing at all. That tells you the real threat. Only once you know exactly what you're defending against should you look for the most efficient way to neutralize it — often there are several defenses, and the cheapest one (in terms of material or position) is usually best.`,
      {
        text: `Trading pieces is one of the defender's best tools, especially against an attack, because fewer pieces on the board generally means fewer attackers available and a calmer position overall. If you're under pressure and a reasonable trade is available — especially trading off one of the opponent's most active attacking pieces — take it, even if it feels slightly passive. A simplified position with material equal is almost always better for the side under attack than a complicated one with extra tension still on the board.

The exception is trading pieces that are actually defending you. Before any trade under pressure, briefly check whether the piece you're giving up was doing important defensive work — guarding a key square, blocking a file, or covering an escape square for your king — because trading away your own best defender can accelerate your opponent's attack instead of slowing it down.`,
        diagram: {
          fen: "6k1/6pp/5n2/7Q/8/8/8/4K3 b - - 0 1",
          caption:
            "Nf6 blockades the long diagonal and covers g8/h7 at once — a classic defensive resource that neutralizes a queen attack without giving up material.",
          highlights: ["f6", "h5", "g8"],
        },
      },
      `Counterattack is often the best defense, particularly if your opponent has overextended their attacking pieces or weakened their own king to launch the assault. If, while calculating your opponent's threats, you notice their king or back rank has also become vulnerable, don't assume you're purely on the defensive — look seriously at whether a well-timed counter-threat of your own forces them to abandon their attack to deal with yours instead.

This requires discipline: you must still fully calculate that your own king survives the attack long enough for the counterattack to land. A counterattack that arrives one move too late, after you've already been checkmated, isn't a counterattack — it's a miscalculation. When in doubt, prioritize king safety first and look for the counterattack second.`,
      `Accepting a slightly worse position to survive is a skill in itself. Many players below 1800 would rather go down fighting in a lost attacking position than accept a cramped, passive, but objectively safer continuation. Strong defenders set their ego aside: if the choice is between a position that's unpleasant but holds, and one that's more "active" but loses, take the position that holds every single time. Chess rewards results, not how exciting the position looked along the way.`,
      `Practical exercise for this course: the next time you feel attacked, force yourself to pause for at least thirty extra seconds before moving, and explicitly identify the real threat (using the "assume two moves in a row" trick) before choosing your defense. Track how often your first instinctive reaction matches your considered one — most players find a meaningful gap, and closing that gap is exactly what this course is meant to train.`,
    ],
  },
  {
    id: 9,
    title: "Converting a Winning Position",
    level: "800-1800",
    puzzle: {
      fen: "1r2k3/8/8/8/8/8/8/1R2K3 w - - 0 1",
      instruction:
        "You're White, already up a piece elsewhere. Simplify the position by trading rooks — the simple, safe technique.",
      solutions: ["Rxb8+"],
      success:
        "Rxb8+! Trading down when you're ahead removes your opponent's practical chances — simple and correct, exactly how you convert.",
    },
    slides: [
      `Being winning and actually winning are two different skills, and the gap between them accounts for an enormous number of missed opportunities below 1800. A player can play a nearly perfect game for thirty moves, reach a completely winning position, and still lose or draw simply because converting an advantage requires a different mindset than creating one.

The most common way winning positions get thrown away is impatience: trying to finish the game immediately with a flashy tactic instead of calmly increasing the advantage. Once you're clearly winning — up significant material, or with a decisive attack — the pressure is entirely on your opponent to create complications. Your job is to avoid giving them any, not to manufacture excitement of your own.`,
      {
        text: `A core converting principle is to simplify when ahead in material. Trading pieces (not pawns, necessarily — pieces) reduces your opponent's practical chances for tricks, swindles, and complications, while your material advantage becomes proportionally larger as fewer pieces remain on the board. If you're up a piece and a reasonable trade is on offer, take it almost by default, unless there's a clear reason the resulting position favors your opponent specifically.

The reverse habit — avoiding trades when ahead in a dangerous or unclear position — is also useful for keeping an attack alive if your advantage is positional or dynamic rather than purely material. Know which kind of advantage you're converting: material advantages like simplification; dynamic or attacking advantages often want the opposite, keeping tension and pieces on the board while the initiative is still yours.`,
        diagram: {
          fen: "4k3/1R6/3P4/3K4/8/8/8/8 b - - 0 1",
          caption:
            "A simple technical win: king and rook escort the passed pawn home. Keep it this simple rather than hunting for a flashier finish.",
          highlights: ["d6", "d5", "b7"],
        },
      },
      `When you're winning, avoid unnecessary risk. This sounds obvious, but in practice it means resisting the temptation to play the "prettiest" winning move when a slower, completely safe one also wins. If you can see two paths to victory and one of them requires precise, forced calculation while the other is simple and nearly impossible to mess up, take the simple one. Beauty points don't exist in a rating system; results do.

This also applies to time pressure. If you're winning comfortably and short on the clock, don't gamble the position away chasing the fastest finish. Make solid, safe moves that don't give your opponent any chances, even if it takes five extra moves longer than the "best" continuation would have.`,
      `Technique matters as much as evaluation. Many winning positions require specific, learnable techniques to finish cleanly — promoting a pawn, trading down into a simple winning endgame, or executing a known mating pattern. This is one of the strongest arguments for studying basic endgame technique even if you consider yourself a tactical or attacking player: the position you worked thirty moves to reach is worthless if you don't know how to close it out in the final five.

A related idea is the "two weaknesses" principle from classical strategy: if your opponent manages to hold one weakness you're pressing, look for a second one elsewhere on the board rather than banging your head against the same spot. Winning positions often convert not through one knockout blow but by piling up small, cumulative pressure until the defense simply can't cover everything at once.`,
      `Psychologically, converting requires treating the position on its own merits move by move, rather than coasting on the feeling of "I'm winning, so I can relax." Many lost "winning" games happen because the winning side stops calculating carefully exactly when precision matters most. Stay as alert in a winning position as you were in a tense, unclear one — arguably more so, because there's more to lose.`,
      `Practical exercise for this course: the next time you reach a clearly winning position, consciously slow down rather than speed up. Ask yourself after every move: does this simplify the position, avoid unnecessary risk, and move me toward a technique I actually know how to execute? If the answer to all three is yes, you're converting correctly, even if it doesn't feel as exciting as going for the quickest possible finish.`,
    ],
  },
  {
    id: 10,
    title: "Rook Endgames",
    level: "800-1800",
    puzzle: {
      fen: "4k2r/8/4P3/8/8/8/2K5/R7 w - - 0 1",
      instruction:
        "You're White, pushing the pawn on e6. Put your rook where rook endgame theory says it belongs relative to your own passed pawn.",
      solutions: ["Re1"],
      success:
        "Re1! The rook belongs behind its own passed pawn, pushing it forward while staying protected — one of the most reliable rules in rook endgames.",
    },
    slides: [
      `Rook endgames are the single most common type of endgame in practical chess, and they have a reputation for being drawn more often than their material difference would suggest — a famous saying is that "all rook endgames are drawn," which isn't literally true but captures how resilient the defending side often is. Understanding a handful of core techniques here will save and win you more games than almost any other single area of endgame study.

The most important general principle in rook endgames is rook activity. An active rook — one that's behind a passed pawn, on an open file, or cutting off the enemy king — is worth significantly more than a passive one tied down to defending a weak pawn. When choosing between two rook moves, almost always prefer the one that activates your rook, even at the cost of a pawn in some cases.`,
      `The "rook behind the passed pawn" principle applies to both sides. If you have a passed pawn, your rook belongs behind it (on the same file, further from the promotion square), pushing it forward while staying protected. If you're defending against a passed pawn, your rook belongs in front of it or cutting across its path, not behind it — a rook behind an enemy passed pawn does nothing to stop its advance and can even get trapped there.

This single rule resolves a surprising number of rook endgame decisions that otherwise feel like guesswork: whenever a passed pawn exists or is about to be created, immediately ask where your rook and your opponent's rook belong relative to it, and head there before doing anything else.`,
      {
        text: `The Lucena position is the single most important technique to memorize in all of rook endgames: it's the winning method for rook and pawn versus rook when your king and pawn are one step from promoting and the enemy king is cut off on the wrong side. The technique involves "building a bridge" with your rook to shield your king from checks while the pawn promotes. It's worth studying this exact position on a real board until the move order is automatic, because it comes up constantly and winning it is purely mechanical once you know it.

The Philidor position is the matching defensive technique: it's how the defending side holds a draw in rook and pawn endgames by keeping their rook on the third or sixth rank (whichever is appropriate) until the pawn advances too far, then switching to checks from behind. Like the Lucena, this is less about understanding and more about memorizing the exact setup and triggers.`,
        diagram: {
          fen: "k7/4PK2/8/8/1R6/8/7r/8 w - - 0 1",
          caption:
            "A Lucena-style position: the pawn is one step from queening and Black's king is cut off, far from the action. White's rook heads to the fourth rank to 'build a bridge' and shield the king from checks.",
          highlights: ["e7", "f7", "b4"],
        },
      },
      `Checking distance is a concept specific to rook endgames with kings on opposite sides of a pawn: the defending king needs enough squares between itself and the attacking king to keep delivering checks without being driven away or blocked. When defending a difficult rook endgame, actively count the files or ranks between the kings before committing to a plan — too little checking distance and a seemingly drawn position can actually be lost.`,
      `Cutting off the enemy king is a recurring theme: a rook placed on a file or rank between the two kings restricts the enemy king's ability to support its own pawns or approach yours. When you're unsure what to do in a rook endgame, look first for a move that improves your king's activity or restricts your opponent's king — these endgames are frequently decided by whose king gets to participate more, not by some hidden tactic.`,
      `Practical exercise for this course: set up the Lucena position (white king on e7, pawn on e... actually any version with rook and pawn one step from promotion, enemy king cut off) on a real or digital board and practice the bridge technique from scratch until you can execute it without looking it up. Then do the same with the Philidor defensive setup. These two techniques alone resolve a huge fraction of real rook endgames you'll face.`,
    ],
  },
  {
    id: 11,
    title: "Pawn Endgames",
    level: "800-1800",
    puzzle: {
      fen: "4k3/8/8/3K4/4P3/8/8/8 w - - 0 1",
      instruction:
        "You're White. Your pawn is on e4. Move your king to a key square for that pawn.",
      solutions: ["Ke6"],
      success:
        "Ke6! That's a key square for the pawn on e4 — reach a key square first and the pawn's promotion becomes essentially automatic.",
    },
    slides: [
      {
        text: `Pawn endgames look simple — often just kings and a handful of pawns — but they're deceptively precise, and a single tempo can be the entire difference between a win, a draw, and a loss. Because there are no pieces left to create tactical distractions, pawn endgames reward exact calculation and a handful of memorized rules more than almost any other phase of the game.

The single most important concept here is the king and pawn versus king endgame, and within it, the idea of the "key squares" — specific squares that, if the attacking king reaches them, guarantee the pawn promotes, and if the defending king reaches them first, guarantee a draw. Rather than memorizing every position, learn to find key squares quickly: for a pawn that isn't a rook pawn, they sit two ranks ahead of the pawn, one square to either side and directly in front of it.`,
        diagram: {
          fen: "4k3/8/4K3/8/4P3/8/8/8 w - - 0 1",
          caption:
            "White's king stands on e6 — a key square for the pawn on e4 (two ranks ahead, directly in front). Reaching a key square first decides king-and-pawn endgames.",
          highlights: ["e6", "e4"],
        },
      },
      `Opposition is the core technique for maneuvering kings in pawn endgames. When the two kings face each other with an odd number of squares between them on the same file, rank, or diagonal, whoever is NOT required to move has "the opposition" — a real advantage, because the side forced to move must give ground. Learning to count squares and figure out who has, or can gain, the opposition is fundamental to playing these endgames correctly rather than by feel.

A related and very practical trick is the "triangulation" maneuver: when you have the move but need your opponent to be the one to move instead (to hand them the obligation to give ground), you can sometimes maneuver your own king in a small triangle, losing a tempo on purpose, to reach the same square but with your opponent now on the move. This feels like a paradox the first time you see it, but it's a completely standard, learnable technique.`,
      `The rule of the square is a quick way to check if an unopposed passed pawn can be stopped by the enemy king: draw a square from the pawn to the promotion square and out to the same file distance away; if the defending king can step inside that square on its move, it catches the pawn, and if it can't, the pawn runs home untouched. This calculation takes seconds once practiced and avoids a lot of unnecessary deep calculation in races between a passed pawn and a king.`,
      `Outside passed pawns — a passed pawn on a file far from the action, away from the rest of the pawns — are extremely valuable in pawn endgames because they can tie down the enemy king permanently (since it must stay nearby to stop the pawn from running), freeing your own king to go eat the rest of the opponent's pawns on the other side of the board undisturbed. When trading down into a pawn endgame, actively calculate whether you'll end up with an outside passed pawn — it's often winning on its own even in material-equal positions.`,
      `Pawn majorities and pawn breaks matter even with few pawns left. A pawn majority on one side of the board (more pawns than your opponent in that sector) can often generate a passed pawn through a well-timed break, even against accurate defense, simply by force of numbers. Counting pawns on each side of the board — kingside versus queenside — before entering an endgame tells you where a passed pawn is likely to appear later, and planning around that in advance is a mark of strong endgame play.`,
      `Practical exercise for this course: practice the basic king and pawn versus king endgame from several different starting positions until identifying key squares and the opposition becomes instant. Then take any game of yours that reached a pawn endgame and check, move by move with an engine or a tablebase if you have access to one, whether you found the objectively correct moves — pawn endgames are one of the few areas where "almost right" is very often simply wrong.`,
    ],
  },
  {
    id: 12,
    title: "Minor Piece Endgames",
    level: "800-1800",
    puzzle: {
      fen: "2b1k3/8/8/8/1N6/8/8/4K3 w - - 0 1",
      instruction:
        "You're White. Black's bishop on c8 is boxed in by its own pawns. Post your knight on the strongest central square available.",
      solutions: ["Nd5"],
      success:
        "Nd5! A knight that dominates both colors of squares against a bishop that's stuck staring at its own pawns — same material, very different pieces.",
    },
    slides: [
      `Minor piece endgames — those involving knights and bishops, with or without a few pawns — are where the long-term differences between knights and bishops become most visible. A piece that was roughly equal to its counterpart in the middlegame can become clearly better or worse once the position simplifies, and understanding why is central to playing these endgames well.

Bishops generally outperform knights in open positions with pawns on both sides of the board, because their long range lets them influence both flanks at once, while a knight needs several moves to travel the same distance. Knights generally outperform bishops in closed or one-sided positions, especially when they have a strong, permanent outpost that a bishop of the wrong color can never challenge.`,
      {
        text: `The bishop versus knight endgame with pawns on the board often comes down to the pawn structure. If pawns exist on both wings, favor trading toward a position where you keep the bishop; if the position is blocked with pawns fixed on one color of squares, favor keeping the knight, since it can jump over the resulting blockade while a same-colored bishop is stuck staring at its own pawns.

A particularly instructive case is the "bad bishop" endgame, where one side's bishop is permanently blocked by its own pawn chain on the same color of squares. Even with material completely equal, this can be a long-term losing endgame, because the good knight can maneuver freely on both colors while the bad bishop is effectively reduced to defending a handful of fixed squares.`,
        diagram: {
          fen: "4k3/8/8/3n4/8/4P3/1P1P4/2B1K3 w - - 0 1",
          caption:
            "White's bishop is boxed in by its own pawns — a 'bad bishop' — while Black's knight sits on an untouchable outpost on d5. Equal material, very different pieces.",
          highlights: ["c1", "d5"],
        },
      },
      `Same-colored bishop endgames (bishop versus bishop, both on the same diagonal color) tend to be more drawish than knight endgames at equal material, because a well-placed bishop can often blockade a passed pawn from a distance that a knight would need several moves to match. Opposite-colored bishop endgames are a completely different story and are notoriously difficult to defend if you're down material, because the defending bishop frequently cannot even contest the squares the attacking pawns are running on.`,
      `Knight endgames without other pieces are often more tactical than they first appear, because knights can create unexpected forks even in simplified positions, and a single careless king or pawn move can run straight into one. Before advancing a pawn in a knight endgame, always check whether the resulting position opens up a fork against your king or a key pawn — knights punish carelessness in endgames just as viciously as they do in the middlegame.`,
      `Two minor pieces versus a rook, or minor piece versus pawns in a race, are common practical scenarios that reward calculation over general principles. In these mixed-material endgames, concrete calculation of forced sequences (checks, captures, promotions) usually matters more than abstract piece values — treat these as calculation exercises first, and only fall back on general principles once you've confirmed there's no forced win or loss hiding in the position.`,
      `Practical exercise for this course: take a position from one of your own games where minor pieces were traded down to a simple structure, and before checking an engine, decide for yourself which side's minor piece was "better" and why, using the open-versus-closed, good-bishop-versus-bad-bishop framework from this course. Then verify with analysis. Doing this repeatedly builds the structural intuition that lets you choose the right pieces to keep well before the endgame actually arrives.`,
    ],
  },
  {
    id: 13,
    title: "Queen Endgames",
    level: "800-1800",
    puzzle: {
      fen: "6k1/6p1/7p/8/8/8/8/3QK3 w - - 0 1",
      instruction:
        "You're White. Deliver a central check along the long diagonal to start harassing the king on g8.",
      solutions: ["Qd5+"],
      success:
        "Qd5+! With open diagonals and no blockers, a queen can generate checks like this almost indefinitely — the core practical resource in queen endgames.",
    },
    slides: [
      {
        text: `Queen endgames — whether queen versus queen, queen and pawns versus queen and pawns, or a lone queen against pawns — are known for being sharp, drawish more often than material differences suggest, and full of perpetual check possibilities that can rescue an objectively losing side. The queen's enormous mobility means both sides usually have active resources available even when one side is materially ahead.

The most important practical skill in queen endgames is recognizing and either creating or avoiding perpetual check. If you're losing and your opponent's king isn't fully safe, actively search for a sequence of checks that repeats the position — this is a completely legitimate and common way to salvage a draw from an otherwise lost position. If you're winning, the opposite discipline applies: before pushing for more, make sure your own king has a genuinely safe escape from any checking sequence your opponent might generate.`,
        diagram: {
          fen: "6k1/6p1/7p/7Q/8/8/8/4K3 b - - 0 1",
          caption:
            "With open diagonals and no blockers, a lone queen can often generate perpetual check — the single most important practical resource in queen endgames when you're down material.",
          highlights: ["h5", "g8"],
        },
      },
      `Queen and pawn versus queen endgames are notoriously difficult to win even with an extra pawn, because the defending queen alone can often generate enough checks to prevent the pawn from promoting, especially if the attacking king is still exposed. The attacking side's job is usually to shepherd the king to a genuinely safe square first, shielding it from checks, before trying to push the pawn home — pushing the pawn too early, before the king is safe, frequently throws away the win.`,
      `Because queens can generate threats on both sides of the board simultaneously, king safety matters even more in queen endgames than elsewhere. A king that looks "fine" in a quieter position can suddenly face a mating net or a perpetual check the moment queens are the only major pieces left, simply because nothing is blocking the queen's path anymore. Before trading down into a queen endgame, specifically evaluate whether your own king will have a safe square to hide, not just whether you're materially ahead.`,
      `Material imbalances are common in queen endgames — queen versus two rooks, queen versus rook and minor piece, and so on — and these tend to reward activity and coordination over raw material count. A queen alone is often at least equal to a rook and a minor piece if the queen's side has active play and a safer king, because the queen's flexibility compensates for the missing material. Evaluate these positions by king safety and piece activity first, material count second.`,
      `Stalemate tricks are especially dangerous in queen endgames because a lone queen trying to deliver checkmate against a bare king can accidentally remove the king's only legal moves without it being in check, drawing a position that should have been an easy win. Before any final mating sequence with just a king and queen, double-check that your checking move doesn't also strip away every other legal move for the enemy king — this single oversight has thrown away more "trivially winning" queen endgames than almost any other mistake.`,
      `Practical exercise for this course: practice checkmating a lone king with king and queen against king from several random starting positions, paying specific attention to avoiding stalemate, until it's completely automatic. Then study a few perpetual-check draws from real games to recognize the pattern of a king with no safe square, so you can both create and avoid this resource when it matters.`,
    ],
  },
  {
    id: 14,
    title: "Opening Principles",
    level: "800-1800",
    puzzle: {
      fen: "4k2r/5pp1/8/8/8/8/5PP1/4K2R w K - 0 1",
      instruction:
        "You're White. Nothing forcing is happening — follow the classical opening checklist and get your king to safety.",
      solutions: ["O-O"],
      success:
        "O-O! Castling early removes an entire category of danger from your position — exactly the principle this course opens with.",
    },
    slides: [
      `You've already learned specific openings in the Openings section of this site — this course is about the underlying principles that apply no matter which opening you choose, so that you can make good decisions even in lines you've never specifically studied. Memorized moves run out eventually; principles don't.

The classical opening goals, in roughly this order of priority, are: control the center, develop your pieces toward active squares, get your king to safety through castling, and connect your rooks. These aren't rigid rules to follow blindly move by move, but a checklist to measure your position against — if you're consistently achieving these faster or better than your opponent, you're probably doing well in the opening regardless of which exact moves got you there.`,
      {
        text: `Controlling the center means influencing the d4, d5, e4, and e5 squares, whether by occupying them with pawns or pieces, or by exerting pressure on them from a distance. Central control matters because pieces placed in or near the center influence more of the board than pieces on the edge — a knight on e4 or d5 touches far more useful squares than the same knight stuck on a3 or h3.

This is also why "wing" pawn moves (a4, h4, and similar) early in the game are usually discouraged unless they serve a specific, concrete purpose: they do nothing for central control and often cost a full tempo that could have gone toward development instead.`,
        diagram: {
          fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
          caption:
            "Both sides stake a claim in the center with e4/e5, develop toward active squares (Nf3, Nc6), then aim a piece at the center's weak point — White's bishop on c4 already eyes f7.",
          highlights: ["e4", "e5", "c4"],
        },
      },
      `Develop pieces toward squares where they're actually useful, not just off the back rank. A common beginner habit is developing knights to the rim (like a3 or h3) simply to get them moving; stronger players ask where each piece genuinely wants to be and route it there directly when possible. As a rough guideline, aim to develop knights before bishops when it's unclear which is more urgent, since knights often have fewer genuinely good squares available and benefit from claiming one early.

Avoid moving the same piece twice in the opening unless forced to — every extra move spent repositioning a piece that already developed is a tempo your opponent can use to develop a completely new piece instead, and in the opening, tempo differences compound quickly.`,
      `Castle early, generally within the first ten moves unless there's a specific reason to delay (such as being ready to castle queenside depending on how the position develops, or facing a forced tactical sequence). An uncastled king in the center is the single most common target of early attacks and sacrifices, as covered in earlier courses — denying your opponent that target by castling promptly removes an entire category of danger from your position.

Connect your rooks — meaning clear the back rank between them — as a natural byproduct of developing your other pieces and castling. Rooks that are connected and have an open file available are ready to become active in the middlegame the moment the position calls for it.`,
      `Avoid bringing your queen out too early unless there's a concrete tactical reason. A queen developed on move three or four, before your minor pieces, is frequently a target for cheap tempo gains — a developing knight or bishop move that also attacks the queen forces you to move it again, losing time you can't easily recover. The guideline isn't "never move the queen early," it's "only move the queen early when you've checked that it can't be harassed for free."`,
      `Practical exercise for this course: review five of your own opening phases (the first ten to twelve moves of recent games) and score yourself honestly against the four classical goals — center control, development, king safety, connected rooks. Identify which goal you most often neglect, and make a conscious point of prioritizing it in your next several games, regardless of which specific opening you're playing.`,
    ],
  },
  {
    id: 15,
    title: "Middlegame Planning",
    level: "800-1800",
    puzzle: {
      fen: "6k1/pp3ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1",
      instruction:
        "You're White, with a healthy queenside pawn majority. Start the plan that this imbalance points to.",
      solutions: ["b4"],
      success:
        "b4! Building a plan around your real imbalance — this majority can create a passed pawn even against accurate defense.",
    },
    slides: [
      `The middlegame is where most players below 1800 lose their way, not because they lack tactical skill, but because they run out of opening preparation and don't know what to do next. This course is about building a repeatable process for generating a plan in any middlegame position, rather than drifting move by move hoping something turns up.

The starting point for any plan is an honest assessment of the position: who controls more space, whose king is safer, which side has the better minor pieces, and where are the pawn weaknesses on both sides? A plan that ignores this assessment and just looks for "something active" tends to produce moves that don't actually fit the position's real character.`,
      {
        text: `Imbalances are the raw material of a plan. Every position has them: a bishop pair versus two knights, a pawn majority on one wing, an isolated pawn, opposite-side castling, a lead in development. The strongest players don't try to do everything at once — they identify the one or two imbalances that favor them most clearly and build a plan around exploiting exactly those, while minimizing the imbalances that favor their opponent.

For example, if you have a healthy pawn majority on the queenside and your opponent has active piece play but a slightly weaker king, a sound plan might be to trade off attacking pieces to blunt their initiative while slowly advancing your queenside pawns toward a passed pawn — accepting a quieter position now in exchange for a long-term structural win later.`,
        diagram: {
          fen: "6k1/pp3ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1",
          caption:
            "White's extra queenside pawn (a healthy 3-vs-2 majority) is a long-term imbalance worth building a plan around — it can produce a passed pawn even against accurate defense.",
          highlights: ["a2", "b2", "c2"],
        },
      },
      `Candidate moves and short-term plans work together. A plan isn't usually a fixed sequence of ten exact moves — it's a direction (for example, "trade off the bad bishop, then target the backward pawn on c6") that guides which candidate moves you consider at each turn. At every move, briefly check that your candidates still serve the plan; if your opponent's last move has changed the position enough that your plan no longer makes sense, update it rather than forcing it through out of stubbornness.`,
      `Prophylactic thinking (covered in more depth in the next course) belongs inside planning too: a genuinely strong plan accounts for your opponent's best response, not just your own ambitions. Before committing to a multi-move plan, briefly ask what your opponent's most natural counter-plan looks like, and check whether your plan still works if they play accurately against it. Plans that only succeed if the opponent cooperates aren't really plans — they're hopes.`,
      `Flexibility is just as important as having a plan at all. Rigidly executing a plan that the position no longer supports — because your opponent found a strong response, or a new tactical opportunity appeared — is a common way players throw away good positions. Treat your plan as your current best guess, subject to revision every single move based on what's actually on the board, not a commitment you have to see through no matter what.`,
      `Practical exercise for this course: in your next few games, at some point in the middlegame (say, around move 12-15), pause and write down (mentally or on paper if you're reviewing afterward) one sentence describing your plan and the imbalance it's based on. Check back on that plan a few moves later and see whether you stuck with it, adapted it sensibly, or drifted away from it without noticing — all three are useful information about how you currently plan.`,
    ],
  },
  {
    id: 16,
    title: "Weak Squares and Outposts",
    level: "800-1800",
    puzzle: {
      fen: "6k1/5p1p/6p1/8/8/8/1B6/4K3 w - - 0 1",
      instruction:
        "You're White. Black just played ...g6, permanently weakening a square. Land your bishop right on it.",
      solutions: ["Bf6"],
      success:
        "Bf6! That square can never be guarded by a black pawn again — a permanent outpost you can build around for the rest of the game.",
    },
    slides: [
      `A weak square is any square that can no longer be defended by a pawn, usually because of how the pawn structure has developed or been forced. Weak squares matter because, once identified, they become long-term targets — a piece that lands on a genuinely weak square near the enemy camp can be extremely difficult to dislodge, since the only way to attack it is with other pieces, which costs tempo and often creates further weaknesses.

Learning to spot weak squares quickly means reading the pawn structure, not just looking at where pieces currently sit. Ask: given the current pawns, which squares in the enemy camp can never again be covered by an enemy pawn? Those squares are permanently available as outposts, regardless of what happens to the pieces around them.`,
      `An outpost is a weak square that one of your pieces — almost always a knight, though bishops can occupy strong squares too — can occupy safely, ideally with pawn support of its own. A well-supported knight on an outpost deep in enemy territory is one of the most durable long-term advantages in chess, because the opponent frequently cannot challenge it without making further structural concessions, like advancing a pawn that creates yet another weak square elsewhere.

Classic outpost squares include d5 and e5 (for White, deep in Black's position) or d4 and e4 (for Black, deep in White's position), especially in structures where the corresponding enemy pawn has already advanced past that square or been traded off entirely.`,
      `Creating weak squares deliberately is a skill in itself. Many weak squares don't exist from the opening — they're provoked. A well-timed pawn trade, an exchange that forces a recapture with a pawn, or simply inducing your opponent to push a pawn (often to deal with a threat) can permanently weaken a square that didn't used to be weak. Before offering certain trades or making certain threats, consider not just the immediate tactical result but what square becomes weak afterward, and whether you have a piece ready to claim it.`,
      `Defending against an outpost, when you're the side facing one, usually means either trading off the piece that's sitting on it (even at some structural cost) or neutralizing its influence by blocking the diagonals and files it would otherwise dominate. Ignoring an established enemy outpost rarely makes it go away — it tends to get reinforced and become more dangerous the longer it's left alone.`,
      {
        text: `Weak squares aren't limited to knight outposts. A permanently weak square directly in front of the king (often created by an early pawn move like ...h6 or ...g6 without proper follow-up) can become a long-term target for a bishop or a queen for the rest of the game, well beyond the opening. Recognizing these early lets you start building an attack around that single permanent weakness many moves before the position looks obviously dangerous.`,
        diagram: {
          fen: "6k1/5p1p/6p1/8/8/8/1B6/4K3 w - - 0 1",
          caption:
            "After ...g6, the f6 and h6 squares can never again be guarded by a black pawn — permanent weak squares a fianchetto bishop can target for the rest of the game.",
          highlights: ["g6", "f6", "h6"],
        },
      },
      `Practical exercise for this course: in your next five games, at some point in the early middlegame, scan both pawn structures (yours and your opponent's) and list every weak square you can find. For each one, note whether a piece — yours or theirs — could realistically occupy or exploit it, and whether a plan built around that square makes sense given everything else going on in the position.`,
    ],
  },
  {
    id: 17,
    title: "Prophylaxis and Candidate Moves",
    level: "800-1800",
    puzzle: {
      fen: "6k1/8/5n2/8/8/4B3/7P/6K1 w - - 0 1",
      instruction:
        "You're White. Black's knight eyes g4, threatening your bishop. Take that square away before it's ever a problem.",
      solutions: ["h3"],
      success:
        "h3! A quiet prophylactic move that denies ...Ng4 before it happens — prevention instead of reaction.",
    },
    slides: [
      `Prophylaxis means making a move specifically to prevent your opponent's plan, rather than advancing your own. It's one of the most powerful and underused tools below 1800, because most players, most of the time, are only asking "what do I want to do," and almost never asking "what does my opponent want to do, and how do I stop it?"

The core prophylactic habit is simple to describe and hard to practice consistently: before playing your intended move, briefly imagine it's your opponent's turn instead, and ask what they would most want to play if the position were theirs. If their best idea is dangerous or unpleasant for you, consider whether a small adjustment to your own move — or an entirely different move — can take that idea away before it ever becomes a real threat.`,
      {
        text: `A classic prophylactic move does two things at once: it improves your own position at least slightly while also preventing or reducing your opponent's best plan. These moves often don't look flashy — they can look like "normal" developing or improving moves — but their real value lies in the plan they silently deny the opponent. Over a whole game, consistently taking away your opponent's best ideas is often more valuable than constantly pursuing your own, especially in balanced positions where neither side has an obvious weakness to attack yet.`,
        diagram: {
          fen: "6k1/8/5n2/8/8/4B2P/8/6K1 b - - 0 1",
          caption:
            "A quiet move like h3 takes away ...Ng4 before it's ever a real threat to the bishop on e3 — prevention instead of reaction.",
          highlights: ["h3", "f6", "e3"],
        },
      },
      `Candidate moves are the small list of moves you seriously consider at any turn, before narrowing down to the one you'll actually play. Strong players generate this list systematically rather than playing the first reasonable-looking idea: start with forcing moves (checks, captures, direct threats), then moves that improve your worst-placed piece, then prophylactic moves against your opponent's most likely plan, and only then purely positional improvements.

Generating three or four real candidates, even briefly, before settling on a move is one of the simplest process changes that reliably improves decision quality, because it forces you to at least glance at alternatives instead of anchoring on the first idea that occurred to you.`,
      `Comparing candidates doesn't require calculating every single one to the end. For quieter candidates, a rough comparison based on the principles from earlier courses (does it improve piece activity, does it address a weakness, does it create a problem for the opponent) is usually enough. Save deep, move-by-move calculation for forcing candidates — checks, captures, and direct threats — where the consequences are concrete and calculable rather than merely general.`,
      `A common mistake is falling in love with your first candidate and calculating only in support of it, rather than genuinely evaluating the alternatives. Try to hold at least one candidate move "against" your favorite — specifically look for reasons the other option might actually be better — before committing. This single habit catches a surprising number of cases where an obvious-looking move isn't actually the best one available.`,
      `Practical exercise for this course: for your next ten "normal" (non-forced, non-obvious) moves in a game, explicitly write down or say out loud at least three candidate moves before choosing, including at least one prophylactic idea addressing what you think your opponent wants to do. This feels slow at first; it becomes fast with repetition, and it directly trains the exact process that separates strong strategic players from players who only react to what's already on the board.`,
    ],
  },
  {
    id: 18,
    title: "Using the Engine and Game Analysis",
    level: "800-1800",
    puzzle: {
      fen: "4k3/8/2n5/8/3Q4/8/8/4K3 w - - 0 1",
      instruction:
        "You're White. Your queen on d4 just walked into the knight's fork range from c6. Rescue it to a square the knight doesn't attack.",
      solutions: ["Qd2", "Qa4"],
      success:
        "Safe! Spotting exactly where the big evaluation swing came from — and fixing it — is the whole point of engine review.",
    },
    slides: [
      `A chess engine like Stockfish, which this site uses throughout, is an enormously powerful learning tool — and also easy to misuse in a way that actively slows down improvement. Used correctly, engine analysis after a game is one of the fastest ways to find concrete, specific mistakes in your own play. Used incorrectly (turning it on move by move during live analysis without first forming your own opinion), it trains you to lean on the engine's judgment instead of building your own.

The right order is always: think first, check second. Before switching on an engine to review a game, go through it yourself and write down what you believed was good and bad about your own play, including any moments you remember being unsure about. Only after forming your own assessment should you compare it against engine evaluation — the gap between your opinion and the engine's is exactly the information you're trying to learn from.`,
      {
        text: `When reviewing with an engine, pay more attention to the size and nature of your mistakes than to the exact evaluation number. A move that drops the evaluation from +0.3 to +0.1 is barely worth worrying about; a move that drops it from +0.5 to -3.0 is a genuine blunder worth understanding deeply. Spend your limited review time on the two or three biggest swings in a game, not equally across every single move — this is far more efficient and far less exhausting than trying to "fix" every small inaccuracy.`,
        diagram: {
          fen: "4k3/8/2n5/8/3Q4/8/8/4K3 b - - 0 1",
          caption:
            "A one-move blunder that swings the evaluation by nine points: the queen on d4 just walked into the knight's fork range from c6 — exactly the size of mistake worth spending your review time on.",
          highlights: ["d4", "c6"],
        },
      },
      `For each significant mistake the engine flags, don't just accept the suggested best move — ask why your move was worse and why the engine's move was better, in your own words, using the concepts from earlier courses (did it miss a tactic, misjudge an imbalance, ignore a weak square, fail at prophylaxis?). An engine can tell you what the best move was; it can't tell you why you personally missed it, and that second answer is what actually improves your future play.`,
      `Engine evaluations in centipawns (hundredths of a pawn, the same unit used in the eval bar on the Openings and Play pages of this site) are useful but shouldn't be treated as gospel for every type of position. In sharp tactical positions, the evaluation is usually very reliable. In quiet strategic positions with no immediate tactics, a "small" evaluation difference can still represent a meaningfully better or worse plan that's hard to appreciate from the number alone — read the actual moves the engine prefers, not just the score.`,
      `Use the engine to check specific calculations, not just whole games. If you calculated a tactical sequence during a game and want to know whether you got it right, set up that exact position and check your line move by move rather than just asking "was my move good" — this builds your calculation confidence far more directly than passive engine-watching ever will.`,
      `Practical exercise for this course: after your next three games, review each one fully by yourself first (writing down your own assessment of key moments) before running any engine analysis. Then compare, focusing specifically on the two or three biggest evaluation swings in each game, and write one sentence per mistake explaining, in the language of earlier courses, what concept you missed. Over time, you'll likely notice the same one or two concepts repeating — that's exactly what to prioritize studying next.`,
    ],
  },
  {
    id: 19,
    title: "Calculation and Visualization",
    level: "800-1800",
    puzzle: {
      fen: "6k1/5ppp/8/8/8/8/8/3RK3 w - - 0 1",
      instruction:
        "You're White. Calculate to the end: find the move that exploits the weak back rank completely.",
      solutions: ["Rd8#"],
      success:
        "Rd8#! You calculated all the way to a quiet, final position instead of stopping early — exactly the discipline this course trains.",
    },
    slides: [
      `Calculation is the skill of working out forced or semi-forced sequences of moves in your head before playing any of them, and it's the foundation underneath almost every tactic, sacrifice, and forcing plan covered in this curriculum. Strong calculation isn't about seeing further than everyone else in some mysterious way — it's a learnable process built from smaller, trainable pieces: visualization, move ordering, and double-checking.

Visualization means holding a position in your mind that doesn't physically exist on the board yet, after some number of hypothetical moves, clearly enough to evaluate it accurately. This is a skill that improves specifically with practice, much like memory or physical coordination — it is not a fixed talent you either have or don't.`,
      `The most reliable way to structure a calculation is to work through forcing moves first: checks, captures, and direct threats, for both sides, in that order, at every step of the calculation. Non-forcing moves create too many branches to calculate exhaustively, so save detailed calculation for lines that are forced or nearly forced, and use general principles (from earlier courses) to judge quieter continuations instead.

When you reach a branch point in your calculation where your opponent has a choice, briefly calculate their most dangerous or most natural reply, not every single theoretically legal option. You can't calculate everything — the skill is correctly identifying which branches actually matter.`,
      {
        text: `A critical habit is calculating "to the end" of a forcing sequence before evaluating it, rather than stopping as soon as you see something that looks good. A sacrifice that wins material three moves in but allows a devastating counter-tactic on move four isn't actually good — and you'll only catch this if you push your calculation all the way to a position that's genuinely quiet (no more forcing moves available) before judging the result.`,
        diagram: {
          fen: "3R2k1/5ppp/8/8/8/8/8/4K3 b - - 0 1",
          caption:
            "Calculate to the end: the back rank is fatally weak once the rook infiltrates to d8 — always check whether the king has an escape square before trusting a 'safe' position.",
          highlights: ["d8", "g8"],
        },
      },
      `Double-checking your main line before playing it catches an enormous number of calculation errors. Specifically check: does my first move actually work tactically (is it legal, is it safe)? Did I account for my opponent's best defense, not just a plausible one? Is the final position actually good for me, or did I stop calculating one move too early? This final check takes thirty seconds and prevents a large share of practical blunders in forcing positions.`,
      `Calculation training benefits enormously from solving tactical puzzles regularly, specifically ones where you calculate the full solution in your head before moving any pieces, rather than moving pieces around physically or digitally to "see" the position. The entire value of puzzle training comes from the visualization effort — if you skip that effort by moving pieces around first, you're practicing something closer to pattern recognition than calculation, which is a related but different skill.`,
      `Practical exercise for this course: pick five tactical positions (from puzzles, from your own games, or from the openings and course material on this site) and calculate each one fully in your head, writing down your full intended sequence before checking it against pieces on a board or an engine. Note specifically where your calculated line first diverges from the correct one — that divergence point is exactly where your visualization or move-ordering needs the most work.`,
    ],
  },
  {
    id: 20,
    title: "Building Your Own Repertoire",
    level: "800-1800",
    puzzle: {
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      instruction:
        "You're Black, facing 1.e4. Play the first move of a solid, well-understood repertoire choice: the Caro-Kann.",
      solutions: ["c6"],
      success:
        "c6! The start of the Caro-Kann — a structure worth choosing because you understand its plans, not just because a database ranks it highly.",
    },
    slides: [
      `This final course ties together everything from the previous nineteen into a practical, ongoing task: building and maintaining your own opening repertoire — the specific set of openings you actually play, as opposed to the thirty popular ones presented generally on the Openings page of this site. A repertoire is personal; it should fit your style, your available study time, and the kinds of positions you enjoy and understand well, not just a list of "best" openings copied from somewhere else.

Start small. A complete repertoire doesn't need to cover every possible opponent response on day one — it needs one solid, understood answer to 1.e4, one to 1.d4, one to the other first moves you're likely to face, and a plan for what to play as White. Depth matters far more than breadth at this stage: genuinely understanding three openings beats superficially knowing fifteen.`,
      {
        text: `When choosing openings for your repertoire, weigh understandability over raw objective strength. An opening that's theoretically slightly worse but leads to positions whose plans and ideas you deeply understand will outperform, in practice, an objectively "better" opening full of concrete lines you've memorized without understanding why they work. This is especially true below 1800, where games are rarely decided by opening theory and almost always decided by middlegame understanding and tactical awareness.

Favor openings whose resulting middlegame structures connect to the strategic ideas you've studied in this curriculum — pawn chains, outposts, open files, and so on — so that your opening choice directly sets you up to use the skills you've actually built, rather than leading to unfamiliar structure types every game.`,
        diagram: {
          fen: "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3",
          caption:
            "A sample repertoire tabiya: 1.e4 c6 2.d4 d5, the Caro-Kann. Choose structures like this based on understanding, not just an engine's evaluation number.",
          highlights: ["c6", "d5", "d4", "e4"],
        },
      },
      `Study each repertoire opening in layers rather than trying to memorize deep theory immediately. First, understand the basic plans and typical pawn structures that result. Second, learn the first six to ten moves of the main lines well enough to reach a reasonable middlegame without major missteps. Third, and only once the first two layers are solid, start learning specific sharp lines or critical theoretical points that come up often in your own games.

This layered approach means that even against a surprise you haven't specifically prepared for, your understanding of the resulting structures and plans still gives you a reasonable path forward, rather than leaving you lost the moment an opponent deviates from a line you memorized by rote.`,
      `Keep a simple, living record of your repertoire — even a basic written or digital note listing your main lines, the key ideas behind them, and any games (yours or strong players') that illustrate the resulting plans well. Update it after games where you faced something new or got confused about what to do; this turns every game into a small contribution to your long-term opening understanding instead of a one-off event you forget about by next week.`,
      `Revisit and prune your repertoire periodically, maybe every few months. Some openings you chose early on may stop fitting your style as your understanding deepens, and that's a normal, healthy part of improving — it's not wasted effort, because the strategic and tactical skills you built while playing those openings transfer directly to whatever you study next.`,
      `Practical exercise, and a fitting close to this curriculum: write down your current repertoire as it actually exists today — what you play against 1.e4, 1.d4, and as White — in one or two sentences each, focused on the plan and structure rather than a long list of moves. Compare it honestly against the 30 openings on this site's Openings page, pick one you don't currently play that appeals to you, and spend this week studying just its basic plans and structures using the layered approach from this course. That's how a real repertoire gets built: one deliberately chosen, well-understood opening at a time.`,
    ],
  },
  {
    id: 21,
    title: "Practical Decision-Making in Equal and 'Drawn' Positions",
    level: "1800-2400",
    puzzle: {
      fen: "6k1/6pp/3b4/4P3/8/8/6B1/6K1 w - - 0 1",
      instruction:
        "You're White in an opposite-colored-bishop endgame theory calls drawn. Keep posing problems — push the passed pawn.",
      solutions: ["e6"],
      success:
        "e6! Theory says this is drawn with perfect defense — in practice, pushing and posing problems wins this far more often than 'drawn' suggests.",
    },
    slides: [
      `Every strong practical player eventually learns to separate two questions that beginners treat as one: "what does the engine say about this position" and "what is the single hardest move for my specific opponent to meet right now." Magnus Carlsen's results over two decades are built heavily on the second question — repeatedly choosing the continuation that poses maximum practical problems, even in positions a database calls equal or even technically drawn, rather than the flashiest or even the most precise single move.

This isn't a rejection of objective evaluation — it's a layer on top of it. First you confirm a move doesn't objectively worsen your position (that part is non-negotiable); only then do you choose, among the moves that pass that test, the one most likely to cause your specific opponent real problems at the board, under their own clock, without a database to consult.`,
      `A huge share of decisive results at the top level come from technically drawn endgames that are extremely difficult to hold in practice — opposite-colored bishop endgames a pawn down, certain rook endgames, and some minor-piece structures where the defender has exactly one correct plan and a hundred tempting wrong ones. The practical player's job in these positions isn't to find a forced win that doesn't exist; it's to keep making the defender solve the hardest version of the problem, move after move, for as long as the position allows.`,
      {
        text: `Opposite-colored bishop endgames are the clearest teaching example of this idea. Theory calls an extra pawn in most same-side-pawn OCB endgames a draw with correct defense — and that's true with a tablebase and unlimited time. Across the board, with a clock running and no tablebase, these endgames are won far more often than "drawn" suggests, simply because the defense requires finding the one right square for the king and bishop over and over, while the attacker's winning attempts cost nothing to try.

The practical lesson: don't be discouraged by a "drawn" verdict in a simplified position if your opponent still has to find only-moves to hold it. Play on, keep the position as complicated as the defender's task as long as you aren't objectively risking anything, and let the position do the work.`,
        diagram: {
          fen: "6k1/6pp/3b4/4P3/8/8/6B1/6K1 w - - 0 1",
          caption:
            "Opposite-coloured bishops, White up a clean passed pawn on e5. Theory calls this drawn — in practice, with accurate technique and a clock running, it is far closer to winning than 'drawn' suggests.",
          highlights: ["g2", "d6", "e5"],
        },
      },
      `Playing the board, not the opponent's rating or reputation, is the companion skill. It's tempting to relax the moment you reach a "winning" position against a weaker opponent, and equally tempting to over-press for a swindle the moment you're slightly worse against a stronger one. Both reactions replace the position's actual demands with a story about who's sitting across from you. Evaluate each move on its own merits — what does this specific position need right now — and let the result take care of itself.`,
      `None of this works without stamina and composure over a long game. Grinding a small or purely practical edge for thirty, forty, or sixty more moves after most players would have offered or accepted a draw requires treating every one of those moves with the same seriousness as a critical middlegame decision — the moment you start playing "just to finish the game," your calculation quality drops and the practical edge you were nursing disappears.`,
      `Practical exercise for this course: the next time you reach a theoretically equal or technically drawn endgame — not clearly winning, not clearly losing — resist the instinct to simplify toward a draw or offer one. Instead, choose the legal continuation that keeps the most pieces and the most decisions on the board for both sides, provided it doesn't objectively worsen your position, and see how many real problems you can make your opponent solve before the game actually ends.`,
    ],
  },
  {
    id: 22,
    title: "Speed, Intuition and Calculation Under the Clock",
    level: "1800-2400",
    puzzle: {
      fen: "4k3/8/4pn2/3N4/8/8/8/4K3 w - - 0 1",
      instruction:
        "You're White, at a genuine branch point. Stop and calculate: find the capture that wins material with check.",
      solutions: ["Nxf6+"],
      success:
        "Nxf6+! This was exactly the moment worth slowing down for — the position before and after it didn't need nearly as much thought.",
    },
    slides: [
      `Elite speed-chess players, Hikaru Nakamura foremost among them, demonstrate something counterintuitive: at absurdly fast time controls, strong players aren't calculating less carefully in some generic sense — they're calculating selectively, almost instantly skipping the large majority of moves that don't need real thought, so that the small number of moves that do need it get the time they deserve. The skill underneath elite speed chess isn't raw reflexes; it's an enormous library of recognized patterns that turns "obviously correct" into instant, reliable judgment.

The lesson for a human improving at any time control is that pattern recognition and calculation aren't competing skills — pattern recognition is what frees up the mental bandwidth calculation needs for the moments that actually matter.`,
      `This suggests a concrete "two-speed" approach you can train deliberately. Play known, principled moves at full speed whenever you're inside a structure or sequence you genuinely understand — standard recaptures, obvious developing moves, well-known opening theory. Consciously downshift into full, careful calculation only at genuine branch points: the first move that leaves known theory or structure, a forcing tactical sequence, or a pawn break that changes the position's character. Confusing the two speeds — grinding slowly through moves that don't need it, or rushing through the one move that does — is one of the most common and avoidable practical errors at any level.`,
      {
        text: `Recognizing a genuine branch point is itself a trainable skill. A useful signal: if a position has more than one reasonable-looking candidate and the resulting positions after each one are meaningfully different in character — not just slightly better or worse, but different kinds of positions — that's exactly the moment to slow down, regardless of how much time you have left.`,
        diagram: {
          fen: "4k3/8/4pn2/3N4/8/8/8/4K3 w - - 0 1",
          caption:
            "A genuine branch point: Nxe6, Nxf6+, and a quiet retreat all lead to very different positions. This is exactly the moment to slow down and calculate — not the moves before or after it.",
          highlights: ["d5", "e6", "f6"],
        },
      },
      `Clock management can also be used offensively, independent of the objective evaluation. In a shared-clock game, deliberately steering toward positions that are simple for you to navigate but present your opponent with several similarly-plausible, hard-to-rank options is a distinct skill from finding the single best move — it's finding the move that's cheap for you to play and expensive for your opponent to answer accurately. This is a major, explicit part of how elite online speed-chess players consistently outscore objectively comparable or even stronger opponents in fast time controls.`,
      `None of this replaces slow, deep study — it complements it. Building a very large number of recognized patterns through volume of play (and honest review afterward) trains instant recognition in a way that pure slow analysis can't match quickly; but slow, deep analysis builds the structural understanding that raw volume alone never will. Players who only play fast without reviewing plateau quickly; players who only study slowly without playing enough games under real time pressure often find their calculation collapses the moment the clock actually matters.`,
      `Practical exercise for this course: play a session at a brisker time control than you're used to (5+0 or 3+2, for example), specifically to practice the two-speed habit rather than to chase a rating number. After each game, go back through it and mark which moves you played almost instantly versus which ones you consciously stopped to calculate, then check honestly whether that split matched where the real decisions actually were.`,
    ],
  },
  {
    id: 23,
    title: "Finding the Weakest Point",
    level: "1800-2400",
    puzzle: {
      fen: "1n4k1/5ppp/8/8/2B5/8/8/3RK3 w - - 0 1",
      instruction:
        "You're White. Black's worst piece is the knight stuck on b8. Seize the file that targets it directly.",
      solutions: ["Rb1"],
      success:
        "Rb1! Straight at the weakest point instead of searching for something more complicated — the fast, practical plan.",
    },
    slides: [
      `One of the most widely repeated practical framings in modern chess instruction — closely associated with popular commentators like GothamChess (Levy Rozman) — is almost absurdly simple to state and genuinely useful to apply under time pressure or in an unfamiliar position: before searching for your own clever plan, find your opponent's single worst-placed piece, or the single weakest pawn or square in their camp, and build your first candidate plan around attacking exactly that one thing.

This doesn't replace the deeper imbalance-based planning from earlier in this curriculum — it's a fast, practical filter to run first, especially when a position doesn't immediately suggest a plan on its own.`,
      {
        text: `Finding the weakest point quickly comes down to one question, asked about each enemy piece in turn: "if I could remove this piece from the board for free right now, how much would that actually help me?" The piece where the honest answer is "a lot" — because it's undefended, awkwardly placed, or blocking its own side's coordination — is usually the weakest point. Ask the equivalent question of pawns: which one, if it fell, would open the most lines or create the most lasting damage to the king or structure behind it?`,
        diagram: {
          fen: "1n4k1/5ppp/8/8/2B5/8/8/3QK3 w - - 0 1",
          caption:
            "The knight on b8 hasn't moved all game — the clear weakest piece in Black's camp. A fast, practical plan: target the f7 square it would normally help cover, rather than searching for something more complicated.",
          highlights: ["b8", "f7"],
        },
      },
      `Say the plan out loud, or write it down, in one sentence: "my plan is to attack [piece / pawn / square] because [reason]." This habit — common in instructional commentary aimed at intermediate and advanced players — forces a level of clarity that silent, vague planning ("I'll just develop and see what happens") simply doesn't provide. A plan that can't survive being stated in one concrete sentence usually isn't a real plan yet.`,
      `This heuristic is a starting point, not a verdict. Sometimes the piece that looks worst is actually adequately defended, or simply isn't relevant to the real fight happening elsewhere on the board — a knight stuck on the rim doesn't matter much if the game is being decided by a kingside pawn storm three files away. Always check a "weakest point" plan against the fuller process from earlier courses (imbalances, candidate moves, prophylaxis) before committing serious resources — material, tempo, or king safety — to it.`,
      `The same filter works in reverse, defensively: identifying your own weakest piece or square before your opponent does lets you fix it — reroute the piece, support the square, or trade off the problem — while it's still cheap to fix, rather than discovering it only once it's already under fire.`,
      `Practical exercise for this course: in your next five games, at some point in the middlegame, explicitly identify in one sentence what you believe is your opponent's single worst piece or weakest pawn, and build your next few moves around it. After the game, check — with or without an engine — whether that really was the most urgent target, or whether something else deserved the attention instead.`,
    ],
  },
  {
    id: 24,
    title: "Facing Preparation and Staying Out of Danger",
    level: "1800-2400",
    puzzle: {
      fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3",
      instruction:
        "You're White, heading away from heavily analyzed main lines. Play the flank move that steers toward a King's Indian Attack shape instead.",
      solutions: ["g3"],
      success:
        "g3! A sound but less heavily prepared structure — exactly the kind of practical deviation that sidesteps an opponent's deep preparation.",
    },
    slides: [
      `As your competition gets stronger, you'll increasingly face opponents who have specifically studied your games or your known openings in advance — a reality every strong player eventually deals with. The shared practical answer isn't to out-memorize the preparation; it's to deliberately steer toward positions where memorization matters less and over-the-board understanding matters more.`,
      `Deviating early, on purpose, from a well-known main line is a completely legitimate practical weapon, even when a database shows the main line is objectively a touch stronger. The goal of a move isn't always "find what an engine ranks highest in isolation" — it's "reach a position I understand better than my opponent does, right now, with both our clocks running." Keeping a few sound sidelines and alternate move orders specifically for this purpose is standard practice among strong, well-prepared players, not a sign of weaker preparation.`,
      `Recognizing when you've walked into an opponent's preparation is its own skill: unusually fast, confident moves from your opponent in a line unfamiliar to you are a signal, not a reason to panic or to match their pace. The correct response is almost always the opposite of what their speed suggests — slow down and think for yourself from that exact point on, because their speed reflects memorization of a specific line, not necessarily a position that's objectively difficult if you calculate it honestly yourself.`,
      `Choosing complicated, "human" positions over forcing, memorizable ones is a deliberate counter to heavy preparation. Long forcing sequences are exactly where memorized preparation pays off most, because there's little room for independent judgment once the first move is played. Quieter, richer positions with several reasonable options reward understanding move by move and reward memorization far less — steering toward this type of position, when you suspect you're facing specific preparation, shifts the game back onto ground where your own judgment matters again.`,
      {
        text: `Choosing a sound but less heavily analyzed move order is a practical skill in itself, not a concession. A flank opening like the English, reached through a careful move order, can transpose into rich, well-understood structures (reversed Sicilian shapes, King's Indian Attack setups) while sidestepping an opponent's specific preparation in main-line 1.e4 or 1.d4 theory entirely.`,
        diagram: {
          fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR b KQkq - 0 3",
          caption:
            "A sound, less heavily analyzed move order: 1.c4 e5 2.Nc3 Nf6 3.g3 heads for a reversed Sicilian / King's Indian Attack shape, sidestepping an opponent's deep main-line preparation without sacrificing soundness.",
          highlights: ["c4", "g3", "e5"],
        },
      },
      `Practical exercise for this course: pick one opening you currently play often enough that an opponent might reasonably prepare against it specifically — because it's in your public game history, or you're known for it locally. Find one sound, legitimate sideline or alternate move order this week that leads to a structure you understand well but that's meaningfully less likely to be the exact line someone has studied against you.`,
    ],
  },
  {
    id: 25,
    title: "Clock Psychology and Time Management",
    level: "1800-2400",
    puzzle: {
      fen: "4k3/8/8/8/3n4/8/4N3/4K3 w - - 0 1",
      instruction:
        "You're White. Black's knight just captured your pawn on d4. This is a completely obvious recapture — don't burn time on it.",
      solutions: ["Nxd4"],
      success:
        "Nxd4! An obvious, forced-looking recapture like this deserves a few seconds, not a few minutes — bank that time for the moment that actually needs it.",
    },
    slides: [
      `Time is a resource exactly like material or position, and mismanaging it in either direction loses games that were never lost on the board. Two opposite failure modes show up constantly even among strong players: burning real time on moves that didn't need it, and rushing through the handful of moments that genuinely did.`,
      `Budget time by move type, not by move number. Forcing sequences, the first move after your opening preparation runs out, and genuinely unclear middlegame positions deserve real thinking time; recaptures, forced moves, and obvious developing moves generally don't. A simple habit that catches a lot of wasted time: before moving, briefly ask "does this move actually have a reasonable alternative worth comparing?" If the honest answer is no, play it and bank the time you saved for later.`,
      `Clock pressure can be used as a weapon independent of the position on the board. In games with a shared clock, deliberately choosing a solid, quick-to-find, hard-to-refute move over a slower "only" move that's a touch more precise can shift a time-pressure battle in your favor even with no objective advantage — a technique closely associated with elite speed-chess players, who regularly outplay objectively stronger opponents on time alone once both clocks get low.`,
      `Recognizing your own time panic is a defensive skill. Rushed clicking, refusing to seriously consider a second candidate move, and playing the very first move you see without checking it's safe are all signals to consciously slow back down, even if the clock is telling you to hurry. One calm, slightly slower move is almost always better than three fast, panicked ones, even accounting for the extra time it costs.`,
      `Increment awareness changes the calculation. In games with increment, playing a short run of fast, safe, obvious moves in a row can meaningfully rebuild your clock ahead of a genuinely critical moment. In no-increment or bullet-style time controls, the logic can flip entirely — preserving enough time to keep making legal moves at all ("flag chances") can matter more than finding the objectively best move in a position that's already lost on the board but not yet lost on the clock.`,
      `Practical exercise for this course: in your next slower game (15+10 or longer), note your own remaining time at moves 20, 30, and 40. Afterward, compare that against how critical those stretches of the game actually were. Most players discover they spent real time on moves that didn't need it, and too little on the one or two moments that genuinely did — the fix starts with simply noticing where the gap is.`,
    ],
  },
];
