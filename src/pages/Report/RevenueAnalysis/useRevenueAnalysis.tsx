import type { ReceivesFilterDto } from "@/api/receives/receives";
import { useBarChartReceives } from "@/hooks/reports/ReportReceives/useBarChart";
import { useLineChartReceive } from "@/hooks/reports/ReportReceives/useLineChart";
import { usePieChart } from "@/hooks/reports/ReportReceives/usePieChart";
import { createDateRangeSetters } from "@/utils/dateRange";
import { useState } from "react";
import { getCurrentMonthRange } from "../../../utils/getCurrentMonth";

export function useExpenseAnalysis() {
  const defaultRange = getCurrentMonthRange();

  const [dateFrom, setDateFrom] = useState<string | undefined>(
    defaultRange.dateFrom,
  );
  const [dateTo, setDateTo] = useState<string | undefined>(defaultRange.dateTo);

  const { setDateFromSafe, setDateToSafe } = createDateRangeSetters({
    getDateFrom: () => dateFrom,
    getDateTo: () => dateTo,
    setDateFrom,
    setDateTo,
  });

  const filters: ReceivesFilterDto = {
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
  };

  const { data, isLoading: isLineLoading } = useLineChartReceive(filters);

  const { pieChartData, isLoading: isPieLoading } = usePieChart(filters);

  const { barChartData, isLoading: isBarLoadind } = useBarChartReceives();

  const clearDateFilters = () => {
    setDateFromSafe(undefined);
    setDateToSafe(undefined);
  };

  return {
    // dados
    lineChartData: data,
    pieChartData,
    barChartData,

    // loading
    isLineLoading,
    isPieLoading,
    isBarLoadind,

    // filtros
    dateFrom,
    dateTo,
    setDateFrom: setDateFromSafe,
    setDateTo: setDateToSafe,

    clearDateFilters,
  };
}
