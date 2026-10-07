import type { AiDraftResponse } from "@/lib/ai";

type AiAssistantProps = {
  response: AiDraftResponse;
  onContinue: () => void;
  onBack: () => void;
};

export function AiAssistant({ response, onContinue, onBack }: AiAssistantProps) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="border-b border-line bg-panel px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-blue-soft px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-blue">
              SIMULATED AI OUTPUT
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-teal" aria-hidden="true" />
              {response.source === "openai" ? "OpenAI-assisted draft" : "Deterministic fallback"}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">AI-generated recommendation</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Review the draft, then decide whether the information is sufficient to act.</p>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-[inset_3px_0_0_#237c70] sm:p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-teal-soft text-sm font-bold text-teal-dark" aria-hidden="true">
                AI
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Recommendation draft</p>
                <p className="text-xs text-muted">Generated from the information provided</p>
              </div>
            </div>
            <div className="space-y-4 text-[15px] leading-7 text-ink">
              {response.draft.split("\n").filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button type="button" onClick={onBack} className="min-h-12 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
              ← Back to task
            </button>
            <button type="button" onClick={onContinue} className="min-h-12 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
              Continue to decision →
            </button>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-5 text-muted">
        This output is simulated task content. AI can produce polished language even when the underlying information is incomplete.
      </p>
    </section>
  );
}
