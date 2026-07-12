import { cn } from "../../lib/utils";

export default function Card({
  title,
  description,
  children,
  className,
  headerAction,
  padding = true,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-md",
        className
      )}
    >
      {(title || description || headerAction) && (
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b border-border",
            padding && "px-6 py-4"
          )}
        >
          <div>
            {title && <h3 className="text-base font-semibold">{title}</h3>}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className={cn(padding && "p-6")}>{children}</div>
    </div>
  );
}
