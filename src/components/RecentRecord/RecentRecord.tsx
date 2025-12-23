import { useDashboardRecords } from "@/hooks/dashboard/useDashboardRecords";
import RecordItem from "./RecordItem";

export interface RecentRecord {
  id: string;
  expenseType?: "Pessoal" | "Operacionais" | "Utilitários" | "Insumos";
  label?: string;
  details: string;
  route: string;
  iconBgColor: string;
}

const RecentRecords: React.FC = () => {
  const { records, isLoading, error } = useDashboardRecords();

  if (isLoading) {
    return <div className="p-4">Carregando últimos registros...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!records.length) {
    return <div className="p-4">Nenhum registro encontrado.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Últimos Registros Cadastrados</h3>

      <div className="divide-y divide-gray-100">
        {records.map((item) => (
          <RecordItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentRecords;
