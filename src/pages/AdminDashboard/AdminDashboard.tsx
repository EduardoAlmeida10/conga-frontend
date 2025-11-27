import OverviewSection from "@/components/Overview/OverviewSection";
import type { CardItem } from "@/types/OverviewSection.types";
import { AiOutlineAreaChart } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";

export default function AdminDashboard() {
  const dailyRecipeCards: CardItem[] = [
    {
      id: "dailyProduction",
      icon: AiOutlineAreaChart,
      title: "Produção Diária",
      value: "430 LItros",
      iconBgColor: "bg-blue-500",
    },
    {
      id: "dailyReceive",
      icon: AiOutlineAreaChart,
      title: "Receita Diária",
      value: "R$ 400,00",
      iconBgColor: "bg-blue-500",
    },
    {
      id: "mouthExpense",
      icon: FaDollarSign,
      title: "Despesas Mensal",
      value: "R$ 4000,00",
      iconBgColor: "bg-blue-500",
    },
    {
      id: "monthReceive",
      icon: FaDollarSign,
      title: "Receita Mensal",
      value: "R$ 5300,00",
      iconBgColor: "bg-blue-500",
    },
  ];

  return (
    <div>
      <OverviewSection cards={dailyRecipeCards}></OverviewSection>
    </div>
  );
}
