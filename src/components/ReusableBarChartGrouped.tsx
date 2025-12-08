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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// --- TIPOS ---

interface BarChartDatum {
  [key: string]: any;
}

// Define uma série (uma barra) com sua chave de dado, rótulo e cor
export interface BarChartSeries {
  // Exportado para ser usado em ExpenseAnalysis
  key: string; // A chave do dado (ex: 'Período 1', 'Período 2')
  label: string; // O rótulo na legenda/tooltip
  color: string; // A cor de fallback (ex: 'var(--chart-1)')
}

interface ReusableBarChartGroupedProps {
  data: BarChartDatum[];
  series: BarChartSeries[];
  dataKeyX: string; // Chave para o eixo X (ex: 'category')
  title: string;
  description: string;
  footerText: string;
  footerCaption: string;
}

// --- FUNÇÃO DO COMPONENTE ---

export function ReusableBarChartGrouped({
  data,
  series,
  dataKeyX,
  title,
  description,
  footerText,
  footerCaption,
}: ReusableBarChartGroupedProps) {
  // 1. Cria a chartConfig dinamicamente, usando fallback de cor CSS
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    series.forEach((s) => {
      config[s.key] = {
        label: s.label,
        // Usa fallback CSS: se --color-KEY não existir, usa s.color literal
        color: `var(--color-${s.key}, ${s.color})`,
      };
    });
    return config;
  }, [series]);

  // 2. Formatação do tick do Eixo X
  // const xTickFormatter = (value: any) => {
  //   // Retorna os 3 primeiros caracteres, ou o valor completo se for curto
  //   const strValue = String(value);
  //   return strValue.length > 3 ? strValue.slice(0, 3) : strValue;
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyX}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            {/* Tooltip com indicador 'dashed' para múltiplas barras */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            {/* 3. Renderiza as barras dinamicamente */}
            {series.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                // 🛑 Não usamos stackId para barras agrupadas
                fill={chartConfig[s.key].color}
                radius={4} // Raio padrão para todas as barras
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {footerText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {footerCaption}
        </div>
      </CardFooter>
    </Card>
  );
}
