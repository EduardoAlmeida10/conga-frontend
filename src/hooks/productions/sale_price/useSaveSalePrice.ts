import {
  saveSalePrice,
  type NewSalePriceDto,
  type SaveSalePriceResponse,
} from "@/api/sale-price/salePrice";
import { useState, useCallback } from "react";

export const useSaveSalePrice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(
    async (dto: NewSalePriceDto): Promise<SaveSalePriceResponse> => {
      setLoading(true);
      setError(null);
      try {
        const response = await saveSalePrice(dto);
        return response;
      } catch (err) {
        const errorMessage =
          (err as Error).message || "Erro desconhecido ao salvar o preço.";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { save, loading, error };
};
