import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/settings', label: 'Settings' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function handleLogout() {
    if (isSupabaseConfigured) {
      await (supabase.auth.signOut() as any)
    }
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-foreground tracking-tight">WEIR</Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                location.pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2 gap-2 min-h-[44px] text-muted-foreground" aria-label="Log out">
            <LogOut size={16} aria-hidden="true" />
            Log out
          </Button>
        </nav>
        <button
          className="md:hidden p-2 rounded-md text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 space-y-1 animate-fade-in">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground">
            <Settings size={16} aria-hidden="true" />Settings
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 w-full rounded-md text-sm text-muted-foreground hover:text-foreground">
            <LogOut size={16} aria-hidden="true" />Log out
          </button>
        </div>
      )}
    </header>
  )
}
