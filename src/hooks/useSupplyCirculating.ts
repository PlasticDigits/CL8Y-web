import { useSupplyTotal } from "./useSupplyTotal";

type TotalData = { totalSupply: number; burned: number };

function isTotalData(value: unknown): value is TotalData {
  const v = value as Partial<TotalData> | null | undefined;
  return !!v && typeof v.totalSupply === "number" && typeof v.burned === "number";
}

export function useSupplyCirculating() {
  const total = useSupplyTotal();

  const data = isTotalData(total.data)
    ? { circulatingSupply: total.data.totalSupply, burned: total.data.burned }
    : undefined;

  return {
    ...total,
    data,
  } as typeof total & { data: { circulatingSupply: number; burned: number } | undefined };
}
