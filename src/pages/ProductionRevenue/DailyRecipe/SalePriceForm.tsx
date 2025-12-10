import type { NewSalePriceDto } from "@/api/sale-price/salePrice";
import OverlayCard from "@/components/Overlay/OverlayCard";
import { RightAlignedInput } from "@/components/RightAlignedInput";
import { useCurrentSalePrice } from "@/hooks/productions/sale_price/useCurrentSalePrice";
import { useSaveSalePrice } from "@/hooks/productions/sale_price/useSaveSalePrice";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function SalePriceForm({ onClose, onSaved }: Props) {
  const [newPrice, setNewPrice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { save, loading: saving, error: saveError } = useSaveSalePrice();
  const { data: currentPriceData, isLoading: loadingPrice } =
    useCurrentSalePrice();

  useEffect(() => {
    if (!currentPriceData) {
      setNewPrice("");
    }
  }, [currentPriceData]);

  const formatCurrentPrice = (price: number | null) => {
    const value = typeof price === "number" && !isNaN(price) ? price : 0;
    const formattedPrice = value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `R$ ${formattedPrice} L`;
  };

  const validate = useCallback(() => {
    const e: Record<string, string> = {};

    const value = Number(newPrice) / 100;

    if (isNaN(value) || value <= 0) {
      e.newPrice =
        "O preço deve ser um valor numérico válido e maior que zero.";
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

    const payload: NewSalePriceDto = {
      value: priceValue,
    };

    try {
      await save(payload);
      window.toast(
        "Sucesso",
        "Novo preço do leite salvo com sucesso!",
        "success",
      );
      onSaved();
      onClose();
    } catch {
      window.toast("Erro", "Falha ao registrar novo preço", "error");
    }
  };

  const priceToDisplay =
    currentPriceData?.value !== undefined && currentPriceData.value !== null
      ? parseFloat(currentPriceData.value.toString())
      : null;

  return (
    <OverlayCard
      title="Definir Preço do Leite"
      isSubmitting={saving}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col mb-4">
          <span className="text-gray-500 text-sm">Preço Atual:</span>
          {loadingPrice ? (
            <span className="text-3xl font-bold">Carregando...</span>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrentPrice(priceToDisplay)}
            </span>
          )}
        </div>

        <RightAlignedInput
          label="Novo Preço (R$/Litro)"
          value={newPrice}
          placeholder="R$ 0,00"
          onChange={(newValue) => {
            setNewPrice(newValue);
            if (errors.newPrice) {
              setErrors((prev) => ({ ...prev, newPrice: "" }));
            }
          }}
          error={errors?.newPrice}
          required
        />

        {saveError && <p className="text-red-500">{saveError}</p>}
      </div>
    </OverlayCard>
  );
}
