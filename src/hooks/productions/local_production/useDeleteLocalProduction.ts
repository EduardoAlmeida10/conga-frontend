import { deleteLocalProduction } from "@/api/productions/productionLocal";
import { useCallback, useState } from "react";

export function useDeleteLocalProduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const mutate = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await deleteLocalProduction(id);

      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao excluir produção local."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, mutate };
}