// Custom hook, der henter de aktuelle Lichess TV-kanaler (bruges af
// LiveTvPage til at vise igangværende live-partier).
import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

// Én TV-kanal fra Lichess' API, f.eks. "Blitz" eller "Rapid", med info om
// den spiller, der er i fokus, og selve partiets ID.
export interface TvChannel {
  user: { id: string; name: string; title?: string };
  rating: number;
  gameId: string;
}

// Hele svaret fra Lichess er et opslag fra kanalnavn til kanal-info.
export type TvChannels = Record<string, TvChannel>;

interface UseLichessTvChannelsResult {
  channels: TvChannels | null;
  featuredGameId: string | null;
  error: string | null;
}

// Henter alle TV-kanaler via den generiske useFetch-hook og udleder
// derefter, hvilket parti der skal vises som det fremhævede parti (først
// Blitz, ellers Rapid, hvis Blitz ikke findes).
export function useLichessTvChannels(): UseLichessTvChannelsResult {
  const { data: channels, error } = useFetch<TvChannels>("https://lichess.org/api/tv/channels");
  const [featuredGameId, setFeaturedGameId] = useState<string | null>(null);

  useEffect(() => {
    setFeaturedGameId(channels?.Blitz?.gameId ?? channels?.Rapid?.gameId ?? null);
  }, [channels]);

  return { channels, featuredGameId, error };
}
