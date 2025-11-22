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
import { useFetchProducerProductionRequests } from "@/hooks/productions/producer_productions_request/useFetchProducerProductionRequest";
import { deleteProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";

import {
  getProducerProductionColumns,
  getProducerProductionRequestColumns,
} from "./columns";

export default function CollaboratorDashboard() {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const { data, loading, error, refetch } = useFetchProducerProduction();
  const {
    data: requestData,
    loading: loadingRequests,
    error: errorRequests,
    refetch: refetchRequests,
  } = useFetchProducerProductionRequests();
  const [editingRequest, setEditingRequest] =
    useState<ProducerProductionRequest | null>(null);

  const handleOpenCreateModal = () => setOverlayOpen(true);
  const handleCloseModal = () => setOverlayOpen(false);

  const handleSaveSuccess = () => {
    refetch();
    refetchRequests();
    handleCloseModal();
    window.toast("Sucesso", "Registro enviado para validação!", "success");
  };

  const handleEditRequest = (request: ProducerProductionRequest) => {
    setEditingRequest(request);
    setOverlayOpen(true);
  };

  const handleDeleteRequest = async (request: ProducerProductionRequest) => {
    if (!confirm("Deseja realmente excluir este registro?")) return;
    await deleteProducerProductionRequest(request.id);
    refetchRequests();
    window.toast("Sucesso", "Registro excluído!", "success");
  };

  const productionColumns = useMemo(() => getProducerProductionColumns(), []);
  const requestColumns = useMemo(
    () =>
      getProducerProductionRequestColumns(
        handleEditRequest,
        handleDeleteRequest,
      ),
    [],
  );

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Button styles="mb-8" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" />
        Novo Registro
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <ProducerProductionRequestForm
          request={editingRequest ?? undefined}
          onClose={handleCloseModal}
          onSaved={handleSaveSuccess}
        />
      </OverlayBackdrop>

      {loading && <p className="text-gray-600">Carregando registros...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
      <div className="flex flex-col gap-10">
        {!loading && !error && data && (
          <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
            <DataTable
              data={data.data}
              columns={productionColumns as any}
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
        {loadingRequests && (
          <p className="text-gray-600">Carregando requests...</p>
        )}
        {errorRequests && <p className="text-red-500">Erro: {errorRequests}</p>}
        {!loadingRequests && !errorRequests && requestData && (
          <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
            <h2 className="font-bold text-xl w-full mb-4">
              Requests de Produção
            </h2>
            <DataTable
              data={requestData.data}
              columns={requestColumns as any}
              pagination={{
                pageIndex: requestData.page - 1,
                pageSize: requestData.limit,
              }}
            >
              <div className="mb-4 flex justify-between items-center w-full">
                <DataTableTextFilter placeholder="Buscar requests" />
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
    </div>
  );
}
