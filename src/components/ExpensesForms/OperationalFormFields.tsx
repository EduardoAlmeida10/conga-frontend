import { OperationalTypes } from "../../api/operational-costApi";
import InputField from "../InputField";
import SelectField from "../SelectField";


interface Props {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}


export function OperationalFormFields({ formData, handleFormChange, errors }: Props) {
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
        value={formData.type || OperationalTypes.HIGIENE}
        onChange={(e) =>
          handleFormChange("type", e.target.value as OperationalTypes)
        }
        required
      >
        <option value={OperationalTypes.HIGIENE}>Higiene</option>
        <option value={OperationalTypes.MANUTENCAO}>Manutenção de Equipamentos</option>
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
        label="Descrição"
        value={formData.description || ""}
        onChange={(e) => handleFormChange("description", e.target.value)}
        error={errors?.description}
        required
      />
    </>
  );
}
