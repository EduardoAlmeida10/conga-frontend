import { useEffect, useState } from "react";
import {
  getFinancialDetailed,
  type FinancialDetailed,
  type FinancialOverviewFilters,
} from "@/api/reports/ReportFinance/ReportFinace";

export function useFetchFinancialDetailed(filters?: FinancialOverviewFilters) {
  const [data, setData] = useState<FinancialDetailed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetailed() {
      try {
        setLoading(true);
        setError(null);

        const response = await getFinancialDetailed(filters);
        setData(response);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetailed();
  }, [filters?.dateFrom, filters?.dateTo]);

  return { data, loading, error };
}
