"use client";

import { useEffect, useState } from "react";
import {
  findAllProducerProductions,
} from "@/api/productions/productionProducer.ts";
import type {
  FilterProducerProductionDto,
  PaginatedProducerProductions,
} from "@/api/productions/productionProducer.ts";

export function useFetchProducerProduction(initialFilters: FilterProducerProductionDto = {}) {
  const [data, setData] = useState<PaginatedProducerProductions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(initialFilters);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await findAllProducerProductions(filters);
      setData(res);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar produções");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [filters]);

  return { data, loading, error, setFilters, refetch: fetchData };
}
