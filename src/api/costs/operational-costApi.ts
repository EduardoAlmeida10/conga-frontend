import { api } from "../auth/authApi";

export const OperationalTypes = {
  HIGIENE: "Higiene",
  MANUTENCAO: "Manutenção de Equipamentos",
} as const;

export type OperationalTypes = typeof OperationalTypes[keyof typeof OperationalTypes];


export interface OperationalCost {
  id: string;
  type: OperationalTypes;
  date: string;
  value: string;
  description: string | null;
}

export interface RegisterOperationalCostDto {
  type: OperationalTypes;
  date: string;
  value: string;
  description: string | null;
}

export type UpdateOperationalCostDto = Partial<RegisterOperationalCostDto>;

export interface OperationalCostFilterDto {
  type?: OperationalTypes;
  dateFrom?: string; //  'YYYY-MM-DD'
  dateTo?: string;
  minValue?: number;
  maxValue?: number;
  description?: string | null;
  page?: number;
  limit?: number;
}

export interface PaginatedOperationalCosts {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: OperationalCost[];
}

const BASE_URL = "/operational-cost";

/**
 * @POST /operational-cost/register
 */
export async function registerOperationalCost(
  dto: RegisterOperationalCostDto,
): Promise<OperationalCost> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}

/**
 * @GET /operational-cost
 */
export async function findAllOperationalCosts(
  filters: OperationalCostFilterDto,
): Promise<PaginatedOperationalCosts> {
  const response = await api.get(BASE_URL, {
    params: filters,
  });
  return response.data;
}

/**
 * @GET /operational-cost/:id
 */
export async function findOperationalCostById(
  id: string,
): Promise<OperationalCost> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

/**
 * @PUT /operational-cost/:id
 */
export async function updateOperationalCost(
  id: string,
  dto: UpdateOperationalCostDto,
): Promise<OperationalCost> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}

/**
 * @DELETE /operational-cost/:id
 */
export async function deleteOperationalCost(
  id: string,
): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
