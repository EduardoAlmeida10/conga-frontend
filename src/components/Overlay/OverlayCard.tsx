import iconExit from "../../assets/iconExit.svg";
import Button from "../Button";

interface OverlayCardProps {
  title: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export default function OverlayCard({
  title,
  isSubmitting,
  onClose,
  onSubmit,
  children,
}: OverlayCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 w-96 max-w-md shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <img
          src={iconExit}
          alt="icon exit"
          onClick={onClose}
          className="cursor-pointer"
        />
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <div></div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </div>
  );
}
