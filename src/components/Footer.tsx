import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold text-foreground">WEIR</span>
        <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/login" className="hover:text-foreground transition-colors">Log in</Link>
          <Link to="/signup" className="hover:text-foreground transition-colors">Sign up</Link>
        </nav>
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} WEIR. All rights reserved.</p>
      </div>
    </footer>
  )
}
