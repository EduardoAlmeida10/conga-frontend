import { api } from "../auth/authApi";

export interface ProducerProductionRequest {
  id: string;
  date: string;
  producerName: string;
  totalQuantity: number;
  status: string;
  createdAt: string;
}

export interface RegisterProducerProductionRequestDto {
  date: string;
  producerName: string;
  totalQuantity: number;
}

export interface FilterProducerProductionRequestDto {
  dateFrom?: string;
  dateTo?: string;
  producerName?: string;
  status?: string; 
  totalQuantityMin?: number;
  totalQuantityMax?: number;
  page?: number;
  limit?: number;
}

export interface UpdateProducerProductionRequestDto {
  date?: string;
  producerName?: string;
  totalQuantity?: number;
}

export interface PaginatedProducerProductionRequests {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: ProducerProductionRequest[];
}

const BASE_URL = "/productions/producer/requests";

/**
 * POST /productions/producer/requests/register
 */
export async function registerProducerProductionRequest(
  dto: RegisterProducerProductionRequestDto,
): Promise<ProducerProductionRequest> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}

/**
 * GET /productions/producer/requests
 */
export async function findAllProducerProductionRequests(
  filters: FilterProducerProductionRequestDto,
): Promise<PaginatedProducerProductionRequests> {
  const response = await api.get(BASE_URL, { params: filters });
  return response.data;
}

/**
 * GET /productions/producer/requests/:id
 */
export async function findProducerProductionRequestById(
  id: string,
): Promise<ProducerProductionRequest> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

/**
 * PUT /productions/producer/requests/:id
 */
export async function updateProducerProductionRequest(
  id: string,
  dto: UpdateProducerProductionRequestDto,
): Promise<ProducerProductionRequest> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}

/**
 * DELETE /productions/producer/requests/:id
 */
export async function deleteProducerProductionRequest(id: string) {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}

/**
 * PUT /productions/producer/requests/validate/:id
 * Admin valida ou invalida a request
 */
export async function validateProducerProductionRequest(
  id: string,
  validated: boolean,
) {
  const response = await api.put(
    `${BASE_URL}/validate/${id}`,
    {},
    { params: { validated } },
  );
  return response.data;
}
