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

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  published_at: string
  created_at: string
  is_published: boolean
  read_time_minutes: number
}

export interface BlogComment {
  id: string
  blog_id: string
  name: string
  message: string
  is_approved: boolean
  created_at: string
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

// ─── Blog Functions ───────────────────────────────────────

export async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
  return data || []
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (error) {
    console.error('Error fetching blog:', error)
    return null
  }
  return data
}

export async function getBlogLikes(blogId: string): Promise<number> {
  const { count, error } = await supabase
    .from('blog_likes')
    .select('*', { count: 'exact', head: true })
    .eq('blog_id', blogId)
  if (error) {
    console.error('Error fetching likes:', error)
    return 0
  }
  return count || 0
}

export async function hasUserLiked(blogId: string, sessionId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('blog_likes')
    .select('*')
    .eq('blog_id', blogId)
    .eq('session_id', sessionId)
    .single()
  if (error) return false
  return !!data
}

export async function toggleLike(blogId: string, sessionId: string): Promise<{ liked: boolean; totalLikes: number }> {
  // Check if already liked
  const existing = await hasUserLiked(blogId, sessionId)

  if (existing) {
    // Unlike
    await supabase.from('blog_likes').delete().eq('blog_id', blogId).eq('session_id', sessionId)
    const total = await getBlogLikes(blogId)
    return { liked: false, totalLikes: total }
  } else {
    // Like
    await supabase.from('blog_likes').insert({ blog_id: blogId, session_id: sessionId })
    const total = await getBlogLikes(blogId)
    return { liked: true, totalLikes: total }
  }
}

export async function getBlogComments(blogId: string): Promise<BlogComment[]> {
  const { data, error } = await supabase
    .from('blog_comments')
    .select('*')
    .eq('blog_id', blogId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }
  return data || []
}

export async function addBlogComment(blogId: string, name: string, message: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_comments')
    .insert({ blog_id: blogId, name, message })
  if (error) {
    console.error('Error adding comment:', error)
    return false
  }
  return true
}

// ─── Blog Admin Functions ─────────────────────────────────────

export async function getAllBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false })
  if (error) {
    console.error('Error fetching all blogs:', error)
    return []
  }
  return data || []
}

export async function saveBlog(blog: Partial<Blog>): Promise<boolean> {
  const { error } = await supabase
    .from('blogs')
    .upsert(blog)
  if (error) {
    console.error('Error saving blog:', error)
    return false
  }
  return true
}

export async function deleteBlog(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)
  if (error) {
    console.error('Error deleting blog:', error)
    return false
  }
  return true
}

export async function uploadBlogImage(file: File): Promise<string | null> {
  const fileName = `blogs/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName)

  return publicUrl
}
