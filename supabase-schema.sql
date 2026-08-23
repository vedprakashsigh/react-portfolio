-- ═══════════════════════════════════════════════════════════
-- Ved Prakash Portfolio — Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com/dashboard)
-- ═══════════════════════════════════════════════════════════

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT,
  image_url TEXT DEFAULT '',
  project_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT false,
  why_i_built TEXT DEFAULT '',
  key_challenges TEXT[] DEFAULT '{}',
  architecture_decisions TEXT[] DEFAULT '{}',
  architecture_diagram_type TEXT DEFAULT ''
);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT,
  description TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT,
  period TEXT,
  details TEXT DEFAULT '',
  sort_order INT DEFAULT 0
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  items TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort_order INT DEFAULT 0
);

-- Profile (singleton)
CREATE TABLE IF NOT EXISTS profile (
  id INT DEFAULT 1 PRIMARY KEY CHECK (id = 1),
  name TEXT DEFAULT 'Ved Prakash',
  title TEXT DEFAULT 'Agentic AI Engineer',
  location TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  github TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  resume_url TEXT DEFAULT ''
);

-- ═══════════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════════

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Public read (anyone can view portfolio data)
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read profile" ON profile FOR SELECT USING (true);

-- Authenticated write (only logged-in users can modify)
CREATE POLICY "Auth insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert experience" ON experience FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update experience" ON experience FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete experience" ON experience FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert education" ON education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update education" ON education FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete education" ON education FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update skills" ON skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete skills" ON skills FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert certifications" ON certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update certifications" ON certifications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete certifications" ON certifications FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert profile" ON profile FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update profile" ON profile FOR UPDATE TO authenticated USING (true);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT NOT NULL,
  cover_image TEXT DEFAULT '',
  author TEXT DEFAULT 'Ved Prakash',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  read_time_minutes INT DEFAULT 5
);

-- Blog likes (anonymous, one per blog per session)
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blog_id, session_id)
);

-- Blog comments (anonymous, unique name per blog)
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blog_id, name)
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public read blog_likes" ON blog_likes FOR SELECT USING (true);
CREATE POLICY "Public read blog_comments" ON blog_comments FOR SELECT USING (is_approved = true);

-- Public insert (likes and comments)
CREATE POLICY "Public insert blog_likes" ON blog_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert blog_comments" ON blog_comments FOR INSERT WITH CHECK (true);

-- Authenticated write (only logged-in users can modify blogs)
CREATE POLICY "Auth insert blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update blogs" ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete blogs" ON blogs FOR DELETE TO authenticated USING (true);

-- Authenticated can approve/delete comments
CREATE POLICY "Auth update blog_comments" ON blog_comments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete blog_comments" ON blog_comments FOR DELETE TO authenticated USING (true);

-- ═══════════════════════════════════════════════════════════
-- Storage: Create an 'uploads' bucket in Supabase Dashboard
-- Dashboard > Storage > New Bucket > Name: "uploads" > Public: ON
-- ═══════════════════════════════════════════════════════════

-- Storage policies for 'uploads' bucket
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'uploads');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update own files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'uploads' AND auth.uid() = owner);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete own files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'uploads' AND auth.uid() = owner);

-- Allow public read access to uploaded files
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'uploads');
