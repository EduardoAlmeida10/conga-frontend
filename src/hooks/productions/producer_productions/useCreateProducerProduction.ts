"use client";

import { useState } from "react";
import { registerProducerProduction} from "@/api/productions/productionProducer.ts";
import type { RegisterProducerProductionDto } from "@/api/productions/productionProducer.ts";

export function useCreateProducerProduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create(data: RegisterProducerProductionDto) {
    try {
      setLoading(true);
      setError(null);

      const res = await registerProducerProduction(data);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar produção");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, error };
}

