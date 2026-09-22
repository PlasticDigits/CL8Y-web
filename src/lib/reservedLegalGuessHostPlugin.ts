import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isReservedLegalGuessPath,
  RESERVED_HOST_MISS_DESTINATION,
} from "../lib/reservedLegalGuessPaths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const notFoundHtmlPath = path.join(__dirname, "../../public/404.html");

function pathnameFromUrl(url: string | undefined): string {
  return (url ?? "/").split("?")[0]?.split("#")[0] ?? "/";
}

function sendReservedPathNotFound(
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: Error) => void,
): void {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end();
    return;
  }

  let body: string;
  try {
    body = fs.readFileSync(notFoundHtmlPath, "utf8");
  } catch (err) {
    next(err instanceof Error ? err : new Error(String(err)));
    return;
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
  next: (err?: Error) => void,
): void {
  const pathname = pathnameFromUrl(req.url);
  if (pathname === RESERVED_HOST_MISS_DESTINATION) {
    sendReservedPathNotFound(req, res, next);
    return;
  }
  if (!isReservedLegalGuessPath(pathname)) {
    next();
    return;
  }
  sendReservedPathNotFound(req, res, next);
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
