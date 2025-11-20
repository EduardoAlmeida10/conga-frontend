import { useState } from "react";
import type { BaseExpense } from "./useExpenseData";

export function useExpenseModal() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<BaseExpense | null>(null);

  const handleOpenCreateModal = () => {
    setExpenseToEdit(null);
    setIsOverlayOpen(true);
  };

  const handleOpenEditModal = (expense: BaseExpense) => {
    setExpenseToEdit(expense);
    setIsOverlayOpen(true);
  };

  const handleCloseModal = () => {
    setIsOverlayOpen(false);
    setExpenseToEdit(null);
  };

  return {
    isOverlayOpen,
    expenseToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  };
}