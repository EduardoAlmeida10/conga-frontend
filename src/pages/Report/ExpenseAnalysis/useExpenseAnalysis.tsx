import type { FinancialOverviewFilters } from "@/api/reports/ReportExpense";
import { useBarChart } from "@/hooks/reports/ReportExpenses/useBarChart";
import { useLineChart } from "@/hooks/reports/ReportExpenses/useLineChart";
import { usePieChart } from "@/hooks/reports/ReportExpenses/usePieChart";
import { createDateRangeSetters } from "@/utils/dateRange";
import { useState } from "react";
import { getCurrentMonthRange } from "../../../utils/getCurrentMonth";

export function useExpenseAnalysis() {
  const defaultRange = getCurrentMonthRange();

  const [dateFrom, setDateFrom] = useState<string | undefined>(
    defaultRange.dateFrom,
  );
  const [dateTo, setDateTo] = useState<string | undefined>(defaultRange.dateTo);

  const [periodOne, setPeriodOne] = useState("2025-11");
  const [periodTwo, setPeriodTwo] = useState("2025-12");

  const { setDateFromSafe, setDateToSafe } = createDateRangeSetters({
    getDateFrom: () => dateFrom,
    getDateTo: () => dateTo,
    setDateFrom,
    setDateTo,
  });

  const filters: FinancialOverviewFilters | undefined =
    dateFrom || dateTo ? { dateFrom, dateTo } : undefined;

  const { lineChartData, isLoading: isLineLoading } = useLineChart(filters);

  const { pieChartData, isLoading: isPieLoading } = usePieChart(filters);

  const { barChart, isLoading: isBarLoading } = useBarChart(
    periodOne && periodTwo ? { periodOne, periodTwo } : undefined,
  );

  const clearDateFilters = () => {
    setDateFromSafe(undefined);
    setDateToSafe(undefined);
  };

  return {
    // dados
    lineChartData,
    pieChartData,
    barChart,

    // loading
    isLineLoading,
    isPieLoading,
    isBarLoading,

    // filtros
    dateFrom,
    dateTo,
    setDateFrom: setDateFromSafe,
    setDateTo: setDateToSafe,
    periodOne,
    setPeriodOne,
    periodTwo,
    setPeriodTwo,

    clearDateFilters,
  };
}
