import { useCallback, useMemo } from "react";

import { deletePersonnelCost } from "../../api/costs/personnel-costApi";
import { usePersonnelCosts } from "../costs/usePersonnelCosts";

import { deleteOperationalCost } from "../../api/costs/operational-costApi";
import { useOperationalCosts } from "../costs/useOperationalCosts";

import { deleteUtilityCost } from "../../api/costs/utility-costApi";
import { useUtilityCosts } from "../costs/useUtilityCosts";

import { deleteSupplieCost } from "../../api/costs/supllie-costApi";
import { useSupplieCosts } from "../costs/useSupplieCosts";

export interface BaseExpense {
  id: string;
  date: string;
  [key: string]: any;
}

const deleteFunctionsMap = {
  Pessoal: deletePersonnelCost,
  Operacionais: deleteOperationalCost,
  Utilitario: deleteUtilityCost,
  Insumos: deleteSupplieCost,
};

const emptyResult = {
  data: [],
  total: 0,
  isLoading: false,
  error: null,
  refetch: () => {},
};

export function useExpenseData(
  type: keyof typeof deleteFunctionsMap,
  pageIndex: number,
  pageSize: number,
) {
  const filters = useMemo(
    () => ({
      page: pageIndex + 1,
      limit: pageSize,
    }),
    [pageIndex, pageSize],
  );

  const pessoal = usePersonnelCosts(filters, type === "Pessoal");
  const operacionais = useOperationalCosts(filters, type === "Operacionais");
  const utilitario = useUtilityCosts(filters, type === "Utilitario");
  const insumos = useSupplieCosts(filters, type === "Insumos");

  const selectedHook =
    type === "Pessoal"
      ? pessoal
      : type === "Operacionais"
        ? operacionais
        : type === "Utilitario"
          ? utilitario
          : type === "Insumos"
            ? insumos
            : emptyResult;

  const deleteFunction = deleteFunctionsMap[type];

  const handleDeleteExpense = useCallback(
    async (expense: BaseExpense) => {
      if (!deleteFunction) {
        alert("Função de deleção não implementada para este tipo.");
        return;
      }

      if (!window.confirm(`Deletar "${expense.description}"?`)) {
        return;
      }

      try {
        await deleteFunction(expense.id);
        selectedHook.refetch();

        window.toast(
          "Despesa deletada",
          "Despesa foi removida com sucesso!",
          "success",
        );
        
      } catch (err) {
        console.error("Falha ao deletar despesa:", err);
        alert("Não foi possível deletar a despesa.");
      }
    },
    [deleteFunction, selectedHook],
  );

  return {
    expenses: selectedHook.data,
    totalItems: selectedHook.total,
    isLoading: selectedHook.isLoading,
    error: selectedHook.error,
    refetchExpenses: selectedHook.refetch,
    deleteExpense: handleDeleteExpense,
  };
}
