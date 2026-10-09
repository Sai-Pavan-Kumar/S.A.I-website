import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ activeMode, setActiveMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Studio Tag */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/Sai-logo-black.webp" 
              alt="S.A.I." 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 leading-none">
                S.A.I.
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                Senior Artificial Intelligence
              </span>
            </div>
          </a>

          {/* by The SurfBoard Badge */}
          <a 
            href="#trust"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-[11px] font-medium text-slate-700 transition-colors"
          >
            <span className="text-slate-400">by</span>
            <span className="font-semibold text-slate-900">The SurfBoard</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          </a>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-slate-600">
          <a href="#council" className="hover:text-slate-900 transition-colors">The Placement Council</a>
          <a href="#rough-paper" className="hover:text-slate-900 transition-colors">Visual Trace</a>
          <a href="#pedagogy" className="hover:text-slate-900 transition-colors">5-Stage Gating</a>
          <a href="#senior-treat" className="hover:text-slate-900 transition-colors">Senior Treat</a>
          <a href="#tpo" className="hover:text-slate-900 transition-colors">Institutional TPO</a>
        </nav>

        {/* Right Action: Dual Mode Toggle & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Audience Switcher */}
          <div className="p-0.5 bg-slate-100 border border-slate-200/90 rounded-full flex text-xs font-medium">
            <button
              onClick={() => setActiveMode('student')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeMode === 'student'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sai Anna (B2C)
            </button>
            <button
              onClick={() => setActiveMode('institutional')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeMode === 'institutional'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Colleges (B2B)
            </button>
          </div>

          <a 
            href="#waitlist"
            className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Join Alpha</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a 
            href="#waitlist"
            className="px-3 py-1.5 rounded-full bg-slate-950 text-white text-xs font-semibold"
          >
            Join
          </a>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 text-sm font-medium text-slate-700">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Parent Ecosystem:</span>
            <span className="text-xs font-bold text-slate-900">by The SurfBoard</span>
          </div>
          <a 
            href="#council" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-slate-900"
          >
            The Placement Council
          </a>
          <a 
            href="#rough-paper" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-slate-900"
          >
            Visual Trace Whiteboard
          </a>
          <a 
            href="#pedagogy" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-slate-900"
          >
            5-Stage Socratic Gating
          </a>
          <a 
            href="#senior-treat" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-slate-900"
          >
            Senior Treat Pricing
          </a>
          <a 
            href="#tpo" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-slate-900"
          >
            Institutional TPO Portal
          </a>
          <a 
            href="#trust" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-slate-900"
          >
            Founder Moat (109K+ Community)
          </a>
        </div>
      )}
    </header>
  );
}
