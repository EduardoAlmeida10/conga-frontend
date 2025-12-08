import { deleteLocalProduction } from "@/api/productions/productionLocal";
import { useState } from "react";

export function useDeleteLocalProduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function execute(id: string) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteLocalProduction(id);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao excluir produção local.",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { success, loading, error, execute };
}