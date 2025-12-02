import { useEffect, useState } from "react";
import { getFinancialOverview } from "@/api/reports/ReportFinance/ReportFinace";
import type {
  FinancialOverview,
  FinancialOverviewFilters,
} from "@/api/reports/ReportFinance/ReportFinace";

export function useFinancialOverview(filters?: FinancialOverviewFilters) {
  const [data, setData] = useState<FinancialOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOverview() {
      try {
        setLoading(true);
        setError(null);

        const response = await getFinancialOverview(filters);
        setData(response);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchOverview();
  }, [filters?.dateFrom, filters?.dateTo]);

  return { data, loading, error };
}
