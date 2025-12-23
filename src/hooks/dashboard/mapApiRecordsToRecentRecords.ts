import type { DashboardRecords } from "@/api/dashboard/dashboard";
import type { RecentRecord } from "@/components/RecentRecord/RecentRecord";

export function mapApiRecordsToRecentRecords(
  api: DashboardRecords,
): RecentRecord[] {
  const records: RecentRecord[] = [];

  if (api.lastProduction) {
    records.push({
      id: api.lastProduction.id,
      label: "Registro Produtores",
      details: `${api.lastProduction.producerName} – ${Number(
        api.lastProduction.totalQuantity,
      ).toFixed(2)} L`,
      route: "/producao",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastPersonnelCost) {
    records.push({
      id: api.lastPersonnelCost.id,
      label: "Pessoal",
      expenseType: "Pessoal",
      details: `${api.lastPersonnelCost.type} – R$ ${Number(
        api.lastPersonnelCost.value,
      ).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastUtilityCost) {
    records.push({
      id: api.lastUtilityCost.id,
      label: "Utilitários",
      expenseType: "Utilitários",
      details: `${api.lastUtilityCost.type} – R$ ${Number(
        api.lastUtilityCost.value,
      ).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  if (api.lastSupply) {
    records.push({
      id: api.lastSupply.id,
      label: "Insumos",
      expenseType: "Insumos",
      details: `${api.lastSupply.name} (${api.lastSupply.quantity}) – R$ ${Number(
        api.lastSupply.unitPrice,
      ).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  
  if (api.lastOperationalCost) {
    records.push({
      id: api.lastOperationalCost.id,
      label: "Operacionais",
      expenseType: "Operacionais",
      details: `${api.lastOperationalCost.type} – R$ ${Number(
        api.lastOperationalCost.value,
      ).toFixed(2)}`,
      route: "/despesas",
      iconBgColor: "text-blue-500",
    });
  }

  return records;
}
