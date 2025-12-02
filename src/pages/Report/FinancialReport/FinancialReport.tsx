import { useEffect, useState } from "react";
import CardAnalysis from "@/components/CardAnalysis";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { relatorioColumns } from "./columns";
import { useFinancialOverview } from "@/hooks/reports/ReportFinance/useFetchFinancialOverview";
import { useFetchFinancialDetailed } from "@/hooks/reports/ReportFinance/useFetchFinancialDetailed";
import { useFetchDailyFinancial } from "@/hooks/reports/ReportFinance/useFetchDailyFinancial";
import { useCompareFinancialPeriods } from "@/hooks/reports/ReportFinance/useCompareFinancialPeriods";
import { mapDetailedToRelatorio } from "./mappers";
import { ChartAreaDaily } from "@/components/ChartAreaInteractive";
import { ChartBarMultiple } from "@/components/ChartBarMultiple";
import { formatPeriod } from "@/utils/formatters";
import { MonthYearPicker } from "@/components/MonthYearPicker";

export default function FinancialReport() {
  const [dateFrom, setDateFrom] = useState<string>();
  const [dateTo, setDateTo] = useState<string>();
  const [periodOne, setPeriodOne] = useState<string>();
  const [periodTwo, setPeriodTwo] = useState<string>();

  const filters = { dateFrom, dateTo };

  const { data: dataOverview } = useFinancialOverview(filters);
  const { data: detailedData } = useFetchFinancialDetailed(filters);
  const { data: dataDaily } = useFetchDailyFinancial(filters);

  const shouldFetchCompare =
    periodOne &&
    periodTwo &&
    /^[0-9]{4}-(0[1-9]|1[0-2])$/.test(periodOne) &&
    /^[0-9]{4}-(0[1-9]|1[0-2])$/.test(periodTwo);

  const { data: compareData, refetch } = useCompareFinancialPeriods(
    shouldFetchCompare ? { periodOne, periodTwo } : undefined,
  );

  const tableData = mapDetailedToRelatorio(detailedData);
  const result = dataOverview?.periodResult ?? 0;

  useEffect(() => {
  if (shouldFetchCompare) {
    refetch();
  }
}, [periodOne, periodTwo]);

  
  return (
    <div className="flex flex-col gap-10 mt-7">
      <div>
        <p className="text-center text-gray-400">
          Período Selecionado <br />
          {dateFrom && dateTo ? formatPeriod(dateFrom, dateTo) : "Todos"}
        </p>
      </div>

      <header className="flex justify-between items-center">
        <label>
          <p>Data Inicial</p>
          <input
            type="date"
            className="bg-white h-12 px-3 rounded cursor-pointer"
            value={dateFrom ?? ""}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </label>
        <label>
          <p>Data Final</p>
          <input
            type="date"
            className="bg-white h-12 px-3 rounded cursor-pointer"
            value={dateTo ?? ""}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </label>
      </header>

      <div className="flex justify-between">
        <CardAnalysis
          title="Receita total"
          value={dataOverview?.totalReceives ?? 0}
          color="bg-blue-500"
        >
          <ArrowUp />
        </CardAnalysis>
        <CardAnalysis
          title="Despesas Totais"
          value={dataOverview?.totalExpenses ?? 0}
          color="bg-blue-500"
        >
          <ArrowDown />
        </CardAnalysis>
        <CardAnalysis
          title="Resultado Mensal"
          value={result}
          color={result >= 0 ? "bg-green-500" : "bg-red-500"}
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
        </DataTable>
      </div>

      <ChartAreaDaily data={dataDaily} />

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
