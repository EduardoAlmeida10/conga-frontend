import { api } from "../auth/authApi";

export interface DashboardMetrics {
  dailyProduction: number;
  dailyReceive: number;
  monthlyExpense: number;
  monthlyReceive: number;
}

export interface DashboardRecords {
  lastProduction: any;
  lastSupply: any;
  lastPersonnelCost: any;
  lastOperationalCost: any;
  lastUtilityCost: any;
}

const DASHBOARD_URL = "/";
const RECORDS_URL = "/records";

/**
 * @GET /
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await api.get(DASHBOARD_URL);
  const data = response.data;

  return {
    dailyProduction: Number(data.dailyProduction),
    dailyReceive: Number(data.dailyReceive),
    monthlyExpense: Number(data.monthlyExpense),
    monthlyReceive: Number(data.monthlyReceive),
  };
}

/**
 * @GET /records
 */
export async function getDashboardRecords(): Promise<DashboardRecords> {
  const response = await api.get(RECORDS_URL);
  return response.data;
}
