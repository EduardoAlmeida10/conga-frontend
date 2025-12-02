import { api } from "../../auth/authApi";

export interface FinancialOverview {
  totalReceives: number;
  totalExpenses: number;
  periodResult: number;
}

export interface FinancialOverviewFilters {
  dateFrom?: string;
  dateTo?: string;
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
  expenses: number;
  receives: number;
}

export interface ComparePeriodsDto {
  periodOne: string;
  periodTwo: string;
}

export interface ComparePeriodsResponse {
  monthOneData: FinancialOverview;
  monthTwoData: FinancialOverview;
}

export async function getFinancialOverview(filters?: FinancialOverviewFilters) {
  const response = await api.get<FinancialOverview>(
    "/financial-report/overview",
    {
      params: {
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
      },
    },
  );

  return response.data;
}

export async function getFinancialDetailed(
  filters?: FinancialOverviewFilters,
) {
  const response = await api.get<FinancialDetailed>(
    "/financial-report/detailed",
    {
      params: {
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
      },
    },
  );

  return response.data;
}

export async function getFinancialDaily(filters?: FinancialOverviewFilters) {
  const response = await api.get<FinancialDailyEntry[]>(
    "/financial-report/daily",
    {
      params: {
        dateFrom: filters?.dateFrom,
        dateTo: filters?.dateTo,
      },
    },
  );

  return response.data;
}

export async function compareFinancialPeriods(
  dto: ComparePeriodsDto,
) {
  const response = await api.get<ComparePeriodsResponse>(
    "/financial-report/compare",
    {
      params: {
        periodOne: dto.periodOne,
        periodTwo: dto.periodTwo,
      },
    },
  );

  return response.data;
}
