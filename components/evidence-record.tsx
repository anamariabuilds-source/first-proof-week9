import type { EvidenceRecord as EvidenceRecordType } from "@/types/evidence";

function BooleanMark({ value }: { value: boolean }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${value ? "bg-teal-soft text-teal-dark" : "bg-slate-100 text-slate-600"}`}>{value ? "Yes" : "No"}</span>;
}

export function EvidenceRecord({ record, onReset }: { record: EvidenceRecordType; onReset: () => void }) {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="border-b border-line bg-ink px-5 py-6 text-white sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-white">FIRST-PROOF EVIDENCE RECORD</span>
            <span className="text-xs text-white/65">Case {record.caseId}</span>
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">One observed task. One bounded claim.</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">A reviewable record of what happened in this simulated exercise—not a general judgment about the participant.</p>
        </div>

        <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-line p-5">
              <p className="label">Observed task</p>
              <p className="mt-2 text-sm leading-6 text-ink">{record.task}</p>
            </div>

            <div>
              <p className="label mb-3">Information available</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {record.observedInformation.map((item) => (
                  <div key={item.label} className="rounded-xl bg-panel p-3.5">
                    <p className="text-[11px] text-muted">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-300 bg-amber-soft p-5">
              <p className="label text-amber-900">Critical information missing</p>
              <p className="mt-2 font-semibold text-amber-950">{record.criticalMissingInformation}</p>
              <p className="mt-1 text-sm leading-6 text-amber-900/80">A safe recommendation depends on whether a supplier can meet the required delivery date.</p>
            </div>

            <details className="rounded-2xl border border-line p-5">
              <summary className="cursor-pointer text-sm font-semibold text-ink">View relevant AI assistance</summary>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted">{record.aiOutput}</p>
            </details>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-line p-5">
              <p className="label">Observed response</p>
              <dl className="mt-4 space-y-4">
                <div className="flex items-start justify-between gap-4"><dt className="text-sm text-muted">AI assistance used</dt><dd><BooleanMark value={record.aiAssistanceUsed} /></dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-sm text-muted">Gap recognized</dt><dd><BooleanMark value={record.gapRecognized} /></dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-sm text-muted">Human dependency used</dt><dd><BooleanMark value={record.humanDependencyUsed} /></dd></div>
              </dl>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-xs text-muted">Participant action</p>
                <p className="mt-1 text-sm font-semibold text-ink">{record.participantActionLabel}</p>
              </div>
              {record.explanation && <div className="mt-4"><p className="text-xs text-muted">Participant explanation</p><p className="mt-1 text-sm leading-6 text-ink">“{record.explanation}”</p></div>}
            </div>

            <div className="rounded-2xl border border-teal/25 bg-teal-soft/60 p-5">
              <p className="label text-teal-dark">Resulting action / revision</p>
              <p className="mt-2 text-sm leading-6 text-ink">{record.resultingAction}</p>
              {record.humanDependency && <p className="mt-3 text-xs font-semibold text-teal-dark">Human dependency: {record.humanDependency}</p>}
            </div>
          </div>
        </div>

        <div className="border-t border-line px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-teal/30 bg-teal-soft p-5 sm:p-6">
              <p className="label text-teal-dark">What this evidence supports</p>
              <p className="mt-3 text-base font-semibold leading-7 text-ink">“{record.supportsClaim}”</p>
            </div>
            <div className="rounded-2xl border-2 border-red-800 bg-red-50 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-red-900"><span aria-hidden="true">!</span><p className="text-xs font-extrabold uppercase tracking-[0.12em]">What this evidence does NOT prove</p></div>
              <ul className="mt-4 space-y-2.5">
                {record.doesNotProve.map((limitation) => <li key={limitation} className="flex gap-2 text-sm leading-5 text-red-950"><span aria-hidden="true">—</span><span>{limitation}</span></li>)}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-xs leading-5 text-muted">This record is one input a reviewer may inspect when considering a next step. It does not automatically make or recommend a hiring decision.</p>
            <button type="button" onClick={onReset} className="min-h-11 shrink-0 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">↻ Restart task</button>
          </div>
        </div>
      </div>
    </section>
  );
}
