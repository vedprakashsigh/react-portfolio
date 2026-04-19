import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Bot, Brain, Workflow, Lightbulb, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import ParticleCanvas from '@/components/ParticleCanvas'
import AgentFlowDiagram from '@/components/AgentFlowDiagram'

const highlights = [
  { icon: Bot, label: 'Agentic AI' },
  { icon: Brain, label: 'LangChain' },
  { icon: Workflow, label: 'LangGraph' },
  { icon: Sparkles, label: 'RAG Systems' },
]

const featuredProjects = [
  {
    title: 'Agentic Invoice Auditor',
    problem: 'Replaced 4+ hour manual invoice auditing with an autonomous multi-agent pipeline that completes in minutes.',
    decisions: [
      'WatchDog Service initiates execution within the LangGraph workflow.',
      'Checkpointer DB handles seamless state sharing across the multi-agent pipeline.',
      'Streamlit UI manages user queries and retrieves context via Agentic RAG with relevance checks.',
      'MCP Server wraps the graph as a tool for autonomous execution.'
    ],
    tech: ['LangChain', 'LangGraph', 'FAISS', 'Streamlit', 'Langfuse'],
    diagramType: 'invoice_system,invoice_graph',
  },
  {
    title: 'AI DevOps Incident Orchestrator',
    problem: 'Automates 60% of on-call triage — alert correlation, root cause analysis, and postmortem generation.',
    decisions: [
      'Ollama local models for data privacy and zero-latency during outages',
      'Tiered LLM strategy: fast models for classification, large models for reasoning',
      'Checkpoint-based resumability if the orchestrator itself crashes',
    ],
    tech: ['LangGraph', 'LangChain', 'Ollama', 'Docker'],
    diagramType: 'multi_agent',
  },
]

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      
      {/* ─── Hero Section ─── */}
      <section className="relative z-10 min-h-screen flex items-center" id="hero-section">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl page-enter">
            {/* Greeting */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              <span className="text-primary font-mono text-sm tracking-wider uppercase">
                Hello, I'm
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-[1.1]">
              <AnimatedLetters
                strArray={['V', 'e', 'd', ' ', 'P', 'r', 'a', 'k', 'a', 's', 'h']}
                idx={1}
              />
            </h1>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
              <span className="text-gradient">Agentic AI Engineer</span>
            </h2>

            {/* Subtitle — concrete, memorable hook */}
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-8 leading-relaxed animate-[fadeIn_1s_1.5s_backwards]">
              Building scalable AI systems that{' '}
              <span className="text-foreground font-medium">audit invoices</span>,{' '}
              <span className="text-foreground font-medium">orchestrate incident response</span>, and{' '}
              <span className="text-foreground font-medium">reason autonomously</span> — using
              LangGraph, RAG & multi-agent architectures.
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3 mb-10 animate-[fadeIn_1s_2s_backwards]">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass glow-border text-sm text-foreground/80 hover:text-primary hover:border-primary/40 transition-all duration-300"
                >
                  <Icon size={14} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4 animate-[fadeIn_1s_2.3s_backwards]">
              <Button asChild size="lg" className="btn-shimmer font-semibold group" id="cta-contact">
                <Link to="/contact">
                  Let's Talk
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" id="cta-projects">
                <Link to="/projects">View Projects</Link>
              </Button>
            </div>
          </div>

          {/* Floating decorative element */}
          <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2" aria-hidden="true">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-violet-600/10 blur-3xl animate-glow-pulse" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/[0.05] backdrop-blur-sm animate-float" />
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-[5.5rem] rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
                <Brain size={40} className="text-primary/60 animate-glow-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI Systems I've Built ─── */}
      <section className="relative z-10 pb-20 px-6 lg:px-16" id="featured-ai-systems">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Zap size={20} className="text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">AI Systems I've Built</h2>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((project, idx) => (
              <Card
                key={project.title}
                className="glass glow-border overflow-hidden hover:border-primary/30 transition-all duration-500 group"
                style={{ animationDelay: `${idx * 0.2}s` }}
                id={`featured-project-${idx}`}
              >
                {/* Top gradient bar */}
                <div className="h-1 bg-gradient-to-r from-cyan-400 via-primary to-violet-600 opacity-50 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => (
                        <Badge key={t} variant="glow" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Problem statement */}
                  <div className="flex items-start gap-2 mb-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Lightbulb size={16} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground/90 leading-relaxed">{project.problem}</p>
                  </div>

                  {/* Architecture diagram */}
                  <div className="mb-6 space-y-4">
                    {project.diagramType.split(',').map((typeKey, i, arr) => (
                      <div key={typeKey.trim()}>
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                          {arr.length > 1 ? (i === 0 ? 'System Flow' : 'Internal Agent Workflow') : 'Agent Pipeline'}
                        </p>
                        <div className="rounded-xl border border-white/[0.06] bg-background/40 backdrop-blur-sm">
                          <AgentFlowDiagram type={typeKey.trim()} compact />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Architecture decisions */}
                  <div>
                    <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">Architecture Decisions</p>
                    <ul className="space-y-2">
                      {project.decisions.map((decision, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1 shrink-0">▸</span>
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* See all projects CTA */}
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg" className="group" id="see-all-projects">
              <Link to="/projects">
                See All Projects & Engineering Details
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
