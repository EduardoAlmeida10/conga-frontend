import { useQuery } from "@tanstack/react-query";
import {
  compareFinancialPeriods,
  type ComparePeriodsDto,
  type ComparePeriodsResponse,
} from "@/api/reports/ReportFinance/ReportFinace";

export function useCompareFinancialPeriods(dto: ComparePeriodsDto | undefined) {
  return useQuery<ComparePeriodsResponse>({
    queryKey: ["compare-financial-periods", dto?.periodOne, dto?.periodTwo],
    queryFn: () => {
      if (!dto) throw new Error("Missing periods (periodOne and periodTwo)");
      return compareFinancialPeriods(dto);
    },
    enabled: !!dto?.periodOne && !!dto?.periodTwo,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
