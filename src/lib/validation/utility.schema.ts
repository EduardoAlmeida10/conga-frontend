import z from "zod";
import { dateSchema, observationSchema, valueSchema } from "./commun.schema";
import { UtilityTypes } from "@/api/costs/utility-costApi";

export const utilitySchema = z.object({
  date: dateSchema,
  type: z.nativeEnum(UtilityTypes),
  value: valueSchema,
  observations: observationSchema
});