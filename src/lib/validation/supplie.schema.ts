import z from "zod";
import { dateSchema, unitPriceSchema } from "./commun.schema";

export const supplieSchema = z.object({
  name: z.string({
    error: "O nome é obrigatório.",
  }).min(2, "O nome deve ter pelo menos 2 caracteres."),

  date: dateSchema,

  quantity: z.number({
    error: "A quantidade é obrigatória.",
  }).positive("A quantidade deve ser maior que zero."),

  unitPrice: unitPriceSchema,
});