import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CollaboratorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();       // limpa usuário e token do contexto e do localStorage
    }
    navigate("/");    // redireciona para a tela de login
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Colaborador Dashboard</h1>
      <p className="mb-4">Bem-vindo, {user?.username}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}
