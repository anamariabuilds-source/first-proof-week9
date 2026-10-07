import type { EvidenceCase } from "@/types/evidence";

type TaskScreenProps = {
  evidenceCase: EvidenceCase;
  onRequestDraft: () => void;
  draftRequested: boolean;
};

export function TaskScreen({ evidenceCase, onRequestDraft, draftRequested }: TaskScreenProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:gap-6">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="border-b border-line bg-panel px-5 py-5 sm:px-8 sm:py-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-soft px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-blue">
              SIMULATED TASK
            </span>
            <span className="rounded-full border border-line bg-white px-3 py-1 text-[11px] font-medium text-muted">
              Case FP-01
            </span>
          </div>
          <h1 className="max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
            {evidenceCase.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">{evidenceCase.scenario}</p>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="rounded-2xl border border-teal/20 bg-teal-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-dark">Your assignment</p>
            <p className="mt-2 text-sm leading-6 text-ink sm:text-base">{evidenceCase.task}</p>
          </div>

          <div className="mt-7">
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Information provided</p>
                <h2 className="mt-1 text-lg font-semibold text-ink">Supplier comparison</h2>
              </div>
              <span className="text-xs text-muted">All amounts in MXN</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {evidenceCase.availableInformation.map((item) => (
                <div key={item.label} className="rounded-xl border border-line bg-white p-4">
                  <p className="text-xs font-medium text-muted">{item.label}</p>
                  <p className="mt-1.5 text-base font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onRequestDraft}
            disabled={draftRequested}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-default disabled:bg-teal sm:w-auto"
          >
            {draftRequested ? "Draft requested" : "Ask AI for a draft"}
            <span aria-hidden="true">→</span>
          </button>
          {draftRequested && (
            <p role="status" className="mt-3 text-sm text-teal-dark">
              Request received. The simulated assistant is preparing the next step.
            </p>
          )}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <div className="mb-3 grid size-9 place-items-center rounded-lg bg-amber-soft text-lg" aria-hidden="true">
            ◇
          </div>
          <h2 className="font-semibold text-ink">Evidence task, not production work</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            This is a one-time simulated exercise used only when existing evidence cannot support a specific needed claim.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-transparent p-5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Scope</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Your response creates one reviewable evidence record. It does not make a hiring decision or evaluate an entire role.
          </p>
        </div>
      </aside>
    </section>
  );
}
