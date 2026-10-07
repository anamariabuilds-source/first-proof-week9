import type { EvidenceCase } from "@/types/evidence";

export const supplierEvidenceCase: EvidenceCase = {
  id: "supplier-recommendation-01",
  title: "Supplier recommendation",
  scenario:
    "A purchasing team needs a recommendation for a supplier supporting an upcoming operations requirement.",
  task:
    "Review the supplier comparison and prepare a recommendation the purchasing manager could use as a next step.",
  availableInformation: [
    { label: "Supplier A · Price", value: "$98,000 MXN" },
    { label: "Supplier B · Price", value: "$103,000 MXN" },
    { label: "Supplier A · Quality rating", value: "4.4 / 5" },
    { label: "Supplier B · Quality rating", value: "4.7 / 5" },
    { label: "Supplier A · Payment terms", value: "30 days" },
    { label: "Supplier B · Payment terms", value: "45 days" },
  ],
  criticalMissingField: {
    label: "Delivery lead time",
    whyItMatters:
      "A safe recommendation cannot be finalized without knowing whether either supplier can meet the required delivery date.",
  },
  expectedHumanDependency: "Purchasing manager",
  allowedActions: ["continue", "flag_missing_information", "ask_human"],
};
