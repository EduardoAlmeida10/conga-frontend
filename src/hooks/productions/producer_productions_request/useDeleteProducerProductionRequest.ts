import { useState, useCallback } from "react";
import { deleteProducerProductionRequest } from "@/api/productions/productionProducerRequest";

export function useDeleteProducerProductionRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProducerProductionRequest(id);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar a request");
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
}
