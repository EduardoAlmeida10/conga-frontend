import InputField from "../InputField";

interface Props {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export function SupplieFormFields({ formData, handleFormChange, errors }: Props) {
  return (
    <>
      <InputField
        label="Nome do insumo"
        type="text"
        value={formData.name || ""}
        onChange={(e) => handleFormChange("name", e.target.value)}
        error={errors?.name}
        required
      />
      <InputField
        label="Data"
        type="date"
        value={formData.date || ""}
        onChange={(e) => handleFormChange("date", e.target.value)}
        error={errors?.date}
        required
      />
      <InputField
        label="Quantidade"
        type="text"
        value={formData.quantity || ""}
        onChange={(e) => handleFormChange("quantity", Number(e.target.value))}
        error={errors?.quantity}
        required
      />
      <InputField
        label="Valor Unitário"
        type="text"
        value={formData.unitPrice || ""}
        onChange={(e) => handleFormChange("unitPrice", e.target.value)}
        error={errors?.unitPrice}
        required
      />
    </>
  );
}
