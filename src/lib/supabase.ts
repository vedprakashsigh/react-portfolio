import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Types ──────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string
  image_url: string
  project_url: string
  sort_order: number
  created_at: string
  is_featured: boolean
  why_i_built: string
  key_challenges: string[]
  architecture_decisions: string[]
  architecture_diagram_type: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string[]
  sort_order: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  details: string
  sort_order: number
}

export interface Skill {
  id: string
  category: string
  items: string[]
  sort_order: number
}

export interface Certification {
  id: string
  title: string
  issuer: string
  url: string
  sort_order: number
}

export interface Profile {
  id: number
  name: string
  title: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  bio: string
  resume_url: string
}

// ─── Data Fetchers ──────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data || []
}

export async function getExperience(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Error fetching experience:', error)
    return []
  }
  return data || []
}

export async function getEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Error fetching education:', error)
    return []
  }
  return data || []
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Error fetching skills:', error)
    return []
  }
  return data || []
}

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
  return data || []
}

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  return data
}
