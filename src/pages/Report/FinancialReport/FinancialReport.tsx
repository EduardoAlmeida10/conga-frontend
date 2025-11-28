import Button from "@/components/Button";
import CardAnalysis from "@/components/CardAnalysis";

import { File } from "lucide-react";
import { ArrowDown } from "lucide-react";

export default function RevenueAnalysis() {
  const handleGerarRelatorio = () => {
    return;
  };
  return (
    <div className="">
      <header className="flex justify-between mt-10 items-center">
        <label>
          <p>Data</p>
          <input type="date" className="bg-white h-12 px-3 rounded cursor-pointer"/>
        </label>
        <p className="text-center text-gray-400">Período Selecionado <br/> Junho 2025</p>
        <Button onClick={() => handleGerarRelatorio()}>
          Gerar relatório
          <File />
        </Button>
      </header>
      <div>
        <header>
          <h1>Visão geral</h1>
          <div>
            <CardAnalysis title="Receita total" value={10} color="bg-blue-500">
              <ArrowDown />
            </CardAnalysis>
          </div>
        </header>
      </div>
    </div>
  );
}
