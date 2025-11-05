interface BackdropProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export default function Backdrop({isOpen, children, onClose }: BackdropProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
