// Små hjælpefunktioner til at læse og skrive JSON i browserens localStorage.
// Bruges i hele appen til at gemme ting som brugere, tema-valg og gemte spil,
// da der ikke findes nogen rigtig backend-server.

// Læser en nøgle fra localStorage og parser den som JSON. Hvis nøglen ikke
// findes, eller indholdet er ugyldigt JSON, returneres fallback-værdien i
// stedet for at smide en fejl.
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Gemmer en vilkårlig værdi i localStorage ved at omdanne den til en
// JSON-streng først.
export function writeJSON<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
