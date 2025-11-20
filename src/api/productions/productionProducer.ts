import { api } from "../auth/authApi";

export interface ProducerProduction {
  id: string;
  date: string; 
  producerName: string; 
  totalQuantity: number; 
}

export interface RegisterProducerProductionDto {
  date: string;
  producerName: string;
  totalQuantity: number;
}

export interface FilterProducerProductionDto {
  dateFrom?: string; 
  dateTo?: string;
  producerName?: string;
  totalQuantityMin?: number;
  totalQuantityMax?: number;
  page?: number;
  limit?: number;
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
  const response = await api.get(BASE_URL, {
    params: filters,
  });
  return response.data;
}