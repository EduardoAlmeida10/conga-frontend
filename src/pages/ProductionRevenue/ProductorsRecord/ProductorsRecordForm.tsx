"use client";

import { useState, useEffect } from "react";
import OverlayCard from "@/components/Overlay/OverlayCard";
import InputField from "@/components/InputField";

import type { ProducerProduction, RegisterProducerProductionDto } from "@/api/productions/productionProducer";
import { useCreateProducerProduction } from "@/hooks/productions/producer_productions/useCreateProducerProduction";
import { useUpdateProducerProduction } from "@/hooks/productions/producer_productions/useUpdateProducerProduction";

interface Props {
  record?: ProducerProduction | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductoresRecordForms({ record = null, onClose, onSaved }: Props) {
  const [date, setDate] = useState("");
  const [producerName, setProducerName] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { create, loading: creating, error: createError } = useCreateProducerProduction();
  const { update, loading: updating, error: updateError } = useUpdateProducerProduction();

  useEffect(() => {
    if (record) {
      setDate(record.date);
      setProducerName(record.producerName);
      setTotalQuantity(record.totalQuantity);
    } else {
      setDate("");
      setProducerName("");
      setTotalQuantity("");
    }
  }, [record]);

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

    const payload: RegisterProducerProductionDto = {
      date,
      producerName,
      totalQuantity,
    };

    try {
      if (record) {
        await update(record.id, payload);
        window.toast("Sucesso", "Registro atualizado com sucesso!", "success");
      } else {
        await create(payload);
        window.toast("Sucesso", "Registro criado com sucesso!", "success");
      }
      onSaved();
      onClose();
    } catch {
      window.toast("Erro", record ? "Falha ao atualizar registro" : "Falha ao criar registro", "error");
    }
  };

  return (
    <OverlayCard
      title={record ? "Editar Registro" : "Novo Registro"}
      isSubmitting={creating || updating}
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

        {(createError || updateError) && (
          <p className="text-red-500">{createError || updateError}</p>
        )}
      </div>
    </OverlayCard>
  );
}
