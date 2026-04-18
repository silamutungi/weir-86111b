import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Footer from '../components/Footer'

const features = [
  { icon: Eye, title: 'Real-Time Detection', desc: 'Monitor TikTok, Instagram, YouTube, and X simultaneously. Get alerted within minutes, not days.' },
  { icon: Zap, title: 'One-Tap Actions', desc: 'Monetize or remove unlicensed content instantly. No manual DMCA filing, no legal paperwork.' },
  { icon: DollarSign, title: 'Earnings Dashboard', desc: 'Track CPM, licensing revenue, and payment history across every platform in one view.' },
  { icon: FileCheck, title: 'Licensing Templates', desc: 'Customizable license offers sent automatically when your likeness is detected.' },
  { icon: BarChart3, title: 'Growth Analytics', desc: 'Understand where your likeness drives audience growth and quantify every lost opportunity.' },
  { icon: Shield, title: 'Privacy-First', desc: 'Zero biometric data stored. No government ID required. You control your identity data.' }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-white">WEIR</span>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-white/80 hover:text-white transition-colors">Pricing</Link>
            <Link to="/login" className="text-sm text-white/80 hover:text-white transition-colors">Log in</Link>
            <Link to="/signup">
              <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">Start free</Button>
            </Link>
          </nav>
          <div className="md:hidden flex gap-3">
            <Link to="/login" className="text-sm text-white/80 hover:text-white transition-colors">Log in</Link>
            <Link to="/signup">
              <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">Start free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1594501251795-a3147759d741?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMGF0JTIwYSUyMG1vZGVybiUyMGRlc2slMkMlMjBtb25pdG9yaW5nJTIwbXVsdGlwbGUlMjBnbHxlbnwwfDB8fHwxNzc2NTM0OTIyfDA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(15,23,42,0.65) 100%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
          <Badge className="mb-6 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">AI-Powered Identity Protection</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl mb-6" style={{ letterSpacing: '0.012em' }}>
            Stop losing money every time someone uses your face online.
          </h1>
          <p className="text-lg text-white/75 max-w-xl mb-10 leading-relaxed">
            WEIR detects unauthorized uses of your name, image, and likeness across 4 platforms in real time — then helps you monetize or remove them in one tap.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white min-h-[48px] px-8 font-semibold">Start free — no credit card</Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-gray-900/10 min-h-[48px] px-8">See pricing</Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/50">Free plan monitors 1 platform. Upgrade anytime.</p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">Everything you need to own your identity online</h2>
          <p className="text-muted-foreground mb-16 max-w-xl">Six tools that work together so you never miss an unauthorized use — and never leave licensing money on the table.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border border-border rounded-xl p-6 bg-card hover:border-indigo-500/50 transition-all duration-200 hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-indigo-500" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start protecting your likeness today</h2>
          <p className="text-muted-foreground mb-8">Join creators who stopped leaving licensing revenue on the table.</p>
          <Link to="/signup">
            <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white min-h-[48px] px-10 font-semibold">Get your dashboard</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
