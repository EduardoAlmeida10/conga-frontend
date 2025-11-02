import { useEffect, useState } from "react";
import {
  findAllOperationalCosts,
  type OperationalCost,
  type OperationalCostFilterDto,
} from "../api/operational-costApi";

export function useOperationalCosts(filters: OperationalCostFilterDto) {
  const [data, setData] = useState<OperationalCost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentFilters: OperationalCostFilterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await findAllOperationalCosts(currentFilters);
      setData(response.data);
    } catch (err) {
      setError("Falha ao buscar despesas.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  return { data, isLoading, error, refetch: () => fetchData(filters) };
}
