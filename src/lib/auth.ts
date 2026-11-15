import { readJSON, writeJSON } from "./storage";

/**
 * This is a school-project stand-in for authentication. There is no backend
 * server, so passwords are kept in localStorage as-is (never do this in a
 * real app — real auth needs a server and a proper password hash).
 */
// (Dansk: Dette er ikke rigtig sikker autentificering — det er et
// skoleprojekt uden backend-server, så passwords gemmes bare som almindelig
// tekst i localStorage. Det må aldrig gøres sådan i et rigtigt produkt.)

// En gemt bruger, enten oprettet manuelt eller via Google-login.
export interface StoredUser {
  name: string;
  email: string;
  password: string;
  provider: "local" | "google";
}

// Et gemt spil, knyttet til en bruger, som vises på profilsiden.
export interface SavedGame {
  id: string;
  opponent: string;
  result: "win" | "loss" | "draw";
  date: string;
  pgn: string;
}

// Nøgler brugt i localStorage.
const USERS_KEY = "chess-learning:users";
const SESSION_KEY = "chess-learning:session";

// Henter listen over alle oprettede brugere.
export function getUsers(): StoredUser[] {
  return readJSON<StoredUser[]>(USERS_KEY, []);
}

// Finder en bruger ud fra email (uafhængigt af store/små bogstaver).
export function findUser(email: string): StoredUser | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Opretter en ny bruger, hvis emailen ikke allerede er i brug, og logger
// personen ind med det samme.
export function registerUser(user: StoredUser): { ok: boolean; error?: string } {
  if (findUser(user.email)) {
    return { ok: false, error: "Der findes allerede en konto med denne email" };
  }
  const users = getUsers();
  users.push(user);
  writeJSON(USERS_KEY, users);
  setSession(user.email);
  return { ok: true };
}

// Logger en eksisterende bruger ind ved at tjekke email og password.
export function loginUser(email: string, password: string): { ok: boolean; error?: string } {
  const user = findUser(email);
  if (!user || user.password !== password) {
    return { ok: false, error: "Forkert email eller password" };
  }
  setSession(email);
  return { ok: true };
}

// Logger ind (eller opretter kontoen første gang) via et rigtigt
// Google-login — se googleAuth.ts for selve Google-delen.
export function loginWithGoogle(email: string, name: string): void {
  if (!findUser(email)) {
    const users = getUsers();
    users.push({ name, email, password: "", provider: "google" });
    writeJSON(USERS_KEY, users);
  }
  setSession(email);
}

// Gemmer, hvilken bruger (email) der aktuelt er logget ind.
export function setSession(email: string): void {
  writeJSON(SESSION_KEY, email);
}

// Logger brugeren ud ved at fjerne sessionen fra localStorage.
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Henter den bruger, der er logget ind lige nu (hvis nogen).
export function getCurrentUser(): StoredUser | undefined {
  const email = readJSON<string | null>(SESSION_KEY, null);
  if (!email) return undefined;
  return findUser(email);
}

// Henter alle gemte spil for en given bruger.
export function getSavedGames(email: string): SavedGame[] {
  return readJSON<SavedGame[]>(`chess-learning:games:${email}`, []);
}

// Tilføjer et nyt spil øverst på brugerens liste over gemte spil.
export function addSavedGame(email: string, game: SavedGame): void {
  const games = getSavedGames(email);
  games.unshift(game);
  writeJSON(`chess-learning:games:${email}`, games);
}
