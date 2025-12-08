import iconAdd from "@/assets/iconAdd.svg";
import Button from "@/components/Button";
import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import Backdrop from "@/components/Overlay/OverlayBackdrop";
import type { LocalRecord } from "@/entities/LocalRecord";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocalRecordColumns } from ".//columns";
import LocalRecordForm from "./LocalRecordForm";
import { useFindAllLocalProductions } from "@/hooks/productions/local_production/useFindAllLocalProductions";
import type { LocalProductionApiData } from "@/api/productions/productionLocal";
import { useDeleteLocalProduction } from "@/hooks/productions/local_production/useDeleteLocalProduction";

function mapApiData(apiData: LocalProductionApiData[]): LocalRecord[] {
  return apiData.map((item) => {
    const [year, month, day] = item.date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);

    return {
      id: item.id,
      grossQuantity: parseFloat(item.grossQuantity),
      consumedQuantity: parseFloat(item.consumedQuantity),
      totalQuantity: parseFloat(item.totalQuantity),
      date: localDate,
    };
  });
}

export default function LocalRecord() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });

  const {
    refetch: fetchLocalProductions,
  } = useFindAllLocalProductions(pagination.pageIndex, pagination.pageSize);

  const {
    mutate: deleteProduction,
  } = useDeleteLocalProduction();

  const [data, setData] = useState<LocalRecord[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<LocalRecord | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const handleEdit = useCallback((record: LocalRecord) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (record: LocalRecord) => {
      const confirmed = window.confirm(
        `Deseja realmente excluir o registro de ${record.date.toLocaleDateString()}?`
      );

      if (confirmed) {
        const success = await deleteProduction(record.id);

        if (success) {
          window.toast("Sucesso", "Registro removido!", "success");
          setReloadKey((prev) => prev + 1);
        } else {
          window.toast("Erro", "Falha ao excluir registro.", "error");
        }
      }
    },
    [deleteProduction]
  );

  const columns = useMemo(
    () => getLocalRecordColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete]
  );

  const fetchData = useCallback(async () => {
    const response = await fetchLocalProductions();

    if (response) {
      setPageCount(Math.ceil(response.total / pagination.pageSize));
      setData(mapApiData(response.data));
    }
  }, [pagination.pageIndex, pagination.pageSize, fetchLocalProductions]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reloadKey]);

  const handleSaved = () => {
    setIsFormOpen(false);
    setSelectedRecord(null);
    setReloadKey((prev) => prev + 1);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="p-6 w-full">
      <div className="pt-6 pb-6">
        <Button onClick={() => setIsFormOpen(true)}>
          <img src={iconAdd} alt="" />
          Novo Registro
        </Button>
      </div>

      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl shadow-sm">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Registro Local</h1>
        </div>

        <DataTable
          data={data}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={pageCount}
        >
          <div className="mb-4 flex justify-between items-center gap-4">
            <DataTableTextFilter placeholder="Pesquisar..." />

            <div className="flex gap-6 items-center">
              <DataTableColumnsVisibilityDropdown />
            </div>
          </div>

          <DataTableContent />

          <div className="flex justify-end items-center mt-4">
            <DataTablePagination />
          </div>
        </DataTable>
      </div>

      {isFormOpen && (
        <Backdrop isOpen={isFormOpen}>
          <LocalRecordForm
            record={selectedRecord}
            onClose={handleCloseForm}
            onSaved={handleSaved}
          />
        </Backdrop>
      )}
    </div>
  );
}
















// function mapApiData(apiData: LocalProductionApiData[]): LocalRecord[] {
//   return apiData.map((item) => {
//     const [year, month, day] = item.date.split("-").map(Number);

//     const localDate = new Date(year, month - 1, day);

//     return {
//       id: item.id,
//       grossQuantity: parseFloat(item.grossQuantity),
//       consumedQuantity: parseFloat(item.consumedQuantity),
//       totalQuantity: parseFloat(item.totalQuantity),
//       date: localDate,
//     };
//   });
// }

// export default function LocalRecord() {
//   const [data, setData] = useState<LocalRecord[]>([]);
//   const [, setIsLoading] = useState(true);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [reloadKey, setReloadKey] = useState(0);
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
//   const [pageCount, setPageCount] = useState(1);

//   const columns = localRecordColumns;

//   const handleSaved = () => {
//     setIsFormOpen(false);
//     setReloadKey((prev) => prev + 1);
//   };

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const apiResponse = await findAllLocalProductions({
//         page: pagination.pageIndex + 1,
//         limit: pagination.pageSize,
//       });

//       setPageCount(Math.ceil(apiResponse.total / pagination.pageSize));

//       const mappedData = mapApiData(apiResponse.data);

//       setData(mappedData);
//     } catch (error) {
//       console.error("Erro ao buscar dados de produção local:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [pagination.pageIndex, pagination.pageSize]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData, reloadKey]);

//   return (
//     <div className="p-6 w-full">
//       <div className="pt-6 pb-6">
//         <Button onClick={() => setIsFormOpen(true)}>
//           <img src={iconAdd} alt="" />
//           Novo Registro
//         </Button>
//       </div>
//       <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
//         <div className="flex flex-col items-center p-5 gap-5">
//           <h1 className="font-bold text-2xl">Registro Local</h1>
//         </div>

//         <DataTable
//           data={data}
//           columns={columns}
//           pagination={pagination}
//           onPaginationChange={setPagination}
//           pageCount={pageCount}
//         >
//           <div className="mb-4 flex justify-between items-center gap-4">
//             <DataTableTextFilter placeholder="Pesquisar" />

//             <div className="flex gap-6 items-center">
//               <DataTableColumnsVisibilityDropdown />
//             </div>
//           </div>

//           <DataTableContent />

//           <div className="flex justify-end items-center mt-4">
//             <DataTablePagination />
//           </div>
//         </DataTable>
//       </div>

//       {isFormOpen && (
//         <Backdrop isOpen={isFormOpen}>
//           <LocalRecordForm
//             onClose={() => setIsFormOpen(false)}
//             onSaved={handleSaved}
//           />
//         </Backdrop>
//       )}
//     </div>
//   );
// }
