import Button from "../../components/Button";
import CostTypeTabs from "../../components/ConstTypeTabs";
import OverlayCard from "../../components/Overlay/OverlayCard";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import { CardExpenses } from "../../components/CardExpenses";
import iconAdd from "../../assets/iconAdd.svg";
import { useState } from "react";
import { useExpenseModal } from "../../hooks/useExpenseModal";
import { ExpenseContent } from "./ExpenseContent";
import { useExpenseData } from "../../hooks/useExpenseData";
import { useExpenseColumns } from "../../hooks/expenseColumnDefinitions";

export default function Expenses() {
  const [selectedType, setSelectedType] = useState("Pessoal");

  const {
    isOverlayOpen,
    expenseToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useExpenseModal(); 

  const {
    expenses,
    isLoading,
    error,
    refetchExpenses,
    deleteExpense,
  } = useExpenseData(selectedType);

  const columns = useExpenseColumns(selectedType);

  const handleSaveSuccess = () => {
    refetchExpenses();
    handleCloseModal();
  };

  return (
    <div className="w-max">
      <div className="mb-10 mt-10">
        <CostTypeTabs onSelect={setSelectedType} />
      </div>
      <Button styles="mb-3" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" />
        Nova Despesa
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <OverlayCard
          onClose={handleCloseModal} 
          onSuccess={handleSaveSuccess}
          expenseToEdit={expenseToEdit}
          expenseType={selectedType}
        />
      </OverlayBackdrop>

      <CardExpenses.Root title={`Custos com ${selectedType}`}>
        <CardExpenses.Search />

        <ExpenseContent
          isLoading={isLoading}
          error={error}
          costs={expenses}
          columns={columns}
          onEdit={handleOpenEditModal}
          onDelete={deleteExpense}
        />
        
        <CardExpenses.Footer />
      </CardExpenses.Root>
    </div>
  );
}
