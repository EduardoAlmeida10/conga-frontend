import type { DashboardRecords } from "@/api/dashboard/dashboard";
import type { RecentRecord } from "@/components/RecentRecord/RecentRecord";

export function mapApiRecordsToRecentRecords(api: DashboardRecords): RecentRecord[] {
  const records: RecentRecord[] = [];

  if (api.lastProduction) {
    records.push({
      id: api.lastProduction.id,
      type: "PRODUCTION",
      label: "Registro Produtores",
      details: `${api.lastProduction.producerName} – ${Number(api.lastProduction.totalQuantity).toFixed(2)} L`,
      route: "/producao",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastSupply) {
    let expenseCategory = "";
    if (api.lastSupply.expense?.category === "SUPPLIES") expenseCategory = "Insumos";
    records.push({
      id: api.lastSupply.id,
      type: expenseCategory,
      label: "Insumos",
      details: `${api.lastSupply.name} (${api.lastSupply.quantity}) – R$ ${Number(api.lastSupply.unitPrice).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastPersonnelCost) {
    let expenseCategory = "";
    if (api.lastPersonnelCost.expense?.category === "PERSONNEL") expenseCategory = "Pessoal";
    records.push({
      id: api.lastPersonnelCost.id,
      type: expenseCategory,
      label: "Pessoal",
      details: `${api.lastPersonnelCost.type} – R$ ${Number(api.lastPersonnelCost.expense?.value ?? 0).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastOperationalCost) {
    let expenseCategory = "";
    if (api.lastOperationalCost.expense?.category === "OPERATIONAL") expenseCategory = "Operacionais";
    records.push({
      id: api.lastOperationalCost.id,
      type: expenseCategory,
      label: "Operacionais",
      details: `${api.lastOperationalCost.type ?? "Operacional"} – R$ ${Number(api.lastOperationalCost.expense?.value ?? 0).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastUtilityCost) {
    let expenseCategory = "";
    if (api.lastUtilityCost.expense?.category === "UTILITY") expenseCategory = "Utilitários";
    records.push({
      id: api.lastUtilityCost.id,
      type: expenseCategory,
      label: "Utilitários",
      details: `${api.lastUtilityCost.type ?? "Utilitários"} – R$ ${Number(api.lastUtilityCost.expense?.value ?? 0).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  return records;
}
