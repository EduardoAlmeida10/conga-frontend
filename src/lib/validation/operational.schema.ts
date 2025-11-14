import z from "zod";
import { dateSchema, descriptionSchema, valueSchema } from "./commun.schema";
import { OperationalTypes } from "@/api/operational-costApi";

export const operationalSchema = z.object({
  date: dateSchema,
  type: z.nativeEnum(OperationalTypes),
  value: valueSchema,
  description: descriptionSchema,
});