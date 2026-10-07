"use client";

import { useState } from "react";
import { ProgressNav } from "@/components/progress-nav";
import { TaskScreen } from "@/components/task-screen";
import { supplierEvidenceCase } from "@/data/evidence-case";

export default function Home() {
  const [draftRequested, setDraftRequested] = useState(false);

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-4 sm:mb-9">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-ink text-sm font-bold text-white shadow-sm">
              FP
            </div>
            <div>
              <p className="font-semibold tracking-tight text-ink">First-Proof</p>
              <p className="text-xs text-muted">Bounded evidence exercise</p>
            </div>
          </div>
          <span className="hidden rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted sm:inline-flex">
            One-time task · No production work
          </span>
        </header>

        <ProgressNav currentStep={draftRequested ? 2 : 1} />
        <TaskScreen
          evidenceCase={supplierEvidenceCase}
          onRequestDraft={() => setDraftRequested(true)}
          draftRequested={draftRequested}
        />
      </div>
    </main>
  );
}
