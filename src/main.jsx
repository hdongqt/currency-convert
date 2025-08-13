import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RatesContext from "./context/RatesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RatesContext>
      <App />
    </RatesContext>
  </StrictMode>
);
