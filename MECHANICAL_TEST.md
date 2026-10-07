# Mechanical test record

## Automated pass

- Production build: passed
- Lint: passed
- Production dependency audit: 0 vulnerabilities
- Deterministic action mapping: passed for all three actions
- Optional, valid, overlong, and invalid explanation input: passed
- Simulated fallback contains no invented delivery information: passed
- AI grounding guard rejects delivery claims and unsupported numeric claims: passed
- Evidence limitations include job-readiness, general-performance, repeatability, and overall-AI-skill boundaries: passed

## Real issue found and fixed

The initial API route trusted the model instruction not to invent unavailable facts. That was insufficient for the product's provenance requirement: a model response could still introduce an unsupported delivery claim or number.

Fix: added a deterministic grounding guard. Any API response that mentions unsupported operational fields or numeric claims is discarded and replaced with the reviewed deterministic fallback. The LLM does not score or set evidence fields.

## Environment limitation

A live Vercel URL was not available during this pass because no Vercel project or Git remote is configured. Browser screenshots and live-URL checks remain deployment tasks; local build and rule-level tests cover the core flow meanwhile.
