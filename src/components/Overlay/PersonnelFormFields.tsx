import { CostType } from "../../api/personnel-costApi";
import InputField from "../InputField";
import SelectField from "../SelectField";

interface Props {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
}

export function PersonnelFormFields({ formData, handleFormChange }: Props) {
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
        value={formData.type || CostType.SALARIOS_FIXOS}
        onChange={(e) =>
          handleFormChange("type", e.target.value as CostType) 
        }
        required
      >
        <option value="Salários Fixos">Salários Fixos</option>
        <option value="Terceirizados">Terceirizados</option>
        <option value="Encargos">Encargos</option>
        <option value="Benefícios">Benefícios</option>
      </SelectField>
      <InputField
        label="Valor"
        type="text"
        value={formData.value || ""} 
        onChange={(e) => handleFormChange("value", e.target.value)}
        required
      />
      <InputField
        label="Descrição"
        value={formData.description || ""} 
        onChange={(e) => handleFormChange("description", e.target.value)}
        required
      />
    </>
  );
}