import { useState } from "react";

import ConstTypeTabs from "@/components/ConstTypeTabs";
import TotalRecord from "./TotalRecord/TotalRecord";
import DailyRecipe from "./DailyRecipe/DailyRecipe";
import ProductorsRecord from "./ProductorsRecord/ProductorsRecord";
import LocalRecord from "./LocalRecord/LocalRecord";
import { useLocation } from "react-router-dom";

const ConstTypes = [
  "Receita diária",
  "Registro total",
  "Registro Local",
  "Registro Produtores",
];

export default function ProductionRevenue() {
  const location = useLocation();

  const targetTab = location.state?.targetTab;

  const [selectedType, setSelectedType] = useState(
    targetTab || ConstTypes[0]
  );

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <ConstTypeTabs tabs={ConstTypes} onSelect={handleTypeChange} selected={selectedType} />
      <div>
        {selectedType === "Receita diária" && <DailyRecipe />}
        {selectedType === "Registro total" && <TotalRecord />}
        {selectedType === "Registro Local" && <LocalRecord />}
        {selectedType === "Registro Produtores" && <ProductorsRecord />}
      </div>
    </div>
  );
}
