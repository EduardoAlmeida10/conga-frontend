import type {
  PaginatedProducerProductions,
} from "@/api/productions/productionProducer.ts";
import {
  findAllProducerProductions,
} from "@/api/productions/productionProducer.ts";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useFetchProducerProduction(pageIndex: number, pageSize: number) {
  const [data, setData] = useState<PaginatedProducerProductions | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
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

      const res = await findAllProducerProductions(filters);

      setData(res);
      setTotalItems(res.total ?? 0)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar produções");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalItems, loading, error, refetch: fetchData };
}
