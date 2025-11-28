import iconAdd from "@/assets/iconAdd.svg";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import ProductoresRecordForms from "./ProductorsRecordForm";
import ValidationForm from "./ValidationForm";

import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";

import { useDeleteProducerProduction } from "@/hooks/productions/producer_productions/useDeleteProducerProduction";
import { useFetchProducerProduction } from "@/hooks/productions/producer_productions/useFetchProducerProductions";
import { useFetchProducerProductionRequests } from "@/hooks/productions/producer_productions_request/useFetchProducerProductionRequest";
import { useValidateProducerProductionRequest } from "@/hooks/productions/producer_productions_request/useValidateProducerProductionRequest";

import type { ProducerProduction } from "@/api/productions/productionProducer";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";
import OverlayBackdrop from "@/components/Overlay/OverlayBackdrop";
import { getProducerProductionColumns, getValidationColumns } from "./columns";

export default function ProductorsRecord() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<ProducerProduction | null>(
    null,
  );

  const [isValidationOpen, setValidationOpen] = useState(false);
  const [actionRequest, setActionRequest] =
    useState<ProducerProductionRequest | null>(null);
  const [overlayMessage, setOverlayMessage] = useState("");

  const [producerProductionPagination, setProducerProductionPagination] =
    useState({ pageIndex: 0, pageSize: 6 });

  const [
    producerProductionRequestsPagination,
    setProducerProductionRequestsPagination,
  ] = useState({ pageIndex: 0, pageSize: 6 });

  const {
    data: productionData,
    totalItems: totalItemsProducerProduction,
    loading: loadingProduction,
    error: errorProduction,
    refetch: refetchProduction,
  } = useFetchProducerProduction(
    producerProductionPagination.pageIndex,
    producerProductionPagination.pageSize,
  );

  const pageCountProducerProduction = Math.ceil(
    totalItemsProducerProduction / producerProductionPagination.pageSize,
  );

  const { remove } = useDeleteProducerProduction();

  const fere = "PENDING";
  const {
    data: requestData,
    totalItems: totalItemsProducerProductionRequests,
    loading: loadingRequests,
    error: errorRequests,
    refetch: refetchRequests,
  } = useFetchProducerProductionRequests(
    producerProductionRequestsPagination.pageIndex,
    producerProductionRequestsPagination.pageSize,
    fere,
  );

  const pageCountProducerProductionRequests = Math.ceil(
    totalItemsProducerProductionRequests /
      producerProductionRequestsPagination.pageSize,
  );

  const { validate, loading: validating } =
    useValidateProducerProductionRequest();

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
    refetchProduction();
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
    <div className="p-6 w-full">
      <div className="pt-6 pb-6">
        <Button onClick={handleOpenForm}>
          <img src={iconAdd} alt="" /> Novo Registro
        </Button>
      </div>
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
      {!loadingProduction && !errorProduction && productionData && (
        <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl mb-10">
          <h2 className="font-bold text-xl w-full mb-4 text-center">
            Registros Pequenos Produtores
          </h2>
          <DataTable
            data={productionData.data}
            columns={productionColumns as any}
            pagination={producerProductionPagination}
            onPaginationChange={setProducerProductionPagination}
            pageCount={pageCountProducerProduction}
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
            data={requestData.filter((req) => req.status === "PENDING")}
            columns={requestColumns as any}
            pagination={producerProductionRequestsPagination}
            onPaginationChange={setProducerProductionRequestsPagination}
            pageCount={pageCountProducerProductionRequests}
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
