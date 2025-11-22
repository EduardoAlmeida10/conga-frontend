"use client";

import { useState, useMemo } from "react";
import Button from "@/components/Button";
import iconAdd from "../../assets/iconAdd.svg";

import OverlayBackdrop from "@/components/Overlay/OverlayBackdrop";
import ProducerProductionRequestForm from "./ProducerProductionRequestForm";

import { DataTable } from "@/components/DataTable";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";

import { useFetchProducerProduction } from "@/hooks/productions/producer_productions/useFetchProducerProductions";
import { getProducerProductionColumns } from "./columns";

export default function CollaboratorDashboard() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const { data, loading, error, refetch } = useFetchProducerProduction();

  const handleOpenCreateModal = () => setOverlayOpen(true);
  const handleCloseModal = () => setOverlayOpen(false);

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
    window.toast("Sucesso", "Registro enviado para validação!", "success");
  };

  const columns = useMemo(() => getProducerProductionColumns(), []);

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Button styles="mb-8" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" />
        Novo Registro
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <ProducerProductionRequestForm
          onClose={handleCloseModal}
          onSaved={handleSaveSuccess}
        />
      </OverlayBackdrop>

      {loading && <p className="text-gray-600">Carregando registros...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}

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
            <div className="mb-4 flex justify-between items-center w-full">
              <DataTableTextFilter placeholder="Buscar registros" />
              <DataTableColumnsVisibilityDropdown />
            </div>

            <DataTableContent />

            <div className="flex justify-end items-center mt-4">
              <DataTablePagination />
            </div>
          </DataTable>
        </div>
      )}
    </div>
  );
}
