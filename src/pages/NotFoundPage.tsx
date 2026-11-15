// 404-siden, der vises for alle URL'er, der ikke matcher en kendt side
// (se "*"-routen i App.tsx).
import styled from "styled-components";
import { Link } from "react-router-dom";
import { pageContainer } from "../styles/mixins";

const Wrap = styled.div`
  ${pageContainer}
  text-align: center;
`;

export default function NotFoundPage() {
  return (
    <Wrap>
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <Link to="/">Back to home</Link>
    </Wrap>
  );
}
