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
import WaitlistModal from './components/WaitlistModal';

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('General Alpha');

  const handleOpenWaitlist = (tier = 'General Alpha') => {
    setSelectedTier(tier);
    setWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white font-sans antialiased">
      {/* Global Navigation with Apple spacing & transparent logo */}
      <Navbar onOpenWaitlist={handleOpenWaitlist} />

      {/* Hero Section */}
      <Hero onOpenWaitlist={handleOpenWaitlist} />

      {/* The Placement Squad (4 Brother Personas) */}
      <CouncilSection onOpenWaitlist={handleOpenWaitlist} />

      {/* Visual Memory Tracing on Rough Paper */}
      <RoughPaperEngine />

      {/* 5-Stage Methodology: Why Students Fail vs S.A.I. Transformation */}
      <SocraticPipeline />

      {/* The "Senior Treat" Cultural Monetization Model */}
      <SeniorTreatPricing onOpenWaitlist={handleOpenWaitlist} />

      {/* Institutional TPO Intelligence */}
      <TpoDashboard onOpenWaitlist={handleOpenWaitlist} />

      {/* Founder Story & Community Trust */}
      <TrustBySurfboard />

      {/* Global Footer */}
      <Footer onOpenWaitlist={handleOpenWaitlist} />

      {/* Interactive Priority Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  );
}
