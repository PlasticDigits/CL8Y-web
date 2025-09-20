import React from "react";
import ReactDOM from "react-dom/client";
import "./theme/index.css";
import "./styles/global.css";
import { AppProviders } from "./providers/AppProviders";
import { App } from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
