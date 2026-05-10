import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./theme/index.css";
import "./styles/global.css";
import { AppProviders } from "./providers/AppProviders";
import { App } from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </HelmetProvider>
  </React.StrictMode>,
);
