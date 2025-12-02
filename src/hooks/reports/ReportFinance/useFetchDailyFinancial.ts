import { useEffect, useState } from "react";
import { getFinancialDaily, type FinancialOverviewFilters } from "@/api/reports/ReportFinance/ReportFinace";

interface ChartDailyItem {
  date: string;
  revenue: number;
  expense: number;
}

export function useFetchDailyFinancial(filters?: FinancialOverviewFilters) {
  const [data, setData] = useState<ChartDailyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const response = await getFinancialDaily(filters);

        const mapped: ChartDailyItem[] = response.map((item) => ({
          date: item.date + "T00:00:00",
          revenue: item.receives,
          expense: item.expenses,
        }));

        setData(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters?.dateFrom, filters?.dateTo]);

  return { data, loading, error };
}
