import { useEffect, useState } from 'react'
import { Bot, Brain, Network, Cpu, Code2, Database, Container, GitBranch } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import LeetCodeStats from '@/components/LeetCodeStats'
import { getSkills, getExperience, type Skill, type Experience } from '@/lib/supabase'

// Fallback data in case Supabase isn't configured yet
const fallbackSkills: Skill[] = [
  { id: '1', category: 'AI / ML', items: ['LangChain', 'LangGraph', 'Agentic RAG', 'FAISS', 'AWS Bedrock', 'MCP', 'HITL', 'Prompt Engineering', 'LLM Applications'], sort_order: 0 },
  { id: '2', category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'], sort_order: 1 },
  { id: '3', category: 'Frameworks', items: ['ReactJS', 'NextJS', 'Flask', 'Streamlit', 'FastAPI'], sort_order: 2 },
  { id: '4', category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase'], sort_order: 3 },
  { id: '5', category: 'Tools', items: ['Git', 'GitHub', 'Langfuse', 'Docker', 'Vite'], sort_order: 4 },
  { id: '6', category: 'Fundamentals', items: ['OOP', 'DBMS', 'Data Structures & Algorithms'], sort_order: 5 },
]

const fallbackExperience: Experience[] = [
  {
    id: '1', company: 'Infosys Limited', role: 'Specialist Programmer (Agentic AI)', period: 'October 2025 – Present',
    description: [
      'Designed and implemented an end-to-end agentic AI system for invoice auditing using LangChain and LangGraph.',
      'Built specialized agents for invoice extraction, multilingual translation, ERP validation, and reporting.',
      'Implemented Agentic RAG with FAISS for contextual Q&A over invoices.',
      'Integrated MCP and Human-in-the-Loop (HITL) feedback mechanisms.',
      'Enabled observability using Langfuse for monitoring agent performance.',
      'Developed Streamlit dashboards for audit insights and anomaly detection.',
    ], sort_order: 0,
  },
  {
    id: '2', company: 'SRDT', role: 'Intern – Software QA & Full Stack Development', period: 'January 2025 – May 2025',
    description: [
      'Performed manual testing (functional, regression, usability), created test cases, and documented bugs/defects.',
      'Assisted in frontend (React.js) and backend (Java Spring Boot) tasks including UI fixes, API integration, and database validation.',
      'Collaborated in an Agile environment, supporting sprint planning, testing, and code reviews.',
    ], sort_order: 1,
  },
]

const whatIDo = [
  {
    icon: Bot,
    title: 'Agent Architecture',
    description: 'Design multi-agent systems with LangGraph for complex workflow orchestration, tool use, and autonomous decision-making.',
  },
  {
    icon: Brain,
    title: 'RAG Systems',
    description: 'Build retrieval-augmented generation pipelines with vector stores (FAISS), semantic search, and contextual Q&A.',
  },
  {
    icon: Network,
    title: 'LLM Orchestration',
    description: 'Implement tiered LLM strategies with LangChain, observability via Langfuse, and human-in-the-loop feedback.',
  },
]

const cubeIcons = [
  { icon: Brain, label: 'LangChain', color: '#00f0ff', contentRotate: '0deg' },
  { icon: Code2, label: 'Python', color: '#7c3aed', contentRotate: '-90deg' },
  { icon: Cpu, label: 'LangGraph', color: '#00f0ff', contentRotate: '-90deg' },
  { icon: Database, label: 'FAISS', color: '#7c3aed', contentRotate: '0deg' },
  { icon: Container, label: 'Docker', color: '#00f0ff', contentRotate: '0deg' },
  { icon: GitBranch, label: 'Git', color: '#7c3aed', contentRotate: '0deg' },
]

export default function About() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills)
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience)

  useEffect(() => {
    getSkills().then(data => { if (data.length > 0) setSkills(data) })
    getExperience().then(data => { if (data.length > 0) setExperience(data) })
  }, [])

  return (
    <div className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="about-page">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
          <AnimatedLetters strArray={['A', 'b', 'o', 'u', 't', ' ', 'M', 'e']} idx={1} />
        </h1>
        <Separator className="mb-10 max-w-xs" />

        <div className="grid lg:grid-cols-[1fr_300px] gap-12 mb-16">
          {/* Bio */}
          <div className="space-y-4">
            <p className="text-foreground/90 leading-relaxed">
              Hi! I'm <span className="text-primary font-semibold">Ved Prakash</span>, a Specialist Programmer at
              Infosys, focused on building production-grade <span className="text-primary">Agentic AI systems</span>.
              I design multi-agent architectures using LangChain and LangGraph to solve complex enterprise challenges.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I graduated from <span className="text-foreground">Birla Institute of Technology, Mesra</span> with a
              B.Tech in Electrical & Electronics Engineering (CGPA: 8.82). My journey from frontend development to
              AI engineering reflects my passion for building systems that are both intelligent and beautifully engineered.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I'm building end-to-end agentic AI solutions for enterprise invoice auditing — from
              specialized extraction agents to Agentic RAG pipelines with FAISS, all monitored through Langfuse observability.
            </p>
          </div>

          {/* Spinning Cube */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <div className="relative" style={{ perspective: '600px' }}>
              <div
                className="relative w-[160px] h-[160px] animate-spin-cube"
                style={{ transformStyle: 'preserve-3d', transformOrigin: '80px 80px 0' }}
              >
                {cubeIcons.map(({ icon: Icon, label, color, contentRotate }, i) => {
                  const transforms = [
                    'translateZ(80px)',
                    'rotateX(90deg) translateZ(80px)',
                    'rotateX(90deg) rotateY(90deg) translateZ(80px)',
                    'rotateY(180deg) rotateZ(90deg) translateZ(80px)',
                    'rotateX(90deg) rotateY(180deg) rotateZ(90deg) translateZ(80px)',
                    'rotateY(-90deg) translateZ(80px)',
                  ]
                  return (
                    <div
                      key={label}
                      className="absolute w-[160px] h-[160px] flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-card/60 backdrop-blur-sm"
                      style={{ transform: transforms[i] }}
                    >
                      <div style={{ transform: `rotate(${contentRotate})` }} className="flex flex-col items-center gap-2">
                        <Icon size={40} style={{ color }} />
                        <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* What I Do */}
        <h2 className="text-2xl font-bold text-foreground mb-6">What I Do</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {whatIDo.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="glass glow-border group hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* LeetCode Stats */}
        <div className="grid sm:grid-cols-[1fr_1fr] lg:grid-cols-[350px_1fr] gap-6 mb-16">
          <LeetCodeStats username="vedprakashsigh" />
          <Card className="glass glow-border flex items-center">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Problem Solving</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I actively practice competitive programming and DSA on LeetCode to sharpen my
                algorithmic thinking — skills that directly translate to designing efficient
                <span className="text-primary"> agent workflows</span> and
                <span className="text-primary"> data pipelines</span>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Experience */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Experience</h2>
        <div className="space-y-4 mb-16">
          {experience.map((exp) => (
            <Card key={exp.id} className="glass glow-border hover:border-primary/20 transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
                    <p className="text-primary text-sm font-medium">{exp.role}</p>
                  </div>
                  <span className="text-muted-foreground text-sm font-mono mt-1 sm:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Skills</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="glass glow-border hover:border-primary/20 transition-all">
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-primary mb-3 font-mono uppercase tracking-wider">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="glow" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
