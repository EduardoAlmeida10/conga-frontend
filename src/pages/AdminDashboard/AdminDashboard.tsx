import CardAnalysis from "@/components/CardAnalysis";
import PendingApprovals from "@/components/PendingApprovals/PendingApprovals";
import RecentRecords from "@/components/RecentRecord/RecentRecord";
import { Activity, DollarSign, TrendingDown } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 w-full text-white min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
        <CardAnalysis title="Receita total" value={10} color="bg-blue-500">
          <Activity className="bg-red" />
        </CardAnalysis>
        <CardAnalysis title="Receita total" value={10} color="bg-blue-500">
          <TrendingDown className="bg-red" />
        </CardAnalysis>
        <CardAnalysis title="Receita total" value={10} color="bg-blue-500">
          <DollarSign className="bg-red" />
        </CardAnalysis>
        <CardAnalysis title="Receita total" value={10} color="bg-blue-500">
          <DollarSign className="bg-red" />
        </CardAnalysis>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2">
          <RecentRecords />
        </div>
        <div className="lg:col-span-1">
            <PendingApprovals/>
        </div>
      </div>
    </div>
  );
}
