import { api } from "../../auth/authApi";

export interface FinancialOverviewFilters {
  dateFrom?: string;
  dateTo?: string;
}

export interface FinancialOverview {
  total: number;
  categories: {
    PERSONNEL: number;
    UTILITY: number;
    SUPPLIES: number;
    OPERATIONAL: number;
  };
}

export interface FinancialDetailed {
  personnel: number;
  utility: number;
  supplies: number;
  operational: number;
  localProduction: number;
  producerProduction: number;
  totalProduction: number;
}

export interface FinancialDailyEntry {
  date: string;
  total: number;
  personnel: number;
  utility: number;
  supplies: number;
  operational: number;
}

export interface ComparePeriodsDto {
  periodOne: string;
  periodTwo: string;
}

export interface ComparePeriodsResponse {
  monthOneData: FinancialOverview;
  monthTwoData: FinancialOverview;
}

export async function getExpensesDaily(filters?: FinancialOverviewFilters) {
  const response = await api.get<FinancialDailyEntry[]>("/expenses/daily", {
    params: {
      dateFrom: filters?.dateFrom,
      dateTo: filters?.dateTo,
    },
  });

  return response.data;
}

export async function getExpensesOverview(filters?: FinancialOverviewFilters) {
  const response = await api.get<FinancialOverview>("/expenses", {
    params: {
      dateFrom: filters?.dateFrom,
      dateTo: filters?.dateTo,
    },
  });

  return response.data;
}

export async function compareExpensesPeriods(dto: ComparePeriodsDto) {
  const response = await api.get<ComparePeriodsResponse>("/expenses/compare", {
    params: {
      periodOne: dto.periodOne,
      periodTwo: dto.periodTwo,
    },
  });

  return response.data;
}
