import { useRef, useState } from 'react'
import { Send, Linkedin, Github, Mail, MapPin, CalendarDays } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import emailjs from '@emailjs/browser'
import SEO from '@/components/SEO'
import { freelanceConfig, hiringLinks } from '@/lib/freelance'

const contactInfo = [
  { icon: Mail, label: 'hi@vedprakash.me', href: 'mailto:hi@vedprakash.me' },
  { icon: MapPin, label: 'Lucknow, India', href: undefined },
  { icon: Linkedin, label: 'vedprakashsigh', href: 'https://www.linkedin.com/in/vedprakashsigh' },
  { icon: Github, label: 'vedprakashsigh', href: 'https://www.github.com/vedprakashsigh' },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setSending(true)
    emailjs
      .sendForm(freelanceConfig.emailJsServiceId, freelanceConfig.emailJsTemplateId, formRef.current, freelanceConfig.emailJsPublicKey)
      .then(() => {
        if (freelanceConfig.emailJsAutoReplyTemplateId && formRef.current) {
          emailjs.sendForm(
            freelanceConfig.emailJsServiceId,
            freelanceConfig.emailJsAutoReplyTemplateId,
            formRef.current,
            freelanceConfig.emailJsPublicKey,
          ).catch(() => console.warn('Auto-reply failed to send.'))
        }
        setSent(true)
        setSending(false)
        formRef.current?.reset()
        setTimeout(() => setSent(false), 5000)
      })
      .catch(() => {
        alert('Message failed to send. Please try again.')
        setSending(false)
      })
  }

  return (
    <>
      <SEO
        title="Start an AI Workflow Audit"
        description="Tell me about your document-heavy workflow, internal knowledge problem, or support process. Part-time remote AI automation engagements."
      />
      <div className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="contact-page">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            <AnimatedLetters strArray={['T', 'e', 'l', 'l', ' ', 'm', 'e', ' ', 'a', 'b', 'o', 'u', 't', ' ', 'y', 'o', 'u', 'r', ' ', 'w', 'o', 'r', 'k', 'f', 'l', 'o', 'w']} idx={1} />
          </h1>
          <Separator className="mb-10 max-w-xs" />

          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Form */}
            <Card className="glass glow-border">
              <CardContent className="p-6 sm:p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Share the repetitive process you want to improve. A useful first note includes the current workflow, the tools or data involved, and what a better outcome would look like. I work part-time, remotely, and reply within two business days.
                </p>

                {sent && (
                  <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                  <input type="hidden" name="subject" value="New AI Workflow Inquiry" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project_type">What do you need help with?</Label>
                    <Input id="project_type" name="project_type" placeholder="e.g. document workflow, internal knowledge, support" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current_workflow">Current workflow</Label>
                    <Textarea id="current_workflow" name="current_workflow" placeholder="What happens today, who does it, and where does it become slow or error-prone?" className="min-h-[110px]" required />
                  </div>
                  <div className="space-y-2"><Label htmlFor="systems_data">Tools, systems, or data involved</Label><Input id="systems_data" name="systems_data" placeholder="e.g. PDFs, CRM, knowledge base, spreadsheets" required /></div>
                  <div className="space-y-2"><Label htmlFor="goal">Desired outcome</Label><Input id="goal" name="goal" placeholder="What should be faster, safer, or easier?" required /></div>
                  <div className="grid sm:grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="timeline">Expected timeline</Label><Input id="timeline" name="timeline" placeholder="e.g. this month, exploring" required /></div><div className="space-y-2"><Label htmlFor="budget_range">Budget range</Label><Input id="budget_range" name="budget_range" placeholder="e.g. under $1k, $1k–$3k, unsure" required /></div></div>
                  <div className="space-y-2"><Label htmlFor="preferred_contact">Preferred contact method</Label><Input id="preferred_contact" name="preferred_contact" placeholder="Email, LinkedIn, WhatsApp, or a call" required /></div>
                  <div className="space-y-2"><Label htmlFor="message">Anything else?</Label><Textarea id="message" name="message" placeholder="Optional context, constraints, or questions" className="min-h-[100px]" /></div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto btn-shimmer font-semibold group"
                    disabled={sending}
                    id="send-message"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h2>
              {freelanceConfig.bookingUrl && <Button asChild className="w-full mb-4"><a href={freelanceConfig.bookingUrl} target="_blank" rel="noreferrer"><CalendarDays size={16} className="mr-2" />Book a discovery call</a></Button>}
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{label}</span>
                  )}
                </div>
              ))}

              {hiringLinks.length > 0 && <><Separator className="my-6" /><div><p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">Hire through a platform</p><div className="flex gap-3">{hiringLinks.map(({ href, label }) => <Button key={label} asChild variant="outline" size="sm"><a href={href} target="_blank" rel="noreferrer">{label}</a></Button>)}</div></div></>}

              <Separator className="my-6" />

              <Card className="glass glow-border p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Best fit: a real operational workflow with clear owners and a willingness to keep humans in the loop for decisions that need judgment.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
