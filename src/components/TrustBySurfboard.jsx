import React from 'react';
import { Users, ShieldCheck, Heart, Quote } from 'lucide-react';

export default function TrustBySurfboard() {
  return (
    <section id="trust" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header: Clean, No text pill, Focus on WHY */}
        <div className="max-w-3xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Born from 6 years of student DMs,{' '}
            <span className="text-blue-600">not a corporate boardroom.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            While generic AI startups spend heavily on paid advertisements, S.A.I. is shaped directly by 6 years of qualitative engineering mentorship and a 109,000+ strong student community at The SurfBoard.
          </p>
        </div>

        {/* Founder Story Quote Card */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 relative overflow-hidden mb-12 shadow-2xs">
          <div className="max-w-4xl mx-auto space-y-6">
            <Quote className="w-10 h-10 text-slate-300" />
            
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal italic">
              Every single day, hundreds of Tier-2 and Tier-3 engineering students message me expressing the exact same despair: they attend college lectures for four years, memorize syntax, but freeze completely during technical assessments. 
              Generic AI tutors respond with dry text walls that students abandon in three minutes. 
              <br /><br />
              <strong>S.A.I. was not built as an experimental tech demo.</strong> It is born from six years of listening to student struggles, teaching data structures with authentic Telugu-English intuition, and demanding placement excellence.
            </p>

            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-950">Founder & Lead Mentor</h4>
                <p className="text-xs text-slate-500 font-medium">The SurfBoard Community (109K+ Engineers)</p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="font-semibold text-slate-900">The SurfBoard</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-base font-bold text-slate-950">109,000+ Student Trust</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built on six years of organic mentorship across engineering colleges, with thousands of students already placed in top tier tech roles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-base font-bold text-slate-950">Visceral Real-World Pedagogy</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complex computer science abstracted into relatable, middle-class analogies that eliminate cognitive overwhelm for first-generation engineers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-base font-bold text-slate-950">Zero Scam & Zero Hype</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No fake job guarantees, no predatory loans, and no commercial gimmicks. Just relentless preparation and authentic elder-brother guidance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
