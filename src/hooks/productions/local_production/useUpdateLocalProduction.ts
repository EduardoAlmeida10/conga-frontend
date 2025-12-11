import {
  updateLocalProduction,
  type LocalProductionApiData,
  type UpdateLocalProductionDto,
} from "@/api/productions/productionLocal";
import { useCallback, useState } from "react";

export function useUpdateLocalProduction() {
  const [data, setData] = useState<LocalProductionApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (id: string, dto: UpdateLocalProductionDto) => {
      try {
        setLoading(true);
        setError(null);

        const response = await updateLocalProduction(id, dto);

        setData(response);
        return response;
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Erro ao atualizar produção local."
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, mutate };
}