import { useQuery } from "@tanstack/react-query";
import {
  findAllReceives,
  type PaginatedReceives,
  type ReceivesFilterDto,
} from "../../../api/receives/receives";

type LineChartReceiveDatum = {
  date: string;
  tankQuantity: number;
  totalPrice: number;
};

async function fetchAllReceives(
  filters: ReceivesFilterDto,
): Promise<LineChartReceiveDatum[]> {
  let page = 1;
  let allData: LineChartReceiveDatum[] = [];

  while (true) {
    const response: PaginatedReceives = await findAllReceives({
      ...filters,
      page,
      limit: 100, // evita muitas requests
    });

    const mapped = response.data.map((item) => ({
      date: item.date,
      tankQuantity: Number(item.tankQuantity),
      totalPrice: Number(item.totalPrice),
    }));

    allData = allData.concat(mapped);

    if (page >= response.totalPages) break;
    page++;
  }

  return allData;
}

export function useLineChartReceive(filters: ReceivesFilterDto) {
  const query = useQuery({
    queryKey: ["lineChartReceives", filters.dateFrom, filters.dateTo],
    queryFn: () => fetchAllReceives(filters),
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isFetching,
    refetch: query.refetch,
  };
}
