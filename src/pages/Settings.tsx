import { useState, useEffect, type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const PLATFORMS = ['TikTok', 'Instagram', 'YouTube', 'X']

export default function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [creatorHandle, setCreatorHandle] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['TikTok', 'YouTube'])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      if (!isSupabaseConfigured) {
        setDisplayName('Demo Creator')
        setCreatorHandle('@democreator')
        setLoading(false)
        return
      }
      const { data: { session } } = await (supabase.auth.getSession() as any)
      if (!session) { setLoading(false); return }
      const { data } = await (supabase.from('weir_profiles').select('*').eq('user_id', session.user.id).single() as any)
      if (data) {
        setDisplayName(data.display_name ?? '')
        setCreatorHandle(data.creator_handle ?? '')
        setSelectedPlatforms(data.monitored_platforms ?? ['TikTok', 'YouTube'])
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  function togglePlatform(p: string) {
    setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])
  }

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 500))
      setSaving(false)
      setSuccess(true)
      return
    }
    const { data: { session } } = await (supabase.auth.getSession() as any)
    if (!session) { setSaving(false); setError('Not authenticated.'); return }
    const { error: upsertError } = await (supabase.from('weir_profiles').upsert({ user_id: session.user.id, display_name: displayName, creator_handle: creatorHandle, monitored_platforms: selectedPlatforms } as any) as any)
    setSaving(false)
    if (upsertError) {
      setError('Failed to save settings. Please try again.')
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-8 pt-24">
        <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>
        {loading ? (
          <div className="flex items-center gap-3 text-muted-foreground py-16 justify-center">
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            Loading your profile...
          </div>
        ) : (
          <>
            <form onSubmit={handleSave}>
              <Card className="mb-6">
                <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div role="alert" className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle size={16} aria-hidden="true" />{error}
                    </div>
                  )}
                  {success && (
                    <div role="status" className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-sm flex items-center gap-2">
                      <CheckCircle2 size={16} aria-hidden="true" />Settings saved successfully.
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label htmlFor="displayName">Display name</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your creator name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="handle">Creator handle</Label>
                    <Input id="handle" value={creatorHandle} onChange={(e) => setCreatorHandle(e.target.value)} placeholder="@yourhandle" />
                  </div>
                  <div className="space-y-2">
                    <Label>Monitored platforms</Label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => togglePlatform(p)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all min-h-[44px] ${selectedPlatforms.includes(p) ? 'bg-indigo-500 text-white border-indigo-500' : 'border-border text-muted-foreground hover:border-indigo-400'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white min-h-[44px] font-semibold" disabled={saving}>
                    {saving ? <Loader2 size={16} className="animate-spin mr-2" aria-hidden="true" /> : null}
                    {saving ? 'Saving...' : 'Save settings'}
                  </Button>
                </CardContent>
              </Card>
            </form>
            <Card className="border-destructive/40">
              <CardHeader><CardTitle className="text-base text-destructive">Danger zone</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Deleting your account is permanent and cannot be undone. All detections and earnings data will be removed.</p>
                <Button variant="destructive" className="gap-2 min-h-[44px]" type="button">
                  <Trash2 size={16} aria-hidden="true" />
                  Delete account
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}