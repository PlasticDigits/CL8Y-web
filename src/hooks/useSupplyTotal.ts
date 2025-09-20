import { useQuery } from "@tanstack/react-query";
import { env } from "../lib/env";

const INITIAL_SUPPLY = 3_000_000;
const DEFAULT_SUPPLY_URL = "https://listing-api.cl8y.com/api/v3/supply/total/cl8y";
const CACHE_KEY = "cl8y:supplyTotal";
const CACHE_TTL_MS = 30 * 60_000; // 30 minutes
const IS_DEV = false;

function readCachedSupply(): number | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value: number; ts: number };
    if (!parsed || typeof parsed.value !== "number" || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      if (IS_DEV) console.debug("[supply-total] cache expired", { ts: parsed.ts });
      return null;
    }
    if (IS_DEV) console.debug("[supply-total] cache hit", { value: parsed.value });
    return parsed.value;
  } catch {
    if (IS_DEV) console.debug("[supply-total] cache read error");
    return null;
  }
}

function writeCachedSupply(value: number) {
  try {
    if (IS_DEV) console.debug("[supply-total] cache write", { value });
    localStorage.setItem(CACHE_KEY, JSON.stringify({ value, ts: Date.now() }));
  } catch {
    // ignore quota/security errors
  }
}

export function useSupplyTotal() {
  return useQuery({
    queryKey: ["supply-total"],
    queryFn: async () => {
      const cached = readCachedSupply();
      if (cached != null && Number.isFinite(cached)) {
        const burnedCached = Math.max(0, INITIAL_SUPPLY - cached);
        if (IS_DEV)
          console.debug("[supply-total] using cached value", {
            totalSupply: cached,
            burned: burnedCached,
          });
        return { totalSupply: cached, burned: burnedCached };
      }

      const endpoint = env.supplyTotalApi ?? DEFAULT_SUPPLY_URL;
      if (IS_DEV) console.debug("[supply-total] fetching", { endpoint });
      const res = await fetch(endpoint, { headers: { Accept: "*/*" } });
      if (!res.ok) throw new Error("Failed to fetch supply total");
      const contentType = res.headers.get("content-type") || "";
      if (IS_DEV) console.debug("[supply-total] fetched", { status: res.status, contentType });

      let totalSupply: number | null = null;
      if (contentType.includes("application/json")) {
        try {
          const json: unknown = await res.json();
          // Common shapes: { result: string|number } or { value: string|number }
          // Fallback: number/string directly
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const candidate =
            (json as any)?.result ?? (json as any)?.value ?? (json as any)?.total ?? json;
          if (typeof candidate === "number") {
            totalSupply = candidate;
          } else if (typeof candidate === "string") {
            const parsed = Number.parseFloat(candidate.replace(/[\,\s]/g, ""));
            totalSupply = Number.isFinite(parsed) ? parsed : null;
          }
          if (IS_DEV) console.debug("[supply-total] parsed from json", { json, totalSupply });
        } catch (e) {
          if (IS_DEV) console.debug("[supply-total] json parse failed, will try text", e);
        }
      }

      if (totalSupply == null) {
        const text = await res.text();
        // Extract first numeric token from text
        const match = text.match(/-?\d+(?:\.\d+)?/);
        if (match) {
          const parsed = Number.parseFloat(match[0]);
          if (Number.isFinite(parsed)) totalSupply = parsed;
        }
        if (IS_DEV) console.debug("[supply-total] parsed from text", { text, totalSupply });
      }

      if (!Number.isFinite(totalSupply as number)) throw new Error("Invalid total supply format");
      writeCachedSupply(totalSupply as number);
      const burned = Math.max(0, INITIAL_SUPPLY - (totalSupply as number));
      if (IS_DEV) console.debug("[supply-total] parsed final", { totalSupply, burned });
      return { totalSupply: totalSupply as number, burned };
    },
    staleTime: CACHE_TTL_MS,
    gcTime: CACHE_TTL_MS * 2,
    refetchOnMount: "always",
    refetchInterval: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    initialData: () => {
      // Seed from env default first for faster first paint
      const seed = Number.isFinite(env.supplyDefault) ? env.supplyDefault : null;
      if (seed != null) {
        const burned = Math.max(0, INITIAL_SUPPLY - seed);
        if (IS_DEV) console.debug("[supply-total] initialData from env", { seed, burned });
        return { totalSupply: seed, burned };
      }
      return undefined;
    },
    onSuccess: (data) => {
      if (IS_DEV) console.debug("[supply-total] onSuccess", data);
    },
    onError: (err) => {
      if (IS_DEV) console.debug("[supply-total] onError", err);
    },
  });
}
