import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";

import { useFetchDailyProducerProduction } from "@/hooks/productions/useFetchDailyProducerProductions";
import { useState } from "react";
import { dailyProductionColumns } from "./columns";

export default function DailyProductionPage() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });

  const { data, totalItems, loading, error } = useFetchDailyProducerProduction(
    pagination.pageIndex,
    pagination.pageSize,
  );

  const pageCount = Math.ceil(totalItems / pagination.pageSize);

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Produção Diária</h1>
        </div>

        {loading && <p className="text-center text-gray-500">Carregando...</p>}
        {error && (
          <p className="text-center text-red-500">
            Erro ao carregar dados: {error}
          </p>
        )}

        {!loading && !error && (
          <DataTable
            data={data}
            columns={dailyProductionColumns}
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
    </div>
  );
}
