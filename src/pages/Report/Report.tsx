import ConstTypeTabs from "@/components/ConstTypeTabs";
import { useState } from "react";
import FinancialReport from "./FinancialReport/FinancialReport";
import RevenueAnalysis from "./RevenueAnalysis/RevenueAnalysis";
import ExpenseAnalysis from "./ExpenseAnalysis/ExpenseAnalysis";

const ConstTypes = [
  "Relatório Financeiro",
  "Análise de Receita",
  "Análise de Despesas",
];

export default function Report() {
  const [selectedType, setSelectedType] = useState(ConstTypes[0]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };
  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <ConstTypeTabs tabs={ConstTypes} onSelect={handleTypeChange} />
      <div>
        {selectedType === "Relatório Financeiro" && <FinancialReport />}
        {selectedType === "Análise de Receita" && <RevenueAnalysis />}
        {selectedType === "Análise de Despesas" && <ExpenseAnalysis />}
      </div>
    </div>
  );
}
