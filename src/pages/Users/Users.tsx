import { useState } from "react";
import Button from "../../components/Button";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import OverlayCard from "../../components/Overlay/OverlayCard";
import { CardExpenses } from "../../components/CardExpenses";
import iconAdd from "../../assets/iconAdd.svg";

export default function Users() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const dataByType = [
    {
      nome: "Carlos Almeida",
      funcao: "Desenvolvedor Frontend",
      cpf: "123.456.789-00",
      status: "Ativo",
    },
    {
      nome: "Mariana Souza",
      funcao: "Gerente de Projetos",
      cpf: "987.654.321-11",
      status: "Ativo",
    },
    {
      nome: "Rafael Lima",
      funcao: "Analista de QA",
      cpf: "456.789.123-22",
      status: "Inativo",
    },
    {
      nome: "Rafael Lima",
      funcao: "Analista de QA",
      cpf: "456.789.123-22",
      status: "Inativo",
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dataByType.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-max">
      <Button styles="mb-3" onClick={() => setIsOverlayOpen(true)}>
        <img src={iconAdd} alt="" />
        Novo Trabalhador
      </Button>

      <OverlayBackdrop
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      >
        <OverlayCard
          titleOverlay="Novo Trabalhador"
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(false)}
        />
      </OverlayBackdrop>

      <CardExpenses.Root title="Trabalhadores">
        <CardExpenses.Search />
        <CardExpenses.Table data={currentData} />
        <CardExpenses.Footer
        text={`Total de Trabalhadores: ${dataByType.length}`}
          totalItems={dataByType.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </CardExpenses.Root>
    </div>
  );
}
