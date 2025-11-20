import { useEffect, useState } from "react";
import {
  findAllUtilityCosts,
  type UtilityCost,
  type UtilityCostFilterDto,
} from "../../api/costs/utility-costApi";

export function useUtilityCosts(filters: UtilityCostFilterDto) {
  const [data, setData] = useState<UtilityCost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentFilters: UtilityCostFilterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await findAllUtilityCosts(currentFilters);
      setData(response.data || []);
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
