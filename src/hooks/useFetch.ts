// Generisk hook til at hente JSON-data fra en URL. Genbruges af alt, der
// skal hente data fra et API (lige nu kun Lichess, se useLichessTvChannels).
import { useEffect, useState } from "react";

// Det, hooken returnerer: selve dataen, en evt. fejlbesked, og om vi
// stadig venter på svar.
interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

/** Generic JSON fetch hook. Re-fetches whenever `url` changes. */
// Henter data fra "url" hver gang den ændrer sig (eller ved første render).
// Hvis "url" er null, gøres der ingenting (bruges til "hent ikke endnu").
export function useFetch<T>(url: string | null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    // "cancelled" bruges til at undgå at opdatere state, hvis komponenten
    // er blevet unmountet, eller url'en er skiftet, inden kaldet er færdigt.
    let cancelled = false;
    setData(null);
    setError(null);
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json: T) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't reach the API right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Oprydningsfunktion: kører hvis url'en skifter igen, eller
    // komponenten forsvinder, inden kaldet er færdigt.
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, error, loading };
}
