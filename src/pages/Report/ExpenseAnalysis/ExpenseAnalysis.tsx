import type { ComparePeriodsResponse } from "@/api/reports/ReportExpense";
import { MonthYearPicker } from "@/components/MonthYearPicker";
import type { ChartConfig } from "@/components/ui/chart";
import { formatPeriod } from "@/utils/formatters";
import { useMemo } from "react";
import {
  ChartLineInteractive,
  type LineChartDatum,
  type LineChartSeries,
} from "../../../components/ChartLineInteractive";
import { ChartPieInteractive } from "../../../components/ChartPieInteractive";
import {
  ReusableBarChartGrouped,
  type BarChartSeries,
} from "../../../components/ReusableBarChartGrouped";
import { useExpenseAnalysis } from "./useExpenseAnalysis";

export default function ExpenseAnalysis() {
  const {
    lineChartData,
    pieChartData,
    barChart,
    dateTo,
    setDateTo,
    dateFrom,
    setDateFrom,
    periodOne,
    setPeriodOne,
    periodTwo,
    setPeriodTwo,
  } = useExpenseAnalysis();

  const categoryNameMap: { [key: string]: string } = {
    PERSONNEL: "Pessoal",
    UTILITY: "Utilidades",
    SUPPLIES: "Insumos",
    OPERATIONAL: "Operacional",
  };

  // --LineChart

  const lineChartSeries: LineChartSeries[] = [
    {
      key: "total",
      label: "Total",
      color: "#3b82f6",
      valueType: "currency",
    },
    {
      key: "personnel",
      label: "Pessoal",
      color: "#ef4444",
      valueType: "currency",
    },
    {
      key: "utility",
      label: "Utilidades",
      color: "#f59e0b",
      valueType: "currency",
    },
    {
      key: "supplies",
      label: "Insumos",
      color: "#22c55e",
      valueType: "currency",
    },
    {
      key: "operational",
      label: "Operacional",
      color: "#8b5cf6",
      valueType: "currency",
    },
  ];

  const formattedData: LineChartDatum[] =
    lineChartData?.map((item) => ({
      date: item.date,
      total: item.total,
      personnel: item.personnel,
      utility: item.utility,
      supplies: item.supplies,
      operational: item.operational,
    })) || [];

  // --PieChart

  const expensesChartConfig = {
    value: { label: "Valor" },
    category: { label: "Categoria" },
    PERSONNEL: { label: "Pessoal", color: "var(--chart-1)" },
    UTILITY: { label: "Utilidades", color: "var(--chart-2)" },
    SUPPLIES: { label: "Insumos", color: "var(--chart-3)" },
    OPERATIONAL: { label: "Operacional", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  const expensesData = useMemo(() => {
    if (!pieChartData || !pieChartData.categories) {
      return []; // Retorna array vazio enquanto carrega ou não tem dados
    }

    return Object.entries(pieChartData.categories).map(([category, value]) => ({
      category: category,
      value: value as number,
      fill: `var(--color-${category})`,
    }));
  }, [pieChartData]);

  const totalExpenses = pieChartData?.total ?? 0;

  // --BarChart

  const transformBarChartData = (
    data: ComparePeriodsResponse | undefined,
    periodOneLabel: string,
    periodTwoLabel: string,
  ) => {
    if (!data) return [];

    const categories = Object.keys(data.monthOneData.categories);

    return categories.map((category) => ({
      // Chave para o Eixo X
      category: categoryNameMap[category] || category,
      // Chaves de dados para as barras
      [periodOneLabel]:
        data.monthOneData.categories[
          category as keyof typeof data.monthOneData.categories
        ],
      [periodTwoLabel]:
        data.monthTwoData.categories[
          category as keyof typeof data.monthTwoData.categories
        ],
    }));
  };

  // Exemplo: formatar os períodos de filtro para os rótulos
  const periodOneLabel = periodOne ?? "Período 1";
  const periodTwoLabel = periodTwo ?? "Período 2";

  const formattedBarData = transformBarChartData(
    barChart,
    periodOneLabel,
    periodTwoLabel,
  );

  // 3. Configuração de Série para o Gráfico de Barras
  // Como queremos comparar MÊS 1 e MÊS 2 lado a lado, o empilhamento não é o ideal.
  // Vamos usar o formato para comparar o mesmo item em diferentes meses.

  const comparisonBarSeries: BarChartSeries[] = [
    { key: periodOneLabel, label: periodOneLabel, color: "var(--chart-1)" },
    { key: periodTwoLabel, label: periodTwoLabel, color: "var(--chart-2)" },
  ];

  return (
    <>
      <div className="flex flex-col gap-10 mt-7 mb-16">
        <div>
          <p className="text-center text-gray-400">
            Período Selecionado <br />
            <b>
              {dateFrom && dateTo ? formatPeriod(dateFrom, dateTo) : "Todos"}
            </b>
          </p>
        </div>

        <header className="flex justify-between items-center gap-4">
          <label className="flex flex-col">
            <p>Data Inicial:</p>
            <input
              type="date"
              className="bg-white h-12 px-3 rounded cursor-pointer"
              value={dateFrom ?? ""}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <p>Data Final:</p>
            <input
              type="date"
              className="bg-white h-12 px-3 rounded cursor-pointer"
              value={dateTo ?? ""}
              min={dateFrom ?? undefined}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </label>
        </header>

        <div>
          <ChartLineInteractive
            title="Análise de Despesas ao Longo do Tempo"
            description="Evolução das despesas"
            data={formattedData}
            series={lineChartSeries}
            defaultActiveKey="total"
            reverseDates={false}
            showCurrency={true}
            compactNumbers={true} // ← Ativa formatação compacta para números grandes
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Distribuição de Despesas
          </h1>
          <ChartPieInteractive
            data={expensesData} // O array transformado (ou vazio)
            chartConfig={expensesChartConfig}
            dataKey="value"
            nameKey="category"
            title="Distribuição de Despesas"
            description={`Total: R$ ${totalExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            valueLabel="Despesas (R$)"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Comparação de Meses
          </h1>

          <div className="flex justify-between gap-4 mb-4">
            <MonthYearPicker value={periodOne} onChange={setPeriodOne} />
            <MonthYearPicker value={periodTwo} onChange={setPeriodTwo} />
          </div>

          <ReusableBarChartGrouped
            data={formattedBarData}
            series={comparisonBarSeries} // Array de chaves: [Mês 1, Mês 2]
            dataKeyX="category" // Chave de categoria no Eixo X
            title="Despesas por Categoria (Comparativo)"
            description={`Comparando ${periodOneLabel} vs ${periodTwoLabel}`}
            footerText={`Diferença Total: R$ ${((barChart?.monthTwoData.total || 0) - (barChart?.monthOneData.total || 0)).toLocaleString()}`}
            footerCaption="Análise da variação das despesas entre os períodos"
          />
        </div>
      </div>
    </>
  );
}
