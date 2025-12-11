import {
  findAllLocalProductions,
  type PaginatedLocalProductions,
} from "@/api/productions/productionLocal";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useFindAllLocalProductions(pageIndex: number, pageSize: number) {
  const [data, setData] = useState<PaginatedLocalProductions | null>(null);
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

      const res = await findAllLocalProductions(filters);

      setData(res);
      setTotalItems(res.total ?? 0);

      return res;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erro ao carregar produções locais."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalItems, loading, error, refetch: fetchData };
}
