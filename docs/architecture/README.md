# Interview.ai — System Architecture Diagram

This folder contains a Mermaid source file for the project architecture.

- File: `interviewai-architecture.mmd`
- Contents: Frontend (React), Backend (Python Flask/Django), AI Engine (STT, NLP, FER), Database/Storage, Admin Panel, with labeled data flows.

## View / Export as Image

Option A — VS Code (recommended):
1. Install the extension "Markdown Preview Mermaid Support" or "Mermaid Markdown Syntax Highlighting".
2. Open `interviewai-architecture.mmd` and use the Mermaid preview to view/export.

Option B — Mermaid CLI (Node):
1. Install CLI globally:
   ```bash
   npm install -g @mermaid-js/mermaid-cli
   ```
2. Export PNG/SVG:
   ```bash
   mmdc -i docs/architecture/interviewai-architecture.mmd -o docs/architecture/interviewai-architecture.png
   mmdc -i docs/architecture/interviewai-architecture.mmd -o docs/architecture/interviewai-architecture.svg
   ```

Option C — Online Renderer:
- Paste the content of `.mmd` into https://mermaid.live and export PNG/SVG.

## Notes
- Backend is shown as Python Flask/Django per your requirement.
- AI Engine includes: Speech-to-Text (ASR), NLP Evaluation, Facial Expression & Eye-Tracking, and Fusion/Scoring.
- Database includes profiles, questions, responses, results, and media artifacts. Admin panel consumes aggregated data.
