import { api } from './authApi';

export enum CostType {
  SALARIOS_FIXOS = 'Salários Fixos',
  TERCEIRIZADOS = 'Terceirizados',
  ENCARGOS = 'Encargos',
  BENEFICIOS = 'Benefícios',
}

export interface PersonnelCost {
  id: string;
  type: CostType;
  date: string;
  value: string;
  description: string;
}

export interface RegisterPersonnelCostDto {
  type: CostType;
  date: string; // formato 'YYYY-MM-DD'
  value: string;
  description: string;
}

export type UpdatePersonnelCostDto = Partial<RegisterPersonnelCostDto>;

export interface PersonnelCostFilterDto {
  type?: CostType;
  dateFrom?: string; //  'YYYY-MM-DD'
  dateTo?: string;   //  'YYYY-MM-DD'
  minValue?: number;
  maxValue?: number;
  description?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedPersonnelCosts {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: PersonnelCost[];
}

const BASE_URL = '/personnel-cost';

/**
 * @POST /personnel-cost/register
 */
export async function registerPersonnelCost(
  dto: RegisterPersonnelCostDto
): Promise<PersonnelCost> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}

/**
 * @GET /personnel-cost
 */
export async function findAllPersonnelCosts(
  filters: PersonnelCostFilterDto
): Promise<PaginatedPersonnelCosts> {
  const response = await api.get(BASE_URL, {
    params: filters, 
  });
  return response.data;
}

/**
 * @GET /personnel-cost/:id
 */
export async function findPersonnelCostById(id: string): Promise<PersonnelCost> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

/**
 * @PUT /personnel-cost/:id
 */
export async function updatePersonnelCost(
  id: string,
  dto: UpdatePersonnelCostDto
): Promise<PersonnelCost> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}

/**
 * @DELETE /personnel-cost/:id
 */
export async function deletePersonnelCost(id: string): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}