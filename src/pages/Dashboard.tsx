import { useState, useEffect } from 'react'
import { Eye, DollarSign, AlertTriangle, CheckCircle2, Loader2, RefreshCw, TrendingUp, Zap } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatRelativeTime } from '../lib/utils'
import type { SeedAlert } from '../types'

const SEED_ALERTS: SeedAlert[] = [
  { id: '1', platform: 'TikTok', content_url: 'https://tiktok.com', thumbnail_description: 'Unboxing video using your likeness in thumbnail', match_confidence: 97, status: 'pending', estimated_cpm: 4.20, detected_at: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', platform: 'YouTube', content_url: 'https://youtube.com', thumbnail_description: 'Reaction video featuring your face without license', match_confidence: 91, status: 'pending', estimated_cpm: 7.80, detected_at: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', platform: 'Instagram', content_url: 'https://instagram.com', thumbnail_description: 'Brand sponsorship post using your image', match_confidence: 88, status: 'monetized', estimated_cpm: 12.50, detected_at: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', platform: 'X', content_url: 'https://x.com', thumbnail_description: 'Viral meme account using your likeness', match_confidence: 82, status: 'takedown_requested', estimated_cpm: 2.10, detected_at: new Date(Date.now() - 172800000).toISOString() },
  { id: '5', platform: 'TikTok', content_url: 'https://tiktok.com', thumbnail_description: 'Duet video with unauthorized use of your audio', match_confidence: 94, status: 'resolved', estimated_cpm: 5.60, detected_at: new Date(Date.now() - 259200000).toISOString() },
  { id: '6', platform: 'YouTube', content_url: 'https://youtube.com', thumbnail_description: 'Compilation using your clips without credit', match_confidence: 85, status: 'pending', estimated_cpm: 9.30, detected_at: new Date(Date.now() - 345600000).toISOString() }
]

const STATUS_CONFIG = {
  pending: { label: 'Action needed', variant: 'destructive' as const },
  monetized: { label: 'Monetized', variant: 'default' as const },
  takedown_requested: { label: 'Takedown sent', variant: 'secondary' as const },
  resolved: { label: 'Resolved', variant: 'outline' as const }
}

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  YouTube: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Instagram: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  X: 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState<SeedAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actioning, setActioning] = useState<string | null>(null)

  async function fetchAlerts() {
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 600))
      setAlerts(SEED_ALERTS)
      setLoading(false)
      return
    }
    const { data, error: fetchError } = await (supabase.from('weir_alerts').select('*').is('deleted_at', null).order('detected_at', { ascending: false }) as any)
    if (fetchError) {
      setError('Failed to load alerts. Please try again.')
    } else {
      setAlerts((data as SeedAlert[]) ?? [])
    }
    setLoading(false)
  }

  useEffect(() => { fetchAlerts() }, [])

  async function handleAction(alertId: string, newStatus: SeedAlert['status']) {
    setActioning(alertId)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 500))
      setAlerts((prev) => prev.map((a) => a.id === alertId ? { ...a, status: newStatus } : a))
      setActioning(null)
      return
    }
    await (supabase.from('weir_alerts').update({ status: newStatus } as any).eq('id', alertId) as any)
    setAlerts((prev) => prev.map((a) => a.id === alertId ? { ...a, status: newStatus } : a))
    setActioning(null)
  }

  const pending = alerts.filter((a) => a.status === 'pending').length
  const totalEarnings = alerts.filter((a) => a.status === 'monetized').reduce((s, a) => s + a.estimated_cpm, 0)
  const resolved = alerts.filter((a) => a.status === 'resolved').length

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8 pt-24">
        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-medium">
            Viewing sample data — connect your database to go live.
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Detection Dashboard</h1>
          <p className="text-muted-foreground text-sm">Real-time alerts across all monitored platforms</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center"><Eye size={18} className="text-indigo-500" /></div>
                <div><p className="text-2xl font-bold text-foreground">{alerts.length}</p><p className="text-xs text-muted-foreground">Detections</p></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center"><AlertTriangle size={18} className="text-red-500" /></div>
                <div><p className="text-2xl font-bold text-foreground">{pending}</p><p className="text-xs text-muted-foreground">Pending action</p></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center"><DollarSign size={18} className="text-green-500" /></div>
                <div><p className="text-2xl font-bold text-foreground">{formatCurrency(totalEarnings)}</p><p className="text-xs text-muted-foreground">CPM earned</p></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 size={18} className="text-emerald-500" /></div>
                <div><p className="text-2xl font-bold text-foreground">{resolved}</p><p className="text-xs text-muted-foreground">Resolved</p></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Recent Detections</CardTitle>
            <Button variant="ghost" size="sm" onClick={fetchAlerts} className="gap-2 min-h-[44px]" aria-label="Refresh detections">
              <RefreshCw size={14} />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                <span>Loading detections...</span>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <AlertTriangle size={32} className="text-destructive mx-auto mb-3" aria-hidden="true" />
                <p className="text-destructive font-medium mb-4">{error}</p>
                <Button variant="outline" onClick={fetchAlerts} className="min-h-[44px]">Retry</Button>
              </div>
            ) : alerts.length === 0 ? (
              <div className="text-center py-16">
                <TrendingUp size={40} className="text-muted-foreground/40 mx-auto mb-3" aria-hidden="true" />
                <p className="font-medium text-foreground mb-1">No detections yet</p>
                <p className="text-sm text-muted-foreground mb-4">WEIR is monitoring your platforms. Alerts appear here when your likeness is found.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {alerts.map((alert) => (
                  <div key={alert.id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PLATFORM_COLORS[alert.platform] ?? ''}`}>{alert.platform}</span>
                        <Badge variant={STATUS_CONFIG[alert.status].variant} className="text-xs">{STATUS_CONFIG[alert.status].label}</Badge>
                        <span className="text-xs text-muted-foreground">{alert.match_confidence}% match</span>
                      </div>
                      <p className="text-sm text-foreground font-medium truncate">{alert.thumbnail_description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Detected {formatRelativeTime(alert.detected_at)} &middot; Est. CPM {formatCurrency(alert.estimated_cpm)}</p>
                    </div>
                    {alert.status === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white min-h-[44px] gap-1" disabled={actioning === alert.id} onClick={() => handleAction(alert.id, 'monetized')}>
                          {actioning === alert.id ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
                          Monetize
                        </Button>
                        <Button size="sm" variant="outline" className="min-h-[44px]" disabled={actioning === alert.id} onClick={() => handleAction(alert.id, 'takedown_requested')}>
                          Take down
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
