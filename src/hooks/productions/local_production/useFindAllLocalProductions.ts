import {
  findAllLocalProductions,
  type FilterLocalProductionDto,
  type PaginatedLocalProductions,
} from "@/api/productions/productionLocal";
import { useState } from "react";

export function useFindAllLocalProductions() {
  const [data, setData] = useState<PaginatedLocalProductions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function execute(filters: FilterLocalProductionDto = {}) {
    setLoading(true);
    setError(null);

    try {
      const response = await findAllLocalProductions(filters);
      setData(response);
      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao buscar produções locais.",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, execute };
}