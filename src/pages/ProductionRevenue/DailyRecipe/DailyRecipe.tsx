import {
  findAllReceives,
  mapApiToReceive,
  type PaginatedReceives,
} from "@/api/receives/receives";
import {
  getCurrentSalePrice,
  type SalePrice,
} from "@/api/sale-price/salePrice";
import { AiOutlineAreaChart } from "react-icons/ai";
import Button from "@/components/Button";
import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import Backdrop from "@/components/Overlay/OverlayBackdrop";
import OverviewSection from "@/components/Overview/OverviewSection";
import React, { useEffect, useMemo, useState } from "react";
import { dailyRecipeColumns } from "./columns";
import SalePriceForm from "./SalePriceForm";
import type { CardItem } from "@/types/OverviewSection.types";
import { formatCurrency } from "@/lib/formatters";
import { FaDollarSign } from "react-icons/fa";

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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const [totalPages, setTotalPages] = useState(0);

  const [averageDaily, setAverageDaily] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const [reloadKey, setReloadKey] = useState(0);

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

      setAverageDaily(parseFloat(receivesResponse.average) || 0);
      setMonthlyTotal(parseFloat(receivesResponse.monthly) || 0);

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

      setTotalPages(receivesResponse.totalPages);

      setPagination((prev) => ({
        ...prev,
        total: receivesResponse.total,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados diários:", error);
      setSalePrice(null);
      setData([]);
      setAverageDaily(0);
      setMonthlyTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadKey]);

  const handleSaved = () => {
    setIsFormOpen(false);
    setReloadKey((prev) => prev + 1);
  };

  const metrics = useMemo(() => {
    const price = parseFloat(salePrice?.value?.toString() || "0") || 0;

    const dailyAverage = averageDaily;
    const totalRevenue = monthlyTotal;

    let totalLiters = 0;
    data.forEach((item) => {
      totalLiters += item.tanque;
    });

    const lastDateString =
      data.length > 0 && data[0].date instanceof Date
        ? data[0].date.toLocaleDateString("pt-BR")
        : new Date().toLocaleDateString("pt-BR");

    return {
      dailyAverage,
      monthlyTotal: totalRevenue,
      milkPrice: price,
      lastUpdated: lastDateString,
      totalLiters,
    };
  }, [data, salePrice, monthlyTotal, averageDaily]);

  const pageCount = totalPages;
  const dailyRecipeCards: CardItem[] = useMemo(
    () => [
      {
        id: "daily",
        icon: AiOutlineAreaChart,
        title: "Receita Diária Média",
        value: formatCurrency(metrics.dailyAverage),
        iconBgColor: "bg-blue-500",
      },
      {
        id: "monthly",
        icon: AiOutlineAreaChart,
        title: "Receita Total Mensal",
        value: formatCurrency(metrics.monthlyTotal),
        iconBgColor: "bg-blue-500",
      },
      {
        id: "price",
        icon: FaDollarSign,
        title: "Preço do Leite (por L)",
        value: formatCurrency(metrics.milkPrice),
        iconBgColor: "bg-blue-500",
      },
    ],
    [metrics],
  );

  return (
    <div className="p-6 w-full">
      <Button onClick={() => setIsFormOpen(true)}>
        Definir Preço do Leite
      </Button>
      <div className="pt-8 pb-8">
        <OverviewSection
          title="Visão Geral"
          cards={dailyRecipeCards}
          lastUpdated={metrics.lastUpdated}
        ></OverviewSection>
      </div>

      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Receitas Diárias</h1>
        </div>

        {isLoading && <p>Carregando dados de receitas...</p>}

        {(!isLoading || data.length > 0) && (
          <DataTable
            data={data}
            columns={columns as any}
            pagination={pagination}
            onPaginationChange={setPagination}
            pageCount={pageCount}
          >
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
