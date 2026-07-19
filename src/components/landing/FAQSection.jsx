import Accordion from "../ui/Accordion";

const faqItems = [
  {
    question: "Is AgriConnect AI free to use?",
    answer:
      "Yes. Core features including crop management, weather, and basic AI queries are free. Premium features like advanced analytics and unlimited AI chat may be offered in future plans.",
  },
  {
    question: "How accurate is the AI crop advisor?",
    answer:
      "Our AI is trained on agricultural best practices and regional data. It provides guidance, not guarantees — always validate critical decisions with local agronomists when possible.",
  },
  {
    question: "Can buyers place orders without online payment?",
    answer:
      "Yes. The marketplace supports contact and order requests. Farmers and buyers arrange payment and delivery directly — online payments can be added in a future release.",
  },
  {
    question: "Which crops does disease detection support?",
    answer:
      "We support common crops including tomato, potato, wheat, rice, and grape leaf diseases. Upload a clear photo of the affected leaf for best results.",
  },
  {
    question: "Is my farm data secure?",
    answer:
      "Yes. We use JWT authentication, encrypted connections, and never share your data with third parties. API keys and secrets are stored securely on the server.",
  },
  {
    question: "Do I need to be a tech expert to use this?",
    answer:
      "No. AgriConnect AI is designed for farmers and buyers of all technical levels. Simple interfaces, clear language, and mobile-friendly design make it easy to get started.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-muted-foreground">
          Everything you need to know before getting started.
        </p>
      </div>
      <div className="mt-10">
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
