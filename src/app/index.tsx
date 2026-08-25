import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ScrollProgressBar from "../components/visuals/ScrollProgressBar";
import { SiteHeader } from "../components/chrome/SiteHeader";
import { SiteFooter } from "../components/chrome/SiteFooter";
import { LegacyRedirect } from "./LegacyRedirect";
import { HISTORICAL_DOCS } from "../data/products";

const Home = lazy(() => import("./Home"));

function WhitepaperRedirect() {
  useEffect(() => {
    window.location.replace(HISTORICAL_DOCS.whitepaperV3);
  }, []);
  return (
    <main id="main" className="px-6 py-16 text-sm text-neutral-300" tabIndex={-1}>
      Opening historical whitepaper…
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <SiteHeader />
      <Suspense fallback={<div className="p-6 text-text">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engine" element={<LegacyRedirect to="/" />} />
          <Route path="/security" element={<LegacyRedirect to="/#trust" />} />
          <Route path="/tokenomics" element={<LegacyRedirect to="/#utility" />} />
          <Route path="/community" element={<LegacyRedirect to="/#community" />} />
          <Route path="/institutional" element={<LegacyRedirect to="/#docs" />} />
          <Route path="/cl8y_whitepaper" element={<WhitepaperRedirect />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </BrowserRouter>
  );
}
