import Button from "@/components/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Button", () => {
  it("renderiza o texto corretamente", () => {
    render(<Button>Salvar</Button>);

    expect(
      screen.getByRole("button", { name: /salvar/i })
    ).toBeInTheDocument();
  });

  it("chama onClick ao clicar", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Salvar</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("não dispara onClick quando desabilitado", () => {
    const onClick = vi.fn();

    render(
      <Button onClick={onClick} disabled>
        Salvar
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("usa type submit quando informado", () => {
    render(<Button type="submit">Enviar</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
