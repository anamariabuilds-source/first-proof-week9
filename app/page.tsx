import { supplierEvidenceCase } from "@/data/evidence-case";

export default function Home() {
  return (
    <main>
      <p>SIMULATED TASK</p>
      <h1>{supplierEvidenceCase.title}</h1>
      <p>{supplierEvidenceCase.task}</p>
    </main>
  );
}
