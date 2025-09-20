import { useMemo } from "react";
import { useSupplyTotal } from "./useSupplyTotal";

type BurnStats = { totalBurned: number };

export function useBurnStats() {
  const total = useSupplyTotal();

  const data: BurnStats | undefined = useMemo(() => {
    if (!total.data) return undefined;
    return { totalBurned: total.data.burned };
  }, [total.data]);

  return {
    ...total,
    data,
  } as typeof total & { data: BurnStats | undefined };
}
