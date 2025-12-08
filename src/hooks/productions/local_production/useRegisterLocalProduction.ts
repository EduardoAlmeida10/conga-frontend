import {
  registerLocalProduction,
  type LocalProductionApiData,
  type RegisterLocalProductionDto,
} from "@/api/productions/productionLocal";
import { useState } from "react";

export function useRegisterLocalProduction() {
  const [data, setData] = useState<LocalProductionApiData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function execute(dto: RegisterLocalProductionDto) {
    setLoading(true);
    setError(null);

    try {
      const response = await registerLocalProduction(dto);
      setData(response);
      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao registrar produção local.",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, execute };
}