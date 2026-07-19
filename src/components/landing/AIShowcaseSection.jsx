import { HiSparkles, HiUser } from "react-icons/hi";
import { Badge } from "../ui";

const messages = [
  {
    role: "user",
    text: "What crop should I grow in Nashik this season?",
  },
  {
    role: "assistant",
    text: "Based on Nashik's climate and soil, I recommend grapes, onions, or wheat. Grapes have strong market demand and suit the region's semi-arid conditions. Would you like fertilizer and irrigation advice?",
  },
  {
    role: "user",
    text: "How do I treat leaf spot on tomatoes?",
  },
  {
    role: "assistant",
    text: "For early leaf spot: remove affected leaves, apply neem oil spray (organic), or copper-based fungicide (chemical). Ensure proper spacing and avoid overhead watering to prevent spread.",
  },
];

export default function AIShowcaseSection() {
  return (
    <section id="ai" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="primary" className="mb-4">
            AI Assistant
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your personal farming expert, 24/7
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask anything about crops, diseases, weather, fertilizers, or market prices.
            Get instant, context-aware answers powered by advanced AI — like ChatGPT
            built specifically for agriculture.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Crop recommendations & harvest timing
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Disease diagnosis & treatment plans
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Weather-based farming advice
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Market trends & price insights
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <HiSparkles className="h-5 w-5 text-primary" />
            <span className="font-medium">AgriConnect AI</span>
            <Badge variant="success" className="ml-auto text-xs">
              Online
            </Badge>
          </div>
          <div className="space-y-4 p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    msg.role === "user" ? "bg-muted" : "bg-accent text-primary"
                  }`}
                >
                  {msg.role === "user" ? (
                    <HiUser className="h-4 w-4" />
                  ) : (
                    <HiSparkles className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
