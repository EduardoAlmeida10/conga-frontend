"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LineChartProps<T extends Record<string, any>> = {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  label?: string;
  height?: number;
};

export function LineChart<T extends Record<string, any>>({
  data,
  xKey,
  yKey,
  label,
  height = 250,
}: LineChartProps<T>) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 16, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />

          <XAxis
            dataKey={xKey as string}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })
            }
          />

          <YAxis tickLine={false} axisLine={false} />

          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR")
            }
            formatter={(value: number) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
          />

          <Line
            type="monotone"
            dataKey={yKey as string}
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
            name={label}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
