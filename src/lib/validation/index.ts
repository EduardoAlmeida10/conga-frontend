import { operationalSchema } from "./operational.schema";
import { personnelSchema } from "./personnel.schema";
import { supplieSchema } from "./supplie.schema";
import { utilitySchema } from "./utility.schema";

export const expenseValidators: Record<string, any> = {
  Pessoal: personnelSchema,
  Operacionais: operationalSchema,
  Utilitários: utilitySchema,
  Insumos: supplieSchema,
};