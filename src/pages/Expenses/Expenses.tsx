import Button from "../../components/Button";
import CostTypeTabs from "../../components/ConstTypeTabs";
import OverlayCard from "../../components/Overlay/OverlayCard";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import { CardExpenses } from "../../components/CardExpenses";
import iconAdd from "../../assets/iconAdd.svg";
import { useState } from "react";

export default function Expenses() {
  const [selectedType, setSelectedType] = useState("Pessoal");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const dataByType: Record<string, any[]> = {
    Pessoal: [
      {
        descricao: "Salário",
        tipo: "salario fixo",
        valor: 30000,
        data: "2025-10-01",
      },
      {
        descricao: "Salário",
        tipo: "salario fixo",
        valor: 30000,
        data: "2025-10-01",
      },
      {
        descricao: "Salário",
        tipo: "salario fixo",
        valor: 30000,
        data: "2025-10-01",
      },
    ],
    Utilidades: [
      { titulo: "Energia", valor: 250, data: "2025-10-05" },
      { titulo: "Internet", valor: 150, data: "2025-10-10" },
    ],
    Insumos: [{ titulo: "Materiais", valor: 500, data: "2025-10-12" }],
    Operacionais: [
      { titulo: "Aluguel", valor: 1200, data: "2025-10-01" },
      { titulo: "Transporte", valor: 600, data: "2025-10-06" },
    ],
    Análise: [{ titulo: "Consultoria", valor: 900, data: "2025-10-15" }],
  };

  return (
    <div className="w-max">
      <div className="mb-10 mt-10">
        <CostTypeTabs onSelect={setSelectedType} />
      </div>
      <Button styles="mb-3" onClick={() => setIsOverlayOpen(true)}>
        <img src={iconAdd} alt="" />
        Nova Despesa
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <OverlayCard
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
        />
      </OverlayBackdrop>

      <CardExpenses.Root title="Custos Exemplo">
        <CardExpenses.Search />
        <CardExpenses.Table data={dataByType[selectedType] || []} />
        <CardExpenses.Footer />
      </CardExpenses.Root>
    </div>
  );
}
