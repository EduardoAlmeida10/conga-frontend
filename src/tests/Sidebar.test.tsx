import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "@/components/SideBar/Sidebar";

const logoutMock = vi.fn();
const navigateMock = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    logout: logoutMock,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Sidebar component", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

  it("deve renderizar o logo e o nome da aplicação", () => {
    renderWithRouter();

    expect(screen.getByText("ConGa")).toBeInTheDocument();
    expect(screen.getByText("v.01")).toBeInTheDocument();
  });

  it("deve renderizar os itens do menu", () => {
    renderWithRouter();

    // aqui você testa textos reais dos sideBarItems
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it("deve chamar logout e redirecionar ao clicar no botão de sair", () => {
    renderWithRouter();

    const logoutButton = screen.getByTitle("Sair");
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
