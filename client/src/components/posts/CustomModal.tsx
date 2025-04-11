import type React from "react";
import { useEffect, useRef } from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CustomModal({
  isOpen,
  onClose,
  children,
  className = "",
}: CustomModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div
        ref={modalRef}
        className={`bg-background rounded-lg shadow-lg max-h-[90vh] w-full max-w-[95vw] md:max-w-[900px] animate-in zoom-in-95 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function CustomModalHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>;
}

export function CustomModalTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-center text-xl font-semibold ${className}`}>
      {children}
    </h2>
  );
}

export function CustomModalFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 flex justify-end ${className}`}>{children}</div>;
}

export function CustomModalClose({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
}
