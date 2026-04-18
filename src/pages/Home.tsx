import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Bot, Brain, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedLetters from '@/components/AnimatedLetters'
import ParticleCanvas from '@/components/ParticleCanvas'

const highlights = [
  { icon: Bot, label: 'Agentic AI' },
  { icon: Brain, label: 'LangChain' },
  { icon: Workflow, label: 'LangGraph' },
  { icon: Sparkles, label: 'RAG Systems' },
]

export default function Home() {
  return (
    <>
      <ParticleCanvas />
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

            {/* Subtitle */}
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mb-8 leading-relaxed animate-[fadeIn_1s_1.5s_backwards]">
              Specialist Programmer at{' '}
              <span className="text-foreground font-medium">Infosys</span> — Building
              intelligent multi-agent systems with LangChain, LangGraph & RAG.
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
    </>
  )
}
