import CardAnalysis from "@/components/CardAnalysis";
import Button from "@/components/Button.tsx";
import { ChartAreaDaily } from "@/components/ChartAreaInteractive";
import { ChartBarMultiple } from "@/components/ChartBarMultiple";
import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { MonthYearPicker } from "@/components/MonthYearPicker";

import { useCompareFinancialPeriods } from "@/hooks/reports/ReportFinance/useCompareFinancialPeriods";
import { useFetchDailyFinancial } from "@/hooks/reports/ReportFinance/useFetchDailyFinancial";
import { useFetchFinancialDetailed } from "@/hooks/reports/ReportFinance/useFetchFinancialDetailed";
import { useFinancialOverview } from "@/hooks/reports/ReportFinance/useFetchFinancialOverview";
import { useFinancialPdf } from "@/hooks/reports/ReportFinance/useFinancialPdf";

import { createDateRangeSetters } from "@/utils/dateRange";
import { formatPeriod } from "@/utils/formatters";
import { getCurrentMonthRange } from "@/utils/getCurrentMonth";

import { DollarSign, TrendingDown, TrendingUp, FileDown } from "lucide-react";
import { useEffect, useState } from "react";

import { relatorioColumns } from "./columns";
import { mapDetailedToRelatorio } from "./mappers";
import { downloadPdf } from "@/lib/dowloadPdf";

export default function FinancialReport() {
  const { dateFrom: initialFrom, dateTo: initialTo } = getCurrentMonthRange();

  const [dateFrom, setDateFrom] = useState<string | undefined>(initialFrom);
  const [dateTo, setDateTo] = useState<string | undefined>(initialTo);

  const [periodOne, setPeriodOne] = useState<string>();
  const [periodTwo, setPeriodTwo] = useState<string>();

  const filters = { dateFrom, dateTo };

  const { data: overviewData } = useFinancialOverview(filters);
  const { data: detailedData } = useFetchFinancialDetailed(filters);
  const { data: dailyData } = useFetchDailyFinancial(filters);

  const shouldFetchCompare =
    periodOne &&
    periodTwo &&
    /^[0-9]{4}-(0[1-9]|1[0-2])$/.test(periodOne) &&
    /^[0-9]{4}-(0[1-9]|1[0-2])$/.test(periodTwo);

  const {
    data: compareData,
    refetch: refetchCompare,
  } = useCompareFinancialPeriods(
    shouldFetchCompare ? { periodOne, periodTwo } : undefined,
  );

  useEffect(() => {
    if (shouldFetchCompare) {
      refetchCompare();
    }
  }, [periodOne, periodTwo]);

  const { setDateFromSafe, setDateToSafe } = createDateRangeSetters({
    getDateFrom: () => dateFrom,
    getDateTo: () => dateTo,
    setDateFrom,
    setDateTo,
  });

  const {
    refetch: refetchPdf,
    isFetching: pdfLoading,
  } = useFinancialPdf({
    dateFrom,
    dateTo,
  });

  const handleDownload = async () => {
    const result = await refetchPdf();

    if (result.data) {
      downloadPdf(result.data);
    }
  };

  const tableData = mapDetailedToRelatorio(detailedData);
  const result = overviewData?.periodResult ?? 0;

  return (
    <div className="flex flex-col gap-10 mt-7">

      <div className="flex">
        <Button onClick={handleDownload} disabled={pdfLoading}>
          {pdfLoading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
          ) : (
            <FileDown size={18} />
          )}
          <span>{pdfLoading ? "Gerando..." : "Gerar Relatório"}</span>
        </Button>
      </div>
      <header className="flex justify-between items-center">
        <label>
          <p>Data Inicial:</p>
          <input
            type="date"
            value={dateFrom ?? ""}
            onChange={(e) => setDateFromSafe(e.target.value)}
            className="bg-white h-12 px-3 rounded cursor-pointer"
          />
        </label>

        <div>
          <p className="text-center text-gray-400">
            Período Selecionado <br />
            <b>
              {dateFrom && dateTo ? formatPeriod(dateFrom, dateTo) : "Todos"}
            </b>
          </p>
        </div>

        <label>
          <p>Data Final:</p>
          <input
            type="date"
            value={dateTo ?? ""}
            min={dateFrom ?? undefined}
            onChange={(e) => setDateToSafe(e.target.value)}
            className="bg-white h-12 px-3 rounded cursor-pointer"
          />
        </label>
      </header>
      <div className="flex justify-between">
        <CardAnalysis
          title="Receita Total"
          value={overviewData?.totalReceives ?? 0}
          color="bg-blue-500"
          is="valor"
        >
          <TrendingUp />
        </CardAnalysis>

        <CardAnalysis
          title="Despesas Totais"
          value={overviewData?.totalExpenses ?? 0}
          color="bg-blue-500"
          is="valor"
        >
          <TrendingDown />
        </CardAnalysis>

        <CardAnalysis
          title="Resultado Mensal"
          value={result}
          color={result >= 0 ? "bg-green-500" : "bg-red-500"}
          is="valor"
        >
          <DollarSign />
        </CardAnalysis>
      </div>
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <h1 className="font-bold text-2xl text-center mb-5">
          Detalhes Financeiros
        </h1>

        <DataTable data={tableData} columns={relatorioColumns as any}>
          <div className="mb-4 flex justify-between items-center gap-4">
            <DataTableTextFilter placeholder="Pesquisar" />
            <DataTableColumnsVisibilityDropdown />
          </div>

          <DataTableContent />
          <footer className="text-sm text-gray-400">
            Período:{" "}
            {dateFrom && dateTo ? formatPeriod(dateFrom, dateTo) : "Todos"}
          </footer>
        </DataTable>
      </div>
      <ChartAreaDaily data={dailyData} />
      <div className="flex flex-col w-max gap-5">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Comparação de Meses
        </h1>

        <div className="flex justify-between gap-4">
          <MonthYearPicker value={periodOne} onChange={setPeriodOne} />
          <MonthYearPicker value={periodTwo} onChange={setPeriodTwo} />
        </div>

        <ChartBarMultiple
          data={
            compareData
              ? [
                  {
                    month: periodOne ?? "Mês 1",
                    receives: compareData.monthOneData.totalReceives,
                    expenses: compareData.monthOneData.totalExpenses,
                    periodResult: compareData.monthOneData.periodResult,
                  },
                  {
                    month: periodTwo ?? "Mês 2",
                    receives: compareData.monthTwoData.totalReceives,
                    expenses: compareData.monthTwoData.totalExpenses,
                    periodResult: compareData.monthTwoData.periodResult,
                  },
                ]
              : []
          }
        />
      </div>
    </div>
  );
}
