import { useState, useCallback } from "react";

import {
  updateProducerProductionRequest,
} from "@/api/productions/productionProducerRequest";
import type{
  UpdateProducerProductionRequestDto,
  ProducerProductionRequest,
} from "@/api/productions/productionProducerRequest";

export function useUpdateProducerProductionRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    async (id: string, dto: UpdateProducerProductionRequestDto) => {
      setLoading(true);
      setError(null);
      try {
        const updated: ProducerProductionRequest = await updateProducerProductionRequest(
          id,
          dto
        );
        return updated;
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar a request");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { update, loading, error };
}
