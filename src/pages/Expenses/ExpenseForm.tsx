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
import { expenseValidators } from "@/lib/validation";
import { ZodError } from "zod";

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
    type: UtilityTypes.AGUA,
  },
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
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const schema = expenseValidators[type];

    try {
      const parsed = schema.parse(formData);

      if (isEditMode && expenseToEdit) {
        await updateExpense(String(expenseToEdit.id), parsed);
      } else {
        await createExpense(parsed);
      }
      onSuccess();
      onClose();
    } catch (error) {
        if (error instanceof ZodError) {
          const formatted: Record<string, string> = {};
          error.issues.forEach((err) => {
            console.log("ZOD ERROR", error.issues);
            const field = String(err.path[0] ?? "");
            formatted[field] = err.message;
          });
          setErrors(formatted);
        } else {
          console.error(error);
          setSubmitError("Falha ao salvar. Verifique os campos.");
        }
      } finally {
      setIsSubmitting(false);
    }
  };

  const renderFields = () => {
    switch (type) {
      case "Pessoal":
        return (
          <PersonnelFormFields
            formData={formData}
            handleFormChange={handleChange}
            errors={errors}
          />
        );
      case "Operacionais":
        return (
          <OperationalFormFields
            formData={formData}
            handleFormChange={handleChange}
            errors={errors}
          />
        );
      case "Utilitario":
        return (
          <UtilityFormFields
            formData={formData}
            handleFormChange={handleChange}
            errors={errors}
          />
        );
      case "Insumos":
        return (
          <SupplieFormFields
            formData={formData}
            handleFormChange={handleChange}
            errors={errors}
          />
        );
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
