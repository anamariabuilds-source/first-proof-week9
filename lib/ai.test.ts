import { describe, expect, it } from "vitest";
import { isDraftGrounded, SIMULATED_AI_DRAFT } from "@/lib/ai";

describe("AI draft grounding guard", () => {
  it("accepts the deterministic fallback", () => {
    expect(isDraftGrounded(SIMULATED_AI_DRAFT)).toBe(true);
  });

  it("rejects an invented delivery lead time", () => {
    expect(isDraftGrounded("Supplier B has a delivery lead time of 7 days.")).toBe(false);
  });

  it("rejects unsupported numeric claims", () => {
    expect(isDraftGrounded("Supplier B offers a 12% efficiency improvement.")).toBe(false);
  });
});
