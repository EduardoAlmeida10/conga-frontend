import {
  getReceivesOverview,
  type FinancialOverviewFilters,
  type FinancialReceiveLocal,
} from "@/api/reports/ReportReceives";
import { useQuery } from "@tanstack/react-query";

export function usePieChart(filters?: FinancialOverviewFilters) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["pieChart", filters?.dateFrom ?? null, filters?.dateTo ?? null],
    queryFn: () => getReceivesOverview(filters),
    refetchOnWindowFocus: false,
  });

  return {
    pieChartData: data as FinancialReceiveLocal | undefined,
    isLoading: isFetching,
    refetchPieChart: refetch,
  };
}
