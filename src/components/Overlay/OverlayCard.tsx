import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import iconExit from "../../assets/iconExit.svg";

interface ExpenseCardProps {
  titleOverlay: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function OverlayCard({
  titleOverlay,
  isOpen,
  onClose,
}: ExpenseCardProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl p-6 w-80 max-w-md shadow-lg">
      <div className="flex items-center mb-8 gap-14">
        <img
          src={iconExit}
          alt="icon exit"
          onClick={onClose}
          className="cursor-pointer"
        />
        <h2 className="text-lx1 font-bold">{titleOverlay}</h2>
        <div></div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          label="Valor"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Button type="submit" variant="primary">
          Salvar
        </Button>
      </form>
    </div>
  );
}
