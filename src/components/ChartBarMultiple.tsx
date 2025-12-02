import { BarChart, CartesianGrid, XAxis, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

interface ChartBarMultipleProps {
  data: { month: string; receives: number; expenses: number; periodResult: number }[];
}

export function ChartBarMultiple({ data }: ChartBarMultipleProps) {
  const chartConfig = {
    receives: { label: "Receitas", color: "#10b981" },
    expenses: { label: "Despesas", color: "#ef4444" },
    periodResult: { label: "Resultado", color: "#3b82f6" },
  };

  return (
    <Card className="w-max">
      <CardHeader>
        <CardTitle>Comparação de Meses</CardTitle>
        <CardDescription>Valores do mês selecionado</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-58 w-120">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="receives" fill={chartConfig.receives.color} radius={4} />
            <Bar dataKey="expenses" fill={chartConfig.expenses.color} radius={4} />
            <Bar dataKey="periodResult" fill={chartConfig.periodResult.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 items-center font-medium">
          Comparação de valores <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex gap-4 mt-2 justify-center w-full">
          {Object.entries(chartConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-[2px]"
                style={{ backgroundColor: value.color }}
              ></span>
              <span>{value.label}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
