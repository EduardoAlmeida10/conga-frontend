import OverlayBackdrop from "@/components/Overlay/OverlayBackdrop";
import Button from "@/components/Button";
import iconExit from "@/assets/iconExit.svg";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  request?: ProducerProductionRequest;
  type?: "approve" | "reject";
  isLoading?: boolean;
}

export default function ValidationForm({
  isOpen,
  onClose,
  onConfirm,
  request,
  type,
  isLoading = false,
}: Props) {
  if (!isOpen || !request) return null;

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const message =
    type === "approve"
      ? `Deseja aprovar o registro de ${request.totalQuantity} L do produtor ${request.producerName} referente a ${formatDate(
          request.date,
        )}?`
      : `Deseja rejeitar o registro de ${request.totalQuantity} L do produtor ${request.producerName} referente a ${formatDate(
          request.date,
        )}?`;

  const title = type === "approve" ? "Confirmar Aprovação" : "Confirmar Rejeição";
  const confirmLabel = type === "approve" ? "Aprovar Produção" : "Rejeitar Produção";

  return (
    <OverlayBackdrop isOpen={isOpen}>
      <div className="bg-white rounded-2xl p-6 w-96 max-w-md shadow-lg flex flex-col gap-10">
        <div className="flex items-center justify-between mb-4">
          <img
            src={iconExit}
            alt="Fechar"
            className="cursor-pointer"
            onClick={onClose}
          />
          <h2 className="text-xl font-bold">{title}</h2>
          <div></div>
        </div>
        <p className="text-center">{message}</p>
        <p className="text-sm text-gray-500 text-center">Esta ação não pode ser desfeita.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processando..." : confirmLabel}
          </Button>
        </div>
      </div>
    </OverlayBackdrop>
  );
}
