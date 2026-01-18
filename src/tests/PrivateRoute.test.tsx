import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";

// mock do hook de autenticação
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "@/context/AuthContext";

describe("PrivateRoute", () => {
  it("redireciona para '/' quando o usuário não está autenticado", () => {
    (useAuth as any).mockReturnValue({
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/privado"]}>
        <Routes>
          <Route
            path="/privado"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <div>Conteúdo Protegido</div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<div>Página Pública</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página Pública")).toBeTruthy();
  });

  it("redireciona para '/' quando o usuário não tem o role permitido", () => {
    (useAuth as any).mockReturnValue({
      user: { role: "user" },
    });

    render(
      <MemoryRouter initialEntries={["/privado"]}>
        <Routes>
          <Route
            path="/privado"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <div>Conteúdo Protegido</div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<div>Página Pública</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Página Pública")).toBeTruthy();
  });

  it("renderiza o conteúdo quando o usuário está autenticado e autorizado", () => {
    (useAuth as any).mockReturnValue({
      user: { role: "admin" },
    });

    render(
      <MemoryRouter initialEntries={["/privado"]}>
        <Routes>
          <Route
            path="/privado"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <div>Conteúdo Protegido</div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<div>Página Pública</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Conteúdo Protegido")).toBeTruthy();
  });
});
