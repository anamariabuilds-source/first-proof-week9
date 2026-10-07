export const SIMULATED_AI_DRAFT = `Based on the available comparison, Supplier B is the stronger overall option. Its quality rating of 4.7/5 is higher than Supplier A's 4.4/5, and its 45-day payment terms provide 15 additional days of flexibility. Supplier A is $5,000 MXN less expensive, but the modest premium for Supplier B is justified by the stronger quality score and more favorable payment terms.

Recommendation: Select Supplier B, subject to confirming any remaining operational requirements before the order is finalized.`;

export type AiDraftResponse = {
  draft: string;
  source: "openai" | "deterministic_fallback";
};

const allowedNumericFacts = new Set(["44", "47", "5", "15", "30", "45", "5000", "98000", "103000"]);
const unsupportedOperationalTerms = /\b(deliver(?:y|ies|ed)?|lead[ -]?time|shipping|arrival|turnaround|in stock|inventory|weeks?|months?|business days?)\b/i;

export function isDraftGrounded(draft: string) {
  const text = draft.trim();
  if (!text || text.length > 2_000 || unsupportedOperationalTerms.test(text)) return false;

  const numericClaims = text.match(/\d[\d,.]*/g) ?? [];
  return numericClaims.every((claim) => {
    const normalized = claim.replace(/[,.]/g, "");
    return allowedNumericFacts.has(normalized);
  });
}
