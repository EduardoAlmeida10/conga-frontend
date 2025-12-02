import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartDailyItem {
  date: string;
  revenue: number;
  expense: number;
}

const chartConfig = {
  revenue: {
    label: "Receitas",
    color: "#16a34a",
  },
  expense: {
    label: "Despesas",
    color: "#dc2626",
  },
} satisfies ChartConfig;

interface Props {
  data: ChartDailyItem[];
}

export function ChartAreaDaily({ data }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const lastDateString = data[data.length - 1].date;
    const lastDate = new Date(lastDateString);

    let days = 90;
    if (timeRange === "30d") days = 30;
    if (timeRange === "7d") days = 7;

    const startDate = new Date(lastDate);
    startDate.setDate(startDate.getDate() - days);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Receitas x Despesas</CardTitle>
          <CardDescription>
            Evolução diária no período selecionado
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Selecione"
          >
            <SelectValue placeholder="Últimos 90 dias" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 90 dias
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("pt-BR")
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />

            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
