import { ArrowRight, CalendarDays, CheckCircle2, LockKeyhole, MessageSquare, ScanSearch, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SEO from '@/components/SEO'
import { freelanceConfig } from '@/lib/freelance'

const services = [
  {
    icon: ScanSearch,
    title: 'AI Workflow Audit',
    eyebrow: 'Start here',
    description: 'A focused review of one repetitive workflow—where time is lost, what data is available, and where AI can help safely.',
    deliverables: ['Workflow map and automation opportunities', 'Data, privacy, and human-review risks', 'A prioritized implementation roadmap'],
  },
  {
    icon: Wrench,
    title: 'AI Automation Build',
    eyebrow: 'After the audit',
    description: 'A fixed-scope implementation for a validated workflow, such as document processing, internal knowledge search, or guided agent automation.',
    deliverables: ['Working implementation and handover demo', 'Evaluation criteria and guardrails', 'Clear documentation for your team'],
  },
  {
    icon: CheckCircle2,
    title: 'Support & Improvement',
    eyebrow: 'For delivered systems',
    description: 'Practical iteration after launch: observe quality, improve prompts and retrieval, and make the workflow more reliable over time.',
    deliverables: ['Quality and failure-mode review', 'Targeted improvements and testing', 'Recommendations for the next iteration'],
  },
]

const process = [
  ['Discovery call', 'We decide whether your workflow is a good fit and what success should look like.'],
  ['Paid workflow audit', 'I map the process, risks, inputs, and a sensible first automation.'],
  ['Implementation proposal', 'You receive a clear scope, deliverables, timeline, and fixed project agreement.'],
  ['Build, demo, handover', 'I deliver the agreed workflow, validate it with you, and document how to use it.'],
]

export default function Services() {
  const bookingCta = freelanceConfig.bookingUrl ? (
    <Button asChild size="lg" className="btn-shimmer font-semibold">
      <a href={freelanceConfig.bookingUrl} target="_blank" rel="noreferrer">Book a discovery call <CalendarDays size={17} className="ml-2" /></a>
    </Button>
  ) : (
    <Button asChild size="lg" className="btn-shimmer font-semibold"><Link to="/contact/">Discuss your workflow <ArrowRight size={17} className="ml-2" /></Link></Button>
  )

  return <>
    <SEO title="AI Automation Services" description="Part-time AI workflow audits and fixed-scope automation builds for teams with document-heavy operations, support, or internal knowledge workflows." structuredData={{
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Person', name: 'Ved Prakash', url: 'https://vedprakash.me', jobTitle: 'AI Automation Engineer' },
        { '@type': 'Service', name: 'AI Workflow Audit', provider: { '@type': 'Person', name: 'Ved Prakash' }, areaServed: 'Worldwide', serviceType: 'AI workflow audit and automation implementation' },
      ],
    }} />
    <main className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="services-page">
      <div className="container mx-auto max-w-6xl">
        <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">Part-time, remote, async-friendly</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient max-w-3xl">Turn a repetitive workflow into a reliable AI-assisted system.</h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mt-5">I help teams assess and build safe automations for document-heavy operations, customer support, and internal knowledge. Every engagement starts with a practical workflow audit.</p>
        <div className="mt-8 flex flex-wrap gap-4">{bookingCta}<Button asChild variant="outline" size="lg"><Link to="/projects/">View relevant case studies</Link></Button></div>
        <Separator className="my-14 max-w-xs" />

        <section aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-2xl font-bold mb-6">Ways to work together</h2>
          <div className="grid lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, eyebrow, description, deliverables }) => <Card key={title} className="glass glow-border"><CardContent className="p-6"><Icon className="text-primary mb-5" size={25} /><p className="text-xs font-mono uppercase tracking-wider text-primary mb-2">{eyebrow}</p><h3 className="text-xl font-semibold mb-3">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p><ul className="space-y-2">{deliverables.map(item => <li key={item} className="flex gap-2 text-sm text-foreground/85"><CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />{item}</li>)}</ul></CardContent></Card>)}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="process-heading"><h2 id="process-heading" className="text-2xl font-bold mb-6">A clear, low-risk process</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{process.map(([title, detail], index) => <Card key={title} className="glass"><CardContent className="p-5"><span className="font-mono text-primary">0{index + 1}</span><h3 className="font-semibold mt-3 mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{detail}</p></CardContent></Card>)}</div></section>

        <section className="mt-16 grid lg:grid-cols-2 gap-6"><Card className="glass glow-border"><CardContent className="p-6"><MessageSquare className="text-primary mb-4" /><h2 className="text-xl font-semibold mb-3">What to bring to a call</h2><p className="text-sm text-muted-foreground leading-relaxed">A short description of the manual workflow, the tools or data involved, who uses the result, and the outcome you want. You do not need a finished specification.</p></CardContent></Card><Card className="glass glow-border"><CardContent className="p-6"><LockKeyhole className="text-primary mb-4" /><h2 className="text-xl font-semibold mb-3">Safe by design</h2><p className="text-sm text-muted-foreground leading-relaxed">Sensitive data stays in your approved environment. Automations are scoped with review points for decisions that need a human, and no high-impact action is automated without explicit agreement.</p></CardContent></Card></section>
      </div>
    </main>
  </>
}
