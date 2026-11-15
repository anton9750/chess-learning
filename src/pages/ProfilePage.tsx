// Profilsiden: viser brugerens navn/email samt listen over gemte spil.
// Kræver login — er man ikke logget ind, sendes man videre til /login.
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { pageContainer, card } from "../styles/mixins";
import { getCurrentUser, getSavedGames, type SavedGame, type StoredUser } from "../lib/auth";

const Wrap = styled.div`
  ${pageContainer}
`;

const GameRow = styled.div`
  ${({ theme }) => card(theme)}
  padding: 0.9rem 1.1rem;
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Result = styled.span<{ $result: SavedGame["result"] }>`
  font-weight: 700;
  color: ${({ theme, $result }) =>
    $result === "win"
      ? theme.colors.good
      : $result === "loss"
      ? theme.colors.bad
      : theme.colors.textDim};
`;

export default function ProfilePage() {
  // "undefined" = har ikke tjekket endnu, "null" = ikke logget ind,
  // ellers = den aktuelle bruger. Denne tre-trins-tilstand bruges til at
  // undgå at vise "ikke logget ind" i det korte øjeblik, inden vi har
  // nået at tjekke localStorage.
  const [user, setUser] = useState<StoredUser | null | undefined>(undefined);
  const [games, setGames] = useState<SavedGame[]>([]);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current ?? null);
    if (current) setGames(getSavedGames(current.email));
  }, []);

  // Venter stille, mens vi tjekker login-status...
  if (user === undefined) return null;
  // ...og sender til login-siden, hvis der slet ikke er nogen bruger.
  if (user === null) return <Navigate to="/login" replace />;

  return (
    <Wrap>
      <h1>{user.name}</h1>
      <p>{user.email}</p>

      <h2>Your games</h2>
      {games.length === 0 && (
        <p>
          No games saved yet. Play a bot on the Play page — results are saved
          here automatically.
        </p>
      )}
      {games.map((g) => (
        <GameRow key={g.id}>
          <span>vs {g.opponent}</span>
          <Result $result={g.result}>{g.result.toUpperCase()}</Result>
          <span>{g.date}</span>
        </GameRow>
      ))}
    </Wrap>
  );
}
