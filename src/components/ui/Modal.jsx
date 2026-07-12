import { useEffect, useRef } from "react";
import { HiX } from "react-icons/hi";
import { cn } from "../../lib/utils";
import Button from "./Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full rounded-2xl border border-border bg-card p-6 shadow-xl animate-fade-in",
          sizes[size],
          className
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-card-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0"
            >
              <HiX className="h-5 w-5" />
            </Button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
