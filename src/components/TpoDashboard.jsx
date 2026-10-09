import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck2, 
  Download 
} from 'lucide-react';

export default function TpoDashboard({ onOpenWaitlist }) {
  const [selectedDept, setSelectedDept] = useState('CSE');

  return (
    <section id="tpo" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header: Clean, No text pill, Focus on WHY */}
        <div className="max-w-3xl mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Know which students are at risk{' '}
            <span className="text-blue-600">12 months before hiring season.</span>
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            Colleges spend lakhs on last-minute batch training in final year when it is too late to fix fundamental gaps. S.A.I. gives Training & Placement Officers (TPOs) diagnostic visibility in 4th and 5th semester, turning unplaceable students into top offers.
          </p>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Bar of Enterprise Dashboard */}
          <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                PRI
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Institutional Diagnostic Portal</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.2 rounded-full font-mono">
                    Live Campus Demo
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Department of Computer Science & Engineering</p>
              </div>
            </div>

            {/* Department Filter Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl text-xs">
              {['CSE', 'IT', 'ECE', 'AIML'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Body Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top 3 Diagnostic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: PRI Score */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Placement Readiness Index (PRI)</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-950 font-mono">84.2%</span>
                  <span className="text-xs font-semibold text-emerald-600">+14.8% vs last month</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Tier-1 SDE qualification threshold: 80%
                </p>
              </div>

              {/* Card 2: Early Warning Risk Radar */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center justify-between text-xs text-amber-900 font-semibold mb-2">
                  <span>Early Warning Risk Alert (5th Sem)</span>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-amber-950 font-mono">24 Students</span>
                  <span className="text-xs font-semibold text-amber-700">Identified for Mentorship</span>
                </div>
                <p className="text-[11px] text-amber-800 mt-2">
                  Flagged 12 months ahead: weak in Graph Algorithms & Problem Solving.
                </p>
              </div>

              {/* Card 3: Real Coding Assessments Passed */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Sandboxed Assessments Verified</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-950 font-mono">18,420</span>
                  <span className="text-xs font-semibold text-blue-600">Deterministic Runs</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Evaluated across exhaustive hidden test suites with strict time bounds.
                </p>
              </div>

            </div>

            {/* Middle Section: Topic Mastery Distribution & Target Benchmarks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Topic Mastery */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Topic Mastery Distribution ({selectedDept})
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Real-Time Cohort Data</span>
                </div>

                <div className="space-y-3">
                  {[
                    { topic: 'Arrays, Two Pointers & Sliding Window', score: 92, status: 'Hiring Ready', color: 'bg-emerald-500' },
                    { topic: 'Linked Lists & Binary Search', score: 86, status: 'Hiring Ready', color: 'bg-emerald-500' },
                    { topic: 'Trees & Binary Search Trees', score: 71, status: 'Needs Revision', color: 'bg-blue-500' },
                    { topic: 'Dynamic Programming & Graphs', score: 54, status: 'Intervention Required', color: 'bg-amber-500' },
                    { topic: 'System Design & Real APIs', score: 48, status: 'Critical Gap', color: 'bg-rose-500' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-800">{item.topic}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono">{item.score}%</span>
                          <span className="text-[10px] font-bold text-slate-600">({item.status})</span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.color}`} 
                          style={{ width: `${item.score}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Target Corporate Matching */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
                    Target Corporate Benchmark Matching
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">Amazon SDE-1 Cohort</p>
                        <p className="text-[11px] text-slate-500">Tier-1 Product Engineering</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold font-mono">
                        38 Ready
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">TCS Prime / Digital</p>
                        <p className="text-[11px] text-slate-500">Aptitude + Core DSA</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-bold font-mono">
                        112 Ready
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">Cognizant / Infosys</p>
                        <p className="text-[11px] text-slate-500">Mass Hiring Track</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 font-bold font-mono">
                        184 Ready
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <FileCheck2 className="w-4 h-4 text-slate-400" />
                    NAAC / NBA Format Ready
                  </span>
                  <button 
                    onClick={() => onOpenWaitlist('Institutional PDF Sample Report')}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Request Sample Report
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Institutional CTA Bar */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">
                  Bring S.A.I. Institutional Intelligence to Your Campus
                </h4>
                <p className="text-xs text-slate-400">
                  Annual campus license starting at ₹300/student/year. Fully compliant with AICTE & NEP 2020 mandates.
                </p>
              </div>

              <button
                onClick={() => onOpenWaitlist('Institutional Campus Pilot')}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Schedule Campus Pilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
