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

interface PieSectorDataItemMinimal {
  outerRadius?: number;
  cx?: number;
  cy?: number;
  // Adicione outras propriedades se você precisar delas explicitamente,
  // como startAngle, endAngle, fill, payload, etc.
  [key: string]: any; // Para cobrir todas as props restantes
}

// Interface para o dado de entrada, que deve ser um array
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
  valueLabel: string; // Rótulo para o centro do gráfico (ex: Total, Quantidade)
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
  const id = `pie-interactive-${title.replace(/\s/g, "")}`; // ID único

  // O valor inicial será o primeiro item de dados ou uma string vazia
  const initialActiveItem = data.length > 0 ? data[0][nameKey] : "";

  const [activeItem, setActiveItem] = React.useState(initialActiveItem);

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item[nameKey] === activeItem),
    [activeItem, data, nameKey],
  );

  const activeData = data[activeIndex] || { [dataKey]: 0, [nameKey]: "" };
  const names = React.useMemo(
    () => data.map((item) => item[nameKey]),
    [data, nameKey],
  );

  // Lógica para calcular o total geral para exibir no centro
  const totalValue = React.useMemo(() => {
    return data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
  }, [data, dataKey]);

  // Função customizada para o shape ativo
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
      {/* ChartStyle deve usar a configuração passada via props */}
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {/* Select para Interatividade: Agora usa os nomes de forma dinâmica */}
        <Select
          value={activeItem}
          onValueChange={setActiveItem}
          disabled={names.length === 0} // Desabilita se não houver dados
        >
          <SelectTrigger
            className="ml-auto h-7 w-[170px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder={`Selecione`} />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {names.map((key) => {
              // Busca a configuração pela chave do nome (ex: "PERSONNEL")
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) return null;

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        // A cor é baseada no nome do item, que deve estar no chartConfig
                        backgroundColor: config?.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
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
              dataKey={dataKey} // Chave do valor
              nameKey={nameKey} // Chave do nome
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={CustomActiveShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {/* Exibe o valor do item ativo */}
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {/* Use o valor do item ativo no centro, ou o total, dependendo da necessidade */}
                          {activeData[dataKey]
                            ? activeData[dataKey].toLocaleString()
                            : totalValue.toLocaleString()}
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
