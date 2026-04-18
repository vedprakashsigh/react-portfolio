import { useRef, useState } from 'react'
import { Send, Linkedin, Github, Mail, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import emailjs from '@emailjs/browser'

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
      .sendForm('service_phbyyuk', 'template_qrvz1rc', formRef.current, 'CWBuRASwCa6QJFzY1')
      .then(() => {
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
    <div className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="contact-page">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
          <AnimatedLetters strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e']} idx={1} />
        </h1>
        <Separator className="mb-10 max-w-xs" />

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Form */}
          <Card className="glass glow-border">
            <CardContent className="p-6 sm:p-8">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Have a project in mind or want to discuss AI solutions? Drop me a message and I'll get back to you as soon as possible.
              </p>

              {sent && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" id="contact-form">
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
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What's this about?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message..." className="min-h-[150px]" required />
                </div>
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

            <Separator className="my-6" />

            <Card className="glass glow-border p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new opportunities in
                <span className="text-primary"> Agentic AI</span>,
                <span className="text-primary"> LLM applications</span>, and
                <span className="text-primary"> intelligent automation</span>.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
