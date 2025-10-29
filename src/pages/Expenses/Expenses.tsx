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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const dataByType: Record<string, any[]> = {
    Pessoal: [
      { descricao: "Salário", tipo: "salario fixo", valor: 30000, data: "2025-10-01" },
      { descricao: "Bônus", tipo: "variável", valor: 5000, data: "2025-10-10" },
      { descricao: "Vale alimentação", tipo: "benefício", valor: 1200, data: "2025-10-15" },
      { descricao: "Salário", tipo: "salario fixo", valor: 30000, data: "2025-10-01" },
      { descricao: "Bônus", tipo: "variável", valor: 5000, data: "2025-10-10" },
      { descricao: "Vale alimentação", tipo: "benefício", valor: 1200, data: "2025-10-15" },
    ],
    Utilidades: [
      { titulo: "Energia", valor: 250, data: "2025-10-05" },
      { titulo: "Internet", valor: 150, data: "2025-10-10" },
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

  const data = dataByType[selectedType] || [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  return (
    <div className="w-max">
      <div className="mb-5 mt-10">
        <CostTypeTabs onSelect={handleTypeChange} />
      </div>
      <Button styles="mb-3" onClick={() => setIsOverlayOpen(true)}>
        <img src={iconAdd} alt="" />
        Nova Despesa
      </Button>

      <OverlayBackdrop
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      >
        <OverlayCard
          titleOverlay="Nova Despesa"
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
        />
      </OverlayBackdrop>

      <CardExpenses.Root title="Custos Exemplo">
        <CardExpenses.Search />
        <CardExpenses.Table data={currentData} />
        <CardExpenses.Footer
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </CardExpenses.Root>
    </div>
  );
}
