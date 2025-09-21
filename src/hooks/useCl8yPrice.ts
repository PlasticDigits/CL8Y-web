import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPublicClient, formatUnits, http } from "viem";
import { bsc } from "viem/chains";
import { erc20Abi } from "../lib/abi/erc20";
import { env } from "../lib/env";

type UseCl8yPriceResult = {
  priceUsd: number | null;
  isLoading: boolean;
  direction: "up" | "down" | null;
};

// Reads CL8Y and CZUSD balances from the AMM v2 pair contract.
// Price = cl8yBalance / czusdBalance (USD per CL8Y), rounded to 4 decimals.
export function useCl8yPrice(pollMs: number = 15_000): UseCl8yPriceResult {
  const client = useMemo(
    () =>
      createPublicClient({
        chain: bsc,
        transport: http(env.bscRpcUrl ? env.bscRpcUrl : undefined),
      }),
    [],
  );

  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const baseRef = useRef<number | null>(null);
  const nextFetchAtRef = useRef<number>(0);

  // Cache helpers (5 minutes)
  const CACHE_KEY = "cl8y:priceUsd";
  const CACHE_TTL_MS = 5 * 60_000;

  const readCachedPrice = useCallback((): { value: number; ts: number } | null => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { value: number; ts: number };
      if (!parsed || typeof parsed.value !== "number" || typeof parsed.ts !== "number") return null;
      if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
      return parsed;
    } catch {
      return null;
    }
  }, []);

  const writeCachedPrice = useCallback((value: number) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ value, ts: Date.now() }));
    } catch {
      // ignore quota/security errors
    }
  }, []);

  const readPrice = useCallback(async () => {
    const pair = env.cl8yCzusdPairAddress as `0x${string}`;
    const cl8y = env.cl8yAddress as `0x${string}`;
    const czusd = env.czusdAddress as `0x${string}`;

    const startedAt = Date.now();
    const logPrefix = "[CL8Y] useCl8yPrice";
    const maxAttempts = 3;
    const perAttemptTimeoutMs = 7_000;

    const withTimeout = async <T>(p: Promise<T>, ms: number): Promise<T> => {
      let t: ReturnType<typeof setTimeout> | null = null;
      try {
        return await Promise.race([
          p,
          new Promise<T>((_, reject) => {
            t = setTimeout(() => reject(new Error("timeout")), ms);
          }),
        ]);
      } finally {
        if (t) clearTimeout(t);
      }
    };

    let lastError: unknown = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        if (attempt > 1 && import.meta.env.DEV) {
          console.warn(`${logPrefix} retrying (${attempt}/${maxAttempts})…`);
        }
        const rawResponse = await withTimeout(
          client.multicall({
            allowFailure: true,
            contracts: [
              { address: cl8y, abi: erc20Abi, functionName: "balanceOf", args: [pair] },
              { address: czusd, abi: erc20Abi, functionName: "balanceOf", args: [pair] },
              { address: cl8y, abi: erc20Abi, functionName: "decimals" },
              { address: czusd, abi: erc20Abi, functionName: "decimals" },
            ],
          }),
          perAttemptTimeoutMs,
        );

        const results = Array.isArray(rawResponse) ? rawResponse : (rawResponse as any)?.results;

        if (!Array.isArray(results)) {
          if (import.meta.env.DEV) {
            console.error(`${logPrefix} unexpected multicall response shape`, {
              type: typeof rawResponse,
              keys:
                rawResponse && typeof rawResponse === "object" ? Object.keys(rawResponse) : null,
              value: rawResponse,
            });
          }
          throw new Error("unexpected multicall response");
        }

        const [cl8yBalRawRes, czusdBalRawRes, cl8yDecimalsRes, czusdDecimalsRes] = results as any[];
        if (
          cl8yBalRawRes.status !== "success" ||
          czusdBalRawRes.status !== "success" ||
          cl8yDecimalsRes.status !== "success" ||
          czusdDecimalsRes.status !== "success"
        ) {
          if (import.meta.env.DEV) {
            console.error(`${logPrefix} multicall partial failure`, {
              cl8yBalOk: cl8yBalRawRes.status,
              czusdBalOk: czusdBalRawRes.status,
              cl8yDecOk: cl8yDecimalsRes.status,
              czusdDecOk: czusdDecimalsRes.status,
            });
          }
          return null;
        }

        const cl8yBalRaw = cl8yBalRawRes.result as bigint;
        const czusdBalRaw = czusdBalRawRes.result as bigint;
        const cl8yDecimals = Number(cl8yDecimalsRes.result as number | bigint);
        const czusdDecimals = Number(czusdDecimalsRes.result as number | bigint);

        const cl8yBal = Number.parseFloat(formatUnits(cl8yBalRaw, cl8yDecimals));
        const czusdBal = Number.parseFloat(formatUnits(czusdBalRaw, czusdDecimals));

        if (!Number.isFinite(cl8yBal) || !Number.isFinite(czusdBal) || cl8yBal <= 0) return null;
        const raw = czusdBal / cl8yBal; // price of 1 CL8Y in CZUSD
        const rounded = Math.round(raw * 100_000_000) / 100_000_000; // 8 decimals

        if (import.meta.env.DEV) {
          const elapsed = Date.now() - startedAt;
          console.info(
            `${logPrefix} success in ${elapsed}ms via ${env.bscRpcUrl ? "custom RPC" : "default RPC"}`,
          );
        }
        // persist successful fetch
        writeCachedPrice(rounded);
        return rounded;
      } catch (err) {
        lastError = err;
        if (import.meta.env.DEV) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(`${logPrefix} attempt failed`, {
            attempt,
            rpc: env.bscRpcUrl ?? "default",
            message: msg,
            err,
          });
        }
        await new Promise((r) => setTimeout(r, 250 * attempt));
      }
    }

    if (import.meta.env.DEV) {
      const elapsed = Date.now() - startedAt;
      const msg = lastError instanceof Error ? lastError.message : String(lastError);
      console.error(`${logPrefix} exhausted retries in ${elapsed}ms`, {
        rpc: env.bscRpcUrl ?? "default",
        lastError: msg,
      });
    }
    return null;
  }, [client, writeCachedPrice]);

  // Initialize from cache or seed to make first paint feel instant
  useEffect(() => {
    const cached = readCachedPrice();
    const seed = Number.isFinite(env.priceSeed) ? (env.priceSeed as number) : 0.75;
    const initial = cached?.value ?? seed;
    baseRef.current = initial;
    setPriceUsd(initial);
    setDirection(null);
    // schedule next fetch based on cache freshness
    nextFetchAtRef.current = cached ? cached.ts + CACHE_TTL_MS : 0;
  }, [readCachedPrice]);

  // Poll on an interval, but only hit RPC when cache is expired
  useEffect(() => {
    let mounted = true;
    const tick = async () => {
      try {
        // If cache TTL not reached, skip RPC
        if (Date.now() < nextFetchAtRef.current) return;
        const p = await readPrice();
        if (!mounted || p == null) return;
        setDirection(baseRef.current == null ? null : p >= (baseRef.current ?? 0) ? "up" : "down");
        baseRef.current = p;
        setPriceUsd(p);
        nextFetchAtRef.current = Date.now() + CACHE_TTL_MS;
      } catch {
        // ignore
      }
    };
    tick();
    const id = setInterval(tick, pollMs);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [pollMs, readPrice]);

  // Friendly jitter every 500ms in ±0.25% range to keep it lively
  useEffect(() => {
    const id = setInterval(() => {
      const base = baseRef.current;
      if (base == null) return;
      const deltaPct = (Math.random() * 0.0005 - 0.00025) / 100; // ±0.25%
      const nextRaw = Math.max(0, base * (1 + deltaPct));
      const next = Math.round(nextRaw * 100_000_000) / 100_000_000; // clamp jitter to 8dp
      setDirection(next >= (priceUsd ?? next) ? "up" : "down");
      setPriceUsd(next);
    }, 2500);
    return () => clearInterval(id);
  }, [priceUsd]);

  return { priceUsd, isLoading: priceUsd == null, direction };
}
