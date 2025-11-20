import { useEffect, useState } from "react";
import {
  findAllSupplieCosts,
  type SupplieCost,
  type SupplieCostFilterDto,
} from "../../api/costs/supllie-costApi";

export function useSupplieCosts(filters: SupplieCostFilterDto) {
  const [data, setData] = useState<SupplieCost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentFilters: SupplieCostFilterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await findAllSupplieCosts(currentFilters);
      setData(response.data);
    } catch (err) {
      setError("Falha ao buscar despesas.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!filters) return;
    fetchData(filters);
  }, [filters]);

  return { data, isLoading, error, refetch: () => fetchData(filters) };
}
