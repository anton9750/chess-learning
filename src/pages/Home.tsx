// Forsiden: en kort præsentation af appen samt genveje til de andre sider.
import styled from "styled-components";
import { Link } from "react-router-dom";
import { pageContainer, card, accentButton } from "../styles/mixins";

const Wrap = styled.div`
  ${pageContainer}
`;

const Hero = styled.section`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 1.8rem;
`;

const CtaRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CtaLink = styled(Link)`
  ${({ theme }) => accentButton(theme)}
  display: inline-block;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-top: 2.5rem;
`;

const FeatureCard = styled(Link)`
  ${({ theme }) => card(theme)}
  padding: 1.4rem;
  display: block;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureTitle = styled.h3`
  margin: 0 0 0.4rem;
`;

const FeatureText = styled.p`
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.92rem;
  margin: 0;
`;

export default function Home() {
  return (
    <Wrap>
      {/* Overskrift, underoverskrift og de to vigtigste genveje. */}
      <Hero>
        <Title>Learn Chess, One Idea at a Time</Title>
        <Subtitle>
          Openings, tactics, bots from 200 to 1800 Elo, and a 20-course
          curriculum built for players who want to actually understand the
          game — not just memorize moves.
        </Subtitle>
        <CtaRow>
          <CtaLink to="/learn">Start Learning</CtaLink>
          <CtaLink to="/play">Play a Bot</CtaLink>
        </CtaRow>
      </Hero>

      {/* Gitter af "kort", der hver linker videre til én af appens
          hovedsider. */}
      <Grid>
        <FeatureCard to="/openings">
          <FeatureTitle>30 Popular Openings</FeatureTitle>
          <FeatureText>
            15 for White, 15 for Black, with an interactive board and a
            Stockfish evaluation for every line.
          </FeatureText>
        </FeatureCard>
        <FeatureCard to="/learn">
          <FeatureTitle>20-Course Curriculum</FeatureTitle>
          <FeatureText>
            Pawn play, tactics, attacking, endgames and more — written for
            players roughly 800 to 1800 rated.
          </FeatureText>
        </FeatureCard>
        <FeatureCard to="/play">
          <FeatureTitle>Play Foxie</FeatureTitle>
          <FeatureText>
            Face a Stockfish bot anywhere from 200 to 1800 Elo, with a live
            Elo bar and move-by-move commentary from Foxie.
          </FeatureText>
        </FeatureCard>
        <FeatureCard to="/live">
          <FeatureTitle>Live Lichess TV</FeatureTitle>
          <FeatureText>
            Watch top-rated games happening right now, pulled live from the
            Lichess API.
          </FeatureText>
        </FeatureCard>
        <FeatureCard to="/grandmasters">
          <FeatureTitle>Top 30 Grandmasters</FeatureTitle>
          <FeatureText>
            See the world's best players today and the openings they reach
            for most often.
          </FeatureText>
        </FeatureCard>
      </Grid>
    </Wrap>
  );
}
