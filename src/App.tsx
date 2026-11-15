// Rodkomponenten for hele appen: sætter tema op og definerer alle sider
// (routes), så React Router ved, hvilken komponent der skal vises for hver
// URL.
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { themes, type ThemeName } from "./styles/theme";
import { readJSON, writeJSON } from "./lib/storage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import OpeningsPage from "./pages/OpeningsPage";
import LearnLayout from "./pages/LearnLayout";
import CoursePage from "./pages/CoursePage";
import LearnIndex from "./pages/LearnIndex";
import PlayPage from "./pages/PlayPage";
import LiveTvPage from "./pages/LiveTvPage";
import GrandmastersPage from "./pages/GrandmastersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

// Nøgle til at gemme det valgte tema i localStorage, så valget huskes
// mellem besøg.
const THEME_KEY = "chess-learning:theme";

export default function App() {
  // Starter med det tema, der evt. er gemt fra sidste besøg (ellers "light").
  const [themeName, setThemeName] = useState<ThemeName>(() =>
    readJSON<ThemeName>(THEME_KEY, "light")
  );

  // Skifter tema og gemmer det nye valg, så det huskes næste gang.
  function handleThemeChange(name: ThemeName) {
    setThemeName(name);
    writeJSON(THEME_KEY, name);
  }

  return (
    // ThemeProvider gør det valgte temas farver tilgængelige for alle
    // styled-components i hele appen via "theme"-prop'en.
    <ThemeProvider theme={themes[themeName]}>
      <GlobalStyle />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Nav themeName={themeName} onThemeChange={handleThemeChange} />
        {/* Hver <Route> knytter en URL-sti til den side, der skal vises. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/openings" element={<OpeningsPage />} />
          {/* Læringssektionen har en fælles "ramme" (LearnLayout) med
              undersider: oversigten (index) og det enkelte kursus. */}
          <Route path="/learn" element={<LearnLayout />}>
            <Route index element={<LearnIndex />} />
            <Route path=":courseId" element={<CoursePage />} />
          </Route>
          <Route path="/play" element={<PlayPage />} />
          <Route path="/live" element={<LiveTvPage />} />
          <Route path="/grandmasters" element={<GrandmastersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Fanger alle URL'er, der ikke matcher noget andet ovenfor. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
