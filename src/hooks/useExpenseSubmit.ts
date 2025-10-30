import {
  deletePersonnelCost,
  findAllPersonnelCosts,
  findPersonnelCostById,
  registerPersonnelCost,
  updatePersonnelCost,
} from "../api/personnel-costApi";

const apiFunctionsMap = {
  Pessoal: {
    create: registerPersonnelCost,
    update: updatePersonnelCost,
    delete: deletePersonnelCost,
    get: findPersonnelCostById,
    getAll: findAllPersonnelCosts,
  },
};

export function useExpenseSubmit(expenseType: string) {
  const api = apiFunctionsMap[expenseType];

  if (!api) {
    throw new Error(
      `API de submissão não definida para o tipo: ${expenseType}`,
    );
  }

  return {
    createExpense: api.create,
    updateExpense: api.update,
    deleteExpense: api.delete,
    getExpense: api.get,
    getAllExpense: api.getAll,
  };
}
