import { describe, expect, it } from "vitest";
import { supplierEvidenceCase } from "@/data/evidence-case";
import { createEvidenceRecord } from "@/lib/evidence";

function record(action: "continue" | "flag_missing_information" | "ask_human") {
  return createEvidenceRecord({
    evidenceCase: supplierEvidenceCase,
    participantAction: action,
    aiOutput: "A bounded draft.",
  });
}

describe("createEvidenceRecord", () => {
  it("records continue as not paused or escalated without inferring awareness", () => {
    const result = record("continue");
    expect(result).toMatchObject({ actionPaused: false, actionEscalated: false, humanDependencyUsed: false, humanDependency: null });
    expect(result.supportsClaim).toBe("In this task, the participant continued with the AI-assisted recommendation despite missing delivery lead-time information. The selected action did not pause or escalate to resolve that gap.");
    expect(result).not.toHaveProperty("gapRecognized");
  });

  it("records flagging as paused but not escalated", () => {
    expect(record("flag_missing_information")).toMatchObject({ actionPaused: true, actionEscalated: false, humanDependencyUsed: false, humanDependency: null });
  });

  it("records asking a human as paused and escalated with the named dependency", () => {
    expect(record("ask_human")).toMatchObject({ actionPaused: true, actionEscalated: true, humanDependencyUsed: true, humanDependency: "Purchasing manager" });
  });

  it("preserves provenance and explicit limitations", () => {
    const result = record("flag_missing_information");
    expect(result.observedInformation).toEqual(supplierEvidenceCase.availableInformation);
    expect(result.criticalMissingInformation).toBe("Delivery lead time");
    expect(result.doesNotProve.join(" ")).toMatch(/job readiness/i);
    expect(result.doesNotProve.join(" ")).toMatch(/overall AI skill/i);
  });

  it("preserves the participant explanation without interpreting it", () => {
    const result = createEvidenceRecord({
      evidenceCase: supplierEvidenceCase,
      participantAction: "continue",
      aiOutput: "A bounded draft.",
      explanation: "I would verify delivery details later.",
    });
    expect(result.explanation).toBe("I would verify delivery details later.");
  });
});
