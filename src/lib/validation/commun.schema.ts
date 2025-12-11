import { z } from "zod";

export const dateSchema = z
  .string({ error: "A data é obrigatória" })
  .min(1, "A data é obrigatória")
  .refine((value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return false;

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    return date >= minDate;
  }, "A data não pode ser anterior a 100 anos");

export const valueSchema = z
  .string({ error: "O valor é obrigatório" })
  .min(1, "O valor é obrigatório")
  .transform((val) => val.replace(",", "."))
  .refine((val) => /^(\d+)(\.\d{1,2})?$/.test(val), {
    message: "Digite um valor válido (máx. 2 decimais)"
  })
  .transform(Number)
  .refine((num) => num > 0, "O valor deve ser maior que zero");

export const unitPriceSchema = z
  .string({ error: "O valor é obrigatório" })
  .min(1, "O valor é obrigatório")
  .transform((val) => val.replace(",", "."))
  .refine((val) => /^(\d+)(\.\d{1,2})?$/.test(val), {
    message: "Digite um valor válido (máx. 2 decimais)"
  })
  .transform(Number)
  .refine((num) => num > 0, "O valor deve ser maior que zero");

export const descriptionSchema = z.string().optional().nullable();

export const observationSchema = z.string().optional().nullable();
