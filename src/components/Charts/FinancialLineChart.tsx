"use client";

import type { FinancialDailyEntry } from "@/api/reports/ReportExpense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { LineChart } from "./LineChart";

type FinancialMetric =
  | "total"
  | "personnel"
  | "utility"
  | "supplies"
  | "operational";

const LABEL_MAP: Record<FinancialMetric, string> = {
  total: "Total",
  personnel: "Pessoal",
  utility: "Utilidades",
  supplies: "Suprimentos",
  operational: "Operacional",
};

export function FinancialLineChart({
  data,
  metric,
}: {
  data: FinancialDailyEntry[];
  metric: FinancialMetric;
}) {
  const total = useMemo(
    () => data.reduce((acc, curr) => acc + curr[metric], 0),
    [data, metric],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{LABEL_MAP[metric]}</CardTitle>
        <p className="text-muted-foreground text-sm">
          Total:{" "}
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </CardHeader>

      <CardContent>
        <LineChart
          data={data}
          xKey="date"
          yKey={metric}
          label={LABEL_MAP[metric]}
        />
      </CardContent>
    </Card>
  );
}
