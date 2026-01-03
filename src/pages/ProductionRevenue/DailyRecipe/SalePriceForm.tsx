import { updateReceivePrice } from "@/api/receives/receives";
import OverlayCard from "@/components/Overlay/OverlayCard";
import { RightAlignedInput } from "@/components/RightAlignedInput";
import type { DailyRecipe } from "@/entities/DailyRecipe";
import { useCurrentSalePrice } from "@/hooks/productions/sale_price/useCurrentSalePrice";
import { useSaveSalePrice } from "@/hooks/productions/sale_price/useSaveSalePrice";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  onSaved: () => void;
  record?: DailyRecipe | null; 
}

export default function SalePriceForm({ onClose, onSaved, record }: Props) {
  const [newPrice, setNewPrice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { save, loading: saving, error: saveError } = useSaveSalePrice();
  const { data: currentPriceData, isLoading: loadingPrice } = useCurrentSalePrice();

  // Inicializa o formulário com o valor do registro (se edição) ou vazio
  useEffect(() => {
    if (record) {
      const priceInCents = Math.round(record.precoLeite * 100).toString();
      setNewPrice(priceInCents);
    } else {
      setNewPrice(""); // Nunca deixe null
    }
  }, [record]);

  const formatCurrentPrice = (price: number | null) => {
    const value = typeof price === "number" && !isNaN(price) ? price : 0;
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    const value = Number(newPrice) / 100;

    if (isNaN(value) || value <= 0) {
      e.newPrice = "O preço deve ser maior que zero.";
      setErrors(e);
      return false;
    }

    setErrors({});
    return true;
  }, [newPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const priceValue = Number(newPrice) / 100;

    try {
      // Se temos um record, significa que estamos editando um dia específico
      if (record) {
        // --- CASO EDIÇÃO (PUT por Data) ---
        await updateReceivePrice(record.date, priceValue);
        
        window.toast("Sucesso", "Preço atualizado para este dia!", "success");
      } else {
        // --- CASO NOVO PREÇO GLOBAL (POST) ---
        await save({ value: priceValue });
        
        window.toast("Sucesso", "Novo preço global definido!", "success");
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      window.toast("Erro", "Falha ao atualizar o preço.", "error");
    }
  };

  // Define qual preço mostrar no cabeçalho (Preço do registro ou preço global atual)
  const priceToDisplay = record 
    ? record.precoLeite 
    : (currentPriceData?.value ? parseFloat(currentPriceData.value.toString()) : null);

  return (
    <OverlayCard
      title={record ? "Editar Preço do Registro" : "Definir Preço do Leite"}
      isSubmitting={saving}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col mb-4">
          <span className="text-gray-500 text-sm">
            {record ? "Preço neste registro:" : "Preço Atual (Global):"}
          </span>
          {loadingPrice && !record ? (
            <span className="text-3xl font-bold">Carregando...</span>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrentPrice(priceToDisplay)}
            </span>
          )}
        </div>

        <RightAlignedInput
          label={record ? "Corrigir Preço (R$/L)" : "Novo Preço Global (R$/L)"}
          value={newPrice}
          placeholder="R$ 0,00"
          onChange={(newValue) => {
            setNewPrice(newValue);
            if (errors.newPrice) setErrors({});
          }}
          error={errors?.newPrice}
          required
        />

        {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
      </div>
    </OverlayCard>
  );
}