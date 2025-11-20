// src/hooks/users/useUserData.ts
import { useEffect, useState, useCallback } from "react";
import { findAllUsers, type User } from "../../api/user/users-costApi";

export function useUserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await findAllUsers({});
      setUsers(response.data || response);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}
