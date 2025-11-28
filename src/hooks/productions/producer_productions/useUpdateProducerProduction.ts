import { useState } from "react";
import {
  updateProducerProduction
} from "@/api/productions/productionProducer.ts";
import type {
  UpdateProducerProductionDto
} from "@/api/productions/productionProducer.ts";

export function useUpdateProducerProduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function update(id: string, dto: UpdateProducerProductionDto) {
    try {
      setLoading(true);
      const res = await updateProducerProduction(id, dto);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar produção");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { update, loading, error };
}
