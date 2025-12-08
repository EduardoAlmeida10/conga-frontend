import {
  getExpensesDaily,
  type FinancialOverviewFilters,
} from "@/api/reports/ReportExpense";
import { useQuery } from "@tanstack/react-query";

export function useLineChart(filters?: FinancialOverviewFilters) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["lineChart", filters?.dateFrom ?? null, filters?.dateTo ?? null],
    queryFn: () => getExpensesDaily(filters),
    refetchOnWindowFocus: false,
  });

  return {
    lineChartData: data ?? [],
    isLoading: isFetching,
    refetchLineChart: refetch,
  };
}
