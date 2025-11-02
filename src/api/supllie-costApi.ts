import { api } from "./authApi";


export interface SupplieCost {
  id: string;
  name: string;
  date: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
}


export interface RegisterSupplieCostDto {
  name: string;
  date: string;
  quantity: number;
  unitPrice: number;
}


export type UpdateSupplieCostDto = Partial<RegisterSupplieCostDto>;


export interface SupplieCostFilterDto {
  name?: string;
  dateFrom?: string; //  'YYYY-MM-DD'
  dateTo?: string;   //  'YYYY-MM-DD'
  minQuantity?: number;
  maxQuantity?: number;
  minUnitPrice?: number;
  maxUnitPrice?: number;
  minTotal?: number;
  maxTotal?: number;
  page?: number;
  limit?: number;
}


export interface PaginatedSupplieCosts {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: SupplieCost[];
}


const BASE_URL = '/supplies';


/**
 * @POST /supplies/register
 */
export async function registerSupplieCost(
  dto: RegisterSupplieCostDto
): Promise<SupplieCost> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}


/**
 * @GET /supplies
 */
export async function findAllSupplieCosts(
  filters: SupplieCostFilterDto
): Promise<PaginatedSupplieCosts> {
  const response = await api.get(BASE_URL, {
    params: filters,
  });
  return response.data;
}


/**
 * @GET /supplies/:id
 */
export async function findSupplieCostById(id: string): Promise<SupplieCost> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}


/**
 * @PUT /supplies/:id
 */
export async function updateSupplieCost(
  id: string,
  dto: UpdateSupplieCostDto
): Promise<SupplieCost> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}


/**
 * @DELETE /supplies/:id
 */
export async function deleteSupplieCost(id: string): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
