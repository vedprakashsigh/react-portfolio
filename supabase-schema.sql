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
  created_at TIMESTAMPTZ DEFAULT NOW()
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

-- ═══════════════════════════════════════════════════════════
-- Storage: Create an 'uploads' bucket in Supabase Dashboard
-- Dashboard > Storage > New Bucket > Name: "uploads" > Public: ON
-- ═══════════════════════════════════════════════════════════
