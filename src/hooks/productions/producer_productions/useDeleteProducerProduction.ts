
"use client";

import { useState } from "react";
import { deleteProducerProduction } from "@/api/productions/productionProducer.ts";

export function useDeleteProducerProduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove(id: string) {
    try {
      setLoading(true);
      const res = await deleteProducerProduction(id);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar produção");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { remove, loading, error };
}
