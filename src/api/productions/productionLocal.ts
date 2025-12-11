import { api } from "../auth/authApi";

export interface LocalProductionApiData {
  id: string;
  date: string;
  grossQuantity: string;
  consumedQuantity: string;
  totalQuantity: string;
}

export interface LocalProduction {
  id: string;
  date: string;
  grossQuantity: number;
  consumedQuantity: number;
  totalQuantity: number;
}

export interface RegisterLocalProductionDto {
  date: string;
  grossQuantity: string;
  consumedQuantity: string;
}

export type UpdateLocalProductionDto = Partial<RegisterLocalProductionDto>;

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
  data: LocalProductionApiData[];
}

const BASE_URL = "/productions/local";

/** @POST /productions/local/register */
export async function registerLocalProduction(
  dto: RegisterLocalProductionDto,
): Promise<boolean> {
  await api.post(`${BASE_URL}/register`, dto);
  return true;
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

/** @PUT /productions/local/:id */
export async function updateLocalProduction(
  id: string,
  dto: UpdateLocalProductionDto,
): Promise<LocalProductionApiData> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}

/** @DELETE /productions/local/:id */
export async function deleteLocalProduction(
  id: string,
): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
