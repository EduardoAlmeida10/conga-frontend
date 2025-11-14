import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome é muito longo."),

  username: z
    .string()
    .min(3, "O usuário deve ter pelo menos 3 caracteres.")
    .max(50, "O usuário é muito longo."),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres."),

  confirmPassword: z
    .string()
    .min(6, "A confirmação deve ter pelo menos 6 caracteres."),

}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome é muito longo."),

  username: z
    .string()
    .min(3, "O usuário deve ter pelo menos 3 caracteres.")
    .max(50, "O usuário é muito longo."),

});
