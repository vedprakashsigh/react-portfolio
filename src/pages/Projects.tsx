import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import { getProjects, type Project } from '@/lib/supabase'

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Agentic Invoice Auditor',
    description: 'End-to-end agentic AI system for invoice auditing using LangChain and LangGraph. Features specialized agents for extraction, translation, ERP validation, and reporting with Agentic RAG and Langfuse observability.',
    tech_stack: 'LangChain, LangGraph, FAISS, Streamlit, Python, Langfuse',
    image_url: '',
    project_url: '',
    sort_order: 0,
    created_at: '',
  },
  {
    id: '2',
    title: 'EEESoc Website',
    description: 'Collaborative club website built with a team of 3 developers, serving 100+ active users. Features a secure admin dashboard with CRUD operations and GitHub OAuth authentication.',
    tech_stack: 'NextJS, GitHub OAuth, MongoDB',
    image_url: '',
    project_url: 'https://eeesocbit.com/',
    sort_order: 1,
    created_at: '',
  },
  {
    id: '3',
    title: 'Issue Monitor',
    description: 'Issue tracker web app with role-based access for 5-10 users. Built admin dashboard for role control, implemented dark/light themes, and features automatic log generation with restricted visibility.',
    tech_stack: 'Flask, React, TypeScript, Chakra-UI, PostgresDB',
    image_url: '',
    project_url: 'https://issue-monitor-frontend.vercel.app',
    sort_order: 2,
    created_at: '',
  },
  {
    id: '4',
    title: 'AI DevOps Incident Orchestrator',
    description: 'Production-grade multi-agent AI system for automated incident response. Handles alert ingestion, context aggregation, root cause reasoning, automated remediation, and postmortem generation.',
    tech_stack: 'LangGraph, LangChain, Ollama, Python, Docker',
    image_url: '',
    project_url: '',
    sort_order: 3,
    created_at: '',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    getProjects().then(data => { if (data.length > 0) setProjects(data) })
  }, [])

  return (
    <div className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="projects-page">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
          <AnimatedLetters strArray={['P', 'r', 'o', 'j', 'e', 'c', 't', 's']} idx={1} />
        </h1>
        <Separator className="mb-10 max-w-xs" />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
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
    </div>
  )
}
