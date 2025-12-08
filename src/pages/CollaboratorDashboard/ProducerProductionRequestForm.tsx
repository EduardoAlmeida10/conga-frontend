import { useState, useEffect } from "react";
import OverlayCard from "@/components/Overlay/OverlayCard";
import InputField from "@/components/InputField";
import { useCreateProducerProductionRequest } from "@/hooks/productions/producer_productions_request/useCreateProducerProductionRequest";
import { useUpdateProducerProductionRequest } from "@/hooks/productions/producer_productions_request/useUpdateProducerProductionRequest";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";

interface Props {
  onClose: () => void;
  onSaved: () => void;
  request?: ProducerProductionRequest;
}

export default function ProducerProductionRequestForm({
  onClose,
  onSaved,
  request,
}: Props) {
  const { create, loading: creating, error: createError } = useCreateProducerProductionRequest();
  const { update, loading: updating, error: updateError } = useUpdateProducerProductionRequest();

  const [date, setDate] = useState("");
  const [producerName, setProducerName] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (request) {
      setDate(request.date);
      setProducerName(request.producerName);
      setTotalQuantity(String(request.totalQuantity));
    }
  }, [request]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!date) e.date = "Informe a data.";
    if (!producerName.trim()) e.producerName = "Informe o nome do produtor.";
    if (!totalQuantity || Number(totalQuantity) <= 0) e.totalQuantity = "Quantidade inválida.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const dto = {
      date,
      producerName,
      totalQuantity: Number(totalQuantity),
    };

    if (request) {
      await update(request.id, dto);
    } else {
      await create(dto);
    }

    const error = request ? updateError : createError;
    if (!error) {
      onSaved();
      onClose();
    }
  };

  return (
    <OverlayCard
      title={request ? "Editar Registro" : "Novo Registro"}
      isSubmitting={creating || updating}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <InputField
          label="Data*"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
          required
        />

        <InputField
          label="Produtor*"
          value={producerName}
          onChange={(e) => setProducerName(e.target.value)}
          error={errors.producerName}
          required
        />

        <InputField
          label="Quantidade (L)*"
          type="number"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
          error={errors.totalQuantity}
          required
        />

        {(createError || updateError) && (
          <p className="text-red-500">{createError || updateError}</p>
        )}
      </div>
    </OverlayCard>
  );
}
