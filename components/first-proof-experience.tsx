"use client";

import { useState } from "react";
import { AiAssistant } from "@/components/ai-assistant";
import { DecisionPanel } from "@/components/decision-panel";
import { EvidenceRecord } from "@/components/evidence-record";
import { ProgressNav } from "@/components/progress-nav";
import { TaskScreen } from "@/components/task-screen";
import { supplierEvidenceCase } from "@/data/evidence-case";
import type { AiDraftResponse } from "@/lib/ai";
import { createEvidenceRecord } from "@/lib/evidence";
import type { EvidenceRecord as EvidenceRecordType, ParticipantAction } from "@/types/evidence";

type Step = "task" | "assistant" | "decision" | "evidence";

export function FirstProofExperience() {
  const [step, setStep] = useState<Step>("task");
  const [aiResponse, setAiResponse] = useState<AiDraftResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<EvidenceRecordType | null>(null);

  async function requestDraft() {
    setLoading(true);
    try {
      const response = await fetch("/api/ai", { method: "POST" });
      if (!response.ok) throw new Error("Draft request failed");
      const result = (await response.json()) as AiDraftResponse;
      setAiResponse(result);
      setStep("assistant");
    } catch {
      const { SIMULATED_AI_DRAFT } = await import("@/lib/ai");
      setAiResponse({ draft: SIMULATED_AI_DRAFT, source: "deterministic_fallback" });
      setStep("assistant");
    } finally {
      setLoading(false);
    }
  }

  function createRecord(action: ParticipantAction, explanation?: string) {
    if (!aiResponse) return;
    setRecord(createEvidenceRecord({ evidenceCase: supplierEvidenceCase, participantAction: action, explanation, aiOutput: aiResponse.draft }));
    setStep("evidence");
  }

  function reset() {
    setStep("task");
    setAiResponse(null);
    setRecord(null);
    setLoading(false);
  }

  const stepNumber = { task: 1, assistant: 2, decision: 3, evidence: 4 }[step];

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-4 sm:mb-9">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-ink text-sm font-bold text-white shadow-sm">FP</div>
            <div>
              <p className="font-semibold tracking-tight text-ink">First-Proof</p>
              <p className="text-xs text-muted">Bounded evidence exercise</p>
            </div>
          </div>
          <span className="hidden rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted sm:inline-flex">
            One-time task · No production work
          </span>
        </header>

        <ProgressNav currentStep={stepNumber} />
        {step === "task" ? (
          <TaskScreen evidenceCase={supplierEvidenceCase} onRequestDraft={requestDraft} loading={loading} />
        ) : step === "assistant" && aiResponse ? (
          <AiAssistant response={aiResponse} onBack={() => setStep("task")} onContinue={() => setStep("decision")} />
        ) : step === "decision" ? (
          <DecisionPanel onBack={() => setStep("assistant")} onSubmit={createRecord} />
        ) : record ? (
          <EvidenceRecord record={record} onReset={reset} />
        ) : null}
      </div>
    </main>
  );
}
