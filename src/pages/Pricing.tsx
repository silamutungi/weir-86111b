import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started protecting your identity on one platform.',
    features: ['1 platform monitored', 'Up to 10 alerts/month', 'Manual action requests', 'Basic detection (80%+ confidence)'],
    cta: 'Start free',
    href: '/signup',
    highlight: false
  },
  {
    name: 'Creator',
    price: 29,
    description: 'Full cross-platform monitoring with automated actions.',
    features: ['4 platforms monitored', 'Unlimited alerts', 'One-tap monetize & takedown', 'Custom licensing templates', 'CPM earnings dashboard', 'Priority detection (90%+ confidence)'],
    cta: 'Start Creator plan',
    href: '/signup',
    highlight: true
  },
  {
    name: 'Pro',
    price: 99,
    description: 'Enterprise-grade protection for high-volume creators.',
    features: ['All Creator features', 'API access', 'White-label licensing', 'Legal escalation support', 'Dedicated account manager', 'SLA-backed detection (<15 min)'],
    cta: 'Start Pro plan',
    href: '/signup',
    highlight: false
  }
]

const FAQ = [
  { q: 'How does WEIR detect my likeness?', a: 'WEIR uses AI models trained on publicly available content signals — no biometric data, no government ID, no face scans stored. You upload reference content and we match against it.' },
  { q: 'What happens when a violation is found?', a: 'You get an instant alert with match confidence, estimated CPM value, and one-tap options to send a license offer or DMCA takedown notice.' },
  { q: 'When do I get paid for monetized content?', a: 'Licensing payments are processed monthly. Earnings appear in your dashboard within 48 hours of a creator accepting your license offer.' },
  { q: 'Can I cancel anytime?', a: 'Yes. No contracts. Cancel from Settings and your plan downgrades to Free at the next billing date.' }
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <h1 className="text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h1>
              <p className="text-muted-foreground max-w-md mx-auto">Start free. Upgrade when you need more platforms or automation. Cancel anytime.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {PLANS.map((plan) => (
                <Card key={plan.name} className={`relative flex flex-col ${plan.highlight ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full">Most popular</div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-base">{plan.name}</CardTitle>
                    <div className="flex items-end gap-1 mt-2">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground mb-1">/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link to={plan.href}>
                      <Button className={`w-full min-h-[44px] font-semibold ${plan.highlight ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : ''}`} variant={plan.highlight ? 'default' : 'outline'}>
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-border">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-foreground mb-10 text-center">Frequently asked questions</h2>
            <div className="space-y-6">
              {FAQ.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
