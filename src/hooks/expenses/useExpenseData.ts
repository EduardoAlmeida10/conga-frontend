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

const useEmptyData = () => ({
  data: [],
  isLoading: false,
  error: null,
  refetch: () => {},
});

export function useExpenseData(type: keyof typeof deleteFunctionsMap) {
  const filters = useMemo(() => ({ page: 1, limit: 20 }), []);

  const emptyFilters = useMemo(() => ({}), []);

  const personnelData = usePersonnelCosts(
    type === "Pessoal" ? filters : emptyFilters,
  );
  const utilityData = useUtilityCosts(
    type === "Utilitario" ? filters : emptyFilters,
  );
  const supplieData = useSupplieCosts(
    type === "Insumos" ? filters : emptyFilters,
  );
  const operationalData = useOperationalCosts(
    type === "Operacionais" ? filters : emptyFilters,
  );

  const emptyData = useEmptyData();

  const { data, isLoading, error, refetch } = useMemo(() => {
    switch (type) {
      case "Pessoal":
        return personnelData;
      case "Utilitario":
        return utilityData;
      case "Insumos":
        return supplieData;
      case "Operacionais":
        return operationalData;
      default:
        return emptyData;
    }
  }, [
    type,
    personnelData,
    utilityData,
    supplieData,
    operationalData,
    emptyData,
  ]);

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
