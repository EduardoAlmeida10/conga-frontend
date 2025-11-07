import { useState, useEffect } from "react";
import OverlayCard from "../../components/Overlay/OverlayCard";
import { useExpenseSubmit } from "../../hooks/useExpenseSubmit";
import { PersonnelFormFields } from "../../components/ExpensesForms/PersonnelFormFields";
import { OperationalFormFields } from "../../components/ExpensesForms/OperationalFormFields";
import { UtilityFormFields } from "../../components/ExpensesForms/UtilityFormFields";
import { SupplieFormFields } from "../../components/ExpensesForms/SupplieFormFields";
import type { BaseExpense } from "../../hooks/useExpenseData";
import { CostType } from "@/api/personnel-costApi";
import { OperationalTypes } from "@/api/operational-costApi";
import { UtilityTypes } from "@/api/utility-costApi";

interface ExpenseOverlayProps {
  type: string;
  titleOverlay?: string;
  onClose: () => void;
  onSuccess: () => void;
  expenseToEdit?: BaseExpense | null;
}

const defaultFormValues: Record<string, any> = {
  Pessoal: {
    type: CostType.SALARIOS_FIXOS,
  },
  Operacionais: {
    type: OperationalTypes.HIGIENE,
  },
  Utilitario: {
    type: UtilityTypes.AGUA
  }
};

export default function ExpenseOverlay({
  type,
  onClose,
  onSuccess,
  expenseToEdit,
  titleOverlay,
}: ExpenseOverlayProps) {
  const { createExpense, updateExpense } = useExpenseSubmit(type);
  const isEditMode = !!expenseToEdit;

  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        ...expenseToEdit,
        date: new Date(expenseToEdit.date).toISOString().split("T")[0],
      });
    } else {
      setFormData(defaultFormValues[type] || {});
    }
  }, [expenseToEdit, type]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (isEditMode && expenseToEdit) {
        await updateExpense(String(expenseToEdit.id), formData);
      } else {
        await createExpense(formData);
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

  const renderFields = () => {
    switch (type) {
      case "Pessoal":
        return <PersonnelFormFields formData={formData} handleFormChange={handleChange} />;
      case "Operacionais":
        return <OperationalFormFields formData={formData} handleFormChange={handleChange} />;
      case "Utilitario":
        return <UtilityFormFields formData={formData} handleFormChange={handleChange} />;
      case "Insumos":
        return <SupplieFormFields formData={formData} handleFormChange={handleChange} />;
      default:
        return <p>Tipo de despesa desconhecido.</p>;
    }
  };

  return (
    <OverlayCard
      title={`${isEditMode ? "Editar Despesa" : "Nova Despesa"} ${titleOverlay || ""}`}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {renderFields()}
      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
    </OverlayCard>
  );
}
