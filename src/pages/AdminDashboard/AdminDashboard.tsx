import CardAnalysis from "@/components/CardAnalysis";
import PendingApprovals from "@/components/PendingApprovals/PendingApprovals";
import RecentRecords from "@/components/RecentRecord/RecentRecord";
import { useDashboardMetrics } from "@/hooks/dashboard/useDashboardMetrics";
import { Activity, DollarSign, TrendingDown } from "lucide-react";

export default function AdminDashboard() {
  const { metrics, isLoading, error } = useDashboardMetrics();
    
    const dailyProduction = metrics?.dailyProduction ?? 0;
    const dailyReceive = metrics?.dailyReceive ?? 0;
    const monthlyExpense = metrics?.monthlyExpense ?? 0;
    const monthlyReceive = metrics?.monthlyReceive ?? 0;

    if (isLoading) {
        return <div className="p-6 w-full text-center">Carregando métricas do Dashboard...</div>;
    }

    if (error) {
        return <div className="p-6 w-full text-center text-red-600">{error}</div>;
    }

  return (
    <div className="p-6 w-full text-black min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
        <CardAnalysis title="Produção Diária" value={10} color="bg-blue-500">
          <Activity className="bg-red" />
        </CardAnalysis>
        <CardAnalysis title="Receita Diária" value={10} color="bg-blue-500">
          <TrendingDown className="bg-red" />
        </CardAnalysis>
        <CardAnalysis title="Despesas Mensal" value={10} color="bg-blue-500">
          <DollarSign className="bg-red" />
        </CardAnalysis>
        <CardAnalysis title="Receita Mensal" value={10} color="bg-blue-500">
          <DollarSign className="bg-red" />
        </CardAnalysis>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentRecords />
        </div>
        <div className="lg:col-span-1">
          <PendingApprovals />
        </div>
      </div>
    </div>
  );
}
