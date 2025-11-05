import { UtilityTypes } from "../../api/utility-costApi";
import InputField from "../InputField";
import SelectField from "../SelectField";


interface Props {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
}


export function UtilityFormFields({ formData, handleFormChange }: Props) {
  return (
    <>
      <InputField
        label="Data"
        type="date"
        value={formData.date || ""}
        onChange={(e) => handleFormChange("date", e.target.value)}
        required
      />
      <SelectField
        id="type"
        title="Tipo"
        value={formData.type || UtilityTypes.AGUA}
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
        required
      />
      <InputField
        label="Observações"
        value={formData.observations || ""}
        onChange={(e) => handleFormChange("observations", e.target.value)}
        required
      />
    </>
  );
}
