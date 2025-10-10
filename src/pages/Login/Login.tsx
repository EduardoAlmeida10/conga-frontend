import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuth";

import Button from "../../components/Button";
import InputField from "../../components/InputField";

const roleToDashboardPath: { [key: string]: string } = {
  ADMIN: "/dashboard-admin",
  COLLABORATOR: "/dashboard-colaborador",
};

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error} = useAuthentication();
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; password?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
  const storedToken = localStorage.getItem("access_token");
  if (storedToken) {
    try {
      const payload = JSON.parse(atob(storedToken.split(".")[1]));
      const path = roleToDashboardPath[payload.role];
      if (path) navigate(path);
    } catch (err) {
      console.error("Token inválido:", err);
      localStorage.removeItem("access_token");
    }
  }
}, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: { name?: string; password?: string } = {};

    if (!name.trim()) {
      errors.name = "O campo nome é obrigatório";
    }
    if (!password.trim()) {
      errors.password = "O campo senha é obrigatório";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const role = await login(name, password);
    console.log("Role retornada:", role);

    if (!role) return; 

    const path = roleToDashboardPath[role];
    if (!path) {
      console.error("Role sem rota definida:", role);
      return;
    }

    navigate(path);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center w-1/2">
        <p className="text-center text-gray-300 mb-8">Logo - ConGa</p>
        <h2 className="text-center font-bold text-2xl mb-8">
          Entre na sua conta
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 w-3/5"
        >
          <InputField
            label="nome"
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldErrors.name}
          />
          <InputField
            label="senha"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 px-20 mb-10">
        <div className="bg-primary-100 h-[624px] rounded-t-2xl">
          <div className="h-4/5 flex items-end">
            <div className="bg-gray-200 h-9/10 w-8/10 border-t-[16px] border-r-[16px] border-white rounded-tr-2xl flex justify-center items-center font-bold text-3xl">
              IMAGEM
            </div>
          </div>
          <div className="flex flex-col justify-center bg-white px-15 h-1/4">
            <h3 className="text-primary-100 mb-3">Logo - ConGa</h3>
            <p>
              Controle seu rebanho e aumente sua produtividade com o ConGa, a
              plataforma simples, intuitiva e confiável para a pecuária
              leiteira.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
