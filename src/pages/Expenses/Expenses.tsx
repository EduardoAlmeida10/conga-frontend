import { useCallback, useEffect, useMemo, useState } from "react";

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
import {
  useExpenseData,
  type BaseExpense,
} from "../../hooks/expenses/useExpenseData";
import { useExpenseModal } from "../../hooks/expenses/useExpenseModal";
import { useLocation } from "react-router-dom";

const costTypes = ["Pessoal", "Utilitários", "Insumos", "Operacionais"];
type ExpenseType = "Pessoal" | "Operacionais" | "Utilitários" | "Insumos";

export default function ExpensesTable() {
  const location = useLocation();

  const defaultType: ExpenseType = "Pessoal";
  const initialType: ExpenseType =
    location.state?.targetExpenseType ?? defaultType;

  const [selectedType, setSelectedType] = useState<ExpenseType>(initialType);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const {
    isOverlayOpen,
    expenseToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useExpenseModal();

  const { expenses, totalItems, refetchExpenses, deleteExpense } =
    useExpenseData(selectedType, pagination.pageIndex, pagination.pageSize);

  const pageCount = Math.ceil(totalItems / pagination.pageSize);

  const handleDelete = useCallback(
    async (expense: BaseExpense) => {
      try {
        await deleteExpense(expense);
        refetchExpenses();

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
    setPagination({ pageIndex: 0, pageSize: 10 });
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

  useEffect(() => {
    if (location.state?.targetExpenseType) {
      setSelectedType(location.state.targetExpenseType);
    }
  }, [location.state?.targetExpenseType]);

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <div className="mb-16 mt-10">
        <p>Selecione o tipo de despesa:</p>
        <CostTypeTabs tabs={costTypes} onSelect={handleTypeChange} selected={selectedType}/>
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
          columns={columns as any}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={pageCount}
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
