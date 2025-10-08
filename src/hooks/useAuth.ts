import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../api/authApi";

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
        role: string;
      };
       console.log("Payload decodificado:", payload);

      setUser({ id: payload.sub, username: payload.username, role: payload.role });

      return payload.role;
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data) {
        setError((err.response as { data: { message?: string } }).data?.message || "Erro ao fazer login");
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
