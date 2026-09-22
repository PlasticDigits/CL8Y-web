import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import BlogListPage from "../blog/BlogListPage";
import BlogPostPage from "../blog/BlogPostPage";
import { DefaultHead } from "./DefaultHead";
import ScrollProgressBar from "../components/visuals/ScrollProgressBar";
import { SiteHeader } from "../components/chrome/SiteHeader";
import { SiteFooter } from "../components/chrome/SiteFooter";
import { LegacyRedirect } from "./LegacyRedirect";
import { HashScroll } from "./HashScroll";
import { HISTORICAL_DOCS } from "../data/products";
import { isReservedLegalGuessPath } from "../lib/reservedLegalGuessPaths";
import { ReservedLegalGuessNotFound } from "./ReservedLegalGuessNotFound";

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

function MarketingShell() {
  const { pathname } = useLocation();
  if (isReservedLegalGuessPath(pathname)) {
    return <ReservedLegalGuessNotFound />;
  }

  return (
    <>
      <DefaultHead />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <HashScroll />
      <SiteHeader />
      <Suspense fallback={<div className="p-6 text-text">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engine" element={<LegacyRedirect to="/" />} />
          <Route path="/security" element={<LegacyRedirect to="/#trust" />} />
          <Route path="/tokenomics" element={<LegacyRedirect to="/#utility" />} />
          <Route path="/community" element={<LegacyRedirect to="/#community" />} />
          <Route path="/institutional" element={<LegacyRedirect to="/#docs" />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/cl8y_whitepaper" element={<WhitepaperRedirect />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <MarketingShell />
    </BrowserRouter>
  );
}
