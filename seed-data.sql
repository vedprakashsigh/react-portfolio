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
INSERT INTO projects (title, description, tech_stack, image_url, project_url, sort_order) VALUES
(
  'Agentic Invoice Auditor',
  'End-to-end agentic AI system for invoice auditing using LangChain and LangGraph. Features specialized agents for extraction, translation, ERP validation, and reporting with Agentic RAG and Langfuse observability.',
  'LangChain, LangGraph, FAISS, Streamlit, Python, Langfuse',
  '',
  '',
  0
),
(
  'EEESoc Website',
  'Collaborative club website built with a team of 3 developers, serving 100+ active users. Features a secure admin dashboard with CRUD operations and GitHub OAuth authentication.',
  'NextJS, GitHub OAuth, MongoDB',
  '',
  'https://eeesocbit.com/',
  1
),
(
  'Issue Monitor',
  'Issue tracker web app with role-based access. Built admin dashboard for role control, implemented dark/light themes, and features automatic log generation with restricted visibility.',
  'Flask, React, TypeScript, Chakra-UI, PostgresDB',
  '',
  'https://issue-monitor-frontend.vercel.app',
  2
),
(
  'AI DevOps Incident Orchestrator',
  'Production-grade multi-agent AI system for automated incident response. Handles alert ingestion, context aggregation, root cause reasoning, automated remediation, and postmortem generation.',
  'LangGraph, LangChain, Ollama, Python, Docker',
  '',
  '',
  3
);
