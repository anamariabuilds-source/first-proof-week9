import { describe, expect, it } from "vitest";
import { EXPLANATION_MAX_LENGTH, validateExplanation } from "@/lib/validation";

describe("validateExplanation", () => {
  it("accepts an empty optional explanation", () => {
    expect(validateExplanation("   ")).toEqual({ valid: true });
  });

  it("trims valid participant text", () => {
    expect(validateExplanation("  I need more context.  ")).toEqual({ valid: true, value: "I need more context." });
  });

  it("rejects overlong input", () => {
    expect(validateExplanation("a".repeat(EXPLANATION_MAX_LENGTH + 1))).toMatchObject({ valid: false });
  });

  it("rejects control characters", () => {
    expect(validateExplanation("Unsafe\u0000text")).toMatchObject({ valid: false });
  });
});
