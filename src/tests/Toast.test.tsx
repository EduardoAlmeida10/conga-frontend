import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "@/components/ToastNotification/Toast";

describe("Toast component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("deve renderizar a mensagem corretamente", () => {
    render(
      <Toast
        type="success"
        message="Operação realizada com sucesso"
        onClose={vi.fn()}
      />
    );

    expect(
      screen.getByText("Operação realizada com sucesso")
    ).toBeInTheDocument();
  });

  it("deve renderizar o título quando fornecido", () => {
    render(
      <Toast
        type="info"
        title="Informação"
        message="Mensagem informativa"
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Informação")).toBeInTheDocument();
    expect(screen.getByText("Mensagem informativa")).toBeInTheDocument();
  });

  it("não deve renderizar o título quando não for fornecido", () => {
    render(
      <Toast
        type="error"
        message="Erro inesperado"
        onClose={vi.fn()}
      />
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("deve renderizar o ícone correto de acordo com o tipo", () => {
    render(
      <Toast
        type="success"
        message="Sucesso"
        onClose={vi.fn()}
      />
    );

    const icon = screen.getByAltText("success icon");
    expect(icon).toBeInTheDocument();
  });

  it("deve chamar onClose após 3 segundos", () => {
    const onCloseMock = vi.fn();

    render(
      <Toast
        type="info"
        message="Fechando automaticamente"
        onClose={onCloseMock}
      />
    );

    expect(onCloseMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
