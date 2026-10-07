import { NextResponse } from "next/server";
import { supplierEvidenceCase } from "@/data/evidence-case";
import { SIMULATED_AI_DRAFT, type AiDraftResponse } from "@/lib/ai";

type OpenAIResponse = {
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

function fallbackResponse() {
  return NextResponse.json<AiDraftResponse>({
    draft: SIMULATED_AI_DRAFT,
    source: "deterministic_fallback",
  });
}

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return fallbackResponse();

  const availableFacts = supplierEvidenceCase.availableInformation
    .map(({ label, value }) => `- ${label}: ${value}`)
    .join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-6-astra",
        instructions:
          "Write a concise, polished supplier recommendation using only the facts supplied. Do not invent, estimate, or mention values that are not supplied. End by noting that remaining operational requirements should be confirmed. Do not score the participant or make a hiring recommendation.",
        input: `Task: ${supplierEvidenceCase.task}\n\nAvailable facts:\n${availableFacts}`,
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    if (!response.ok) return fallbackResponse();

    const payload = (await response.json()) as OpenAIResponse;
    const draft = payload.output
      ?.flatMap((item) => item.content ?? [])
      .filter((content) => content.type === "output_text")
      .map((content) => content.text ?? "")
      .join("\n")
      .trim();

    if (!draft) return fallbackResponse();

    return NextResponse.json<AiDraftResponse>({ draft, source: "openai" });
  } catch {
    return fallbackResponse();
  }
}
