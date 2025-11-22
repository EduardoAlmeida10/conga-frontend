import { api } from "../auth/authApi";

export interface ProducerProduction {
  id: string;
  date: string;
  producerName: string;
  totalQuantity: string;
}

export interface RegisterProducerProductionDto {
  date: string;
  producerName: string;
  totalQuantity: string;
}

export interface FilterProducerProductionDto {
  startDate?: string;
  endDate?: string;
  producerName?: string;
  totalQuantityMin?: number;
  totalQuantityMax?: number;
  page?: number;
  limit?: number;
}

export interface UpdateProducerProductionDto {
  date?: string;
  producerName?: string;
  totalQuantity?: string;
}

export interface PaginatedProducerProductions {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: ProducerProduction[];
}

const BASE_URL = "/productions/producer";

/**
 * @POST /productions/producer/register
 */
export async function registerProducerProduction(
  dto: RegisterProducerProductionDto,
): Promise<ProducerProduction> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}

/**
 * @GET /productions/producer
 */
export async function findAllProducerProductions(
  filters: FilterProducerProductionDto,
): Promise<PaginatedProducerProductions> {
  const response = await api.get(BASE_URL, { params: filters });
  return response.data;
}

/**
 * @GET /productions/producer/:id
 */
export async function findProducerProductionById(
  id: string,
): Promise<ProducerProduction> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

/**
 * @PUT /productions/producer/:id
 */
export async function updateProducerProduction(
  id: string,
  dto: UpdateProducerProductionDto,
): Promise<ProducerProduction> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}

/**
 * @DELETE /productions/producer/:id
 */
export async function deleteProducerProduction(
  id: string,
): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
