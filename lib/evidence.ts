import type { EvidenceCase, EvidenceRecord, ParticipantAction } from "@/types/evidence";

const actionDetails: Record<
  ParticipantAction,
  Pick<EvidenceRecord, "participantActionLabel" | "actionPaused" | "actionEscalated" | "humanDependencyUsed" | "resultingAction" | "supportsClaim">
> = {
  continue: {
    participantActionLabel: "Continued with current information",
    actionPaused: false,
    actionEscalated: false,
    humanDependencyUsed: false,
    resultingAction: "The original AI-assisted recommendation was carried forward without revision.",
    supportsClaim: "In this task, the participant continued with the AI-assisted recommendation despite missing delivery lead-time information. The selected action did not pause or escalate to resolve that gap.",
  },
  flag_missing_information: {
    participantActionLabel: "Flagged missing information",
    actionPaused: true,
    actionEscalated: false,
    humanDependencyUsed: false,
    resultingAction: "The recommendation was paused pending confirmation of the missing delivery lead time.",
    supportsClaim: "In this task, the participant paused the AI-assisted recommendation and explicitly flagged missing delivery lead-time information.",
  },
  ask_human: {
    participantActionLabel: "Asked the purchasing manager for clarification",
    actionPaused: true,
    actionEscalated: true,
    humanDependencyUsed: true,
    resultingAction: "The recommendation was paused and a clarification request was directed to the purchasing manager.",
    supportsClaim: "In this task, the participant paused the AI-assisted recommendation and escalated the missing delivery lead-time information to the purchasing manager.",
  },
};

export function createEvidenceRecord({
  evidenceCase,
  participantAction,
  explanation,
  aiOutput,
}: {
  evidenceCase: EvidenceCase;
  participantAction: ParticipantAction;
  explanation?: string;
  aiOutput: string;
}): EvidenceRecord {
  if (!evidenceCase.allowedActions.includes(participantAction)) {
    throw new Error("Participant action is not allowed for this case.");
  }

  const details = actionDetails[participantAction];

  return {
    caseId: evidenceCase.id,
    task: evidenceCase.task,
    observedInformation: evidenceCase.availableInformation,
    aiAssistanceUsed: true,
    aiOutput,
    missingInformationPresent: true,
    criticalMissingInformation: evidenceCase.criticalMissingField.label,
    participantAction,
    participantActionLabel: details.participantActionLabel,
    actionPaused: details.actionPaused,
    actionEscalated: details.actionEscalated,
    humanDependencyUsed: details.humanDependencyUsed,
    humanDependency: details.humanDependencyUsed ? evidenceCase.expectedHumanDependency : null,
    explanation,
    resultingAction: details.resultingAction,
    supportsClaim: details.supportsClaim,
    doesNotProve: [
      "Does not prove job readiness or employability",
      "Does not prove general performance across tasks",
      "Does not prove the participant will behave the same way in another environment",
      "Does not prove overall AI skill or competence for an entire role",
    ],
  };
}
