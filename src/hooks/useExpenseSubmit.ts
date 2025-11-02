import {
  deleteOperationalCost,
  findAllOperationalCosts,
  findOperationalCostById,
  registerOperationalCost,
  updateOperationalCost,
} from "../api/operational-costApi";
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
  Operacionais: {
    create: registerOperationalCost,
    update: updateOperationalCost,
    delete: deleteOperationalCost,
    get: findOperationalCostById,
    getAll: findAllOperationalCosts,
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
