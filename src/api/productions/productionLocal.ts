import { api } from "../auth/authApi";

export interface LocalProduction {
  id: string;
  date: string; 
  grossQuantity: string; 
  consumedQuantity: string; 
  totalQuantity: string; 
}

export interface RegisterLocalProductionDto {
  date: string; 
  grossQuantity: string;
  consumedQuantity: string;
}

export interface FilterLocalProductionDto {
  dateFrom?: string; // 'YYYY-MM-DD'
  dateTo?: string;
  grossQuantityMin?: string;
  grossQuantityMax?: string;
  consumedQuantityMin?: string;
  consumedQuantityMax?: string;
  totalQuantityMin?: string;
  totalQuantityMax?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedLocalProductions {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: LocalProduction[];
}

const BASE_URL = "/productions/local";

/**
 * @POST /productions/local/register
 */
export async function registerLocalProduction(
  dto: RegisterLocalProductionDto,
): Promise<LocalProduction> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}

/**
 * @GET /productions/local
 */
export async function findAllLocalProductions(
  filters: FilterLocalProductionDto,
): Promise<PaginatedLocalProductions> {
  const response = await api.get(BASE_URL, {
    params: filters,
  });
  return response.data;
}