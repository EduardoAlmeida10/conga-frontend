import { useState } from "react";
import Button from "../../components/Button";
import CostTypeTabs from "../../components/ConstTypeTabs";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import ExpenseForm from "./ExpenseForm";
import { CardExpenses } from "../../components/CardExpenses";
import iconAdd from "../../assets/iconAdd.svg";
import { useExpenseModal } from "../../hooks/useExpenseModal";
import { useExpenseData, type BaseExpense } from "../../hooks/useExpenseData";
import { useExpenseColumns } from "../../hooks/expenseColumnDefinitions";
import { ExpenseContent } from "./ExpenseContent";

export default function Expenses() {
  const [selectedType, setSelectedType] = useState("Pessoal");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    isOverlayOpen,
    expenseToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useExpenseModal();

  const { expenses, isLoading, error, refetchExpenses, deleteExpense } =
    useExpenseData(selectedType);

  const columns = useExpenseColumns(selectedType);

  const handleSaveSuccess = () => {
    refetchExpenses();
    handleCloseModal();
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData =
    expenses?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handleDeleteWithPagination = async (expense: BaseExpense) => {
    const isLastItemOnPage = currentData.length === 1;
    const isNotFirstPage = currentPage > 1;

    try {
      await deleteExpense(expense);
      if (isLastItemOnPage && isNotFirstPage) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <div className="w-[950px]">
      <div className="mb-5 mt-10">
        <CostTypeTabs onSelect={handleTypeChange} />
      </div>

      <Button styles="mb-3" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" />
        Nova Despesa
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <ExpenseForm
          type={selectedType}
          onClose={handleCloseModal}
          onSuccess={handleSaveSuccess}
          expenseToEdit={expenseToEdit}
          titleOverlay={selectedType}
        />
      </OverlayBackdrop>

      <CardExpenses.Root title={`Custos com ${selectedType}`}>
        <CardExpenses.Search />
        <ExpenseContent
          isLoading={isLoading}
          error={error}
          costs={currentData}
          columns={columns}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteWithPagination}
        />
        <CardExpenses.Footer
          totalItems={expenses?.length || 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </CardExpenses.Root>
    </div>
  );
}
