import { SemesterSelector } from "@/components/SemesterSelector";
import type { ChartConfig } from "@/components/ui/chart";
import { formatPeriod } from "@/utils/formatters";
import { useMemo, useState } from "react";
import {
  ChartLineInteractive,
  type LineChartSeries,
} from "../../../components/ChartLineInteractive";
import { ChartPieInteractive } from "../../../components/ChartPieInteractive";
import {
  filterBySemester,
  type SemesterFilter,
} from "../../../utils/filterBySemester";
import { getCurrentSemester } from "../../../utils/getCurrentSemester";
import { ChartBarStacked } from "./ChartBarStacked";
import { useExpenseAnalysis } from "./useRevenueAnalysis";

const productionChartConfig: ChartConfig = {
  "Produção Local": { label: "Produção Local", color: "var(--chart-1)" },
  "Consumo Local": { label: "Consumo Local", color: "var(--chart-2)" },
};

const dataKeysMap = {
  grossQuantity: "Produção Local",
  consumedQuantity: "Consumo Local",
};

export default function RevenueAnalysis() {
  const {
    lineChartData,
    pieChartData,
    barChartData,
    dateTo,
    setDateTo,
    dateFrom,
    setDateFrom,
  } = useExpenseAnalysis();

  const [semesterFilter, setSemesterFilter] = useState<SemesterFilter>(() =>
    getCurrentSemester()
  );

  const filteredBarData = useMemo(() => {
    if (!barChartData) return [];

    return filterBySemester(barChartData, semesterFilter)
      .sort(
        (a, b) =>
          new Date(`${a.month}-01T00:00:00`).getTime() -
          new Date(`${b.month}-01T00:00:00`).getTime(),
      )
      .map((item) => ({
        month: new Date(`${item.month}-01T00:00:00`).toLocaleDateString(
          "pt-BR",
          { month: "short" },
        ),
        local: Number(item.localTotal),
        producer: Number(item.producerTotal),
        total: Number(item.total),
      }));
  }, [barChartData, semesterFilter]);

  // -- LineChart
  const series: LineChartSeries[] = [
    {
      key: "tankQuantity",
      label: "Produção",
      color: "#22c55e",
      valueType: "number",
      unit: "L",
    },
    {
      key: "totalPrice",
      label: "Receita",
      color: "#3b82f6",
      valueType: "currency",
    },
  ];

  // -- PieChart
  const productionData = useMemo(() => {
    if (!pieChartData) return [];

    return [
      {
        name: dataKeysMap.consumedQuantity,
        value: Number(pieChartData.consumedQuantity),
        fill: productionChartConfig["Consumo Local"].color,
      },
      {
        name: dataKeysMap.grossQuantity,
        value: Number(pieChartData.grossQuantity),
        fill: productionChartConfig["Produção Local"].color,
      },
    ];
  }, [pieChartData]);

  const grossQuantity = pieChartData?.totalQuantity ?? "0.00";

  return (
    <>
      <div className="flex flex-col gap-10 mt-7">
        <p className="text-center text-gray-400">
          Período Selecionado <br />
          <b>{dateFrom && dateTo ? formatPeriod(dateFrom, dateTo) : "Todos"}</b>
        </p>

        <header className="flex justify-between items-center">
          <label>
            <p>Data Inicial:</p>
            <input
              type="date"
              value={dateFrom ?? ""}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-white h-12 px-3 rounded cursor-pointer"
            />
          </label>

          <label>
            <p>Data Final:</p>
            <input
              type="date"
              value={dateTo ?? ""}
              min={dateFrom ?? undefined}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-white h-12 px-3 rounded cursor-pointer"
            />
          </label>
        </header>

        <ChartLineInteractive
          title="Análise de Receitas ao Longo do Tempo"
          description="Evolução das receitas"
          data={lineChartData}
          series={series}
          defaultActiveKey="totalPrice"
          reverseDates={false}
          showCurrency
          compactNumbers={false}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="flex-1">
          <ChartPieInteractive
            data={productionData}
            chartConfig={productionChartConfig}
            dataKey="value"
            nameKey="name"
            title="Distribuição da Produção Local"
            description={`Quantidade Total: ${Number(
              grossQuantity,
            ).toLocaleString("pt-BR")} Litros`}
            valueLabel="Litros"
          />
        </div>

        <div className="flex-1 space-y-4">
          <SemesterSelector
            value={semesterFilter}
            onChange={setSemesterFilter}
          />

          <ChartBarStacked data={filteredBarData} />
        </div>
      </div>
    </>
  );
}
