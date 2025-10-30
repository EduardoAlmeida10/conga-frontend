import { useMemo } from "react";
import { deletePersonnelCost } from "../api/personnel-costApi";
import { usePersonnelCosts } from "./usePersonnelCosts";

export interface BaseExpense {
  id: string | number;
  description: string;
  date: string;
  value: string | number;
  [key: string]: any; 
}

const queryHooksMap = {
  Pessoal: usePersonnelCosts,
};

const deleteFunctionsMap = {
  Pessoal: deletePersonnelCost,
};

const useEmptyData = () => ({
  data: [],
  isLoading: false,
  error: null,
  refetch: () => {},
});


export function useExpenseData(type: string) {
  const filters = useMemo(() => ({ page: 1, limit: 20 }), []);

  const useQueryHook = queryHooksMap[type] || useEmptyData;
  
  const { data, isLoading, error, refetch } = useQueryHook(filters);

  const deleteFunction = deleteFunctionsMap[type];

  const handleDeleteExpense = async (expense: BaseExpense) => {
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
  };

  return {
    expenses: data,
    isLoading,
    error,
    refetchExpenses: refetch,
    deleteExpense: handleDeleteExpense,
  };
}