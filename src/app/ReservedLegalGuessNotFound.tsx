import { Helmet } from "react-helmet-async";

/** Minimal response when a legal-guess path reaches the client (dev / missed host rule). */
export function ReservedLegalGuessNotFound() {
  return (
    <>
      <Helmet>
        <title>Not found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main id="main" className="px-6 py-16 text-sm text-neutral-400" tabIndex={-1}>
        <p>Not found</p>
      </main>
    </>
  );
}
