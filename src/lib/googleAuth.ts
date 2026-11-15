// Tynd "wrapper" omkring Google Identity Services (den rigtige "Log ind med
// Google"-knap). Da appen ikke har nogen backend-server, afkodes det
// returnerede ID-token (en signeret JWT) direkte i browseren for at læse
// brugerens email/navn — det er fint til dette skoleprojekt, men en rigtig
// app bør i stedet verificere tokenet på en server.

// Formen på det svar, Google sender tilbage, når brugeren er logget ind.
interface GoogleCredentialResponse {
  credential: string;
}

// De dele af Googles globale "google"-objekt (indlæst fra deres script),
// som vi rent faktisk bruger.
interface GoogleIdentityApi {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }) => void;
      renderButton: (
        parent: HTMLElement,
        options: Record<string, string | number>
      ) => void;
    };
  };
}

// Fortæller TypeScript, at window.google kan findes, når Googles script er
// indlæst.
declare global {
  interface Window {
    google?: GoogleIdentityApi;
  }
}

const SCRIPT_SRC = "https://accounts.google.com/gsi/client";
// Gemmer løftet, så scriptet kun bliver indlæst én gang, selv hvis flere
// komponenter (login- og signup-siden) kalder funktionen samtidig.
let scriptLoadPromise: Promise<void> | null = null;

// Indlæser Googles Identity Services-script dynamisk, hvis det ikke allerede
// er der. Returnerer et løfte, der er løst, når scriptet er klar til brug.
export function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services script"));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

// Opsætter Google-login med vores client-ID (fra .env-filen) og en
// callback-funktion, der bliver kaldt med ID-tokenet, når brugeren er
// færdig med at logge ind hos Google.
export function initGoogleSignIn(onCredential: (idToken: string) => void) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error("VITE_GOOGLE_CLIENT_ID is not set");
  window.google!.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => onCredential(response.credential),
  });
}

// Tegner selve Googles officielle "Log ind med Google"-knap inde i det
// angivne container-element.
export function renderGoogleButton(container: HTMLElement) {
  window.google!.accounts.id.renderButton(container, {
    theme: "outline",
    size: "large",
    width: 320,
  });
}

// De oplysninger, vi henter ud af Googles ID-token.
export interface GoogleIdentity {
  email: string;
  name: string;
}

// Afkoder ID-tokenet (en JWT) for at læse brugerens email og navn. Vi
// verificerer IKKE tokenets signatur her (det kræver en server) — til dette
// skoleprojekt er det nok bare at læse indholdet.
export function decodeGoogleCredential(idToken: string): GoogleIdentity {
  const payload = idToken.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
  const data = JSON.parse(json);
  return { email: data.email, name: data.name ?? data.email };
}
