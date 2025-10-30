// CardExpensesTable.tsx
import iconDelete from "../../assets/iconDelete.svg"
import iconEdit from "../../assets/iconEdit.svg"
import type { BaseExpense } from "../../hooks/useExpenseData";

interface Column {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
}

interface CardExpensesTableProps {
  data: any[];
  columns: Column[];
  onEdit: (expense: BaseExpense) => void;
  onDelete: (expense: BaseExpense) => void;
}

export default function CardExpensesTable({ data, columns, onEdit, onDelete }: CardExpensesTableProps) {
  if (!data || data.length === 0) {
    return <p>Nenhuma despesa cadastrada.</p>;
  }

  return (
    <table className="w-[950px]">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-2 text-justify border-b border-gray-200 px-6"
            >
              {col.header}
            </th>
          ))}
          <th className="text-justify border-b border-gray-200">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-t border-gray-200">
            {columns.map((col) => (
              <td key={col.key} className="p-2 text-justify px-6">
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
            <td className="p-2 flex justify-between">
              <button className="cursor-pointer" onClick={() => onEdit(item)}>
                <img src={iconEdit} alt="edit" />
              </button>
              <button className="cursor-pointer" onClick={() => onDelete(item)}>
                <img src={iconDelete} alt="delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
