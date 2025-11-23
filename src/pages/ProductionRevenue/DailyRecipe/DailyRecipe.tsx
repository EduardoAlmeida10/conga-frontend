import Button from "@/components/Button";
import OverviewSection, {
  type OverviewMetrics,
} from "@/components/Overview/OverviewSection";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import {
  getCurrentSalePrice,
  type SalePrice,
} from "@/api/sale-price/salePrice";
import {
  mapDailyProductionToRecipe,
  type DailyRecipe,
} from "@/entities/DailyRecipe";
import { dailyRecipeColumns } from "./columns";
import { getDailyProduction } from "@/api/productions/productions";
import React from "react";

export default function DailyRecipe() {
  const [data, setData] = useState<DailyRecipe[]>([]);
  const [salePrice, setSalePrice] = useState<SalePrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
    total: 0,
  });

  const columns = dailyRecipeColumns;

  useEffect(() => {
    async function fetchDailyData() {
      setIsLoading(true);
      try {
        const priceResponse = await getCurrentSalePrice();
        setSalePrice(priceResponse);

        const productionResponse = await getDailyProduction({});

        const mappedData = mapDailyProductionToRecipe(
          productionResponse,
          priceResponse,
        );

        console.log(mappedData);

        setData(mappedData);

        setPagination((prev) => ({
          ...prev,
          total: productionResponse.length,
        }));
      } catch (error) {
        console.error("Erro ao buscar dados diários:", error);
        setSalePrice(null);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDailyData();
  }, []);

  const metrics: OverviewMetrics = React.useMemo(() => {
    const price = parseFloat(salePrice?.value?.toString() || "0") || 0;

    const totalDaysLoaded = data.length;

    let totalRevenue = 0;
    let totalLiters = 0;

    data.forEach((item) => {
      totalRevenue += item.total;
      totalLiters += item.tanque;
    });

    const dailyAverage =
      totalDaysLoaded > 0 ? totalRevenue / totalDaysLoaded : 0;

    const monthlyTotal = totalRevenue;

    const lastDateString =
      data.length > 0
        ? data[0].date.toLocaleDateString("pt-BR")
        : new Date().toLocaleDateString("pt-BR");

    return {
      dailyAverage,
      monthlyTotal,
      milkPrice: price,
      lastUpdated: lastDateString,
      totalLiters,
    };
  }, [data, salePrice]);

  return (
    <div className="p-6 w-full">
      <Button>Definir preço do Leite</Button>
      <div className="pt-8 pb-8">
        <OverviewSection metrics={metrics}></OverviewSection>
      </div>

      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Receitas Diárias</h1>
        </div>

        {isLoading && <p>Carregando dados de receitas...</p>}

        {(!isLoading || data.length > 0) && (
          <DataTable data={data} columns={columns} pagination={pagination}>
            <div className="mb-4 flex justify-between items-center gap-4">
              <DataTableTextFilter placeholder="Pesquisar" />
              <div className="flex gap-6 items-center">
                <DataTableColumnsVisibilityDropdown />
              </div>
            </div>

            <DataTableContent />

            <div className="flex justify-end items-center mt-4">
              <DataTablePagination />
            </div>
          </DataTable>
        )}
      </div>
    </div>
  );
}