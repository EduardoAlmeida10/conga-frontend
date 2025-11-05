import { useState } from "react";
import { deleteUser } from "../../api/users-costApi";

export function useUserDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const removeUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await deleteUser(id);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao excluir usuário");
    } finally {
      setLoading(false);
    }
  };

  return {
    removeUser,
    loading,
    error,
    success,
  };
}
