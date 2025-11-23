import Button from "@/components/Button";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTable } from "@/components/DataTable";
import { useState, useEffect } from "react";
import { localRecordColumns } from ".//columns";
import type { LocalRecord } from "@/entities/LocalRecord";
import { findAllLocalProductions, type LocalProduction } from "@/api/productions/productionLocal";

function mapApiData(apiData: LocalProduction[]): LocalRecord[] {
    return apiData.map(item => ({
        id: item.id,
        grossQuantity: parseFloat(item.grossQuantity),
        consumedQuantity: parseFloat(item.consumedQuantity),
        totalQuantity: parseFloat(item.totalQuantity),
        
        date: new Date(item.date),
    }));
}

export default function LocalRecord() {
  const [data, setData] = useState<LocalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
    total: 0,
  });

  const columns = localRecordColumns;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const filters = {
          page: pagination.pageIndex + 1, 
          limit: pagination.pageSize,
        };
        
        const apiResponse = await findAllLocalProductions(filters);
        
        const mappedData = mapApiData(apiResponse.data);

        setData(mappedData);
        setPagination(prev => ({
            ...prev,
            total: apiResponse.total,
            totalPages: apiResponse.totalPages
        }));

      } catch (error) {
        console.error("Erro ao buscar dados de produção local:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="p-6 w-full">
      <div className="pt-6 pb-6">
        <Button>Novo Registro</Button>
      </div>
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Registro Local</h1>
        </div>

        {isLoading && <p>Carregando dados...</p>} 

        {(!isLoading || data.length > 0) && (
            <DataTable
                data={data}
                columns={columns}
                pagination={{
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                }}
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