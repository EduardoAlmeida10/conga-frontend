import { useState } from "react";
import Button from "../../components/Button";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <input
            type="text"
            name="username"
            placeholder="nome"
            className="bg-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="senha"
            className="bg-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button>
            <p>Entrar</p>
          </Button>
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
