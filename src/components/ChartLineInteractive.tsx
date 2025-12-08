"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

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

export type LineChartDatum<T = Record<string, number | string>> = {
  date: string;
} & T;

export type LineChartSeries = {
  key: string;
  label: string;
  color: string;
  valueType?: "currency" | "number";
  unit?: string;
};

interface ChartLineInteractiveProps<T extends Record<string, number | string>> {
  title: string;
  description?: string;
  data: LineChartDatum<T>[];
  series: LineChartSeries[];
  defaultActiveKey?: string;
  reverseDates?: boolean;
  showCurrency?: boolean;
  currencySymbol?: string;
  compactNumbers?: boolean; // Nova prop para formatar números grandes
}

export function ChartLineInteractive<
  T extends Record<string, number | string>,
>({
  title,
  description,
  data,
  series,
  defaultActiveKey,
  reverseDates = true,
  showCurrency = true,
  currencySymbol = "R$",
  compactNumbers = true, // Por padrão formata números grandes
}: ChartLineInteractiveProps<T>) {
  const [activeKey, setActiveKey] = React.useState(
    defaultActiveKey ?? series[0]?.key,
  );

  const activeSeries = React.useMemo(
    () => series.find((s) => s.key === activeKey),
    [series, activeKey],
  );

  // Processar dados
  const processedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    let processed = [...data];

    processed = processed.map((item) => {
      const dateStr = item.date;
      let correctedDate = dateStr;

      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        correctedDate = `${dateStr}T00:00:00`;
      }

      return {
        ...item,
        date: correctedDate,
      };
    });

    processed.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    if (reverseDates) {
      processed = processed.reverse();
    }

    return processed;
  }, [data, reverseDates]);

  // Calcular totais
  const totals = React.useMemo(() => {
    return series.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.key] = processedData.reduce(
        (sum, row) => sum + Number(row[curr.key] ?? 0),
        0,
      );
      return acc;
    }, {});
  }, [processedData, series]);

  // Criar chartConfig
  const chartConfig = React.useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};

    series.forEach((s) => {
      config[s.key] = {
        label: s.label,
        color: s.color.includes("var(--") ? s.color : `var(--color-${s.key})`,
      };
    });

    return config;
  }, [series]);

  // Função para formatar números grandes de forma compacta
  const formatCompactNumber = (value: number): string => {
    if (!compactNumbers) {
      return value.toLocaleString("pt-BR");
    }

    // Formatos: 1K = 1.000, 1M = 1.000.000, 1B = 1.000.000.000
    if (Math.abs(value) >= 1000000000) {
      return (
        (value / 1000000000).toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }) + "B"
      );
    }

    if (Math.abs(value) >= 1000000) {
      return (
        (value / 1000000).toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }) + "M"
      );
    }

    if (Math.abs(value) >= 1000) {
      return (
        (value / 1000).toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }) + "k"
      );
    }

    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Função para formatar números com R$
  const formatValue = (
    value: number,
    valueType?: LineChartSeries["valueType"],
    unit?: string,
  ) => {
    // Formatação base (compacta ou não)
    const formattedNumber = compactNumbers
      ? formatCompactNumber(value)
      : value.toLocaleString("pt-BR");

    switch (valueType) {
      case "currency":
        if (!showCurrency) {
          return formattedNumber;
        }

        // Se for compacto, não colocar espaço
        return compactNumbers && Math.abs(value) >= 1000
          ? `${currencySymbol}${formattedNumber}`
          : `${currencySymbol} ${formattedNumber}`;

      case "number":
      default:
        return unit ? `${formattedNumber} ${unit}` : formattedNumber;
    }
  };

  // Função para formatar data no eixo X
  const formatXAxisTick = (value: string) => {
    try {
      const date = new Date(value);
      return date.toLocaleDateString("pt-BR", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return value;
    }
  };

  // Função para formatar label do tooltip
  const formatTooltipLabel = (value: string) => {
    try {
      const date = new Date(value);
      return date.toLocaleDateString("pt-BR", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return value;
    }
  };

  // Formatar valor no tooltip
  const formatTooltipValue = (value: ValueType) => {
    const numValue = typeof value === "number" ? value : Number(value);

    if (isNaN(numValue)) {
      return String(value);
    }

    const formatted = numValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (!showCurrency) {
      return formatted;
    }

    return `${currencySymbol} ${formatted}`;
  };

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap">
          {series.map((s) => (
            <button
              key={s.key}
              data-active={activeKey === s.key}
              className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => setActiveKey(s.key)}
            >
              <span className="text-muted-foreground text-xs">{s.label}</span>
              <span className="text-lg leading-none font-bold sm:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
                {formatValue(totals[s.key] ?? 0, s.valueType, s.unit)}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={processedData}
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
              tickFormatter={formatXAxisTick}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                formatValue(
                  Number(value),
                  activeSeries?.valueType,
                  activeSeries?.unit,
                )
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={formatTooltipLabel}
                  formatter={formatTooltipValue}
                />
              }
            />
            <Line
              dataKey={activeKey}
              type="monotone"
              stroke={
                series.find((s) => s.key === activeKey)?.color ||
                `var(--color-${activeKey})`
              }
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
