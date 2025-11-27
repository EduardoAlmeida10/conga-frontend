import { useCallback, useEffect, useRef, useState } from "react";
import {
  findAllUtilityCosts,
  type UtilityCost,
  type UtilityCostFilterDto,
} from "../../api/costs/utility-costApi";

export function useUtilityCosts(filters: UtilityCostFilterDto, enabled = true) {
  const [data, setData] = useState<UtilityCost[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastFiltersRef = useRef(filters);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await findAllUtilityCosts(lastFiltersRef.current);

      setData(response.data);
      setTotal(response.total ?? 0);
    } catch (err) {
      setError("Falha ao buscar despesas.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]); // dependência CORRETA

  useEffect(() => {
    lastFiltersRef.current = filters;

    if (enabled) {
      fetchData();
    }
  }, [filters, enabled, fetchData]);

  return { data, total, isLoading, error, refetch: fetchData };
}

