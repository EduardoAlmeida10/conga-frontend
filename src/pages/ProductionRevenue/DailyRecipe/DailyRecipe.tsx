import {
  getCurrentSalePrice,
  type SalePrice,
} from "@/api/sale-price/salePrice";
import { useEffect, useMemo, useState } from "react";
import { dailyRecipeColumns } from "./columns";
import React from "react";
import {
  findAllReceives,
  mapApiToReceive,
  type PaginatedReceives,
} from "@/api/receives/receives";
import type { OverviewMetrics } from "@/components/Overview/OverviewSection";
import Button from "@/components/Button";
import OverviewSection from "@/components/Overview/OverviewSection";
import { DataTable } from "@/components/DataTable";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import Backdrop from "@/components/Overlay/OverlayBackdrop";
import SalePriceForm from "./SalePriceForm";

interface DailyRecipe {
  id: string;
  total: number;
  tanque: number;
  precoLeite: number;
  date: Date;
}

export default function DailyRecipe() {
  const [data, setData] = useState<DailyRecipe[]>([]);
  const [salePrice, setSalePrice] = useState<SalePrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
    total: 0,
  });

  const columns = dailyRecipeColumns;

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const priceResponse = await getCurrentSalePrice();
      setSalePrice(priceResponse);

      const filters = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      };

      const receivesResponse: PaginatedReceives =
        await findAllReceives(filters);
      const receivedData = mapApiToReceive(receivesResponse.data);

      const mappedData: DailyRecipe[] = receivedData.map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);

        const localDate = new Date(year, month - 1, day);

        return {
          id: item.id,
          total: item.totalPrice,
          tanque: item.tankQuantity,
          precoLeite: item.salePrice,
          date: localDate, 
        };
      });

      setData(mappedData);

      setPagination((prev) => ({
        ...prev,
        total: receivesResponse.total,
        totalPages: receivesResponse.totalPages,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados diários:", error);
      setSalePrice(null);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, reloadKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaved = () => {
    setIsFormOpen(false);
    setReloadKey((prev) => prev + 1);
  };

  const metrics: OverviewMetrics = useMemo(() => {
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
      data.length > 0 && data[0].date instanceof Date
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
      <Button onClick={() => setIsFormOpen(true)}>
        Definir preço do Leite
      </Button>
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

      {isFormOpen && (
        <Backdrop isOpen={isFormOpen}>
          <SalePriceForm
            onClose={() => setIsFormOpen(false)}
            onSaved={handleSaved}
          />
        </Backdrop>
      )}
    </div>
  );
}
