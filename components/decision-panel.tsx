import { useState } from "react";
import { EXPLANATION_MAX_LENGTH, validateExplanation } from "@/lib/validation";
import type { ParticipantAction } from "@/types/evidence";

type DecisionPanelProps = {
  onSubmit: (action: ParticipantAction, explanation?: string) => void;
  onBack: () => void;
};

const actions: Array<{ value: ParticipantAction; title: string; detail: string }> = [
  { value: "continue", title: "Continue with current information", detail: "Use the draft as the basis for action." },
  { value: "flag_missing_information", title: "Flag missing information", detail: "Pause and record that more information is needed." },
  { value: "ask_human", title: "Ask the purchasing manager for clarification", detail: "Pause and request the needed context from a specific person." },
];

export function DecisionPanel({ onSubmit, onBack }: DecisionPanelProps) {
  const [selected, setSelected] = useState<ParticipantAction | null>(null);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (!selected) {
      setError("Choose one action before creating the evidence record.");
      return;
    }

    const result = validateExplanation(explanation);
    if (!result.valid) {
      setError(result.error);
      return;
    }

    setError(null);
    onSubmit(selected, result.value);
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
        <span className="rounded-full bg-teal-soft px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-teal-dark">PARTICIPANT DECISION</span>
        <h1 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">Do you have enough information to act?</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Choose the action you would take after reviewing the source information and AI draft.</p>

        <fieldset className="mt-7 space-y-3">
          <legend className="sr-only">Choose your next action</legend>
          {actions.map((action) => {
            const checked = selected === action.value;
            return (
              <label key={action.value} className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition sm:p-5 ${checked ? "border-teal bg-teal-soft/60 ring-1 ring-teal" : "border-line hover:border-teal/50 hover:bg-panel"}`}>
                <input
                  type="radio"
                  name="participant-action"
                  value={action.value}
                  checked={checked}
                  onChange={() => { setSelected(action.value); setError(null); }}
                  className="mt-1 size-4 accent-teal"
                />
                <span>
                  <span className="block text-sm font-semibold text-ink">{action.title}</span>
                  <span className="mt-1 block text-sm leading-5 text-muted">{action.detail}</span>
                </span>
              </label>
            );
          })}
        </fieldset>

        <div className="mt-7">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="explanation" className="text-sm font-semibold text-ink">Why? <span className="font-normal text-muted">(optional)</span></label>
            <span className={`text-xs ${explanation.length > EXPLANATION_MAX_LENGTH ? "font-semibold text-red-700" : "text-muted"}`}>
              {explanation.length}/{EXPLANATION_MAX_LENGTH}
            </span>
          </div>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(event) => { setExplanation(event.target.value); setError(null); }}
            maxLength={EXPLANATION_MAX_LENGTH + 1}
            rows={4}
            placeholder="Briefly explain what informed your choice."
            aria-describedby={error ? "decision-error" : "explanation-help"}
            aria-invalid={Boolean(error)}
            className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/70 focus:border-teal focus:ring-2 focus:ring-teal/15"
          />
          <p id="explanation-help" className="mt-1.5 text-xs text-muted">Do not include personal or confidential information.</p>
          {error && <p id="decision-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{error}</p>}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button type="button" onClick={onBack} className="min-h-12 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">← Review AI draft</button>
          <button type="button" onClick={submit} className="min-h-12 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">Create evidence record →</button>
        </div>
      </div>
    </section>
  );
}
