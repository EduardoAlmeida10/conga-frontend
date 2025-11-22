import { useState } from "react";
import { validateProducerProductionRequest } from "@/api/productions/productionProducerRequest";

export function useValidateProducerProductionRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = async (id: string, validated: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await validateProducerProductionRequest(id, validated);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err?.message || "Erro ao validar request");
      setLoading(false);
      throw err;
    }
  };

  return {
    validate,
    loading,
    error,
  };
}
