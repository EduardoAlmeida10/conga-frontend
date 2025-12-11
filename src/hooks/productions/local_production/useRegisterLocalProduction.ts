import {
  registerLocalProduction,
  type LocalProductionApiData,
  type RegisterLocalProductionDto,
} from "@/api/productions/productionLocal";
import { useCallback, useState } from "react";

export function useRegisterLocalProduction() {
  const [data, setData] = useState<LocalProductionApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (dto: RegisterLocalProductionDto) => {
    try {
      setLoading(true);
      setError(null);

      const response = await registerLocalProduction(dto);

      setData(response);
      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao registrar produção local."
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
