import { useQuery } from "@tanstack/react-query";
import { getFinancialPdf, type FinancialOverviewFilters } from "@/api/reports/ReportFinance/ReportFinace";

export function useFinancialPdf(filters?: FinancialOverviewFilters) {
  return useQuery({
    queryKey: ["financial-pdf", filters],
    queryFn: () => getFinancialPdf(filters),
    enabled: false,
  });
}