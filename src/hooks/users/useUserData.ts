// src/hooks/users/useUserData.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { findAllUsers, type User } from "../../api/user/users-costApi";

export function useUserData(pageIndex: number, pageSize: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      page: pageIndex + 1,
      limit: pageSize,
    }),
    [pageIndex, pageSize],
  );

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await findAllUsers(filters);

      setUsers(response.data);
      setTotalItems(response.total ?? 0);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, totalItems, loading, error, refetch: fetchUsers };
}
