import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import {
  Home, User, FolderKanban, FileText, Mail,
  Linkedin, Github, ExternalLink, Menu, X, Download,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Footer from './Footer'

const navItems = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/about/', icon: User, label: 'About' },
  { to: '/projects/', icon: FolderKanban, label: 'Projects' },
  { to: '/blog/', icon: BookOpen, label: 'Blog' },
  { to: '/resume/', icon: FileText, label: 'Resume' },
  { to: '/contact/', icon: Mail, label: 'Contact' }
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/vedprakashsigh', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.github.com/vedprakashsigh', icon: Github, label: 'GitHub' },
  { href: 'mailto:hi@vedprakash.me', icon: Mail, label: 'Email' }
]

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[90px] flex-col items-center py-6 z-50 glass-strong border-r border-white/[0.06]">
        {/* Logo */}
        <Link to="/" className="mb-8 group" id="sidebar-logo">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
            VP
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 flex flex-col items-center gap-2" id="sidebar-nav">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive, isPending }) => cn(
                "flex w-items-center justify-center gap-3 text-sm font-medium rounded-lg px-3 py-2 text-white/[0.6] hover:bg-white/10 hover:text-white transition-colors duration-200",
                isActive && "bg-white/20 text-white"
              )}
              aria-current="page"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:block">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mt-6 p-2 rounded-lg text-white/[0.6] hover:text-white hover:bg-white/10 transition-colors duration-200"
          aria-label="Open mobile menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <aside className="lg:hidden fixed inset-0 z-40 flex flex-col items-center py-8 bg-background/50 backdrop-blur-sm" aria-hidden={!mobileOpen}>
        <div className="w-full max-w-xs">
          {/* Logo */}
          <Link to="/" className="mb-6 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
              VP
            </div>
          </Link>

          {/* Nav */}
          <nav className="space-y-2">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive, isPending }) => cn(
                  "flex w-full items-center justify-center gap-3 text-sm font-medium rounded-lg px-4 py-3 text-white/[0.6] hover:bg-white/10 hover:text-white transition-colors duration-200",
                  isActive && "bg-white/20 text-white"
                )}
                aria-current="page"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar />
      <main className="lg:ml-[90px] flex-1 pt-16 lg:pt-0" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}