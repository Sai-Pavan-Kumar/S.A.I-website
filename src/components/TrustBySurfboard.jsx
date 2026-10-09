import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Award
} from 'lucide-react';

export default function TrustBySurfboard() {
  return (
    <section id="trust" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Parent Studio Ecosystem</span>
            <span className="text-slate-300">•</span>
            <span>The SurfBoard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Born from 6 years of student DMs,{' '}
            <span className="text-blue-600">not a corporate boardroom.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            While AI startups burn millions on paid ads, S.A.I. launches on Day 0 backed by The SurfBoard's 109,000+ engineer community and direct ground-level placement insights.
          </p>
        </div>

        {/* Founder Story Quote Card */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 relative overflow-hidden mb-12 shadow-2xs">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-4xl font-serif text-slate-300">“</div>
            
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal italic">
              Every single day, hundreds of Tier-2 and Tier-3 engineering students DM me expressing the exact same despair: they attend college lectures for four years, memorize outdated syntaxes, but cannot clear a single technical assessment. 
              Generic AI tutors respond with cold walls of text that students abandon in three minutes. 
              <br /><br />
              <strong>S.A.I. was not built as an experimental tech demo.</strong> It is born from six years of listening to student struggles, teaching data structures with authentic Telugu-English analogies, and demanding pedagogical excellence.
            </p>

            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-950">Founder & Lead Architect</h4>
                <p className="text-xs text-slate-500 font-medium">The SurfBoard Studio (109K+ Community)</p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="font-semibold">The SurfBoard LLP</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Strategic Moats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-base font-bold text-slate-950">Zero-CAC Distribution</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant organic beta cohort of 500+ engineers from The SurfBoard community. Zero rupees spent on Meta or Google advertisements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-base font-bold text-slate-950">The "Second Creation" Pedagogy</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complex computer science abstracted into visceral real-world analogies (Load Balancers as Traffic Police, Docker as Lunchboxes).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-base font-bold text-slate-950">Absolute Brand Trust</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Six years of zero scam giveaways or fake hype ads gives SAI authentic elder-brother credibility from Day 0 across engineering campuses.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
