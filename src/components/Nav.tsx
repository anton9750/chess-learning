// Topmenuen, som vises på alle sider: logo, navigationslinks, temavalg og
// login/logout-knap.
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { flexBetween } from "../styles/mixins";
import { themes, type ThemeName } from "../styles/theme";
import { getCurrentUser, logout } from "../lib/auth";

interface NavProps {
  themeName: ThemeName;
  onThemeChange: (name: ThemeName) => void;
}

const Bar = styled.nav`
  ${flexBetween}
  padding: 0.9rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 10;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Brand = styled(Link)`
  font-family: Georgia, serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Links = styled.div`
  display: flex;
  gap: 1.1rem;
  flex-wrap: wrap;
`;

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textDim};
  font-weight: 600;
  font-size: 0.95rem;

  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ThemeSelect = styled.select`
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgAlt};
  color: ${({ theme }) => theme.colors.text};
`;

const AuthButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentText};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;

export default function Nav({ themeName, onThemeChange }: NavProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Tjekker ved opstart, om der allerede er en bruger logget ind (fra en
  // tidligere session gemt i localStorage), og viser i så fald navnet.
  useEffect(() => {
    const user = getCurrentUser();
    setUserName(user ? user.name : null);
  }, []);

  // Logger brugeren ud og sender personen tilbage til forsiden.
  function handleLogout() {
    logout();
    setUserName(null);
    navigate("/");
  }

  return (
    <Bar>
      <Brand to="/">♞ Chess Learning</Brand>
      <Links>
        <StyledLink to="/openings">Openings</StyledLink>
        <StyledLink to="/learn">Learn</StyledLink>
        <StyledLink to="/play">Play a Bot</StyledLink>
        <StyledLink to="/live">Live TV</StyledLink>
        <StyledLink to="/grandmasters">Grandmasters</StyledLink>
      </Links>
      <Right>
        <ThemeSelect
          value={themeName}
          onChange={(e) => onThemeChange(e.target.value as ThemeName)}
        >
          {Object.keys(themes).map((name) => (
            <option key={name} value={name}>
              {name[0].toUpperCase() + name.slice(1)}
            </option>
          ))}
        </ThemeSelect>
        {/* Viser brugerens navn + log ud-knap, hvis man er logget ind —
            ellers vises et link til login-siden. */}
        {userName ? (
          <>
            <StyledLink to="/profile">{userName}</StyledLink>
            <AuthButton onClick={handleLogout}>Log out</AuthButton>
          </>
        ) : (
          <StyledLink to="/login">Log in</StyledLink>
        )}
      </Right>
    </Bar>
  );
}
