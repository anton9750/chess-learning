// Appens indgangspunkt: finder #root-elementet i index.html og monterer
// hele React-applikationen (App-komponenten) i det.
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
