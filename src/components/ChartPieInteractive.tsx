"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

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
  ChartStyle,
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

// ... Interfaces (PieSectorDataItemMinimal, ChartData, ReusablePieChartProps) permanecem as mesmas ...
interface PieSectorDataItemMinimal {
  outerRadius?: number;
  cx?: number;
  cy?: number;
  [key: string]: any;
}

interface ChartData {
  [key: string]: any;
}

interface ReusablePieChartProps {
  data: ChartData[];
  chartConfig: ChartConfig;
  dataKey: string;
  nameKey: string;
  title: string;
  description: string;
  valueLabel: string;
}
// Componente de Gráfico de Pizza Reutilizável
export function ChartPieInteractive({
  data,
  chartConfig,
  dataKey,
  nameKey,
  title,
  description,
  valueLabel,
}: ReusablePieChartProps) {
  const id = `pie-interactive-${title.replace(/\s/g, "")}`;

  // Valor sentinela para o estado "sem filtro" (não pode ser "")
  const initialActiveItem = "total";

  // REMOVEMOS: [open, setOpen] e handleItemClick

  const [activeItem, setActiveItem] = React.useState(initialActiveItem);

  // SIMPLIFICADO: Apenas define o novo valor, o botão 'Limpar' faz o reset
  const handleValueChange = React.useCallback((newValue: string) => {
    setActiveItem(newValue);
  }, []);

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item[nameKey] === activeItem),
    [activeItem, data, nameKey],
  );

  const activeData =
    activeIndex !== -1 ? data[activeIndex] : { [dataKey]: 0, [nameKey]: "" };
  const names = React.useMemo(
    () => data.map((item) => item[nameKey]),
    [data, nameKey],
  );

  const totalValue = React.useMemo(() => {
    return data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
  }, [data, dataKey]);

  // ... CustomActiveShape permanece o mesmo ...
  const CustomActiveShape = React.useCallback(
    ({ outerRadius = 0, ...props }: PieSectorDataItemMinimal) => (
      <g>
        <Sector {...props} outerRadius={outerRadius + 10} />
        <Sector
          {...props}
          outerRadius={outerRadius + 25}
          innerRadius={outerRadius + 12}
        />
      </g>
    ),
    [],
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select
          // REMOVEMOS: open e onOpenChange
          value={activeItem}
          onValueChange={handleValueChange}
          disabled={names.length === 0}
        >
          <SelectTrigger
            className="ml-auto h-7 w-[170px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder={`Selecione`}>
              {/* Exibe o rótulo correto no trigger */}
              {activeItem === initialActiveItem
                ? "Total" // Mudando para "Total" no trigger para ser mais conciso
                : chartConfig[activeItem as keyof typeof chartConfig]?.label ||
                  activeItem}
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {/* ITENS DE DADOS (AGORA NO TOPO) */}
            {names.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) return null;

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                  // REMOVEMOS: onClick
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: config?.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}

            <div className="mx-2 my-1 border-t border-border" />

            <SelectItem
              key={initialActiveItem}
              value={initialActiveItem}
              className="rounded-lg font-semibold [&>span]:flex [&>span]:justify-center"
            >
              Limpar Filtro
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={CustomActiveShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const displayValue = activeData[dataKey]
                      ? activeData[dataKey].toLocaleString()
                      : totalValue.toLocaleString();
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {displayValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {valueLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
