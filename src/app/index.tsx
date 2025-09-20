import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollProgressBar from "../components/visuals/ScrollProgressBar";

const Home = lazy(() => import("./Home"));
const Engine = lazy(() => import("../features/engine/Engine"));
const Security = lazy(() => import("../features/security/Security"));
const Tokenomics = lazy(() => import("../features/tokenomics/Tokenomics"));
const Community = lazy(() => import("../features/community/Community"));
const Institutional = lazy(() => import("../features/institutional/Institutional"));

export function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgressBar />
      <Suspense fallback={<div className="p-6 text-text">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engine" element={<Engine />} />
          <Route path="/security" element={<Security />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/community" element={<Community />} />
          <Route path="/institutional" element={<Institutional />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
