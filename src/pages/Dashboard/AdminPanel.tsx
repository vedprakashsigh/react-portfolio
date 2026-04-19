import { useState, useEffect, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase, type Project, type Experience, type Education, type Skill, type Certification, type Profile } from '@/lib/supabase'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  LogOut, Plus, Trash2, Save, FolderKanban, Briefcase,
  GraduationCap, Wrench, Award, UserCircle, Upload, ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface AdminProps {
  user: User
}

// ─── Generic CRUD Section ────────────────────────────────────

function CrudSection<T extends { id: string }>({
  tableName,
  items,
  reload,
  renderForm,
  renderItem,
  emptyItem,
}: {
  tableName: string
  items: T[]
  reload: () => void
  renderForm: (item: T, onChange: (item: T) => void) => React.ReactNode
  renderItem: (item: T) => React.ReactNode
  emptyItem: Omit<T, 'id'>
}) {
  const [editing, setEditing] = useState<T | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    const isNew = !editing.id || editing.id === 'new'
    const { id, ...rest } = editing as any

    if (isNew) {
      await supabase.from(tableName).insert(rest)
    } else {
      await supabase.from(tableName).update(rest).eq('id', id)
    }
    setSaving(false)
    setEditing(null)
    reload()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await supabase.from(tableName).delete().eq('id', id)
    reload()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{items.length} item(s)</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setEditing({ id: 'new', ...emptyItem } as T)}
        >
          <Plus size={14} className="mr-1" /> Add
        </Button>
      </div>

      {/* Edit form */}
      {editing && (
        <Card className="glass border-primary/20">
          <CardContent className="p-4 space-y-4">
            {renderForm(editing, (updated) => setEditing(updated))}
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} size="sm">
                <Save size={14} className="mr-1" /> {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items list */}
      {items.map(item => (
        <Card key={item.id} className="glass">
          <CardContent className="p-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">{renderItem(item)}</div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(item)}>
                <Save size={14} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ─── Admin Panel ─────────────────────────────────────────────

export default function AdminPanel({ user }: AdminProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileSaving, setProfileSaving] = useState(false)
  const [resumeUploading, setResumeUploading] = useState(false)

  const loadAll = useCallback(async () => {
    const [p, ex, ed, sk, cr, pr] = await Promise.all([
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('experience').select('*').order('sort_order'),
      supabase.from('education').select('*').order('sort_order'),
      supabase.from('skills').select('*').order('sort_order'),
      supabase.from('certifications').select('*').order('sort_order'),
      supabase.from('profile').select('*').eq('id', 1).single(),
    ])
    if (p.data) setProjects(p.data)
    if (ex.data) setExperience(ex.data)
    if (ed.data) setEducation(ed.data)
    if (sk.data) setSkills(sk.data)
    if (cr.data) setCertifications(cr.data)
    if (pr.data) setProfile(pr.data)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const saveProfile = async () => {
    if (!profile) return
    setProfileSaving(true)
    const { id, ...rest } = profile
    await supabase.from('profile').upsert({ id: 1, ...rest })
    setProfileSaving(false)
  }

  const uploadResume = async (file: File) => {
    setResumeUploading(true)
    const { error } = await supabase.storage
      .from('uploads')
      .upload('resume.pdf', file, { upsert: true, contentType: 'application/pdf' })

    if (!error) {
      const { data } = supabase.storage.from('uploads').getPublicUrl('resume.pdf')
      if (data && profile) {
        const newProfile = { ...profile, resume_url: data.publicUrl }
        setProfile(newProfile)
        await supabase.from('profile').update({ resume_url: data.publicUrl }).eq('id', 1)
      }
    } else {
      alert('Upload failed: ' + error.message)
    }
    setResumeUploading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/[0.06]">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-semibold text-gradient">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs defaultValue="projects">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full mb-8">
            <TabsTrigger value="projects"><FolderKanban size={14} className="mr-1 hidden sm:inline" />Projects</TabsTrigger>
            <TabsTrigger value="experience"><Briefcase size={14} className="mr-1 hidden sm:inline" />Experience</TabsTrigger>
            <TabsTrigger value="education"><GraduationCap size={14} className="mr-1 hidden sm:inline" />Education</TabsTrigger>
            <TabsTrigger value="skills"><Wrench size={14} className="mr-1 hidden sm:inline" />Skills</TabsTrigger>
            <TabsTrigger value="certs"><Award size={14} className="mr-1 hidden sm:inline" />Certs</TabsTrigger>
            <TabsTrigger value="profile"><UserCircle size={14} className="mr-1 hidden sm:inline" />Profile</TabsTrigger>
          </TabsList>

          {/* ── PROJECTS ── */}
          <TabsContent value="projects">
            <CrudSection<Project>
              tableName="projects"
              items={projects}
              reload={loadAll}
              emptyItem={{ title: '', description: '', tech_stack: '', image_url: '', project_url: '', sort_order: projects.length, created_at: '', is_featured: false, why_i_built: '', key_challenges: [], architecture_decisions: [], architecture_diagram_type: '' }}
              renderForm={(item, onChange) => (
                <div className="space-y-3">
                  <div className="space-y-1"><Label>Title</Label><Input value={item.title} onChange={e => onChange({ ...item, title: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Description</Label><Textarea value={item.description} onChange={e => onChange({ ...item, description: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Tech Stack (comma-separated)</Label><Input value={item.tech_stack} onChange={e => onChange({ ...item, tech_stack: e.target.value })} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Image URL</Label><Input value={item.image_url} onChange={e => onChange({ ...item, image_url: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Project URL</Label><Input value={item.project_url} onChange={e => onChange({ ...item, project_url: e.target.value })} /></div>
                  </div>
                  <div className="space-y-1"><Label>Sort Order</Label><Input type="number" value={item.sort_order} onChange={e => onChange({ ...item, sort_order: parseInt(e.target.value) || 0 })} /></div>
                </div>
              )}
              renderItem={(item) => (
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.tech_stack}</p>
                </div>
              )}
            />
          </TabsContent>

          {/* ── EXPERIENCE ── */}
          <TabsContent value="experience">
            <CrudSection<Experience>
              tableName="experience"
              items={experience}
              reload={loadAll}
              emptyItem={{ company: '', role: '', period: '', description: [], sort_order: experience.length }}
              renderForm={(item, onChange) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Company</Label><Input value={item.company} onChange={e => onChange({ ...item, company: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Role</Label><Input value={item.role} onChange={e => onChange({ ...item, role: e.target.value })} /></div>
                  </div>
                  <div className="space-y-1"><Label>Period</Label><Input value={item.period} onChange={e => onChange({ ...item, period: e.target.value })} placeholder="e.g. October 2025 – Present" /></div>
                  <div className="space-y-1"><Label>Description (one bullet per line)</Label><Textarea value={item.description.join('\n')} onChange={e => onChange({ ...item, description: e.target.value.split('\n') })} className="min-h-[120px]" /></div>
                  <div className="space-y-1"><Label>Sort Order</Label><Input type="number" value={item.sort_order} onChange={e => onChange({ ...item, sort_order: parseInt(e.target.value) || 0 })} /></div>
                </div>
              )}
              renderItem={(item) => (
                <div>
                  <p className="font-medium text-foreground">{item.company}</p>
                  <p className="text-xs text-primary">{item.role}</p>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                </div>
              )}
            />
          </TabsContent>

          {/* ── EDUCATION ── */}
          <TabsContent value="education">
            <CrudSection<Education>
              tableName="education"
              items={education}
              reload={loadAll}
              emptyItem={{ institution: '', degree: '', period: '', details: '', sort_order: education.length }}
              renderForm={(item, onChange) => (
                <div className="space-y-3">
                  <div className="space-y-1"><Label>Institution</Label><Input value={item.institution} onChange={e => onChange({ ...item, institution: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Degree</Label><Input value={item.degree} onChange={e => onChange({ ...item, degree: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Period</Label><Input value={item.period} onChange={e => onChange({ ...item, period: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Details (e.g. CGPA)</Label><Input value={item.details} onChange={e => onChange({ ...item, details: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Sort Order</Label><Input type="number" value={item.sort_order} onChange={e => onChange({ ...item, sort_order: parseInt(e.target.value) || 0 })} /></div>
                </div>
              )}
              renderItem={(item) => (
                <div>
                  <p className="font-medium text-foreground">{item.institution}</p>
                  <p className="text-xs text-primary">{item.degree}</p>
                </div>
              )}
            />
          </TabsContent>

          {/* ── SKILLS ── */}
          <TabsContent value="skills">
            <CrudSection<Skill>
              tableName="skills"
              items={skills}
              reload={loadAll}
              emptyItem={{ category: '', items: [], sort_order: skills.length }}
              renderForm={(item, onChange) => (
                <div className="space-y-3">
                  <div className="space-y-1"><Label>Category</Label><Input value={item.category} onChange={e => onChange({ ...item, category: e.target.value })} placeholder="e.g. AI / ML" /></div>
                  <div className="space-y-1"><Label>Items (comma-separated)</Label><Textarea value={item.items.join(', ')} onChange={e => onChange({ ...item, items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} /></div>
                  <div className="space-y-1"><Label>Sort Order</Label><Input type="number" value={item.sort_order} onChange={e => onChange({ ...item, sort_order: parseInt(e.target.value) || 0 })} /></div>
                </div>
              )}
              renderItem={(item) => (
                <div>
                  <p className="font-medium text-foreground">{item.category}</p>
                  <p className="text-xs text-muted-foreground">{item.items.join(', ')}</p>
                </div>
              )}
            />
          </TabsContent>

          {/* ── CERTIFICATIONS ── */}
          <TabsContent value="certs">
            <CrudSection<Certification>
              tableName="certifications"
              items={certifications}
              reload={loadAll}
              emptyItem={{ title: '', issuer: '', url: '', sort_order: certifications.length }}
              renderForm={(item, onChange) => (
                <div className="space-y-3">
                  <div className="space-y-1"><Label>Title</Label><Input value={item.title} onChange={e => onChange({ ...item, title: e.target.value })} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Issuer</Label><Input value={item.issuer} onChange={e => onChange({ ...item, issuer: e.target.value })} /></div>
                    <div className="space-y-1"><Label>URL</Label><Input value={item.url} onChange={e => onChange({ ...item, url: e.target.value })} /></div>
                  </div>
                  <div className="space-y-1"><Label>Sort Order</Label><Input type="number" value={item.sort_order} onChange={e => onChange({ ...item, sort_order: parseInt(e.target.value) || 0 })} /></div>
                </div>
              )}
              renderItem={(item) => (
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  {item.issuer && <p className="text-xs text-muted-foreground">{item.issuer}</p>}
                </div>
              )}
            />
          </TabsContent>

          {/* ── PROFILE ── */}
          <TabsContent value="profile">
            {profile && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1"><Label>Name</Label><Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Title</Label><Input value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Email</Label><Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Phone</Label><Input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} /></div>
                    <div className="space-y-1"><Label>Location</Label><Input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} /></div>
                    <div className="space-y-1"><Label>LinkedIn</Label><Input value={profile.linkedin} onChange={e => setProfile({ ...profile, linkedin: e.target.value })} /></div>
                    <div className="space-y-1"><Label>GitHub</Label><Input value={profile.github} onChange={e => setProfile({ ...profile, github: e.target.value })} /></div>
                  </div>
                  <div className="space-y-1"><Label>Bio</Label><Textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} /></div>

                  <Separator />

                  {/* Resume upload */}
                  <div className="space-y-3">
                    <Label>Resume PDF</Label>
                    {profile.resume_url && (
                      <p className="text-xs text-muted-foreground">
                        Current: <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{profile.resume_url.split('/').pop()}</a>
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) uploadResume(file)
                        }}
                        className="max-w-xs"
                      />
                      {resumeUploading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>

                  <Button onClick={saveProfile} disabled={profileSaving}>
                    <Save size={14} className="mr-1" />
                    {profileSaving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
