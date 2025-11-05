import { useEffect, useState, useCallback } from "react";
import {
  findAllUsers,
  type PaginatedUsers,
} from "../../api/users-costApi";

export function useUserData() {
  const [data, setData] = useState<PaginatedUsers | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [filters, setFilters] = useState<{ name?: string; username?: string }>({});

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await findAllUsers({ ...filters, page, limit });
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    data,
    loading,
    error,
    page,
    limit,
    filters,
    setPage,
    setLimit,
    setFilters,
    refetch: fetchUsers,
  };
}
