-- ═══════════════════════════════════════════════════════════
-- Ved Prakash Portfolio — Seed Data
-- Run this AFTER supabase-schema.sql
-- ═══════════════════════════════════════════════════════════

-- Profile
INSERT INTO profile (id, name, title, location, email, phone, linkedin, github, bio, resume_url)
VALUES (
  1,
  'Ved Prakash',
  'Agentic AI Engineer',
  'Lucknow, India',
  'hi@vedprakash.me',
  '+91-7752911254',
  'linkedin.com/in/vedprakashsigh',
  'github.com/vedprakashsigh',
  'Specialist Programmer at Infosys — Building intelligent multi-agent systems with LangChain, LangGraph & RAG. B.Tech graduate from BIT Mesra with a passion for creating production-grade AI solutions.',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Experience
INSERT INTO experience (company, role, period, description, sort_order) VALUES
(
  'Infosys Limited',
  'Specialist Programmer (Agentic AI)',
  'October 2025 – Present',
  ARRAY[
    'Designed and implemented an end-to-end agentic AI system for invoice auditing using LangChain and LangGraph.',
    'Built specialized agents for invoice extraction, multilingual translation, ERP validation, and reporting.',
    'Implemented Agentic RAG with FAISS for contextual Q&A over invoices.',
    'Integrated MCP and Human-in-the-Loop (HITL) feedback mechanisms.',
    'Enabled observability using Langfuse for monitoring agent performance.',
    'Developed Streamlit dashboards for audit insights and anomaly detection.'
  ],
  0
),
(
  'SRDT',
  'Intern – Software QA & Full Stack Development',
  'January 2025 – May 2025',
  ARRAY[
    'Performed manual testing (functional, regression, usability), created test cases, and documented bugs/defects.',
    'Assisted in frontend (React.js) and backend (Java Spring Boot) tasks including UI fixes, API integration, and database validation.',
    'Collaborated in an Agile environment, supporting sprint planning, testing, and code reviews.'
  ],
  1
);

-- Education
INSERT INTO education (institution, degree, period, details, sort_order) VALUES
(
  'Birla Institute of Technology',
  'Bachelor of Technology | Electrical and Electronics Engineering',
  'December 2021 – August 2025',
  'CGPA: 8.82',
  0
);

-- Skills
INSERT INTO skills (category, items, sort_order) VALUES
('AI / ML', ARRAY['LangChain', 'LangGraph', 'Agentic RAG', 'FAISS', 'AWS Bedrock', 'MCP', 'HITL', 'Prompt Engineering', 'LLM Applications'], 0),
('Languages', ARRAY['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'], 1),
('Frameworks', ARRAY['ReactJS', 'NextJS', 'Flask', 'Streamlit', 'FastAPI'], 2),
('Databases', ARRAY['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase'], 3),
('Tools', ARRAY['Git', 'GitHub', 'Langfuse', 'Docker', 'Vite'], 4),
('Fundamentals', ARRAY['OOP', 'DBMS', 'Data Structures & Algorithms'], 5);

-- Certifications
INSERT INTO certifications (title, issuer, url, sort_order) VALUES
('Infosys Certified Generative AI Professional - Intermediate', 'Infosys', '', 0),
('LangGraph for Developers and Architects', '', '', 1),
('Python Microservices using FastAPI', '', '', 2),
('DSA: In-Depth using Python', 'Udemy', '', 3);

-- Projects
INSERT INTO projects (title, description, tech_stack, image_url, project_url, sort_order, is_featured, why_i_built, key_challenges, architecture_decisions, architecture_diagram_type) VALUES
(
  'Agentic Invoice Auditor',
  'End-to-end agentic AI system for enterprise invoice auditing. Orchestrated through LangGraph, the flow starts via a WatchDog service, manages shared state through a Checkpointer DB, and is surfaced through a Streamlit UI connected to Agentic RAG. Features MCP Server integration to expose the graph as a tool.',
  'LangChain, LangGraph, FAISS, Streamlit, Python, Langfuse, MCP',
  '',
  '',
  0,
  true,
  'Manual invoice auditing at enterprise scale is slow, error-prone, and expensive. I built this system to replace a process that took auditors 4+ hours per batch with an autonomous multi-agent pipeline that completes in minutes — while keeping humans in the loop for edge cases.',
  ARRAY[
    'Synchronizing data between the background graph execution and the Streamlit UI using a shared Checkpointer DB.',
    'Implementing relevance checks in the Agentic RAG to ensure generated outputs strictly adhere to source invoice data.',
    'Integrating an MCP server to wrap the complex graph workflow into a clean, tool-based API.',
    'Designing a WatchDog service to trigger execution autonomously while maintaining stability.'
  ],
  ARRAY[
    'WatchDog Service initiates execution within the LangGraph workflow instead of relying entirely on manual triggers.',
    'Checkpointer DB manages seamless state sharing the background processes and the user interface.',
    'Streamlit UI handles user queries and hits the Agentic RAG pipeline directly.',
    'RAG incorporates a post-generation relevance check validating against source context.',
    'MCP Server exposes the entire pipeline as an executable tool for broader ecosystem integration.'
  ],
  'agent_pipeline'
),
(
  'AI DevOps Incident Orchestrator',
  'Production-grade multi-agent AI system for automated incident response. Orchestrates the full incident lifecycle — from alert ingestion and context aggregation through root cause reasoning to automated remediation and postmortem generation.',
  'LangGraph, LangChain, Ollama, Python, Docker',
  '',
  '',
  1,
  true,
  'On-call engineers spend 60% of incident time on repetitive triage — gathering logs, correlating alerts, and writing postmortems. This system automates the predictable parts so engineers can focus on the genuinely novel problems.',
  ARRAY[
    'Designing a root cause reasoning agent that can operate accurately with incomplete telemetry data from production systems.',
    'Ensuring remediation actions are safe — an AI that auto-restarts services needs strong guardrails to prevent cascading failures.',
    'Running the entire multi-agent pipeline on local CPU via Ollama while keeping latency under 30 seconds for time-critical incidents.',
    'Building a postmortem generator that produces genuinely useful retrospectives, not generic template-filled documents.'
  ],
  ARRAY[
    'Opted for Ollama with local models over cloud LLMs — incident data is sensitive, and API latency during an outage is unacceptable.',
    'Designed a tiered LLM strategy: fast small models for alert classification, larger models for root cause reasoning — optimizing cost and latency per-stage.',
    'Built the orchestrator with LangGraph''s checkpoint system for resumability — if the system itself crashes during an incident, it picks up from the last completed stage.',
    'Used Docker Compose for reproducible deployments — the entire stack (agents + vector store + observability) spins up with a single command.'
  ],
  'multi_agent'
),
(
  'EEESoc Website',
  'Collaborative club website built with a team of 3 developers, serving 100+ active users. Features a secure admin dashboard with CRUD operations and GitHub OAuth authentication.',
  'NextJS, GitHub OAuth, MongoDB',
  '',
  'https://eeesocbit.com/',
  2,
  false, '', '{}', '{}', ''
),
(
  'Issue Monitor',
  'Issue tracker web app with role-based access. Built admin dashboard for role control, implemented dark/light themes, and features automatic log generation with restricted visibility.',
  'Flask, React, TypeScript, Chakra-UI, PostgresDB',
  '',
  'https://issue-monitor-frontend.vercel.app',
  3,
  false, '', '{}', '{}', ''
);
