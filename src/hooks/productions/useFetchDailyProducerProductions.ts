"use client";

import { useState, useEffect, useCallback } from "react";
import { getDailyProduction } from "@/api/productions/dailyProduction";
import type { DailyProduction } from "@/api/productions/dailyProduction";

export function useFetchDailyProducerProduction(filters?: Record<string, any>) {
  const [data, setData] = useState<DailyProduction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDailyProduction(filters);
      setData(response.data);
    } catch (err: any) {
      setError(err.message ?? "Erro ao carregar produção diária.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}
