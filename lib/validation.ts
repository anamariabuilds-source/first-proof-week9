export const EXPLANATION_MAX_LENGTH = 280;

export type ExplanationValidation =
  | { valid: true; value?: string }
  | { valid: false; error: string };

export function validateExplanation(input: string): ExplanationValidation {
  const normalized = input.normalize("NFC").trim();

  if (!normalized) return { valid: true };
  if (normalized.length > EXPLANATION_MAX_LENGTH) {
    return { valid: false, error: `Keep your explanation to ${EXPLANATION_MAX_LENGTH} characters or fewer.` };
  }
  if (/\p{Cc}/u.test(normalized)) {
    return { valid: false, error: "Remove unsupported control characters from your explanation." };
  }

  return { valid: true, value: normalized };
}
