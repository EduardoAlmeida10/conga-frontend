import { useState } from "react";
import OverlayCard from "@/components/Overlay/OverlayCard";
import InputField from "@/components/InputField";
import { useCreateProducerProductionRequest } from "@/hooks/productions/producer_productions_request/useCreateProducerProductionRequest";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function ProducerProductionRequestForm({
  onClose,
  onSaved,
}: Props) {
  const { create, loading, error } = useCreateProducerProductionRequest();

  const [date, setDate] = useState("");
  const [producerName, setProducerName] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (!date) e.date = "Informe a data.";
    if (!producerName.trim()) e.producerName = "Informe o nome do produtor.";
    if (!totalQuantity || Number(totalQuantity) <= 0)
      e.totalQuantity = "Quantidade inválida.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await create({
      date,
      producerName,
      totalQuantity: Number(totalQuantity),
    });

    if (!error) {
      onSaved();
      onClose();
    }
  };

  return (
    <OverlayCard
      title="Novo Registro"
      isSubmitting={loading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <InputField
          label="Data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
          required
        />

        <InputField
          label="Produtor"
          value={producerName}
          onChange={(e) => setProducerName(e.target.value)}
          error={errors.producerName}
          required
        />

        <InputField
          label="Quantidade (L)"
          type="number"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
          error={errors.totalQuantity}
          required
        />

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </OverlayCard>
  );
}
