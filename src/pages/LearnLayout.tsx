// Den fælles "ramme" for hele /learn-sektionen: overskrift + en dropdown til
// hurtigt at hoppe til et bestemt kursus. <Outlet /> viser enten
// kursusoversigten (LearnIndex) eller ét enkelt kursus (CoursePage),
// afhængigt af URL'en — se de nestede routes i App.tsx.
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { pageContainer } from "../styles/mixins";
import { courses } from "../data/courses";

const Wrap = styled.div`
  ${pageContainer}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  min-width: 260px;
`;

export default function LearnLayout() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <Wrap>
      <Header>
        <h1>Learn Chess</h1>
        {/* Navigerer direkte til det valgte kursus — eller tilbage til
            oversigten, hvis man vælger den tomme "placeholder"-mulighed. */}
        <Select
          value={courseId ?? ""}
          onChange={(e) =>
            navigate(e.target.value ? `/learn/${e.target.value}` : "/learn")
          }
        >
          <option value="">Choose a course (1-{courses.length})</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id}. {c.title}
            </option>
          ))}
        </Select>
      </Header>
      <Outlet />
    </Wrap>
  );
}
