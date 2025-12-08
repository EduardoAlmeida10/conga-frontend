import { api } from "../../auth/authApi";

export interface FinancialOverviewFilters {
  dateFrom?: string;
  dateTo?: string;
}

export interface FinancialReceiveLocal {
  grossQuantity: string;
  consumedQuantity: string;
  totalQuantity: string;
}

export interface FinancialMonthReceive {
  month: string;
  localTotal: string;
  producerTotal: string;
  total: string;
}

// pie chart
export async function getReceivesOverview(
  filters?: FinancialOverviewFilters,
): Promise<FinancialReceiveLocal> {
  const response = await api.get<FinancialReceiveLocal[]>(
    "/productions/local/grouped",
    {
      params: {
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
      },
    },
  );

  // backend sempre retorna um único item
  return response.data[0];
}

// bar chart
export async function getReceivesMonthly() {
  const response = await api.get<FinancialMonthReceive[]>(
    "/productions/monthly",
  );

  return response.data;
}
