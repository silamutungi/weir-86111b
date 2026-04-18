import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (!isSupabaseConfigured) {
      setLoading(false)
      navigate('/dashboard')
      return
    }
    const { error: authError } = await (supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } }) as any)
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Check your email</h2>
          <p className="text-muted-foreground text-sm">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Link to="/login" className="mt-6 inline-block text-indigo-500 hover:underline text-sm font-medium">Back to log in</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center mb-8">
          <span className="text-2xl font-bold text-foreground tracking-tight">WEIR</span>
        </Link>
        <div className="border border-border rounded-xl p-8 bg-card">
          <h1 className="text-xl font-semibold text-foreground mb-2">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-6">Free plan — no credit card required</p>
          {error && (
            <div role="alert" className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2">
              <AlertCircle size={16} aria-hidden="true" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Creator name</Label>
              <Input id="displayName" type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name or handle" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" />
            </div>
            <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white min-h-[44px] font-semibold" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" /> : null}
              {loading ? 'Creating account...' : 'Start free'}
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}