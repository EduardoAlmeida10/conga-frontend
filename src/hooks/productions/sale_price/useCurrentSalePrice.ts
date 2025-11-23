import { getCurrentSalePrice, type SalePrice } from '@/api/sale-price/salePrice';
import { useState, useEffect } from 'react';

type CurrentPriceHookResult = {
  data: SalePrice | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useCurrentSalePrice = (): CurrentPriceHookResult => {
  const [data, setData] = useState<SalePrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0); 

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCurrentSalePrice();
      console.log("preço do leite: ", response)
      setData(response);
    } catch (err) {
      const errorMessage = (err as Error).message || "Falha ao carregar o preço atual.";
      setError(errorMessage);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reloadKey]); 

  const refetch = () => {
    setReloadKey(prev => prev + 1);
  };

  return { data, isLoading, error, refetch };
};