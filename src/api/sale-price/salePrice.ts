import { api } from "../auth/authApi";

export interface NewSalePriceDto {
  value: number;
}

export interface SalePrice {
  id: string;
  value: number;
  startDate: string; 
  endDate: string;   
}

export interface SaveSalePriceResponse {
  message: string;
}

const BASE_URL = "/sale-price";

/**
 * @POST /sale-price
 */
export async function saveSalePrice(
  dto: NewSalePriceDto,
): Promise<SaveSalePriceResponse> {
  const response = await api.post(BASE_URL, dto);
  return response.data;
}

/**
 * @GET /sale-price/current
 */
export async function getCurrentSalePrice(): Promise<SalePrice> {
  const response = await api.get(`${BASE_URL}/current`);
  return response.data;
}