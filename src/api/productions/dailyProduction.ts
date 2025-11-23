import { api } from "../auth/authApi";

export interface DailyProduction {
  date: string;
  grossQuantity: number;
  consumedQuantity: number;
  totalQuantity: number;
  totalProducers: number;
}

export interface DailyProductionResponse {
  data: DailyProduction[];
}

export async function getDailyProduction(filters?: Record<string, any>) {
  const response = await api.get<DailyProduction[]>("/productions/daily", {
    params: filters,
  });

  return { data: response.data };
}
