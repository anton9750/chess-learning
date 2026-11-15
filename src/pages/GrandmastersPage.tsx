// Viser de 30 stormestre fra data/grandmasters.ts som en simpel tabel.
import styled from "styled-components";
import { pageContainer, card } from "../styles/mixins";
import { grandmasters } from "../data/grandmasters";

const Wrap = styled.div`
  ${pageContainer}
`;

const Table = styled.div`
  ${({ theme }) => card(theme)}
  overflow: hidden;
  margin-top: 1.5rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 50px 1.4fr 1fr 1.6fr;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const HeaderRow = styled(Row)`
  font-weight: 700;
  background: ${({ theme }) => theme.colors.bgAlt};
`;

const Rank = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`;

const Country = styled.span`
  color: ${({ theme }) => theme.colors.textDim};
`;

const Openings = styled.span`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textDim};
`;

export default function GrandmastersPage() {
  return (
    <Wrap>
      <h1>Top 30 Grandmasters</h1>
      <p>
        A snapshot of today's elite players and the openings they reach for
        most often.
      </p>
      <Table>
        <HeaderRow>
          <span>#</span>
          <span>Name</span>
          <span>Country</span>
          <span>Favorite Openings</span>
        </HeaderRow>
        {/* Én række pr. stormester, med deres favorit-åbninger samlet til
            én tekststreng adskilt af kommaer. */}
        {grandmasters.map((gm) => (
          <Row key={gm.rank}>
            <Rank>{gm.rank}</Rank>
            <span>{gm.name}</span>
            <Country>{gm.country}</Country>
            <Openings>{gm.favoriteOpenings.join(", ")}</Openings>
          </Row>
        ))}
      </Table>
    </Wrap>
  );
}
