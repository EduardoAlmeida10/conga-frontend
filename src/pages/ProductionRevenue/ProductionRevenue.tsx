import { useState } from "react";

import ConstTypeTabs from "@/components/ConstTypeTabs"
import TotalRecord from "./TotalRecord/TotalRecord";
import DailyRecipe from "./DailyRecipe/DailyRecipe";
import ProductorsRecord from "./ProductorsRecord/ProductorsRecord";
import LocalRecord from "./LocalRecord/LocalRecord";

const ConstTypes = ["Receita diária", "Registro total", "Registro Local", "Registro Produtores"];

export default function ProductionRevenue(){

  const [selectedType, setSelectedType] = useState(ConstTypes[0]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return(
    <div className="p-6 w-full max-w-6xl mx-auto">
      <ConstTypeTabs tabs={ConstTypes} onSelect={handleTypeChange} />
      <div>
        {selectedType === "Receita diária" && <DailyRecipe />}
        {selectedType === "Registro total" && <TotalRecord />}
        {selectedType === "Registro Local" && <LocalRecord />}
        {selectedType === "Registro Produtores" && <ProductorsRecord />}
      </div>
    </div>
  )
}