import type { EvidenceCase, EvidenceRecord, ParticipantAction } from "@/types/evidence";

const actionDetails: Record<
  ParticipantAction,
  Pick<EvidenceRecord, "participantActionLabel" | "gapRecognized" | "humanDependencyUsed" | "resultingAction" | "supportsClaim">
> = {
  continue: {
    participantActionLabel: "Continued with current information",
    gapRecognized: false,
    humanDependencyUsed: false,
    resultingAction: "The original AI-assisted recommendation was carried forward without revision.",
    supportsClaim: "In this task, the participant continued without recognizing that critical information was missing before acting.",
  },
  flag_missing_information: {
    participantActionLabel: "Flagged missing information",
    gapRecognized: true,
    humanDependencyUsed: false,
    resultingAction: "The recommendation was paused pending confirmation of the missing delivery lead time.",
    supportsClaim: "In this task, the participant recognized that critical information was missing before acting.",
  },
  ask_human: {
    participantActionLabel: "Asked the purchasing manager for clarification",
    gapRecognized: true,
    humanDependencyUsed: true,
    resultingAction: "The recommendation was paused and a clarification request was directed to the purchasing manager.",
    supportsClaim: "In this task, the participant recognized that critical information was missing before acting and used the named human dependency.",
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
    gapRecognized: details.gapRecognized,
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
