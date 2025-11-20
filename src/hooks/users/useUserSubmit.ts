import { useState } from "react";
import {
  registerUser,
  type RegisterUserDto,
  type User,
} from "../../api/user/users-costApi";

export function useUserSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const submitUser = async (userData: RegisterUserDto) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await registerUser(userData);
      setCreatedUser(response);
      setSuccess(true);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao registrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return {
    submitUser,
    loading,
    error,
    success,
    createdUser,
  };
}
