import {
  registerLocalProduction,
  type RegisterLocalProductionDto,
} from "@/api/productions/productionLocal";
import { useCallback, useState } from "react";

export function useRegisterLocalProduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (dto: RegisterLocalProductionDto) => {
    try {
      setLoading(true);
      setError(null);

      await registerLocalProduction(dto);
      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao registrar produção local.",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, mutate };
}
