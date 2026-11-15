// Viser live skakpartier hentet fra Lichess' TV-API via vores custom hook.
import styled from "styled-components";
import { pageContainer, card } from "../styles/mixins";
import { useLichessTvChannels } from "../hooks/useLichessTvChannels";

const Wrap = styled.div`
  ${pageContainer}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.1rem;
  margin-top: 1.2rem;
`;

const ChannelCard = styled.a`
  ${({ theme }) => card(theme)}
  padding: 1.1rem 1.3rem;
  color: ${({ theme }) => theme.colors.text};
  display: block;
`;

const ChannelName = styled.h3`
  margin: 0 0 0.4rem;
`;

const PlayerLine = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.9rem;
`;

export default function LiveTvPage() {
  const { channels, featuredGameId, error } = useLichessTvChannels();

  return (
    <Wrap>
      <h1>Live on Lichess TV</h1>
      <p>
        Live data pulled from Lichess's public TV API — the strongest game
        happening right now in each category.
      </p>

      {error && <p>{error}</p>}
      {!channels && !error && <p>Loading live games...</p>}

      {/* Lichess har selv en indlejret bræt-viewer, vi kan bruge direkte i
          en iframe — så vi skal ikke selv tegne det live parti. */}
      {featuredGameId && (
        <iframe
          title="Featured live game"
          src={`https://lichess.org/embed/game/${featuredGameId}?theme=auto&bg=auto`}
          style={{ width: "100%", maxWidth: 480, height: 540, border: "none", borderRadius: 10 }}
        />
      )}

      {/* Et kort pr. kanal (Blitz, Rapid, osv.), der linker videre til
          partiet på selve Lichess. */}
      {channels && (
        <Grid>
          {Object.entries(channels).map(([name, info]) => (
            <ChannelCard
              key={name}
              href={`https://lichess.org/${info.gameId}`}
              target="_blank"
              rel="noreferrer"
            >
              <ChannelName>{name}</ChannelName>
              <PlayerLine>
                {info.user?.title ? `${info.user.title} ` : ""}
                {info.user?.name} — {info.rating}
              </PlayerLine>
            </ChannelCard>
          ))}
        </Grid>
      )}
    </Wrap>
  );
}
