import {
  getExpensesOverview,
  type FinancialOverview,
  type FinancialOverviewFilters,
} from "@/api/reports/ReportExpense/";
import { useQuery } from "@tanstack/react-query";

export function usePieChart(filters?: FinancialOverviewFilters) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["pieChart", filters?.dateFrom ?? null, filters?.dateTo ?? null],
    queryFn: () => getExpensesOverview(filters),
    refetchOnWindowFocus: false,
  });

  return {
    pieChartData: data as FinancialOverview | undefined,
    isLoading: isFetching,
    refetchPieChart: refetch,
  };
}
