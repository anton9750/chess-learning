// Oversigten over alle kurser, vist som et gitter af kort (standard-siden
// under /learn, når intet specifikt kursus er valgt).
import styled from "styled-components";
import { Link } from "react-router-dom";
import { card } from "../styles/mixins";
import { courses } from "../data/courses";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1rem;
`;

const CourseCard = styled(Link)`
  ${({ theme }) => card(theme)}
  padding: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Num = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  font-size: 0.85rem;
`;

export default function LearnIndex() {
  return (
    <>
      <p>
        Pick a course from the dropdown above, or browse all {courses.length}{" "}
        below. Each one opens in a book-style slider you can page through.
      </p>
      <Grid>
        {courses.map((c) => (
          <CourseCard key={c.id} to={`/learn/${c.id}`}>
            <Num>Course {c.id}</Num>
            <h3>{c.title}</h3>
          </CourseCard>
        ))}
      </Grid>
    </>
  );
}
