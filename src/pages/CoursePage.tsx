// Viser ét kursus som en "bog", man kan bladre igennem side for side, med
// den interaktive øvelse som den allersidste side.
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { card, buttonBase, accentButton } from "../styles/mixins";
import { courses, slideText, slideDiagram } from "../data/courses";
import PositionDiagram from "../components/PositionDiagram";
import CoursePuzzle from "../components/CoursePuzzle";

// Animation når man blader fremad: siden glider ind fra højre.
const turnNext = keyframes`
  from {
    transform: translateX(40px) rotateY(8deg);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(0deg);
    opacity: 1;
  }
`;

// Animation når man blader tilbage: siden glider ind fra venstre.
const turnPrev = keyframes`
  from {
    transform: translateX(-40px) rotateY(-8deg);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(0deg);
    opacity: 1;
  }
`;

const Page = styled.div<{ $dir: "next" | "prev" }>`
  ${({ theme }) => card(theme)}
  padding: 2.2rem 2.4rem;
  min-height: 360px;
  perspective: 1200px;
  animation: ${(p) => (p.$dir === "next" ? turnNext : turnPrev)} 0.35s ease;

  p {
    margin-bottom: 1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
`;

const NavButton = styled.button<{ $primary?: boolean }>`
  ${(p) => (p.$primary ? accentButton(p.theme) : buttonBase(p.theme))}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

const PageCount = styled.span`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.9rem;
`;

export default function CoursePage() {
  // Henter kursus-id'et fra URL'en (f.eks. /learn/3 giver courseId = "3")
  // og finder det tilsvarende kursus i data'en.
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === Number(courseId));
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");

  // Hvis brugeren skifter til et andet kursus (via dropdown'en), skal man
  // altid starte forfra på side 1 — ellers kunne man risikere at stå på en
  // sidenummer, der ikke findes i det nye kursus.
  useEffect(() => {
    setSlide(0);
  }, [courseId]);

  if (!course) {
    return (
      <p>
        That course doesn't exist. <Link to="/learn">Back to all courses</Link>
      </p>
    );
  }

  // Øvelsen tælles som én ekstra "side" efter alle de almindelige
  // tekst-sider, så den får sit eget sidetal i stedet for at ligge under
  // hver eneste side.
  const puzzlePageIndex = course.slides.length;
  const totalPages = course.slides.length + 1;
  const isPuzzlePage = slide === puzzlePageIndex;

  // Blader én side frem, med mindre man allerede er på sidste side.
  function goNext() {
    if (slide < totalPages - 1) {
      setDir("next");
      setSlide((s) => s + 1);
    }
  }

  // Blader én side tilbage, med mindre man allerede er på første side.
  function goPrev() {
    if (slide > 0) {
      setDir("prev");
      setSlide((s) => s - 1);
    }
  }

  // Finder teksten og det evt. diagram, der hører til den aktuelle side
  // (kun relevant, når man IKKE er på øvelses-siden).
  const currentSlide = isPuzzlePage ? null : course.slides[slide];
  const paragraphs = currentSlide ? slideText(currentSlide).split("\n\n") : [];
  const diagram = currentSlide ? slideDiagram(currentSlide) : undefined;

  return (
    <div>
      <h2>
        Course {course.id}: {course.title}
      </h2>
      {/* "key={slide}" gør, at React opfatter hver side som et helt nyt
          element, hvilket trigger "animation"-CSS'en forfra hver gang man
          blader. */}
      <Page key={slide} $dir={dir}>
        {isPuzzlePage ? (
          <CoursePuzzle key={course.id} puzzle={course.puzzle} />
        ) : (
          <>
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {diagram && (
              <PositionDiagram
                fen={diagram.fen}
                caption={diagram.caption}
                highlights={diagram.highlights}
                orientation={diagram.orientation}
              />
            )}
          </>
        )}
      </Page>
      <Controls>
        <NavButton onClick={goPrev} disabled={slide === 0}>
          ← Previous page
        </NavButton>
        <PageCount>
          Page {slide + 1} of {totalPages}
        </PageCount>
        <NavButton $primary onClick={goNext} disabled={slide === totalPages - 1}>
          Next page →
        </NavButton>
      </Controls>
    </div>
  );
}
