import { useEffect, useState } from 'react'
import { ExternalLink, Lightbulb, AlertTriangle, Wrench } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import AgentFlowDiagram from '@/components/AgentFlowDiagram'
import { getProjects, type Project } from '@/lib/supabase'

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Agentic Invoice Auditor',
    description: 'End-to-end agentic AI system for enterprise invoice auditing. Orchestrated through LangGraph, the flow starts via a WatchDog service, manages shared state through a Checkpointer DB, and is surfaced through a Streamlit UI connected to Agentic RAG. Features MCP Server integration to expose the graph as a tool.',
    tech_stack: 'LangChain, LangGraph, FAISS, Streamlit, Python, Langfuse, MCP',
    image_url: '',
    project_url: '',
    sort_order: 0,
    created_at: '',
    is_featured: true,
    why_i_built: 'Manual invoice auditing at enterprise scale is slow, error-prone, and expensive. I built this system to replace a process that took auditors 4+ hours per batch with an autonomous multi-agent pipeline that completes in minutes — while keeping humans in the loop for edge cases.',
    key_challenges: [
      'Synchronizing data between the background graph execution and the Streamlit UI using a shared Checkpointer DB.',
      'Implementing relevance checks in the Agentic RAG to ensure generated outputs strictly adhere to source invoice data.',
      'Integrating an MCP server to wrap the complex graph workflow into a clean, tool-based API.',
      'Designing a WatchDog service to trigger execution autonomously while maintaining stability.',
    ],
    architecture_decisions: [
      'WatchDog Service initiates execution within the LangGraph workflow instead of relying entirely on manual triggers.',
      'Checkpointer DB manages seamless state sharing the background processes and the user interface.',
      'Streamlit UI handles user queries and hits the Agentic RAG pipeline directly.',
      'RAG incorporates a post-generation relevance check validating against source context.',
      'MCP Server exposes the entire pipeline as an executable tool for broader ecosystem integration.',
    ],
    architecture_diagram_type: 'invoice_system,invoice_graph',
  },
  {
    id: '2',
    title: 'AI DevOps Incident Orchestrator',
    description: 'Production-grade multi-agent AI system for automated incident response. Orchestrates the full incident lifecycle — from alert ingestion and context aggregation through root cause reasoning to automated remediation and postmortem generation.',
    tech_stack: 'LangGraph, LangChain, Ollama, Python, Docker',
    image_url: '',
    project_url: '',
    sort_order: 1,
    created_at: '',
    is_featured: true,
    why_i_built: 'On-call engineers spend 60% of incident time on repetitive triage — gathering logs, correlating alerts, and writing postmortems. This system automates the predictable parts so engineers can focus on the genuinely novel problems.',
    key_challenges: [
      'Designing a root cause reasoning agent that can operate accurately with incomplete telemetry data from production systems.',
      'Ensuring remediation actions are safe — an AI that auto-restarts services needs strong guardrails to prevent cascading failures.',
      'Running the entire multi-agent pipeline on local CPU via Ollama while keeping latency under 30 seconds for time-critical incidents.',
      'Building a postmortem generator that produces genuinely useful retrospectives, not generic template-filled documents.',
    ],
    architecture_decisions: [
      'Opted for Ollama with local models over cloud LLMs — incident data is sensitive, and API latency during an outage is unacceptable.',
      'Designed a tiered LLM strategy: fast small models for alert classification, larger models for root cause reasoning — optimizing cost and latency per-stage.',
      "Built the orchestrator with LangGraph's checkpoint system for resumability — if the system itself crashes during an incident, it picks up from the last completed stage.",
      'Used Docker Compose for reproducible deployments — the entire stack (agents + vector store + observability) spins up with a single command.',
    ],
    architecture_diagram_type: 'multi_agent',
  },
  {
    id: '3',
    title: 'EEESoc Website',
    description: 'Collaborative club website built with a team of 3 developers, serving 100+ active users. Features a secure admin dashboard with CRUD operations and GitHub OAuth authentication.',
    tech_stack: 'NextJS, GitHub OAuth, MongoDB',
    image_url: '',
    project_url: 'https://eeesocbit.com/',
    sort_order: 2,
    created_at: '',
    is_featured: false,
    why_i_built: '',
    key_challenges: [],
    architecture_decisions: [],
    architecture_diagram_type: '',
  },
  {
    id: '4',
    title: 'Issue Monitor',
    description: 'Issue tracker web app with role-based access. Built admin dashboard for role control, implemented dark/light themes, and features automatic log generation with restricted visibility.',
    tech_stack: 'Flask, React, TypeScript, Chakra-UI, PostgresDB',
    image_url: '',
    project_url: 'https://issue-monitor-frontend.vercel.app',
    sort_order: 3,
    created_at: '',
    is_featured: false,
    why_i_built: '',
    key_challenges: [],
    architecture_decisions: [],
    architecture_diagram_type: '',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    getProjects().then(data => {
      if (data.length > 0) {
        // Merge remote data with fallback enrichments when remote lacks new columns
        const merged = data.map(remoteProject => {
          if (remoteProject.is_featured !== undefined && remoteProject.is_featured !== null) {
            let diagramType = remoteProject.architecture_diagram_type
            if (diagramType === 'agent_pipeline') {
              diagramType = 'invoice_system,invoice_graph'
            }
            return { ...remoteProject, architecture_diagram_type: diagramType }
          }
          // Find matching fallback by title to get enriched fields
          const fallback = fallbackProjects.find(fp => fp.title === remoteProject.title)
          if (fallback) {
            return { ...remoteProject, ...fallback, id: remoteProject.id }
          }
          return { ...remoteProject, is_featured: false, why_i_built: '', key_challenges: [], architecture_decisions: [], architecture_diagram_type: '' }
        })
        setProjects(merged)
      }
    })
  }, [])

  const featured = projects.filter(p => p.is_featured)
  const secondary = projects.filter(p => !p.is_featured)

  return (
    <div className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="projects-page">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
          <AnimatedLetters strArray={['P', 'r', 'o', 'j', 'e', 'c', 't', 's']} idx={1} />
        </h1>
        <p className="text-muted-foreground mb-2 max-w-2xl">
          AI systems I've designed and built — with architecture decisions, key challenges, and engineering context.
        </p>
        <Separator className="mb-10 max-w-xs" />

        {/* ─── Featured AI Projects ─── */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs font-mono text-primary uppercase tracking-[0.2em] mb-6">Featured AI Systems</h2>
            <div className="space-y-8">
              {featured.map((project, idx) => (
                <Card
                  key={project.id}
                  className="glass glow-border overflow-hidden hover:border-primary/30 transition-all duration-500 group"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                  id={`featured-project-${project.id}`}
                >
                  {/* Top gradient bar */}
                  <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-primary to-violet-600 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <CardContent className="p-6 sm:p-8 lg:p-10">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                          {project.description}
                        </p>
                      </div>
                      {project.project_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0 group/btn"
                          onClick={() => window.open(project.project_url, '_blank')}
                        >
                          View Project
                          <ExternalLink size={14} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Button>
                      )}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.tech_stack.split(',').map(tech => (
                        <Badge key={tech.trim()} variant="glow" className="text-xs">{tech.trim()}</Badge>
                      ))}
                    </div>

                    {/* Architecture Diagram */}
                    {project.architecture_diagram_type && (
                      <div className="mb-8 space-y-6">
                        {project.architecture_diagram_type.split(',').map((typeKey, i, arr) => (
                          <div key={typeKey.trim()}>
                            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                              {arr.length > 1 ? (i === 0 ? 'System Flow' : 'Internal Agent Workflow') : 'Agent Architecture'}
                            </p>
                            <div className="rounded-xl border border-white/[0.06] bg-background/40 backdrop-blur-sm">
                              <AgentFlowDiagram type={typeKey.trim()} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Engineering depth — 3-column grid */}
                    <div className="grid sm:grid-cols-3 gap-6">
                      {/* Why I Built This */}
                      {project.why_i_built && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb size={14} className="text-primary" />
                            <p className="text-xs font-mono text-primary uppercase tracking-wider">Why I Built This</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.why_i_built}</p>
                        </div>
                      )}

                      {/* Key Challenges */}
                      {project.key_challenges.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={14} className="text-amber-400" />
                            <p className="text-xs font-mono text-amber-400 uppercase tracking-wider">Key Challenges</p>
                          </div>
                          <ul className="space-y-2">
                            {project.key_challenges.map((challenge, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-amber-400/70 mt-1 shrink-0 text-xs">▸</span>
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Architecture Decisions */}
                      {project.architecture_decisions.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Wrench size={14} className="text-violet-400" />
                            <p className="text-xs font-mono text-violet-400 uppercase tracking-wider">Decisions</p>
                          </div>
                          <ul className="space-y-2">
                            {project.architecture_decisions.map((decision, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-violet-400/70 mt-1 shrink-0 text-xs">▸</span>
                                <span>{decision}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ─── Secondary Projects ─── */}
        {secondary.length > 0 && (
          <div>
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] mb-6">Other Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {secondary.map((project, idx) => (
                <Card
                  key={project.id}
                  className="glass glow-border group overflow-hidden hover:border-primary/30 transition-all duration-500"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                  id={`project-${project.id}`}
                >
                  {/* Top gradient bar */}
                  <div className="h-1 bg-gradient-to-r from-cyan-400 via-primary to-violet-600 opacity-50 group-hover:opacity-100 transition-opacity" />

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech_stack.split(',').map(tech => (
                        <Badge key={tech.trim()} variant="glow" className="text-[10px]">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* CTA */}
                    {project.project_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="group/btn"
                        onClick={() => window.open(project.project_url, '_blank')}
                        id={`view-project-${project.id}`}
                      >
                        View Project
                        <ExternalLink size={14} className="ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
