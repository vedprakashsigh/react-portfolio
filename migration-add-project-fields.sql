-- ═══════════════════════════════════════════════════════════
-- Migration: Add enriched project metadata columns
-- Run this on your EXISTING Supabase instance
-- ═══════════════════════════════════════════════════════════

ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS why_i_built TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_challenges TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS architecture_decisions TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS architecture_diagram_type TEXT DEFAULT '';

-- ═══════════════════════════════════════════════════════════
-- Update existing AI projects with enriched data
-- ═══════════════════════════════════════════════════════════

UPDATE projects SET
  is_featured = true,
  description = 'End-to-end agentic AI system for enterprise invoice auditing. Orchestrated through LangGraph, the flow starts via a WatchDog service, manages shared state through a Checkpointer DB, and is surfaced through a Streamlit UI connected to Agentic RAG. Features MCP Server integration to expose the graph as a tool.',
  why_i_built = 'Manual invoice auditing at enterprise scale is slow, error-prone, and expensive. I built this system to replace a process that took auditors 4+ hours per batch with an autonomous multi-agent pipeline that completes in minutes — while keeping humans in the loop for edge cases.',
  key_challenges = ARRAY[
    'Synchronizing data between the background graph execution and the Streamlit UI using a shared Checkpointer DB.',
    'Implementing relevance checks in the Agentic RAG to ensure generated outputs strictly adhere to source invoice data.',
    'Integrating an MCP server to wrap the complex graph workflow into a clean, tool-based API.',
    'Designing a WatchDog service to trigger execution autonomously while maintaining stability.'
  ],
  architecture_decisions = ARRAY[
    'WatchDog Service initiates execution within the LangGraph workflow instead of relying entirely on manual triggers.',
    'Checkpointer DB manages seamless state sharing the background processes and the user interface.',
    'Streamlit UI handles user queries and hits the Agentic RAG pipeline directly.',
    'RAG incorporates a post-generation relevance check validating against source context.',
    'MCP Server exposes the entire pipeline as an executable tool for broader ecosystem integration.'
  ],
  architecture_diagram_type = 'agent_pipeline',
  sort_order = 0
WHERE title = 'Agentic Invoice Auditor';

UPDATE projects SET
  is_featured = true,
  description = 'Production-grade multi-agent AI system for automated incident response. Orchestrates the full incident lifecycle — from alert ingestion and context aggregation through root cause reasoning to automated remediation and postmortem generation.',
  why_i_built = 'On-call engineers spend 60% of incident time on repetitive triage — gathering logs, correlating alerts, and writing postmortems. This system automates the predictable parts so engineers can focus on the genuinely novel problems.',
  key_challenges = ARRAY[
    'Designing a root cause reasoning agent that can operate accurately with incomplete telemetry data from production systems.',
    'Ensuring remediation actions are safe — an AI that auto-restarts services needs strong guardrails to prevent cascading failures.',
    'Running the entire multi-agent pipeline on local CPU via Ollama while keeping latency under 30 seconds for time-critical incidents.',
    'Building a postmortem generator that produces genuinely useful retrospectives, not generic template-filled documents.'
  ],
  architecture_decisions = ARRAY[
    'Opted for Ollama with local models over cloud LLMs — incident data is sensitive, and API latency during an outage is unacceptable.',
    'Designed a tiered LLM strategy: fast small models for alert classification, larger models for root cause reasoning — optimizing cost and latency per-stage.',
    'Built the orchestrator with LangGraph''s checkpoint system for resumability — if the system itself crashes during an incident, it picks up from the last completed stage.',
    'Used Docker Compose for reproducible deployments — the entire stack (agents + vector store + observability) spins up with a single command.'
  ],
  architecture_diagram_type = 'multi_agent',
  sort_order = 1
WHERE title = 'AI DevOps Incident Orchestrator';

-- Push non-featured projects down in sort order
UPDATE projects SET sort_order = 2 WHERE title = 'EEESoc Website';
UPDATE projects SET sort_order = 3 WHERE title = 'Issue Monitor';
