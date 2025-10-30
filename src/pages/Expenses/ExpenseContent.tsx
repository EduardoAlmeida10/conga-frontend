import { CardExpenses } from "../../components/CardExpenses";
import type { BaseExpense } from "../../hooks/useExpenseData";

interface ExpenseContentProps {
  isLoading: boolean;
  error: string | null; 
  costs: BaseExpense[];
  columns: any[]; 
  onEdit: (expense: BaseExpense) => void;
  onDelete: (expense: BaseExpense) => Promise<void>;
}

export function ExpenseContent({
  isLoading,
  error,
  costs,
  columns,
  onEdit,
  onDelete,
}: ExpenseContentProps) {

  if (isLoading) {
    return <p>Carregando despesas...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  if (costs.length === 0) {
      return <p>Nenhuma despesa encontrada.</p>;
  }

  return (
    <CardExpenses.Table
      data={costs}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}