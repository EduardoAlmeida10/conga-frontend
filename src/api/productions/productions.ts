import { api } from "../auth/authApi";

export interface GetDailyProductionDto {
  dateFrom?: string; 
  dateTo?: string;
}

export interface DailyProduction {
  date: string;
  grossQuantity: number;
  consumedQuantity: number;
  totalQuantity: number;
  totalProducers: number; 
}

const BASE_URL = "/productions";

/**
 * @GET /productions/daily
 * Busca a produção diária agregada com filtros de data.
 */
export async function getDailyProduction(
  filters: GetDailyProductionDto = {},
): Promise<DailyProduction[]> {
  const response = await api.get(`${BASE_URL}/daily`, {
    params: filters,
  });
  return response.data;
}