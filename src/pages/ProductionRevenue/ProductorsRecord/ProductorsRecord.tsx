import { useMemo, useState } from "react";
import Button from "@/components/Button";
import iconAdd from "@/assets/iconAdd.svg";
import OverlayBackdrop from "@/components/Overlay/OverlayBackdrop";
import ProductoresRecordForms from "./ProductorsRecordForm";

import { DataTable } from "@/components/DataTable";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";

import { useFetchProducerProduction } from "@/hooks/productions/producer_productions/useFetchProducerProductions";
import { useDeleteProducerProduction } from "@/hooks/productions/producer_productions/useDeleteProducerProduction";
import { getProducerProductionColumns } from "./columns";

export default function ProductorsRecord() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const { data, loading, error, refetch } = useFetchProducerProduction();
  const { remove } = useDeleteProducerProduction();

  const handleOpenCreateModal = () => {
    setRecordToEdit(null);
    setOverlayOpen(true);
  };

  const handleEdit = (record: any) => {
    setRecordToEdit(record);
    setOverlayOpen(true);
  };

  const handleDelete = async (record: any) => {
    if (!confirm(`Deseja realmente excluir este registro?`)) return;
    await remove(record.id);
    refetch();
  };

  const columns = useMemo(
    () => getProducerProductionColumns(handleEdit, handleDelete),
    [],
  );

  return (
    <div className="w-full p-8">
      <Button styles="my-8" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" /> Novo Registro
      </Button>

      <OverlayBackdrop
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
      >
        <ProductoresRecordForms
          record={recordToEdit}
          onClose={() => setOverlayOpen(false)}
          onSaved={() => refetch()}
        />
      </OverlayBackdrop>
      {!loading && !error && data && (
        <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
          <DataTable
            data={data.data}
            columns={columns as any}
            pagination={{
              pageIndex: data.page - 1,
              pageSize: data.limit,
            }}
          >
            <div className="mb-4 flex justify-between w-full">
              <DataTableTextFilter placeholder="Buscar registros" />
              <DataTableColumnsVisibilityDropdown />
            </div>
            <DataTableContent />
            <div className="flex justify-end mt-4">
              <DataTablePagination />
            </div>
          </DataTable>
        </div>
      )}
    </div>
  );
}
