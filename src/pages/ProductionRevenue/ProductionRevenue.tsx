import { useState } from "react";

import ConstTypeTabs from "@/components/ConstTypeTabs"
import TotalRecord from "./TotalRecord/TotalRecord";
import DailyRecipe from "./DailyRecipe/DailyRecipe";
import DailyRecord from "./DailyRecord/DailyRecord";
import LocalRecord from "./LocalRecord/LocalRecord";

const ConstTypes = ["Receita diária", "Registro total", "Registros do dia", "Registro Local"];

export default function ProductionRevenue(){

  const [selectedType, setSelectedType] = useState(ConstTypes[0]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return(
    <div>
      <ConstTypeTabs tabs={ConstTypes} onSelect={handleTypeChange} />
      <div>
        {selectedType === "Receita diária" && <DailyRecipe />}
        {selectedType === "Registro total" && <TotalRecord />}
        {selectedType === "Registros do dia" && <DailyRecord />}
        {selectedType === "Registro Local" && <LocalRecord />}
      </div>
    </div>
  )
}