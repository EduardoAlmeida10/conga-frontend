import type {
  ProducerProductionRequest
} from "@/api/productions/productionProducerRequest";
import {
  findAllProducerProductionRequests,
} from "@/api/productions/productionProducerRequest";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useFetchProducerProductionRequests(pageIndex: number, pageSize: number, status?: string) {
  const [data, setData] = useState<ProducerProductionRequest[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      page: pageIndex + 1,
      limit: pageSize,
      status: status
    }),
    [pageIndex, pageSize, status],
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await findAllProducerProductionRequests(filters);

      setData(response.data);
      setTotalItems(response.total ?? 0)
    } catch (err: any) {
      setError(err.message || "Erro ao buscar requests");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalItems, loading, error, refetch: fetchData };
}
