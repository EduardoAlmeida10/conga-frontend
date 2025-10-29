import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../api/authApi";
import { AxiosError } from "axios";

export const useAuthentication = () => {
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { access_token } = await loginRequest(username, password);
      console.log("Token recebido:", access_token);

      // Armazena token no contexto e localStorage
      setToken(access_token);
      localStorage.setItem("access_token", access_token);

      // Decodifica JWT para pegar dados do usuário
      const payload = JSON.parse(atob(access_token.split(".")[1])) as {
        sub: string;
        username: string;
        name: string;
        role: string;
      };
       console.log("Payload decodificado:", payload);

      setUser({ id: payload.sub, username: payload.username,name: payload.name, role: payload.role });

      return payload.role;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError("Nome de usuário ou senha incorretos");
        } else if (err.response?.data && typeof err.response.data === "object") {
          const data = err.response.data as { message?: string };
          setError(data.message || "Erro ao fazer login");
        } else {
          setError("Erro ao fazer login");
        }
      } else {
        setError("Erro ao fazer login");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
  };

  return { login, logout, loading, error };
};
