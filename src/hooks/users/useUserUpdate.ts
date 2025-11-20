// src/hooks/users/useUserUpdate.ts
import { useState } from "react";
import { updateUser, type UpdateUserDto, type User } from "../../api/user/users-costApi";

export function useUserUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editUser = async (id: string, dto: UpdateUserDto): Promise<User | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await updateUser(id, dto);
      setSuccess(true);
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error, success };
}
