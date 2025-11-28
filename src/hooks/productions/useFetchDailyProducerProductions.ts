import type { DailyProduction } from "@/api/productions/dailyProduction";
import { getDailyProduction } from "@/api/productions/dailyProduction";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useFetchDailyProducerProduction(
  pageIndex: number,
  pageSize: number,
) {
  const [data, setData] = useState<DailyProduction[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      page: pageIndex + 1,
      limit: pageSize,
    }),
    [pageIndex, pageSize],
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDailyProduction(filters);
      console.log(response);
      console.log(response.data);
      console.log(response.total);
      setData(response.data);
      setTotalItems(response.total ?? 0);
    } catch (err: any) {
      setError(err.message ?? "Erro ao carregar produção diária.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    totalItems,
    loading,
    error,
    refetch: fetchData,
  };
}
