import React from 'react';
import { Check, ArrowRight, Heart } from 'lucide-react';

export default function SeniorTreatPricing({ onOpenWaitlist }) {
  const tiers = [
    {
      name: 'Cutting Chai Treat',
      icon: '☕',
      price: '₹15',
      period: 'per breakthrough',
      badge: 'CONCEPT BREAKTHROUGH',
      badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'A quick gesture of gratitude when Sai Anna simplifies a tricky algorithmic concept.',
      features: [
        '1-tap UPI tip (GPay / PhonePe / Paytm)',
        'Zero subscription commitments',
        'Single-doubt conceptual teardown',
        'Direct elder-brother voice response'
      ],
      ctaText: 'Buy Anna a Chai'
    },
    {
      name: 'Shawarma Treat',
      icon: '🌯',
      price: '₹99',
      period: '/ month',
      badge: 'ROADMAP & ACCOUNTABILITY',
      badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
      description: 'Brings Ravi Anna into your WhatsApp to build company-specific roadmaps and audit your daily consistency.',
      features: [
        'Full Ravi Anna squad access',
        'Target-company hiring roadmaps (Amazon, TCS Prime)',
        'Daily preparation streak tracking',
        '1-Click PDF Revision Cheat Sheets'
      ],
      ctaText: 'Join Shawarma Waitlist'
    },
    {
      name: 'Biryani Treat',
      icon: '🍗',
      price: '₹249',
      period: '/ month',
      badge: 'CORE DSA & HARD PROBLEMS',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'Brings Kiran Anna into your WhatsApp for company-specific hard problem sandboxes and mock coding rounds.',
      features: [
        'Full Kiran Anna squad access',
        'Company-specific hard problem sandboxes',
        'Whiteboard dry-run mock interviews',
        'Rigorous edge-case discovery rounds',
        'Everything in Shawarma Treat'
      ],
      ctaText: 'Join Biryani Waitlist'
    },
    {
      name: 'Grand Mandi Treat',
      icon: '👑',
      price: '₹499',
      period: '/ month',
      badge: 'FULL COUNCIL ACCESS',
      badgeStyle: 'bg-purple-50 text-purple-800 border-purple-200',
      description: 'Complete Placement Council access: Sai + Ravi + Kiran + Venkat Anna for full-stack interview domination.',
      features: [
        'Complete Placement Council (4 Brothers)',
        'Venkat Anna System Design architecture mocks',
        'GitHub repository & resume project audits',
        'Unlimited timed corporate mock drives',
        'Priority 1-on-1 audio screenshare queue'
      ],
      ctaText: 'Join Full Squad Waitlist'
    }
  ];

  return (
    <section id="senior-treat" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header: Clean, No text pill, Focus on WHY */}
        <div className="max-w-3xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            No corporate SaaS subscriptions.{' '}
            <span className="text-amber-600">Just "Anna ki Treat".</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            In Indian engineering colleges, you never buy expensive software subscriptions. You buy your senior tea or biryani in exchange for placement secrets. Sai Anna is 100% free forever; advanced seniors unlock when you treat them.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-slate-400 bg-white shadow-2xs hover:shadow-md flex flex-col justify-between transition-all"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tier.icon}</span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${tier.badgeStyle}`}>
                    {tier.badge}
                  </span>
                </div>

                {/* Name */}
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

                {/* Features */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Opens the Waitlist Modal with this tier pre-selected */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenWaitlist(`${tier.name} (${tier.price})`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-slate-950 hover:bg-slate-800 text-white shadow-xs"
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
                Core conceptual intuition, daily motivation, and syllabus guidance remain 100% free for every student forever.
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
