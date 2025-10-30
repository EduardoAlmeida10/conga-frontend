import { useMemo } from "react";

const formatDate = (item: { date: string }) =>
  new Date(item.date).toLocaleDateString("pt-BR", { timeZone: "UTC" });

const formatCurrency = (item: { value: string | number }) =>
  parseFloat(item.value as string).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const commonColumns = [
  { key: "description", header: "Descrição" },
  { key: "date", header: "Data", render: formatDate },
  { key: "value", header: "Valor (R$)", render: formatCurrency },
];

const personnelColumns = [
  ...commonColumns,
  { key: "type", header: "Tipo" }, 
];

const vehicleColumns = [
  ...commonColumns,
  { key: "vehiclePlate", header: "Placa" }, 
];

const columnMap = {
  Pessoal: personnelColumns,
  Veicular: vehicleColumns,
};

export function useExpenseColumns(type: string) {
  return useMemo(() => columnMap[type] || commonColumns, [type]);
}