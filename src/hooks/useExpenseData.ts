import { useCallback, useMemo } from "react";
import { deletePersonnelCost } from "../api/personnel-costApi";
import { usePersonnelCosts } from "./usePersonnelCosts";
import { deleteOperationalCost } from "../api/operational-costApi";
import { useOperationalCosts } from "./useOperationalCosts";


export interface BaseExpense {
  id: string;
  // description: string;
  date: string;
  // value: string | number;
  [key: string]: any;
}

const deleteFunctionsMap = {
  Pessoal: deletePersonnelCost,
  Operacionais: deleteOperationalCost,
};

const useEmptyData = () => ({
  data: [],
  isLoading: false,
  error: null,
  refetch: () => {},
});

export function useExpenseData(type: keyof typeof deleteFunctionsMap) {
  const filters = useMemo(() => ({ page: 1, limit: 20 }), []);

  const emptyFilters = useMemo(() => ({}), []);

  const personnelData = usePersonnelCosts(type === "Pessoal" ? filters : emptyFilters);
  const operationalData = useOperationalCosts(type === "Operacionais" ? filters : emptyFilters);

  const emptyData = useEmptyData();

  const { data, isLoading, error, refetch } = useMemo(() => {
    switch (type) {
      case "Pessoal":
        return personnelData;
      case "Operacionais":
        return operationalData;
      default:
        return emptyData;
    }
  }, [type, personnelData, operationalData, emptyData]);

  const deleteFunction = useMemo(() => {
    return deleteFunctionsMap[type];
  }, [type]);

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
        refetch();
      } catch (err) {
        console.error("Falha ao deletar despesa:", err);
        alert("Não foi possível deletar a despesa.");
      }
    },
    [deleteFunction, refetch],
  );

  return {
    expenses: data,
    isLoading,
    error,
    refetchExpenses: refetch,
    deleteExpense: handleDeleteExpense,
  };
}

