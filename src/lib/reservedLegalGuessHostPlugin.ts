import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isReservedHostMissPath,
  isReservedLegalGuessPath,
} from "../lib/reservedLegalGuessPaths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const notFoundHtmlPath = path.join(__dirname, "../../public/404.html");
const FALLBACK_NOT_FOUND_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Not found</title><meta name="robots" content="noindex"></head><body><p>Not found</p></body></html>`;

function sendReservedPathNotFound(req: IncomingMessage, res: ServerResponse): void {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end();
    return;
  }

  let body = FALLBACK_NOT_FOUND_HTML;
  try {
    body = fs.readFileSync(notFoundHtmlPath, "utf8");
  } catch {
    body = FALLBACK_NOT_FOUND_HTML;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  res.end(body);
}

function reservedLegalGuessMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void {
  const raw = req.url ?? "/";
  if (!isReservedLegalGuessPath(raw) && !isReservedHostMissPath(raw)) {
    next();
    return;
  }
  sendReservedPathNotFound(req, res);
}

/** Dev/preview: reserved legal-guess paths return HTTP 404 before SPA fallback. */
export function reservedLegalGuessHostPlugin(): Plugin {
  return {
    name: "reserved-legal-guess-host",
    configureServer(server) {
      server.middlewares.use(reservedLegalGuessMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(reservedLegalGuessMiddleware);
    },
  };
}
