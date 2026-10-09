import React from 'react';
import { 
  Check, 
  ArrowRight, 
  Heart 
} from 'lucide-react';

export default function SeniorTreatPricing() {
  const tiers = [
    {
      name: 'Cutting Chai Treat',
      icon: '☕',
      price: '₹15',
      period: 'per concept breakthrough',
      badge: 'IMPULSE GRATITUDE',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Triggered when Sai Anna gives you an "Aha!" moment on a tricky algorithmic problem.',
      features: [
        '1-tap UPI tip (GPay / PhonePe / Paytm)',
        'Zero subscription commitment',
        'Instant single-doubt deep teardown',
        'Celebratory Sai Anna voice shoutout'
      ],
      popular: false,
      ctaText: 'Buy Anna a Chai (UPI)',
      ctaStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
    },
    {
      name: 'Shawarma Treat',
      icon: '🌯',
      price: '₹99',
      period: '/ month',
      badge: 'STRATEGY UNLOCK',
      badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
      description: 'Unlocks Ravi Anna to monitor your preparation streaks and build reverse-engineered company roadmaps.',
      features: [
        'Full Ravi Anna squad access',
        'Amazon, TCS Prime & Cognizant roadmaps',
        'Daily preparation streak accountability',
        '1-Click PDF Revision Cheat Sheets (jspdf)'
      ],
      popular: false,
      ctaText: 'Unlock Ravi Anna',
      ctaStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
    },
    {
      name: 'Biryani Treat',
      icon: '🍗',
      price: '₹249',
      period: '/ month',
      badge: 'MOST POPULAR • FLAGSHIP',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold',
      description: 'Unlocks Kiran Anna for hard DSA breakthroughs, rough-paper mock drives, and edge-case mastery.',
      features: [
        'Full Kiran Anna squad access',
        'Company-specific hard problem sandboxes',
        'Live rough-paper whiteboard mock interviews',
        'Deterministic WebAssembly runtime testing',
        'Everything in Shawarma Treat'
      ],
      popular: true,
      ctaText: 'Unlock Kiran Anna',
      ctaStyle: 'bg-slate-950 hover:bg-slate-800 text-white shadow-md'
    },
    {
      name: 'Grand Mandi Treat',
      icon: '👑',
      price: '₹499',
      period: '/ month',
      badge: 'ALL-ACCESS VIP',
      badgeStyle: 'bg-purple-50 text-purple-800 border-purple-200',
      description: 'Complete Placement Council access: Sai + Ravi + Kiran + Venkat Anna for full-stack interview domination.',
      features: [
        'Complete Placement Council (4 Brothers)',
        'Venkat Anna System Design architecture mocks',
        'GitHub repository & resume project audits',
        'Unlimited timed corporate mock drives',
        'Priority 1-on-1 audio screenshare queue'
      ],
      popular: false,
      ctaText: 'Join Full Council',
      ctaStyle: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
    }
  ];

  return (
    <section id="senior-treat" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800">
            <span>The "Senior Treat" Cultural Model</span>
            <span className="text-amber-300">•</span>
            <span>by The SurfBoard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            No corporate SaaS subscriptions.{' '}
            <span className="text-amber-600">Just "Anna ki Treat".</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            In Indian engineering colleges, you never buy expensive software subscriptions. You buy your senior tea or biryani in exchange for placement secrets. Sai Anna is 100% free forever; advanced brothers unlock when you treat them.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                tier.popular
                  ? 'bg-white border-slate-950 shadow-xl ring-2 ring-slate-950/10 relative -translate-y-2'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-sm'
              }`}
            >
              <div>
                {/* Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tier.icon}</span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${tier.badgeStyle}`}>
                    {tier.badge}
                  </span>
                </div>

                {/* Tier Name */}
                <h3 className="text-lg font-bold text-slate-950">
                  {tier.name}
                </h3>
                
                {/* Price */}
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-mono">
                    {tier.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {tier.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="#waitlist"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${tier.ctaStyle}`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 100% Free Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Sai Anna Free Mentorship Pledge
              </h4>
              <p className="text-xs text-slate-500">
                Core Socratic guidance, daily motivation, and conceptual doubts remain 100% free for every Tier-2/3 student forever.
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Backed by The SurfBoard Community
          </div>
        </div>

      </div>
    </section>
  );
}
