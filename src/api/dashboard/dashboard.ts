import { api } from "../auth/authApi";

export interface DashboardMetrics {
  dailyProduction: number;
  dailyReceive: number;
  monthlyExpense: number;
  monthlyReceive: number;
}

const BASE_URL = "/";

/**
 * @GET /
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await api.get(BASE_URL); 
  const data = response.data;
  
  return {
    dailyProduction: Number(data.dailyProduction),
    dailyReceive: Number(data.dailyReceive),
    monthlyExpense: Number(data.monthlyExpense),
    monthlyReceive: Number(data.monthlyReceive),
  };
}