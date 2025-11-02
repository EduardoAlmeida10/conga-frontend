import { api } from "./authApi";


export enum UtilityTypes {
  ENERGIA = 'Energia',
  AGUA = 'Água',
  INTERNET = 'Internet',
  TELEFONE = 'Telefone',
}


export interface UtilityCost {
  id: string;
  type: UtilityTypes;
  date: string;
  value: string;
  observations: string;
}


export interface RegisterUtilityCostDto {
  type: UtilityTypes;
  date: string; // formato 'YYYY-MM-DD'
  value: string;
  observations: string;
}


export type UpdateUtilityCostDto = Partial<RegisterUtilityCostDto>;


export interface UtilityCostFilterDto {
  type?: UtilityTypes;
  dateFrom?: string; //  'YYYY-MM-DD'
  dateTo?: string;   //  'YYYY-MM-DD'
  minValue?: number;
  maxValue?: number;
  observations?: string;
  page?: number;
  limit?: number;
}


export interface PaginatedUtilityCosts {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: UtilityCost[];
}


const BASE_URL = '/utility-cost';


/**
 * @POST /utility-cost/register
 */
export async function registerUtilityCost(
  dto: RegisterUtilityCostDto
): Promise<UtilityCost> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}


/**
 * @GET /utility-cost
 */
export async function findAllUtilityCosts(
  filters: UtilityCostFilterDto
): Promise<PaginatedUtilityCosts> {
  const response = await api.get(BASE_URL, {
    params: filters,
  });
  return response.data;
}


/**
 * @GET /utility-cost/:id
 */
export async function findUtilityCostById(id: string): Promise<UtilityCost> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}


/**
 * @PUT /utility-cost/:id
 */
export async function updateUtilityCost(
  id: string,
  dto: UpdateUtilityCostDto
): Promise<UtilityCost> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}


/**
 * @DELETE /utility-cost/:id
 */
export async function deleteUtilityCost(id: string): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
