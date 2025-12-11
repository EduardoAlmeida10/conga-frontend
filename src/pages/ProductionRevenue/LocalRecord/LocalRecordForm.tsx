import type {
  RegisterLocalProductionDto,
  UpdateLocalProductionDto,
} from "@/api/productions/productionLocal";
import InputField from "@/components/InputField";
import OverlayCard from "@/components/Overlay/OverlayCard";
import type { LocalRecord } from "@/entities/LocalRecord";
import { useRegisterLocalProduction } from "@/hooks/productions/local_production/useRegisterLocalProduction";
import { useUpdateLocalProduction } from "@/hooks/productions/local_production/useUpdateLocalProduction";
import { useCallback, useEffect, useState } from "react";

interface Props {
  record?: LocalRecord | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function LocalRecordForm({
  record = null,
  onClose,
  onSaved,
}: Props) {
  const { mutate: register, loading: isRegistering } =
    useRegisterLocalProduction();

  const { mutate: update, loading: isUpdating } = useUpdateLocalProduction();

  const [date, setDate] = useState("");
  const [grossQuantity, setGrossQuantity] = useState("");
  const [consumedQuantity, setConsumedQuantity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isSubmitting = isRegistering || isUpdating;

  useEffect(() => {
    if (record) {
      setDate(
        record.date instanceof Date
          ? record.date.toISOString().split("T")[0]
          : record.date,
      );
      setGrossQuantity(record.grossQuantity.toFixed(2));
      setConsumedQuantity(record.consumedQuantity.toFixed(2));
    } else {
      setDate("");
      setGrossQuantity("");
      setConsumedQuantity("");
    }
  }, [record]);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    const grossValue = parseFloat(grossQuantity);
    const consumedValue = consumedQuantity ? parseFloat(consumedQuantity) : 0;

    if (!date) e.date = "Informe a data.";
    if (!grossQuantity || isNaN(grossValue) || grossValue <= 0) {
      e.grossQuantity = "Produção total inválida ou obrigatória.";
    }
    if (consumedQuantity && (isNaN(consumedValue) || consumedValue < 0)) {
      e.consumedQuantity = "Consumo inválido.";
    }
    if (grossValue < consumedValue) {
      e.consumedQuantity = "O consumo não pode ser maior que a produção bruta.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }, [date, grossQuantity, consumedQuantity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      date,
      grossQuantity: parseFloat(grossQuantity).toFixed(2),
      consumedQuantity: parseFloat(consumedQuantity || "0").toFixed(2),
    };

    if (record) {
      const ok = await update(record.id, payload as UpdateLocalProductionDto);
      if (ok) {
        window.toast("Sucesso", "Registro atualizado com sucesso!", "success");
        onSaved();
        onClose();
      } else {
        window.toast("Erro", "Falha ao atualizar", "error");
      }
    } else {
      const created = await register(payload as RegisterLocalProductionDto);
      if (created) {
        window.toast("Sucesso", "Registro criado com sucesso!", "success");
        onSaved();
        onClose();
      } else {
        window.toast("Erro", "Falha ao criar registro", "error");
      }
    }
  };

  return (
    <OverlayCard
      title={record ? "Editar Registro Local" : "Novo Registro Local"}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <InputField
          label="Data *"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
          required
        />
        <InputField
          label="Total Produzido (L) *"
          type="number"
          value={grossQuantity}
          onChange={(e) => setGrossQuantity(e.target.value)}
          error={errors.grossQuantity}
          required
        />
        <InputField
          label="Consumo Interno (L)"
          type="number"
          value={consumedQuantity}
          onChange={(e) => setConsumedQuantity(e.target.value)}
          error={errors.consumedQuantity}
        />
      </div>
    </OverlayCard>
  );
}

// interface Props {
//   record?: LocalProduction | null;
//   onClose: () => void;
//   onSaved: () => void;
// }

// export default function LocalRecordForm({ record = null, onClose, onSaved }: Props) {

//   const [date, setDate] = useState("");
//   const [grossQuantity, setGrossQuantity] = useState("");
//   const [consumedQuantity, setConsumedQuantity] = useState("");
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (record) {
//       setDate(record.date);
//       setGrossQuantity(record.grossQuantity.toFixed(2));
//       setConsumedQuantity(record.consumedQuantity.toFixed(2));
//     } else {
//       setDate("");
//       setGrossQuantity("");
//       setConsumedQuantity("");
//     }
//   }, [record]);

//   const validate = useCallback(() => {
//     const e: Record<string, string> = {};
//     const grossValue = parseFloat(grossQuantity);
//     const consumedValue = consumedQuantity ? parseFloat(consumedQuantity) : 0;

//     if (!date) e.date = "Informe a data.";
//     if (!grossQuantity || isNaN(grossValue) || grossValue <= 0) {
//       e.grossQuantity = "Produção total inválida ou obrigatória.";
//     }
//     if (consumedQuantity && (isNaN(consumedValue) || consumedValue < 0)) {
//         e.consumedQuantity = "Consumo inválido.";
//     }
//     if (grossValue < consumedValue) {
//         e.consumedQuantity = "O consumo não pode ser maior que a produção bruta.";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }, [date, grossQuantity, consumedQuantity]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setIsSubmitting(true);

//     const payload: RegisterLocalProductionDto | UpdateLocalProductionDto = {
//         date,
//         grossQuantity: parseFloat(grossQuantity).toFixed(2),
//         consumedQuantity: parseFloat(consumedQuantity || '0').toFixed(2),
//     };

//     try {
//       if (record) {
//         await updateLocalProduction(record.id, payload as UpdateLocalProductionDto);
//         window.toast("Sucesso", "Registro atualizado com sucesso!", "success");
//       } else {
//         await registerLocalProduction(payload as RegisterLocalProductionDto);
//         window.toast("Sucesso", "Registro criado com sucesso!", "success");
//       }
//       onSaved();
//       onClose();
//     } catch (error) {
//         console.error("Erro na submissão da API:", error);
//         window.toast("Erro", record ? "Falha ao atualizar registro" : "Falha ao criar registro", "error");
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   return (
//     <OverlayCard
//       title={record ? "Editar Registro Local" : "Novo Registro Local"}
//       isSubmitting={isSubmitting}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//     >
//       <div className="flex flex-col gap-3">

//         <InputField
//           label="Data *"
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           error={errors.date}
//           required
//         />

//         <InputField
//           label="Total Produzido (L) *"
//           type="number"
//           value={grossQuantity}
//           onChange={(e) => setGrossQuantity(e.target.value)}
//           error={errors.grossQuantity}
//           required
//         />

//         <InputField
//           label="Consumo Interno (L)"
//           type="number"
//           value={consumedQuantity}
//           onChange={(e) => setConsumedQuantity(e.target.value)}
//           error={errors.consumedQuantity}
//         />
//       </div>
//     </OverlayCard>
//   );
// }
