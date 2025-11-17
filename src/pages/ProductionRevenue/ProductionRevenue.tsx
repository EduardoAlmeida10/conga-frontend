import ConstTypeTabs from "@/components/ConstTypeTabs"
import { useState } from "react";

const ConstTypes = ["Receita diária", "Registros total", "Registros do dia"];

export default function ProductionRevenue(){

  const [selectedType, setSelectedType] = useState("Pessoal");

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    console.log("Tipo selecionado:", type);
  };

  return(
    <div>
      <ConstTypeTabs tabs={ConstTypes} onSelect={handleTypeChange} />
    </div>
  )
}