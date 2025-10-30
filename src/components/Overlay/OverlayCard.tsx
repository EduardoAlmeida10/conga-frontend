import { useEffect, useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import iconExit from "../../assets/iconExit.svg";
import type { BaseExpense } from "../../hooks/useExpenseData";
import { useExpenseSubmit } from "../../hooks/useExpenseSubmit";
import { PersonnelFormFields } from "./PersonnelFormFields";

interface ExpenseCardProps {
  titleOverlay: string;
  onClose: () => void;
  onSuccess: () => void;
  expenseToEdit?: BaseExpense | null;
  expenseType: string;
}

const getInitialState = (type: string) => {
  if (type === "Pessoal") {
    return {
      type: "Salários Fixos",
      date: "",
      value: "",
      description: "",
    };
  }
  return { date: "", value: "", description: "" };
};

export default function OverlayCard({
  onClose,
  onSuccess,
  expenseToEdit,
  expenseType,
}: ExpenseCardProps) {
  // const [type, setType] = useState<CostType>(CostType.SALARIOS_FIXOS); // Valor padrão
  // const [date, setDate] = useState("");
  // const [value, setValue] = useState("");
  // const [description, setDescription] = useState("");

  const { createExpense, updateExpense } = useExpenseSubmit(expenseType);

  const [formData, setFormData] = useState<any>(getInitialState(expenseType));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isEditMode = Boolean(expenseToEdit);

  useEffect(() => {
    if (isEditMode && expenseToEdit) {
      setFormData({
        ...expenseToEdit,
        date: new Date(expenseToEdit.date).toISOString().split("T")[0],
      });
    } else {
      setFormData(getInitialState(expenseType));
    }
  }, [expenseToEdit, isEditMode, expenseType]);

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const dto = { ...formData }; 

    try {
      if (isEditMode && expenseToEdit) {
        await updateExpense(String(expenseToEdit.id), dto);
      } else {
        await createExpense(dto);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setSubmitError("Falha ao salvar. Verifique os campos.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <InputField
          label="Data"
          type="date"
          value={formData.date || ""}
          onChange={(e) => handleFormChange("date", e.target.value)}
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

    if (expenseType === "Pessoal") {
      return (
        <>
          <PersonnelFormFields
            formData={formData}
            handleFormChange={handleFormChange}
          />
        </>
      );
    }

    return commonFields; 
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-80 max-w-md shadow-lg">
      <div className="flex items-center mb-8 gap-14">
        <img
          src={iconExit}
          alt="icon exit"
          onClick={onClose}
          className="cursor-pointer"
        />
        <h2 className="text-xl font-bold">
          {isEditMode ? "Editar Despesa {titleOverlay}" : "Nova Despesa {titleOverlay}"}
        </h2>
        <div></div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {renderFormFields()}
        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Salvar
        </Button>
      </form>
    </div>
  );
}
