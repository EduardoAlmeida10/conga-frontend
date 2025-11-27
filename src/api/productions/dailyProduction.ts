import { api } from "../auth/authApi";

export interface DailyProduction {
  date: string;
  grossQuantity: number;
  consumedQuantity: number;
  totalQuantity: number;
  totalProducers: number;
}

export interface PaginatedDailyProduction {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: DailyProduction[];
}

export async function getDailyProduction(filters?: {
  page: number;
  limit: number;
}): Promise<PaginatedDailyProduction> {
  const response = await api.get<PaginatedDailyProduction>(
    "/productions/daily",
    {
      params: filters,
    },
  );

  return response.data;
}
