import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenWaitlist }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand with Transparent Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/Sai-logo-transparent.webp" 
            alt="S.A.I." 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-slate-950 leading-none">
              S.A.I.
            </span>
            <span className="text-[11px] font-medium tracking-tight text-slate-500 mt-1">
              by <span className="font-semibold text-slate-900">The SurfBoard</span>
            </span>
          </div>
        </a>

        {/* Clean, Airy Center Navigation (Apple Style) */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-600">
          <a href="#council" className="hover:text-slate-950 transition-colors">Mentorship</a>
          <a href="#rough-paper" className="hover:text-slate-950 transition-colors">Visual Trace</a>
          <a href="#pedagogy" className="hover:text-slate-950 transition-colors">Pedagogy</a>
          <a href="#senior-treat" className="hover:text-slate-950 transition-colors">Treats</a>
          <a href="#tpo" className="hover:text-slate-950 transition-colors">Institutions</a>
        </nav>

        {/* Right Action: Clean Apple-grade Button */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onOpenWaitlist('General Alpha')}
            className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={() => onOpenWaitlist('Mobile Alpha')}
            className="px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-semibold cursor-pointer"
          >
            Join
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-950 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-5 space-y-4 text-sm font-medium text-slate-700">
          <a 
            href="#council" 
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-slate-950"
          >
            Mentorship Squad
          </a>
          <a 
            href="#rough-paper" 
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-slate-950"
          >
            Visual Trace
          </a>
          <a 
            href="#pedagogy" 
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-slate-950"
          >
            Pedagogy
          </a>
          <a 
            href="#senior-treat" 
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-slate-950"
          >
            Senior Treat Pricing
          </a>
          <a 
            href="#tpo" 
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-slate-950"
          >
            For Colleges & TPOs
          </a>
        </div>
      )}
    </header>
  );
}
