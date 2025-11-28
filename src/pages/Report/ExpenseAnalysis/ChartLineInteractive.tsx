"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

export const description =
  "An interactive line chart for Pessoal, Produção, Insumos, and Operacional.";

// Função auxiliar para gerar um valor mockado
const getRandomValue = (base: number, variation: number) =>
  Math.floor(base + (Math.random() - 0.5) * variation);

// 1. DADOS: Adicionando as chaves 'insumos' e 'operacional' aos dados existentes.
const chartData = [
  // pessoal e Produção mantidas, Insumos e Operacional simulados
  {
    date: "2024-04-01",
    pessoal: 222,
    produção: 150,
    insumos: getRandomValue(50, 10),
    operacional: getRandomValue(80, 15),
  },
  {
    date: "2024-04-02",
    pessoal: 97,
    produção: 180,
    insumos: getRandomValue(55, 10),
    operacional: getRandomValue(85, 15),
  },
  {
    date: "2024-04-03",
    pessoal: 167,
    produção: 120,
    insumos: getRandomValue(60, 10),
    operacional: getRandomValue(90, 15),
  },
  {
    date: "2024-04-04",
    pessoal: 242,
    produção: 260,
    insumos: getRandomValue(65, 10),
    operacional: getRandomValue(95, 15),
  },
  {
    date: "2024-04-05",
    pessoal: 373,
    produção: 290,
    insumos: getRandomValue(70, 10),
    operacional: getRandomValue(100, 15),
  },
  {
    date: "2024-04-06",
    pessoal: 301,
    produção: 340,
    insumos: getRandomValue(75, 10),
    operacional: getRandomValue(105, 15),
  },
  {
    date: "2024-04-07",
    pessoal: 245,
    produção: 180,
    insumos: getRandomValue(80, 10),
    operacional: getRandomValue(110, 15),
  },
  {
    date: "2024-04-08",
    pessoal: 409,
    produção: 320,
    insumos: getRandomValue(85, 10),
    operacional: getRandomValue(115, 15),
  },
  {
    date: "2024-04-09",
    pessoal: 59,
    produção: 110,
    insumos: getRandomValue(90, 10),
    operacional: getRandomValue(120, 15),
  },
  {
    date: "2024-04-10",
    pessoal: 261,
    produção: 190,
    insumos: getRandomValue(95, 10),
    operacional: getRandomValue(125, 15),
  },
  {
    date: "2024-04-11",
    pessoal: 327,
    produção: 350,
    insumos: getRandomValue(100, 10),
    operacional: getRandomValue(130, 15),
  },
  {
    date: "2024-04-12",
    pessoal: 292,
    produção: 210,
    insumos: getRandomValue(105, 10),
    operacional: getRandomValue(135, 15),
  },
  {
    date: "2024-04-13",
    pessoal: 342,
    produção: 380,
    insumos: getRandomValue(110, 10),
    operacional: getRandomValue(140, 15),
  },
  {
    date: "2024-04-14",
    pessoal: 137,
    produção: 220,
    insumos: getRandomValue(115, 10),
    operacional: getRandomValue(145, 15),
  },
  {
    date: "2024-04-15",
    pessoal: 120,
    produção: 170,
    insumos: getRandomValue(120, 10),
    operacional: getRandomValue(150, 15),
  },
  {
    date: "2024-04-16",
    pessoal: 138,
    produção: 190,
    insumos: getRandomValue(125, 10),
    operacional: getRandomValue(155, 15),
  },
  {
    date: "2024-04-17",
    pessoal: 446,
    produção: 360,
    insumos: getRandomValue(130, 10),
    operacional: getRandomValue(160, 15),
  },
  {
    date: "2024-04-18",
    pessoal: 364,
    produção: 410,
    insumos: getRandomValue(135, 10),
    operacional: getRandomValue(165, 15),
  },
  {
    date: "2024-04-19",
    pessoal: 243,
    produção: 180,
    insumos: getRandomValue(140, 10),
    operacional: getRandomValue(170, 15),
  },
  {
    date: "2024-04-20",
    pessoal: 89,
    produção: 150,
    insumos: getRandomValue(145, 10),
    operacional: getRandomValue(175, 15),
  },
  {
    date: "2024-04-21",
    pessoal: 137,
    produção: 200,
    insumos: getRandomValue(150, 10),
    operacional: getRandomValue(180, 15),
  },
  {
    date: "2024-04-22",
    pessoal: 224,
    produção: 170,
    insumos: getRandomValue(155, 10),
    operacional: getRandomValue(185, 15),
  },
  {
    date: "2024-04-23",
    pessoal: 138,
    produção: 230,
    insumos: getRandomValue(160, 10),
    operacional: getRandomValue(190, 15),
  },
  {
    date: "2024-04-24",
    pessoal: 387,
    produção: 290,
    insumos: getRandomValue(165, 10),
    operacional: getRandomValue(195, 15),
  },
  {
    date: "2024-04-25",
    pessoal: 215,
    produção: 250,
    insumos: getRandomValue(170, 10),
    operacional: getRandomValue(200, 15),
  },
  {
    date: "2024-04-26",
    pessoal: 75,
    produção: 130,
    insumos: getRandomValue(175, 10),
    operacional: getRandomValue(205, 15),
  },
  {
    date: "2024-04-27",
    pessoal: 383,
    produção: 420,
    insumos: getRandomValue(180, 10),
    operacional: getRandomValue(210, 15),
  },
  {
    date: "2024-04-28",
    pessoal: 122,
    produção: 180,
    insumos: getRandomValue(185, 10),
    operacional: getRandomValue(215, 15),
  },
  {
    date: "2024-04-29",
    pessoal: 315,
    produção: 240,
    insumos: getRandomValue(190, 10),
    operacional: getRandomValue(220, 15),
  },
  {
    date: "2024-04-30",
    pessoal: 454,
    produção: 380,
    insumos: getRandomValue(195, 10),
    operacional: getRandomValue(225, 15),
  },
  {
    date: "2024-05-01",
    pessoal: 165,
    produção: 220,
    insumos: getRandomValue(200, 10),
    operacional: getRandomValue(230, 15),
  },
  {
    date: "2024-05-02",
    pessoal: 293,
    produção: 310,
    insumos: getRandomValue(205, 10),
    operacional: getRandomValue(235, 15),
  },
  {
    date: "2024-05-03",
    pessoal: 247,
    produção: 190,
    insumos: getRandomValue(210, 10),
    operacional: getRandomValue(240, 15),
  },
  {
    date: "2024-05-04",
    pessoal: 385,
    produção: 420,
    insumos: getRandomValue(215, 10),
    operacional: getRandomValue(245, 15),
  },
  {
    date: "2024-05-05",
    pessoal: 481,
    produção: 390,
    insumos: getRandomValue(220, 10),
    operacional: getRandomValue(250, 15),
  },
  {
    date: "2024-05-06",
    pessoal: 498,
    produção: 520,
    insumos: getRandomValue(225, 10),
    operacional: getRandomValue(255, 15),
  },
  {
    date: "2024-05-07",
    pessoal: 388,
    produção: 300,
    insumos: getRandomValue(230, 10),
    operacional: getRandomValue(260, 15),
  },
  {
    date: "2024-05-08",
    pessoal: 149,
    produção: 210,
    insumos: getRandomValue(235, 10),
    operacional: getRandomValue(265, 15),
  },
  {
    date: "2024-05-09",
    pessoal: 227,
    produção: 180,
    insumos: getRandomValue(240, 10),
    operacional: getRandomValue(270, 15),
  },
  {
    date: "2024-05-10",
    pessoal: 293,
    produção: 330,
    insumos: getRandomValue(245, 10),
    operacional: getRandomValue(275, 15),
  },
  {
    date: "2024-05-11",
    pessoal: 335,
    produção: 270,
    insumos: getRandomValue(250, 10),
    operacional: getRandomValue(280, 15),
  },
  {
    date: "2024-05-12",
    pessoal: 197,
    produção: 240,
    insumos: getRandomValue(255, 10),
    operacional: getRandomValue(285, 15),
  },
  {
    date: "2024-05-13",
    pessoal: 197,
    produção: 160,
    insumos: getRandomValue(260, 10),
    operacional: getRandomValue(290, 15),
  },
  {
    date: "2024-05-14",
    pessoal: 448,
    produção: 490,
    insumos: getRandomValue(265, 10),
    operacional: getRandomValue(295, 15),
  },
  {
    date: "2024-05-15",
    pessoal: 473,
    produção: 380,
    insumos: getRandomValue(270, 10),
    operacional: getRandomValue(300, 15),
  },
  {
    date: "2024-05-16",
    pessoal: 338,
    produção: 400,
    insumos: getRandomValue(275, 10),
    operacional: getRandomValue(305, 15),
  },
  {
    date: "2024-05-17",
    pessoal: 499,
    produção: 420,
    insumos: getRandomValue(280, 10),
    operacional: getRandomValue(310, 15),
  },
  {
    date: "2024-05-18",
    pessoal: 315,
    produção: 350,
    insumos: getRandomValue(285, 10),
    operacional: getRandomValue(315, 15),
  },
  {
    date: "2024-05-19",
    pessoal: 235,
    produção: 180,
    insumos: getRandomValue(290, 10),
    operacional: getRandomValue(320, 15),
  },
  {
    date: "2024-05-20",
    pessoal: 177,
    produção: 230,
    insumos: getRandomValue(295, 10),
    operacional: getRandomValue(325, 15),
  },
  {
    date: "2024-05-21",
    pessoal: 82,
    produção: 140,
    insumos: getRandomValue(300, 10),
    operacional: getRandomValue(330, 15),
  },
  {
    date: "2024-05-22",
    pessoal: 81,
    produção: 120,
    insumos: getRandomValue(305, 10),
    operacional: getRandomValue(335, 15),
  },
  {
    date: "2024-05-23",
    pessoal: 252,
    produção: 290,
    insumos: getRandomValue(310, 10),
    operacional: getRandomValue(340, 15),
  },
  {
    date: "2024-05-24",
    pessoal: 294,
    produção: 220,
    insumos: getRandomValue(315, 10),
    operacional: getRandomValue(345, 15),
  },
  {
    date: "2024-05-25",
    pessoal: 201,
    produção: 250,
    insumos: getRandomValue(320, 10),
    operacional: getRandomValue(350, 15),
  },
  {
    date: "2024-05-26",
    pessoal: 213,
    produção: 170,
    insumos: getRandomValue(325, 10),
    operacional: getRandomValue(355, 15),
  },
  {
    date: "2024-05-27",
    pessoal: 420,
    produção: 460,
    insumos: getRandomValue(330, 10),
    operacional: getRandomValue(360, 15),
  },
  {
    date: "2024-05-28",
    pessoal: 233,
    produção: 190,
    insumos: getRandomValue(335, 10),
    operacional: getRandomValue(365, 15),
  },
  {
    date: "2024-05-29",
    pessoal: 78,
    produção: 130,
    insumos: getRandomValue(340, 10),
    operacional: getRandomValue(370, 15),
  },
  {
    date: "2024-05-30",
    pessoal: 340,
    produção: 280,
    insumos: getRandomValue(345, 10),
    operacional: getRandomValue(375, 15),
  },
  {
    date: "2024-05-31",
    pessoal: 178,
    produção: 230,
    insumos: getRandomValue(350, 10),
    operacional: getRandomValue(380, 15),
  },
  {
    date: "2024-06-01",
    pessoal: 178,
    produção: 200,
    insumos: getRandomValue(355, 10),
    operacional: getRandomValue(385, 15),
  },
  {
    date: "2024-06-02",
    pessoal: 470,
    produção: 410,
    insumos: getRandomValue(360, 10),
    operacional: getRandomValue(390, 15),
  },
  {
    date: "2024-06-03",
    pessoal: 103,
    produção: 160,
    insumos: getRandomValue(365, 10),
    operacional: getRandomValue(395, 15),
  },
  {
    date: "2024-06-04",
    pessoal: 439,
    produção: 380,
    insumos: getRandomValue(370, 10),
    operacional: getRandomValue(400, 15),
  },
  {
    date: "2024-06-05",
    pessoal: 88,
    produção: 140,
    insumos: getRandomValue(375, 10),
    operacional: getRandomValue(405, 15),
  },
  {
    date: "2024-06-06",
    pessoal: 294,
    produção: 250,
    insumos: getRandomValue(380, 10),
    operacional: getRandomValue(410, 15),
  },
  {
    date: "2024-06-07",
    pessoal: 323,
    produção: 370,
    insumos: getRandomValue(385, 10),
    operacional: getRandomValue(415, 15),
  },
  {
    date: "2024-06-08",
    pessoal: 385,
    produção: 320,
    insumos: getRandomValue(390, 10),
    operacional: getRandomValue(420, 15),
  },
  {
    date: "2024-06-09",
    pessoal: 438,
    produção: 480,
    insumos: getRandomValue(395, 10),
    operacional: getRandomValue(425, 15),
  },
  {
    date: "2024-06-10",
    pessoal: 155,
    produção: 200,
    insumos: getRandomValue(400, 10),
    operacional: getRandomValue(430, 15),
  },
  {
    date: "2024-06-11",
    pessoal: 92,
    produção: 150,
    insumos: getRandomValue(405, 10),
    operacional: getRandomValue(435, 15),
  },
  {
    date: "2024-06-12",
    pessoal: 492,
    produção: 420,
    insumos: getRandomValue(410, 10),
    operacional: getRandomValue(440, 15),
  },
  {
    date: "2024-06-13",
    pessoal: 81,
    produção: 130,
    insumos: getRandomValue(415, 10),
    operacional: getRandomValue(445, 15),
  },
  {
    date: "2024-06-14",
    pessoal: 426,
    produção: 380,
    insumos: getRandomValue(420, 10),
    operacional: getRandomValue(450, 15),
  },
  {
    date: "2024-06-15",
    pessoal: 307,
    produção: 350,
    insumos: getRandomValue(425, 10),
    operacional: getRandomValue(455, 15),
  },
  {
    date: "2024-06-16",
    pessoal: 371,
    produção: 310,
    insumos: getRandomValue(430, 10),
    operacional: getRandomValue(460, 15),
  },
  {
    date: "2024-06-17",
    pessoal: 475,
    produção: 520,
    insumos: getRandomValue(435, 10),
    operacional: getRandomValue(465, 15),
  },
  {
    date: "2024-06-18",
    pessoal: 107,
    produção: 170,
    insumos: getRandomValue(440, 10),
    operacional: getRandomValue(470, 15),
  },
  {
    date: "2024-06-19",
    pessoal: 341,
    produção: 290,
    insumos: getRandomValue(445, 10),
    operacional: getRandomValue(475, 15),
  },
  {
    date: "2024-06-20",
    pessoal: 408,
    produção: 450,
    insumos: getRandomValue(450, 10),
    operacional: getRandomValue(480, 15),
  },
  {
    date: "2024-06-21",
    pessoal: 169,
    produção: 210,
    insumos: getRandomValue(455, 10),
    operacional: getRandomValue(485, 15),
  },
  {
    date: "2024-06-22",
    pessoal: 317,
    produção: 270,
    insumos: getRandomValue(460, 10),
    operacional: getRandomValue(490, 15),
  },
  {
    date: "2024-06-23",
    pessoal: 480,
    produção: 530,
    insumos: getRandomValue(465, 10),
    operacional: getRandomValue(495, 15),
  },
  {
    date: "2024-06-24",
    pessoal: 132,
    produção: 180,
    insumos: getRandomValue(470, 10),
    operacional: getRandomValue(500, 15),
  },
  {
    date: "2024-06-25",
    pessoal: 141,
    produção: 190,
    insumos: getRandomValue(475, 10),
    operacional: getRandomValue(505, 15),
  },
  {
    date: "2024-06-26",
    pessoal: 434,
    produção: 380,
    insumos: getRandomValue(480, 10),
    operacional: getRandomValue(510, 15),
  },
  {
    date: "2024-06-27",
    pessoal: 448,
    produção: 490,
    insumos: getRandomValue(485, 10),
    operacional: getRandomValue(515, 15),
  },
  {
    date: "2024-06-28",
    pessoal: 149,
    produção: 200,
    insumos: getRandomValue(490, 10),
    operacional: getRandomValue(520, 15),
  },
  {
    date: "2024-06-29",
    pessoal: 103,
    produção: 160,
    insumos: getRandomValue(495, 10),
    operacional: getRandomValue(525, 15),
  },
  {
    date: "2024-06-30",
    pessoal: 446,
    produção: 400,
    insumos: getRandomValue(500, 10),
    operacional: getRandomValue(530, 15),
  },
];

// 2. CONFIGURAÇÃO: Mantendo pessoal e Produção, e Adicionando Insumos e Operacional
const ALL_KEYS = ["pessoal", "produção", "insumos", "operacional"] as const;
type ChartKeys = (typeof ALL_KEYS)[number];

const chartConfig: ChartConfig = {
  pessoal: {
    label: "Pessoal",
    color: "var(--chart-1)",
  },
  produção: {
    label: "Produção",
    color: "var(--chart-2)",
  },
  insumos: {
    label: "Insumos", // Mantendo o rótulo simples
    color: "var(--chart-3)",
  },
  operacional: {
    label: "Operacional", // Mantendo o rótulo simples
    color: "var(--chart-4)",
  },
  // Removendo as chaves que não estão nos dados
  views: { label: "Page Views" }, // Mantei esta, mas ela não será usada nos botões
} satisfies ChartConfig;

export function ChartLineInteractive() {
  // 3. LÓGICA: ActiveChart agora inclui as 4 chaves
  const [activeChart, setActiveChart] = React.useState<ChartKeys>("pessoal"); // Começa mostrando a pessoal

  const total = React.useMemo(() => {
    const totals: Record<ChartKeys, number> = {} as any;

    // Calcula o total para todas as 4 chaves dinamicamente
    for (const key of ALL_KEYS) {
      totals[key] = chartData.reduce(
        (acc, curr) => acc + (curr as any)[key],
        0,
      );
    }
    return totals;
  }, []);

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Análise de pessoal, Produção e Despesas</CardTitle>
          <CardDescription>
            Mostrando totais e tendência diária (3 meses)
          </CardDescription>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap">
          {/* O mapeamento agora inclui as 4 chaves */}
          {ALL_KEYS.map((key) => {
            const chart = key;
            const configItem = chartConfig[chart as keyof typeof chartConfig];

            if (!configItem) return null;

            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {configItem.label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key].toLocaleString()}
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
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "long",
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
