import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CouncilSection from './components/CouncilSection';
import RoughPaperEngine from './components/RoughPaperEngine';
import SocraticPipeline from './components/SocraticPipeline';
import SeniorTreatPricing from './components/SeniorTreatPricing';
import TpoDashboard from './components/TpoDashboard';
import TrustBySurfboard from './components/TrustBySurfboard';
import Footer from './components/Footer';

export default function App() {
  const [activeMode, setActiveMode] = useState('student');

  const handleModeSwitch = (mode) => {
    setActiveMode(mode);
    if (mode === 'institutional') {
      const el = document.getElementById('tpo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('council');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased">
      {/* Global Navigation */}
      <Navbar activeMode={activeMode} setActiveMode={handleModeSwitch} />

      {/* Hero Section */}
      <Hero activeMode={activeMode} />

      {/* Section 1: The Placement Council (Brother Personas) */}
      <CouncilSection />

      {/* Section 2: Visual Pedagogy (Rough Paper Whiteboard Trace) */}
      <RoughPaperEngine />

      {/* Section 3: 5-Stage Socratic Gating Architecture */}
      <SocraticPipeline />

      {/* Section 4: The "Senior Treat" Cultural Monetization Model */}
      <SeniorTreatPricing />

      {/* Section 5: Institutional TPO Intelligence (B2B S.A.I.) */}
      <TpoDashboard />

      {/* Section 6: Founder Story & Unfair Moats by The SurfBoard */}
      <TrustBySurfboard />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
