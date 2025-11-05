import type { BaseExpense } from "@/hooks/useExpenseData";
import { insumosColumns } from "./collumns/insumos";
import { operacionaisColumns } from "./collumns/operacionais";
import { pessoalColumns } from "./collumns/pessoal";
import { utilitarioColumns } from "./collumns/utilitario";

export function getExpenseColumns(
  type: "Pessoal" | "Operacionais" | "Utilitario" | "Insumos",
  onEdit: (expense: BaseExpense) => void,
  onDelete: (expense: BaseExpense) => void,
) {
  switch (type) {
    case "Pessoal":
      return pessoalColumns(onEdit, onDelete);
    case "Operacionais":
      return operacionaisColumns(onEdit, onDelete);
    case "Utilitario":
      return utilitarioColumns(onEdit, onDelete);
    case "Insumos":
      return insumosColumns(onEdit, onDelete);
    default:
      return [];
  }
}
