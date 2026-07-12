import { cn } from "../../lib/utils";

export default function Loader({ size = "md", className, label = "Loading" }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center", className)}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-primary border-t-transparent",
          sizes[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
