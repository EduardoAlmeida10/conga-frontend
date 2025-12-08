import {
  updateLocalProduction,
  type LocalProductionApiData,
  type UpdateLocalProductionDto,
} from "@/api/productions/productionLocal";
import { useState } from "react";

export function useUpdateLocalProduction() {
  const [data, setData] = useState<LocalProductionApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function execute(id: string, dto: UpdateLocalProductionDto) {
    setLoading(true);
    setError(null);

    try {
      const response = await updateLocalProduction(id, dto);
      setData(response);
      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao atualizar produção local.",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, execute };
}