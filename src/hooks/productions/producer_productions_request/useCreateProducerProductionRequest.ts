import { useState, useCallback } from "react";
import {
  registerProducerProductionRequest,
} from "@/api/productions/productionProducerRequest";
import type {
  RegisterProducerProductionRequestDto,
  ProducerProductionRequest,
} from "@/api/productions/productionProducerRequest";

export function useCreateProducerProductionRequest() {
  const [data, setData] = useState<ProducerProductionRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (dto: RegisterProducerProductionRequestDto) => {
    try {
      setLoading(true);
      setError(null);

      const response = await registerProducerProductionRequest(dto);

      setData(response);
      return response;
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao registrar produção do produtor.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    create,
    data,
    loading,
    error,
  };
}
