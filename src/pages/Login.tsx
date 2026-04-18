import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (!isSupabaseConfigured) {
      setLoading(false)
      navigate('/dashboard')
      return
    }
    const { error: authError } = await (supabase.auth.signInWithPassword({ email, password }) as any)
    setLoading(false)
    if (authError) {
      setError('Incorrect email or password. Please try again.')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center mb-8">
          <span className="text-2xl font-bold text-foreground tracking-tight">WEIR</span>
        </Link>
        <div className="border border-border rounded-xl p-8 bg-card">
          <h1 className="text-xl font-semibold text-foreground mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-6">Log in to your WEIR account</p>
          {!isSupabaseConfigured && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm">
              Demo mode — any credentials will work.
            </div>
          )}
          {error && (
            <div role="alert" className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2">
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white min-h-[44px] font-semibold" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" /> : null}
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            No account?{' '}
            <Link to="/signup" className="text-indigo-500 hover:underline font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}