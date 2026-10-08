export const PARTICIPANT_ACTIONS = [
  "continue",
  "flag_missing_information",
  "ask_human",
] as const;

export type ParticipantAction = (typeof PARTICIPANT_ACTIONS)[number];

export type EvidenceCase = {
  id: string;
  title: string;
  scenario: string;
  task: string;
  availableInformation: { label: string; value: string }[];
  criticalMissingField: { label: string; whyItMatters: string };
  expectedHumanDependency: string;
  allowedActions: readonly ParticipantAction[];
};

export type EvidenceRecord = {
  caseId: string;
  task: string;
  observedInformation: { label: string; value: string }[];
  aiAssistanceUsed: boolean;
  aiOutput: string;
  missingInformationPresent: true;
  criticalMissingInformation: string;
  participantAction: ParticipantAction;
  participantActionLabel: string;
  actionPaused: boolean;
  actionEscalated: boolean;
  humanDependencyUsed: boolean;
  humanDependency: string | null;
  explanation?: string;
  resultingAction: string;
  supportsClaim: string;
  doesNotProve: string[];
};
