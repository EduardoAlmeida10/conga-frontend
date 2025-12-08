"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface ChartBarStackedProps {
  data: {
    month: string;
    local: number;
    producer: number;
    total: number;
  }[];
  isLoading?: boolean;
}

const chartConfig = {
  local: {
    label: "Produção Local",
    color: "var(--chart-1)",
  },
  producer: {
    label: "Produtor",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;

    const total = Number(dataItem.total).toLocaleString("pt-BR");

    return (
      <div className="rounded-lg border bg-white p-2 shadow-sm text-sm">
        <p className="font-semibold">{label}</p>

        <p className="text-muted-foreground mb-1">Total: {total} Litros</p>

        {payload.map((entry: any, index: number) => {
          const dataKey = entry.name as keyof typeof chartConfig;
          const friendlyLabel = chartConfig[dataKey]?.label || entry.name;

          return (
            <div
              key={`item-${index}`}
              className="flex justify-between items-center"
              style={{ color: entry.color }}
            >
              <span className="capitalize">{friendlyLabel}:</span>
              <span className="font-medium ml-2">
                {Number(entry.value).toLocaleString("pt-BR")} Litros
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export function ChartBarStacked({
  data,
  isLoading = false,
}: ChartBarStackedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produção por Mês</CardTitle>
        <CardDescription>Local x Produtor</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              // 💡 SOLUÇÃO: Aumenta a largura mínima do container do tooltip
              wrapperStyle={{ minWidth: 200, padding: 0 }}
              content={<CustomTooltipContent chartConfig={chartConfig} />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="local" stackId="a" fill="var(--color-local)" />
            <Bar dataKey="producer" stackId="a" fill="var(--color-producer)" />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        {isLoading ? (
          <span className="text-muted-foreground">Carregando dados...</span>
        ) : (
          <div className="flex gap-2 leading-none font-medium">
            Distribuição mensal <TrendingUp className="h-4 w-4" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
