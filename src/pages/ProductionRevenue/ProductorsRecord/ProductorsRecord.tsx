"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import iconAdd from "@/assets/iconAdd.svg";
import ProductoresRecordForms from "./ProductorsRecordForm";
import ValidationForm from "./ValidationForm";

import { DataTable } from "@/components/DataTable";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";

import { useFetchProducerProduction } from "@/hooks/productions/producer_productions/useFetchProducerProductions";
import { useDeleteProducerProduction } from "@/hooks/productions/producer_productions/useDeleteProducerProduction";
import { useFetchProducerProductionRequests } from "@/hooks/productions/producer_productions_request/useFetchProducerProductionRequest";
import { useValidateProducerProductionRequest } from "@/hooks/productions/producer_productions_request/useValidateProducerProductionRequest";

import { getProducerProductionColumns, getValidationColumns } from "./columns";
import type { ProducerProduction } from "@/api/productions/productionProducer";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import OverlayBackdrop from "@/components/Overlay/OverlayBackdrop";

export default function ProductorsRecord() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<ProducerProduction | null>(
    null,
  );

  const [isValidationOpen, setValidationOpen] = useState(false);
  const [actionRequest, setActionRequest] =
    useState<ProducerProductionRequest | null>(null);
  const [overlayMessage, setOverlayMessage] = useState("");

  // Registros existentes
  const {
    data: productionData,
    loading: loadingProduction,
    error: errorProduction,
    refetch: refetchProduction,
  } = useFetchProducerProduction();
  const { remove } = useDeleteProducerProduction();

  // Requests pendentes
  const {
    data: requestData,
    loading: loadingRequests,
    error: errorRequests,
    refetch: refetchRequests,
  } = useFetchProducerProductionRequests();
  const { validate, loading: validating } =
    useValidateProducerProductionRequest();

  // --- Formulário ---
  const handleOpenForm = () => {
    setRecordToEdit(null);
    setFormOpen(true);
  };

  const handleEdit = (record: ProducerProduction) => {
    setRecordToEdit(record);
    setFormOpen(true);
  };

  const handleDelete = async (record: ProducerProduction) => {
    if (!confirm("Deseja realmente excluir este registro?")) return;
    await remove(record.id);
    refetchProduction();
  };

  // --- Validação ---
  const handleOpenValidation = (
    request: ProducerProductionRequest,
    type: "approve" | "reject",
  ) => {
    setActionRequest(request);
    setOverlayMessage(
      type === "approve"
        ? "Deseja aprovar este registro?"
        : "Deseja rejeitar este registro?",
    );
    setValidationOpen(true);
  };

  const handleConfirmValidation = async () => {
    if (!actionRequest) return;
    const isApprove = overlayMessage.includes("aprovar");
    await validate(actionRequest.id, isApprove);
    setValidationOpen(false);
    setActionRequest(null);
    refetchRequests();
    window.toast("Sucesso", "Ação realizada com sucesso!", "success");
  };

  const productionColumns = useMemo(
    () => getProducerProductionColumns(handleEdit, handleDelete),
    [],
  );
  const requestColumns = useMemo(
    () => getValidationColumns(handleOpenValidation),
    [],
  );

  return (
    <div className="w-full p-8 flex flex-col gap-12">
      {/* Botão Novo Registro */}
      <div>
        <Button styles="my-8" onClick={handleOpenForm}>
          <img src={iconAdd} alt="" /> Novo Registro
        </Button>
      </div>

      {/* Overlay Formulário */}
      <OverlayBackdrop isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
        <ProductoresRecordForms
          record={recordToEdit}
          onClose={() => setFormOpen(false)}
          onSaved={refetchProduction}
        />
      </OverlayBackdrop>

      <ValidationForm
        isOpen={isValidationOpen}
        onClose={() => setValidationOpen(false)}
        onConfirm={handleConfirmValidation}
        request={actionRequest || undefined}
        type={overlayMessage.includes("aprovar") ? "approve" : "reject"}
        isLoading={validating}
      />

      {/* Tabela registros */}
      {!loadingProduction && !errorProduction && productionData && (
        <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
          <h2 className="font-bold text-xl w-full mb-4 text-center">
            Registros Pequenos Produtores
          </h2>
          <DataTable
            data={productionData.data}
            columns={productionColumns as any}
            pagination={{
              pageIndex: productionData.page - 1,
              pageSize: productionData.limit,
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

      {!loadingRequests && !errorRequests && requestData && (
        <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
          <h2 className="font-bold text-xl w-full mb-4 text-center">
            Registros de Produção Pendentes
          </h2>
          <DataTable
            data={requestData.data.filter((req) => req.status === "PENDING")}
            columns={requestColumns as any}
            pagination={{
              pageIndex: requestData.page - 1,
              pageSize: requestData.limit,
            }}
          >
            <div className="mb-4 flex justify-between w-full">
              <DataTableTextFilter placeholder="Buscar requests" />
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
