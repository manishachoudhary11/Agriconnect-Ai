import { HiClipboardList, HiSparkles, HiUserAdd } from "react-icons/hi";

const steps = [
  {
    icon: HiUserAdd,
    step: "01",
    title: "Create your account",
    description:
      "Register as a farmer or buyer. Complete your profile and choose your role in seconds.",
  },
  {
    icon: HiClipboardList,
    step: "02",
    title: "Manage & grow",
    description:
      "Add crops, track weather, get AI advice, detect diseases, and list produce on the marketplace.",
  },
  {
    icon: HiSparkles,
    step: "03",
    title: "Sell & succeed",
    description:
      "Connect with buyers, track analytics, receive price alerts, and make data-driven decisions.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-border bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-4 text-muted-foreground">
            Three simple steps from signup to smarter farming and faster sales.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-border md:block"
                  aria-hidden
                />
              )}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <item.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Step {item.step}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
