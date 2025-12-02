import type { FinancialDetailed } from "@/api/reports/ReportFinance/ReportFinace";
import type { Relatorio } from "./columns";

export function mapDetailedToRelatorio(
  data: FinancialDetailed | null,
): Relatorio[] {
  if (!data) return [];

  return [
    {
      categoria: "Pessoal",
      tipo: "despesa",
      valor: data.personnel,
    },
    {
      categoria: "Utilidades",
      tipo: "despesa",
      valor: data.utility,
    },
    {
      categoria: "Suprimentos",
      tipo: "despesa",
      valor: data.supplies,
    },
    {
      categoria: "Operacional",
      tipo: "despesa",
      valor: data.operational,
    },
    {
      categoria: "Produção Local",
      tipo: "receita",
      valor: data.localProduction,
    },
    {
      categoria: "Produção dos Produtores",
      tipo: "receita",
      valor: data.producerProduction,
    },
    {
      categoria: "Produção Total",
      tipo: "receita",
      valor: data.totalProduction,
    },
  ];
}
