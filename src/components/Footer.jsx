import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const currentYear = 2026;

export default function Footer({ onOpenWaitlist }) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/90 py-16 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          
          {/* Brand Info with Transparent Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/Sai-logo-transparent.webp" 
                alt="S.A.I." 
                className="h-9 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-slate-950 text-sm">S.A.I.</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  Senior Artificial Intelligence
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Real-world engineering guidance from your digital senior brother. Helping Tier-2 and Tier-3 engineering candidates clear high-stakes tech placement drives.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] text-slate-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>A Subsidiary Product of <strong className="text-slate-900 font-bold">The SurfBoard</strong></span>
            </div>
          </div>

          {/* Column 1: Pedagogy */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
              Mentorship
            </h4>
            <ul className="space-y-2">
              <li><a href="#council" className="hover:text-slate-950 transition-colors">The Placement Squad</a></li>
              <li><a href="#rough-paper" className="hover:text-slate-950 transition-colors">Visual Dry Run</a></li>
              <li><a href="#pedagogy" className="hover:text-slate-950 transition-colors">5-Stage Methodology</a></li>
              <li><a href="#senior-treat" className="hover:text-slate-950 transition-colors">Treat Tiers</a></li>
            </ul>
          </div>

          {/* Column 2: Enterprise */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
              Institutions
            </h4>
            <ul className="space-y-2">
              <li><a href="#tpo" className="hover:text-slate-950 transition-colors">TPO Diagnostics</a></li>
              <li><a href="#tpo" className="hover:text-slate-950 transition-colors">Early Warning Radar</a></li>
              <li>
                <button 
                  onClick={() => onOpenWaitlist('Institutional Campus Pilot')}
                  className="hover:text-slate-950 transition-colors text-left cursor-pointer"
                >
                  Schedule Campus Pilot
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The SurfBoard Studio */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
              The SurfBoard
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#trust" className="hover:text-slate-950 transition-colors flex items-center gap-1">
                  <span>Parent Studio (The SurfBoard)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">109K+ Engineer Community</span>
              </li>
              <li>
                <span className="text-slate-500">Single Sign-On (auth.thesurfboard.in)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {currentYear} S.A.I. · Conceived and engineered by The SurfBoard. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Student Privacy First</span>
            <span>Zero Data Leakage</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
