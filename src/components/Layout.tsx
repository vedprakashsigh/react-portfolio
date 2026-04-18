import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import {
  Home, User, FolderKanban, FileText, Mail,
  Linkedin, Github, ExternalLink, Menu, X, Download
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/about', icon: User, label: 'About' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/resume', icon: FileText, label: 'Resume' },
  { to: '/contact', icon: Mail, label: 'Contact' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/vedprakashsigh', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.github.com/vedprakashsigh', icon: Github, label: 'GitHub' },
  { href: 'mailto:hi@vedprakash.me', icon: Mail, label: 'Email' },
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
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group',
                  isActive
                    ? 'bg-primary/15 text-primary glow-cyan'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className="absolute left-full ml-3 px-2 py-1 text-xs font-medium bg-card border border-border rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex flex-col items-center gap-3 mt-auto" id="sidebar-socials">
          <Separator className="w-8 mb-2" />
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-strong z-50 flex items-center justify-between px-4 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
            VP
          </div>
          <span className="font-semibold text-sm text-foreground">Ved Prakash</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground"
          id="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6" id="mobile-nav">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )
                }
              >
                <Icon size={20} />
                <span className="text-base font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>
          <Separator className="my-6" />
          <div className="flex gap-4 px-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-[90px] min-h-screen pt-16 lg:pt-0" id="main-content">
        <Outlet />
      </main>
    </div>
  )
}
