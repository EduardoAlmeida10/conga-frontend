import Button from "@/components/Button";
import { useMemo, useState } from "react";
import iconAdd from "../../assets/iconAdd.svg";

import OverlayBackdrop from "@/components/Overlay/OverlayBackdrop";
import ProducerProductionRequestForm from "./ProducerProductionRequestForm";

import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";

import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import { deleteProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import { useFetchProducerProduction } from "@/hooks/productions/producer_productions/useFetchProducerProductions";
import { useFetchProducerProductionRequests } from "@/hooks/productions/producer_productions_request/useFetchProducerProductionRequest";

import {
  getProducerProductionColumns,
  getProducerProductionRequestColumns,
} from "./columns";
import { UserAccountForm } from "./UserAcountForm";

export default function CollaboratorDashboard() {
  type OverlayMode = "production" | "account" | null;

  const [overlayMode, setOverlayMode] = useState<OverlayMode>(null);

  const [, setOverlayOpen] = useState(false);

  const [producerProductionPagination, setProducerProductionPagination] =
    useState({ pageIndex: 0, pageSize: 6 });

  const [
    producerProductionRequestsPagination,
    setProducerProductionRequestsPagination,
  ] = useState({ pageIndex: 0, pageSize: 6 });

  const {
    data,
    totalItems: totalItemsProducerProduction,
    loading,
    error,
    refetch,
  } = useFetchProducerProduction(
    producerProductionPagination.pageIndex,
    producerProductionPagination.pageSize,
  );

  const pageCountProducerProduction = Math.ceil(
    totalItemsProducerProduction / producerProductionPagination.pageSize,
  );

  const {
    data: requestData,
    totalItems: totalItemsProducerProductionRequests,
    loading: loadingRequests,
    error: errorRequests,
    refetch: refetchRequests,
  } = useFetchProducerProductionRequests(
    producerProductionRequestsPagination.pageIndex,
    producerProductionRequestsPagination.pageSize,
  );

  const pageCountProducerProductionRequests = Math.ceil(
    totalItemsProducerProductionRequests /
      producerProductionRequestsPagination.pageSize,
  );

  const [editingRequest, setEditingRequest] =
    useState<ProducerProductionRequest | null>(null);

  const handleOpenProductionModal = () => {
    setEditingRequest(null);
    setOverlayMode("production");
  };

  const handleOpenAccountModal = () => {
    setOverlayMode("account");
  };

  const handleCloseModal = () => {
    setEditingRequest(null);
    setOverlayMode(null);
  };

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
    if (
      requestData.length === 1 &&
      producerProductionRequestsPagination.pageIndex > 0
    ) {
      setProducerProductionRequestsPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1,
      }));
    }
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
      <div className="flex justify-between items-center mb-8">
        <Button onClick={handleOpenProductionModal}>
          <img src={iconAdd} alt="" />
          Novo Registro
        </Button>

        <Button onClick={handleOpenAccountModal}>
          Alterar Informações de conta
        </Button>
      </div>

      <OverlayBackdrop isOpen={overlayMode !== null} onClose={handleCloseModal}>
        {overlayMode === "production" && (
          <ProducerProductionRequestForm
            request={editingRequest ?? undefined}
            onClose={handleCloseModal}
            onSaved={handleSaveSuccess}
          />
        )}

        {overlayMode === "account" && (
          <UserAccountForm onClose={handleCloseModal} />
        )}
      </OverlayBackdrop>

      {loading && <p className="text-gray-600">Carregando registros...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
      <div className="flex flex-col gap-10">
        {!loading && !error && data && (
          <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
            <h2 className="font-bold text-xl w-full mb-4">Produções Aceitas</h2>
            <DataTable
              data={data.data}
              columns={productionColumns as any}
              pagination={producerProductionPagination}
              onPaginationChange={setProducerProductionPagination}
              pageCount={pageCountProducerProduction}
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
              Produções Pendentes
            </h2>
            <DataTable
              data={requestData}
              columns={requestColumns as any}
              pagination={producerProductionRequestsPagination}
              onPaginationChange={setProducerProductionRequestsPagination}
              pageCount={pageCountProducerProductionRequests}
            >
              <div className="mb-4 flex justify-between items-center w-full">
                <DataTableTextFilter placeholder="Buscar pendências" />
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
