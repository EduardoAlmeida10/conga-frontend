import {
  compareExpensesPeriods,
  type ComparePeriodsDto,
  type ComparePeriodsResponse,
} from "@/api/reports/ReportExpense";
import { useQuery } from "@tanstack/react-query";

export function useBarChart(dto: ComparePeriodsDto | undefined) {
  const { data, isFetching, refetch } = useQuery<ComparePeriodsResponse>({
    queryKey: ["compare-expenses-periods", dto?.periodOne, dto?.periodTwo],
    queryFn: () => {
      if (!dto) throw new Error("Missing periods (periodOne and periodTwo)");
      return compareExpensesPeriods(dto);
    },
    enabled: !!dto?.periodOne && !!dto?.periodTwo,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    barChart: data as ComparePeriodsResponse | undefined,
    isLoading: isFetching,
    refetchLineChart: refetch,
  };
}
