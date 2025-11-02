import InputField from "../InputField";

interface Props {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
}

export function SupplieFormFields({ formData, handleFormChange }: Props) {
  return (
    <>
      <InputField
        label="Nome do insumo"
        type="text"
        value={formData.name || ""}
        onChange={(e) => handleFormChange("name", e.target.value)}
        required
      />
      <InputField
        label="Data"
        type="date"
        value={formData.date || ""}
        onChange={(e) => handleFormChange("date", e.target.value)}
        required
      />
      <InputField
        label="Quantidade"
        type="text"
        value={formData.quantity || ""}
        onChange={(e) => handleFormChange("quantity", e.target.value)}
        required
      />
      <InputField
        label="Valor Unitário"
        type="text"
        value={formData.unitPrice || ""}
        onChange={(e) => handleFormChange("unitPrice", e.target.value)}
        required
      />
    </>
  );
}
