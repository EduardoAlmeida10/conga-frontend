"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";

const chartData = [
  { date: "2024-04-01", receita: 222, produção: 150 },
  { date: "2024-04-02", receita: 97, produção: 180 },
  { date: "2024-04-03", receita: 167, produção: 120 },
  { date: "2024-04-04", receita: 242, produção: 260 },
  { date: "2024-04-05", receita: 373, produção: 290 },
  { date: "2024-04-06", receita: 301, produção: 340 },
  { date: "2024-04-07", receita: 245, produção: 180 },
  { date: "2024-04-08", receita: 409, produção: 320 },
  { date: "2024-04-09", receita: 59, produção: 110 },
  { date: "2024-04-10", receita: 261, produção: 190 },
  { date: "2024-04-11", receita: 327, produção: 350 },
  { date: "2024-04-12", receita: 292, produção: 210 },
  { date: "2024-04-13", receita: 342, produção: 380 },
  { date: "2024-04-14", receita: 137, produção: 220 },
  { date: "2024-04-15", receita: 120, produção: 170 },
  { date: "2024-04-16", receita: 138, produção: 190 },
  { date: "2024-04-17", receita: 446, produção: 360 },
  { date: "2024-04-18", receita: 364, produção: 410 },
  { date: "2024-04-19", receita: 243, produção: 180 },
  { date: "2024-04-20", receita: 89, produção: 150 },
  { date: "2024-04-21", receita: 137, produção: 200 },
  { date: "2024-04-22", receita: 224, produção: 170 },
  { date: "2024-04-23", receita: 138, produção: 230 },
  { date: "2024-04-24", receita: 387, produção: 290 },
  { date: "2024-04-25", receita: 215, produção: 250 },
  { date: "2024-04-26", receita: 75, produção: 130 },
  { date: "2024-04-27", receita: 383, produção: 420 },
  { date: "2024-04-28", receita: 122, produção: 180 },
  { date: "2024-04-29", receita: 315, produção: 240 },
  { date: "2024-04-30", receita: 454, produção: 380 },
  { date: "2024-05-01", receita: 165, produção: 220 },
  { date: "2024-05-02", receita: 293, produção: 310 },
  { date: "2024-05-03", receita: 247, produção: 190 },
  { date: "2024-05-04", receita: 385, produção: 420 },
  { date: "2024-05-05", receita: 481, produção: 390 },
  { date: "2024-05-06", receita: 498, produção: 520 },
  { date: "2024-05-07", receita: 388, produção: 300 },
  { date: "2024-05-08", receita: 149, produção: 210 },
  { date: "2024-05-09", receita: 227, produção: 180 },
  { date: "2024-05-10", receita: 293, produção: 330 },
  { date: "2024-05-11", receita: 335, produção: 270 },
  { date: "2024-05-12", receita: 197, produção: 240 },
  { date: "2024-05-13", receita: 197, produção: 160 },
  { date: "2024-05-14", receita: 448, produção: 490 },
  { date: "2024-05-15", receita: 473, produção: 380 },
  { date: "2024-05-16", receita: 338, produção: 400 },
  { date: "2024-05-17", receita: 499, produção: 420 },
  { date: "2024-05-18", receita: 315, produção: 350 },
  { date: "2024-05-19", receita: 235, produção: 180 },
  { date: "2024-05-20", receita: 177, produção: 230 },
  { date: "2024-05-21", receita: 82, produção: 140 },
  { date: "2024-05-22", receita: 81, produção: 120 },
  { date: "2024-05-23", receita: 252, produção: 290 },
  { date: "2024-05-24", receita: 294, produção: 220 },
  { date: "2024-05-25", receita: 201, produção: 250 },
  { date: "2024-05-26", receita: 213, produção: 170 },
  { date: "2024-05-27", receita: 420, produção: 460 },
  { date: "2024-05-28", receita: 233, produção: 190 },
  { date: "2024-05-29", receita: 78, produção: 130 },
  { date: "2024-05-30", receita: 340, produção: 280 },
  { date: "2024-05-31", receita: 178, produção: 230 },
  { date: "2024-06-01", receita: 178, produção: 200 },
  { date: "2024-06-02", receita: 470, produção: 410 },
  { date: "2024-06-03", receita: 103, produção: 160 },
  { date: "2024-06-04", receita: 439, produção: 380 },
  { date: "2024-06-05", receita: 88, produção: 140 },
  { date: "2024-06-06", receita: 294, produção: 250 },
  { date: "2024-06-07", receita: 323, produção: 370 },
  { date: "2024-06-08", receita: 385, produção: 320 },
  { date: "2024-06-09", receita: 438, produção: 480 },
  { date: "2024-06-10", receita: 155, produção: 200 },
  { date: "2024-06-11", receita: 92, produção: 150 },
  { date: "2024-06-12", receita: 492, produção: 420 },
  { date: "2024-06-13", receita: 81, produção: 130 },
  { date: "2024-06-14", receita: 426, produção: 380 },
  { date: "2024-06-15", receita: 307, produção: 350 },
  { date: "2024-06-16", receita: 371, produção: 310 },
  { date: "2024-06-17", receita: 475, produção: 520 },
  { date: "2024-06-18", receita: 107, produção: 170 },
  { date: "2024-06-19", receita: 341, produção: 290 },
  { date: "2024-06-20", receita: 408, produção: 450 },
  { date: "2024-06-21", receita: 169, produção: 210 },
  { date: "2024-06-22", receita: 317, produção: 270 },
  { date: "2024-06-23", receita: 480, produção: 530 },
  { date: "2024-06-24", receita: 132, produção: 180 },
  { date: "2024-06-25", receita: 141, produção: 190 },
  { date: "2024-06-26", receita: 434, produção: 380 },
  { date: "2024-06-27", receita: 448, produção: 490 },
  { date: "2024-06-28", receita: 149, produção: 200 },
  { date: "2024-06-29", receita: 103, produção: 160 },
  { date: "2024-06-30", receita: 446, produção: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  receita: {
    label: "Receita",
    color: "var(--chart-1)",
  },
  produção: {
    label: "Produção",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("receita");

  const total = React.useMemo(
    () => ({
      receita: chartData.reduce((acc, curr) => acc + curr.receita, 0),
      produção: chartData.reduce((acc, curr) => acc + curr.produção, 0),
    }),
    [],
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["receita", "produção"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
