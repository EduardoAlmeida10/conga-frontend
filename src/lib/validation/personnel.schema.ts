import { CostType } from "@/api/personnel-costApi";
import { z } from "zod";
import { dateSchema, descriptionSchema, valueSchema } from "./commun.schema";

export const personnelSchema = z.object({
  date: dateSchema,
  type: z.nativeEnum(CostType),
  value: valueSchema,
  description: descriptionSchema,
});
