import { useEffect, useState } from 'react'
import { Download, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import AnimatedLetters from '@/components/AnimatedLetters'
import {
  getExperience, getEducation, getSkills, getCertifications, getProfile,
  type Experience, type Education, type Skill, type Certification, type Profile,
} from '@/lib/supabase'

// Fallback data
const fallbackProfile: Profile = {
  id: 1, name: 'Ved Prakash', title: 'Agentic AI Engineer',
  location: 'Lucknow, India', email: 'hi@vedprakash.me', phone: '+91-7752911254',
  linkedin: 'linkedin.com/in/vedprakashsigh', github: 'github.com/vedprakashsigh',
  bio: '', resume_url: '',
}

const fallbackEducation: Education[] = [
  { id: '1', institution: 'Birla Institute of Technology', degree: 'Bachelor of Technology | Electrical and Electronics Engineering', period: 'December 2021 – August 2025', details: 'CGPA: 8.82', sort_order: 0 },
]

const fallbackCertifications: Certification[] = [
  { id: '1', title: 'Infosys Certified Generative AI Professional - Intermediate', issuer: 'Infosys', url: '', sort_order: 0 },
  { id: '2', title: 'LangGraph for Developers and Architects', issuer: '', url: '', sort_order: 1 },
  { id: '3', title: 'Python Microservices using FastAPI', issuer: '', url: '', sort_order: 2 },
  { id: '4', title: 'DSA: In-Depth using Python', issuer: 'Udemy', url: '', sort_order: 3 },
]

export default function Resume() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>(fallbackEducation)
  const [skills, setSkills] = useState<Skill[]>([])
  const [certifications, setCertifications] = useState<Certification[]>(fallbackCertifications)
  const [profile, setProfile] = useState<Profile>(fallbackProfile)

  useEffect(() => {
    getExperience().then(d => { if (d.length > 0) setExperience(d) })
    getEducation().then(d => { if (d.length > 0) setEducation(d) })
    getSkills().then(d => { if (d.length > 0) setSkills(d) })
    getCertifications().then(d => { if (d.length > 0) setCertifications(d) })
    getProfile().then(d => { if (d) setProfile(d) })
  }, [])

  return (
    <div className="min-h-screen py-12 lg:py-20 px-6 lg:px-16 page-enter" id="resume-page">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
            <AnimatedLetters strArray={['R', 'e', 's', 'u', 'm', 'e']} idx={1} />
          </h1>
          {profile.resume_url && (
            <Button
              size="lg"
              className="btn-shimmer mt-4 sm:mt-0 group"
              onClick={() => window.open(profile.resume_url, '_blank')}
              id="download-resume"
            >
              <Download size={18} className="mr-2" />
              Download PDF
            </Button>
          )}
        </div>
        <Separator className="mb-10 max-w-xs" />

        {/* Education */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
              <GraduationCap size={20} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Education</h2>
          </div>
          {education.map(edu => (
            <Card key={edu.id} className="glass glow-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h3 className="text-lg font-semibold text-foreground">{edu.institution}</h3>
                  <span className="text-muted-foreground text-sm font-mono">{edu.period}</span>
                </div>
                <p className="text-primary text-sm font-medium mb-1">{edu.degree}</p>
                {edu.details && <p className="text-sm text-muted-foreground">{edu.details}</p>}
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Briefcase size={20} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Experience</h2>
            </div>
            <div className="space-y-4">
              {experience.map(exp => (
                <Card key={exp.id} className="glass glow-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
                        <p className="text-primary text-sm font-medium">{exp.role}</p>
                      </div>
                      <span className="text-muted-foreground text-sm font-mono mt-1 sm:mt-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                <Wrench size={20} className="text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Skills</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map(skill => (
                <Card key={skill.id} className="glass glow-border">
                  <CardContent className="p-5">
                    <h3 className="text-xs font-semibold text-primary mb-3 font-mono uppercase tracking-wider">
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map(item => (
                        <Badge key={item} variant="glow" className="text-xs">{item}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Award size={20} className="text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Certifications</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {certifications.map(cert => (
              <Card key={cert.id} className="glass glow-border hover:border-primary/20 transition-all group">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{cert.title}</p>
                    {cert.issuer && <p className="text-xs text-muted-foreground">{cert.issuer}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
