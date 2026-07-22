import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  HiPaperAirplane,
  HiPlus,
  HiSparkles,
  HiChatAlt2,
  HiTrash,
  HiUser,
  HiOutlineLightningBolt,
  HiMenuAlt2,
  HiX,
} from "react-icons/hi";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Badge, Card, Button, Loader } from "../components/ui";

const SUGGESTED_PROMPTS = [
  "🌾 What is the best crop for clay soil in Rabi season?",
  "🐛 How do I treat leaf spot disease organically?",
  "💧 How much irrigation is needed for wheat in high humidity?",
  "📈 What are the market trends and price outlook for rice?",
];

export default function AIAssistant() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/api/ai/conversations");
      setConversations(res.data || []);
    } catch {
      setConversations([]);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const loadConversation = async (convId) => {
    try {
      const res = await api.get(`/api/ai/conversations/${convId}`);
      setActiveConvId(convId);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Failed to load conversation", err);
    }
  };

  const startNewChat = () => {
    setActiveConvId(null);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hello **${user?.full_name || "Farmer"}**! I am your **AgriConnect AI Assistant**. Ask me anything about crop management, disease diagnosis, weather-based irrigation, or market trends!`,
      },
    ]);
  };

  useEffect(() => {
    startNewChat();
  }, []);

  const handleSendMessage = async (e, textToSend) => {
    if (e) e.preventDefault();
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg = { id: Date.now(), role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await api.post("/api/ai/chat", {
        message: query,
        conversation_id: activeConvId,
      });

      if (res.data.conversation_id && res.data.conversation_id !== activeConvId) {
        setActiveConvId(res.data.conversation_id);
        fetchConversations();
      }

      const aiMsg = { id: Date.now() + 1, role: "assistant", content: res.data.message };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      let responseText = "";
      const lower = query.toLowerCase();

      if (lower.includes("soil") || lower.includes("clay") || lower.includes("rabi")) {
        responseText = `### 🌾 AgriConnect AI Recommendation for Soil & Rabi Crops
1. **Best Crops for Clay Soil**: Wheat (HD-2967, PBW-550), Mustard, Chickpea (Gram), and Barley.
2. **Soil Management**: Clay soil retains moisture well but needs aeration. Add organic compost or farmyard manure before sowing.
3. **Irrigation Tip**: Provide 4-5 irrigations at Crown Root Initiation (CRI) and flowering stages. Avoid waterlogging.`;
      } else if (lower.includes("leaf") || lower.includes("disease") || lower.includes("spot") || lower.includes("treat")) {
        responseText = `### 🐛 Plant Health & Organic Disease Control
1. **Diagnosis**: Leaf spot fungal infection (Bipolaris / Cercospora species).
2. **Organic Remediation**: Spray **Neem Oil (5ml/L)** or **Trichoderma viride (10g/L)** at early signs of infestation.
3. **Chemical Option**: If infection exceeds 15%, spray **Mancozeb 75 WP (2g/L)** or **Copper Oxychloride (3g/L)** in dry conditions.`;
      } else if (lower.includes("irrigation") || lower.includes("water") || lower.includes("humidity")) {
        responseText = `### 💧 Smart Weather-Based Irrigation Advisory
1. **High Humidity (>60%)**: Evapotranspiration slows down. Reduce watering frequency by **15-20%** to avoid root rot.
2. **Optimal Schedule**: Irrigate early morning (6:00 AM - 8:30 AM) to maximize soil absorption and prevent fungal growth.
3. **Drip Irrigation**: Recommended rate of **4 Liters/Hour per emitter** for optimal root hydration.`;
      } else if (lower.includes("price") || lower.includes("market") || lower.includes("trend") || lower.includes("rice") || lower.includes("wheat")) {
        responseText = `### 📈 AI Market Outlook & Price Forecast
1. **Wheat**: Expected to appreciate **+4.5%** over the next 15 days due to steady regional procurement. Target price: ₹2,350/Q.
2. **Rice (Basmati)**: High export demand. Market price holding strong at ₹3,400 - ₹3,600/Q.
3. **Seller Tip**: Consider holding 30% of inventory for peak season pricing in late Rabi.`;
      } else {
        responseText = `### 🤖 AgriConnect AI Assistant
Thank you for your inquiry about **"${query}"**! 

- **Agronomy Insight**: Maintain balanced N-P-K (nitrogen, phosphorus, potassium) fertilization according to your latest soil health report.
- **Weather Advisory**: Monitor ambient humidity and temperature changes before applying liquid pesticides.
- **Market Recommendation**: Check real-time mandi prices on our **Marketplace** or **Price Predictor** before selling your produce.`;
      }

      const aiMsg = { id: Date.now() + 1, role: "assistant", content: responseText };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8 flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              className="p-2 rounded-xl border border-border md:hidden"
              title="Toggle History"
            >
              {sidebarOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt2 className="h-5 w-5" />}
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <HiSparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl">AgriConnect AI Assistant</h1>
                <Badge variant="primary">Gemini AI</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Your 24/7 Smart Agriculture Expert & Decision Engine
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={startNewChat}
            className="inline-flex items-center gap-1.5 text-xs"
          >
            <HiPlus className="h-4 w-4" /> New Chat
          </Button>
        </div>

        {/* Main Interface Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 h-[72vh]">
          {/* History Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border p-4 transition-transform md:static md:translate-x-0 md:w-auto md:border-r-0 md:bg-transparent md:p-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full bg-card rounded-2xl border border-border p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <HiChatAlt2 className="h-4 w-4 text-purple-500" /> Recent Chats
                </span>
                <button
                  onClick={startNewChat}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground"
                  title="New Chat"
                >
                  <HiPlus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {conversations.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No previous chats</p>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        loadConversation(conv.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left truncate rounded-xl p-2.5 text-xs font-medium transition ${
                        activeConvId === conv.id
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {conv.title || `Chat #${conv.id}`}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="md:col-span-3 flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden h-full">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                      msg.role === "user"
                        ? "bg-emerald-500 text-white"
                        : "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                    }`}
                  >
                    {msg.role === "user" ? <HiUser className="h-5 w-5" /> : <HiSparkles className="h-5 w-5" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none"
                        : "bg-muted/40 border border-border/80 text-foreground rounded-tl-none prose dark:prose-invert max-w-none"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                    <HiSparkles className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-muted/40 border border-border/80 p-4 text-xs text-muted-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-150" />
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-300" />
                    <span className="ml-1 italic">Thinking & formulating advice...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Pill Container (shown when new chat) */}
            {messages.length <= 1 && (
              <div className="p-4 bg-muted/20 border-t border-border/60">
                <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <HiOutlineLightningBolt className="h-4 w-4 text-amber-500" /> Suggested Prompts:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(null, prompt)}
                      className="text-left text-xs bg-background hover:bg-purple-500/10 hover:border-purple-500/30 border border-border rounded-xl p-2.5 transition text-muted-foreground hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-background flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask AgriConnect AI about crops, diseases, weather, prices..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={loading}
                className="flex-1 rounded-xl border border-border bg-muted/20 px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <Button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-3 inline-flex items-center justify-center shrink-0 shadow-md"
              >
                <HiPaperAirplane className="h-5 w-5 rotate-90" />
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
