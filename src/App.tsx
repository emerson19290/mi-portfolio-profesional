import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeaderSection } from './components/HeaderSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechSection } from './components/TechSection';
import { DocsSection } from './components/DocsSection';
import { PublishGuideModal } from './components/PublishGuideModal';
import { Check, ArrowUp } from 'lucide-react';

export default function App() {
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle share action
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Portafolio Académico DAW - ${portfolioData.personalInfo.name}`,
      text: `Portafolio de proyectos y prácticas de Desarrollo de Aplicaciones Web (DAW) de ${portfolioData.personalInfo.name}`,
      url: url
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setToastMessage('¡Enlace directo copiado al portapapeles!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (e) {
      setToastMessage('URL lista para compartir');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#37352F] flex flex-col font-sans">
      {/* Notion Top Navigation Bar */}
      <Navbar
        studentName={portfolioData.personalInfo.name}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        onShare={handleShare}
      />

      {/* Main Notion Document Page Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-5 pb-16">
        {/* Header with Notion Cover, Icon, Title and Properties */}
        <HeaderSection info={portfolioData.personalInfo} />

        {/* Sobre Mí (About Me) with Notion Toggles */}
        <AboutSection info={portfolioData.personalInfo} />

        {/* Proyectos y Prácticas with Gallery / Table Switcher & Filter */}
        <ProjectsSection projects={portfolioData.projects} />

        {/* Tecnologías y Herramientas */}
        <TechSection technologies={portfolioData.technologies} />

        {/* Documentación y Archivos */}
        <DocsSection documents={portfolioData.documents} />
      </main>

      {/* Notion Minimalist Footer */}
      <footer className="no-print border-t border-[#E9E9E7] bg-[#FBFBFA] py-8 text-xs text-[#787774]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#37352F]">
              {portfolioData.personalInfo.name}
            </span>
            <span>·</span>
            <span>FP Grado Superior DAW</span>
            <span>·</span>
            <span>{portfolioData.personalInfo.course}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsPublishGuideOpen(true)}
              className="hover:text-[#37352F] hover:underline cursor-pointer"
            >
              ¿Cómo publicar esta web gratis?
            </button>
            <span>·</span>
            <a
              href="#root"
              className="flex items-center gap-1 hover:text-[#37352F] transition-colors"
              title="Volver arriba"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#201F1D] text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Guide Modal for Free Hosting / Publishing */}
      <PublishGuideModal
        isOpen={isPublishGuideOpen}
        onClose={() => setIsPublishGuideOpen(false)}
      />
    </div>
  );
}
