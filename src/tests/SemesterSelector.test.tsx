import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SemesterSelector } from "@/components/SemesterSelector";

describe("SemesterSelector", () => {
  const defaultValue = {
    year: 2024,
    semester: 1 as 1 | 2,
  };

  it("renderiza os selects de ano e semestre", () => {
    render(
      <SemesterSelector
        value={defaultValue}
        onChange={vi.fn()}
      />
    );

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2);
  });

  it("chama onChange ao alterar o ano mantendo o semestre", () => {
    const onChange = vi.fn();

    render(
      <SemesterSelector
        value={defaultValue}
        onChange={onChange}
      />
    );

    const [yearSelect] = screen.getAllByRole("combobox");

    fireEvent.change(yearSelect, {
      target: { value: "2025" },
    });

    expect(onChange).toHaveBeenCalledWith({
      year: 2025,
      semester: 1,
    });
  });

  it("chama onChange ao alterar o semestre mantendo o ano", () => {
    const onChange = vi.fn();

    render(
      <SemesterSelector
        value={defaultValue}
        onChange={onChange}
      />
    );

    const [, semesterSelect] = screen.getAllByRole("combobox");

    fireEvent.change(semesterSelect, {
      target: { value: "2" },
    });

    expect(onChange).toHaveBeenCalledWith({
      year: 2024,
      semester: 2,
    });
  });

  it("renderiza corretamente os anos disponíveis", () => {
    render(
      <SemesterSelector
        value={defaultValue}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText("2024")).toBeTruthy();
    expect(screen.getByText("2029")).toBeTruthy();
  });
});
