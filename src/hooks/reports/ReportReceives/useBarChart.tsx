import {
  getReceivesMonthly,
  type FinancialMonthReceive,
} from "@/api/reports/ReportReceives";
import { useQuery } from "@tanstack/react-query";

export function useBarChartReceives() {
  const { data, isLoading } = useQuery({
    queryKey: ["receives-monthly"],
    queryFn: getReceivesMonthly,
    refetchOnWindowFocus: false,
  });

  return {
    barChartData: data as FinancialMonthReceive[] | undefined,
    isLoading,
  };
}
