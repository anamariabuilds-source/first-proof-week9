const steps = ["Task", "AI Assistant", "Decision", "Evidence"];

export function ProgressNav({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Task progress" className="mb-6 rounded-2xl border border-line bg-white px-4 py-4 shadow-card sm:mb-8 sm:px-6">
      <ol className="grid grid-cols-4 gap-1">
        {steps.map((step, index) => {
          const number = index + 1;
          const active = number === currentStep;
          const complete = number < currentStep;

          return (
            <li key={step} className="relative flex flex-col items-center gap-2 text-center">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-3.5 h-px w-full ${complete || active ? "bg-teal" : "bg-line"}`}
                />
              )}
              <span
                className={`relative z-10 grid size-7 place-items-center rounded-full border text-xs font-semibold transition-colors ${
                  active
                    ? "border-teal bg-teal text-white"
                    : complete
                      ? "border-teal bg-teal-soft text-teal-dark"
                      : "border-line bg-white text-muted"
                }`}
              >
                {complete ? "✓" : number}
              </span>
              <span className={`text-[11px] font-medium sm:text-xs ${active ? "text-ink" : "text-muted"}`}>{step}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
