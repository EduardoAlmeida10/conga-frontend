import { UtilityTypes } from "../../api/costs/utility-costApi";
import InputField from "../InputField";
import SelectField from "../SelectField";


interface Props {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}


export function UtilityFormFields({ formData, handleFormChange, errors }: Props) {
  return (
    <>
      <InputField
        label="Data"
        type="date"
        value={formData.date || ""}
        onChange={(e) => handleFormChange("date", e.target.value)}
        error={errors?.date}
        required
      />
      <SelectField
        id="type"
        title="Tipo"
        value={formData.type}
        onChange={(e) =>
          handleFormChange("type", e.target.value as UtilityTypes)
        }
        required
      >
        <option value={UtilityTypes.AGUA}>Água</option>
        <option value={UtilityTypes.ENERGIA}>Energia</option>
        <option value={UtilityTypes.INTERNET}>Internet</option>
        <option value={UtilityTypes.TELEFONE}>Telefone</option>
      </SelectField>
      <InputField
        label="Valor"
        type="text"
        value={formData.value || ""}
        onChange={(e) => handleFormChange("value", e.target.value)}
        error={errors?.value}
        required
      />
      <InputField
        label="Observações"
        value={formData.observations || ""}
        onChange={(e) => handleFormChange("observations", e.target.value)}
        error={errors?.observations}
        required
      />
    </>
  );
}
