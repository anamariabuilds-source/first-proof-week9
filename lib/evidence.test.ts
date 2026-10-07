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
  it("records continue without gap recognition or a human dependency", () => {
    expect(record("continue")).toMatchObject({ gapRecognized: false, humanDependencyUsed: false, humanDependency: null });
  });

  it("records flagging as recognition without a human dependency", () => {
    expect(record("flag_missing_information")).toMatchObject({ gapRecognized: true, humanDependencyUsed: false, humanDependency: null });
  });

  it("records asking a human as recognition with the named dependency", () => {
    expect(record("ask_human")).toMatchObject({ gapRecognized: true, humanDependencyUsed: true, humanDependency: "Purchasing manager" });
  });

  it("preserves provenance and explicit limitations", () => {
    const result = record("flag_missing_information");
    expect(result.observedInformation).toEqual(supplierEvidenceCase.availableInformation);
    expect(result.criticalMissingInformation).toBe("Delivery lead time");
    expect(result.doesNotProve.join(" ")).toMatch(/job readiness/i);
    expect(result.doesNotProve.join(" ")).toMatch(/overall AI skill/i);
  });
});
