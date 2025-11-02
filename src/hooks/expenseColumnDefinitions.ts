import { useMemo } from "react";

const formatDate = (item: { date: string }) =>
  new Date(item.date).toLocaleDateString("pt-BR", { timeZone: "UTC" });

const formatCurrency = (value: string | number) => {
  const numericValue =
    typeof value === "number" ? value : parseFloat(value.replace(",", "."));

  if (isNaN(numericValue)) return "R$ 0,00";

  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const commonColumns = [{ key: "date", header: "Data", render: formatDate }];

const personnelColumns = [
  ...commonColumns,
  { key: "value", header: "Valor (R$)", render: (item: any) => formatCurrency(item.value) },
  { key: "type", header: "Tipo" },
  { key: "description", header: "Descrição" },
];

const operationalColumns = [
  ...commonColumns,
  { key: "value", header: "Valor (R$)", render: (item: any) => formatCurrency(item.value) },
  { key: "type", header: "Tipo" },
  { key: "description", header: "Descrição" },
];

const utilityColumns = [
  ...commonColumns,
  { key: "value", header: "Valor (R$)", render: (item: any) => formatCurrency(item.value) },
  { key: "type", header: "Tipo" },
  { key: "observations", header: "Observações" },
];

const supplieColumns = [
  { key: "name", header: "Nome do insumo" },
  { key: "quantity", header: "Quantidade" },
  {
    key: "unitPrice",
    header: "Preço Unitário",
    render: (item: { unitPrice: string | number; }) => formatCurrency(item.unitPrice),
  },
  {
    key: "totalCost",
    header: "Despesa Total",
    render: (item: { totalCost: string | number; }) => formatCurrency(item.totalCost),
  },

  ...commonColumns,
];

const columnMap = {
  Pessoal: personnelColumns,
  Operacionais: operationalColumns,
  Utilitario: utilityColumns,
  Insumos: supplieColumns,
};

export function useExpenseColumns(type: string) {
  return useMemo(() => columnMap[type] || commonColumns, [type]);
}
