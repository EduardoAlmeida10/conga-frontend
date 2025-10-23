import iconDelete from "../../assets/iconDelete.svg"
import iconEdit from "../../assets/iconEdit.svg"

interface CardExpensesTableProps {
  data: any[];
}

export default function CardExpensesTable({ data }: CardExpensesTableProps) {
  if (!data || data.length === 0) {
    return <p>Nenhuma despesa cadastrada.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="w-[950px]">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="p-2 text-justify border-b border-gray-200 px-6"
            >
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
          <th className="text-justify border-b border-gray-200">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-t border-gray-200">
            {headers.map((header) => (
              <td key={header} className="p-2 text-justify px-6">
                {item[header]}
              </td>
            ))}
            <td className="p-2 flex justify-between">
              <button className="cursor-pointer">
                <img src={iconEdit} alt="edit" />
              </button>
              <button className="cursor-pointer">
                <img src={iconDelete} alt="delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
