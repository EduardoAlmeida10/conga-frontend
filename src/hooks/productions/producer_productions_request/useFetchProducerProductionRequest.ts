"use client";

import { useState, useEffect } from "react";
import {
  findAllProducerProductionRequests,
} from "@/api/productions/productionProducerRequest";
import type {
  FilterProducerProductionRequestDto,
  PaginatedProducerProductionRequests,
} from "@/api/productions/productionProducerRequest";

export function useFetchProducerProductionRequests(filters?: FilterProducerProductionRequestDto) {
  const [data, setData] = useState<PaginatedProducerProductionRequests>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (filterParams?: FilterProducerProductionRequestDto) => {
    try {
      setLoading(true);
      setError(null);

      const response = await findAllProducerProductionRequests(filterParams || filters || {});
      setData(response);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  return { data, loading, error, refetch: fetchData };
}
