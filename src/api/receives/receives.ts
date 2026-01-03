import { api } from "../auth/authApi";

export interface ReceiveApiData {
  id: string;
  date: string;
  salePrice: string;
  tankQuantity: string;
  totalPrice: string;
}

export interface Receive {
  id: string;
  date: string; // 'YYYY-MM-DD'
  salePrice: number;
  tankQuantity: number;
  totalPrice: number;
}

export interface ReceivesFilterDto {
  dateFrom?: string;
  dateTo?: string;
  minTank?: number;
  maxTank?: number;
  minValue?: number;
  maxValue?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedReceives {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: ReceiveApiData[];
  average: string;
  monthly: string;
}

export function mapApiToReceive(data: ReceiveApiData[]): Receive[] {
  return data.map((item) => ({
    id: item.id,
    date: item.date,
    salePrice: parseFloat(item.salePrice),
    tankQuantity: parseFloat(item.tankQuantity),
    totalPrice: parseFloat(item.totalPrice),
  }));
}

const BASE_URL = "/receives";

/**
 * @GET /receives
 */
export async function findAllReceives(
  filters: ReceivesFilterDto,
): Promise<PaginatedReceives> {
  const response = await api.get(BASE_URL, { params: filters });
  return response.data;
}

export async function updateReceivePrice(date: Date, value: number): Promise<void> {
  const dateKey = date.toISOString().split('T')[0];

  await api.put(`${BASE_URL}/update-price/${dateKey}`, { value });
}