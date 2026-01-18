import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardAnalysis from "@/components/CardAnalysis";

describe("CardAnalysis", () => {
  it("renderiza título e valor formatado quando is=valor", () => {
    render(
      <CardAnalysis title="Total" value={100} is="valor">
        <span data-testid="icon" />
      </CardAnalysis>
    );

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText(/R\$/)).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renderiza valor em litros quando is=litros", () => {
    render(
      <CardAnalysis title="Produção" value={50} is="litros">
        <span />
      </CardAnalysis>
    );

    expect(screen.getByText("50 Litros")).toBeInTheDocument();
  });
});
