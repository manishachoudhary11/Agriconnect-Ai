import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { cn } from "../../lib/utils";

export default function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className={cn("divide-y divide-border rounded-2xl border border-border bg-card", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-muted/50"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.question}</span>
              <HiChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
