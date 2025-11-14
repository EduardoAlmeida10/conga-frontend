import { useCallback, useMemo, useState } from "react";

import iconAdd from "../../assets/iconAdd.svg";
import Button from "../../components/Button";

import CostTypeTabs from "../../components/ConstTypeTabs";

import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { getExpenseColumns } from "@/components/InvoicesTable/columns";
import { DataTable } from "../../components/DataTable";
import { DataTableContent } from "../../components/DataTable/DataTableContent";
import { DataTablePagination } from "../../components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "../../components/DataTable/DataTableTextFilter";

import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import ExpenseForm from "../../pages/Expenses/ExpenseForm";

import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { useExpenseData, type BaseExpense } from "../../hooks/useExpenseData";
import { useExpenseModal } from "../../hooks/useExpenseModal";

type ExpenseType = "Pessoal" | "Operacionais" | "Utilitario" | "Insumos";

export default function ExpensesTable() {
  const [selectedType, setSelectedType] = useState<ExpenseType>("Pessoal");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const {
    isOverlayOpen,
    expenseToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useExpenseModal();

  const { expenses, refetchExpenses, deleteExpense } =
    useExpenseData(selectedType);

  const handleDelete = useCallback(
    async (expense: BaseExpense) => {
      try {
        await deleteExpense(expense);
        refetchExpenses();

        window.toast(
          "Despesa deletada",
          "Despesa foi removida com sucesso!",
          "success",
        );

        if (expenses.length === 1 && pagination.pageIndex > 0) {
          setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
        }
      } catch (err) {
        console.error("Erro ao deletar despesa:", err);

        window.toast(
          "Erro ao deletar",
          "Não foi possível remover esta despesa.",
          "error",
        );
      }
    },
    [deleteExpense, refetchExpenses, expenses.length, pagination.pageIndex],
  );

  const columns = useMemo(
    () => getExpenseColumns(selectedType, handleOpenEditModal, handleDelete),
    [selectedType, handleOpenEditModal, handleDelete],
  );

  const facetedFilterColumn = useMemo(() => {
    switch (selectedType) {
      case "Insumos":
        return "name";
      default:
        return "type";
    }
  }, [selectedType]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type as ExpenseType);
    setPagination({ pageIndex: 0, pageSize: 5 });
  };

  const handleSaveSuccess = (isEdit?: boolean) => {
    refetchExpenses();
    handleCloseModal();

    window.toast(
      isEdit ? "Despesa atualizada" : "Despesa criada",
      isEdit
        ? "A despesa foi atualizada com sucesso!"
        : "A despesa foi criada com sucesso!",
      "success",
    );
  };

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <div className="mb-16 mt-10">
        <CostTypeTabs onSelect={handleTypeChange} />
      </div>

      <Button styles="mb-8" onClick={handleOpenCreateModal}>
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

      <div className="flex flex-col p-12 bg-white justify-center items-center-5 gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5 ">
          <h1 className="font-bold text-2xl">
            {" "}
            Tabela de Custos com {selectedType}
          </h1>
        </div>

        <DataTable<BaseExpense>
          data={expenses ?? []}
          columns={columns}
          pagination={pagination}
        >
          <div className="mb-4 flex justify-between items-center gap-4">
            <div>
              <DataTableTextFilter placeholder="Buscar despesas" />
            </div>
            <div className="flex gap-8 items-center">
              <DataTableFacetedFilter column={facetedFilterColumn} />
              <DataTableColumnsVisibilityDropdown />
            </div>
          </div>

          <DataTableContent />

          <div className="flex justify-end items-center mt-4">
            <DataTablePagination />
          </div>
        </DataTable>
      </div>
    </div>
  );
}
