import { useState, useEffect } from "react";
import {
  findAllPersonnelCosts,
  type PersonnelCost,
  type PersonnelCostFilterDto,
} from "../api/personnel-costApi";

export function usePersonnelCosts(filters: PersonnelCostFilterDto) {
  const [data, setData] = useState<PersonnelCost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (currentFilters: PersonnelCostFilterDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await findAllPersonnelCosts(currentFilters);
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
