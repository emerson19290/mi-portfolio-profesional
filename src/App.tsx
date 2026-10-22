import React, { useState, useEffect } from 'react';
import { initialPortfolioData, PortfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeaderSection } from './components/HeaderSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechSection } from './components/TechSection';
import { DocsSection } from './components/DocsSection';
import { PublishGuideModal } from './components/PublishGuideModal';
import { CustomizerModal } from './components/CustomizerModal';
import { Check, Share2, HelpCircle, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'daw_academic_portfolio_v2';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPublishGuideOpen, setIsPublishGuideOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle share action
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Portafolio Académico DAW - ${data.personalInfo.name}`,
      text: `Portafolio de proyectos y prácticas de Desarrollo de Aplicaciones Web (DAW) de ${data.personalInfo.name}`,
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

  // Save new customized data to state and localStorage
  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setToastMessage('Cambios guardados correctamente en tu navegador');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  };

  // Reset to initial demo data
  const handleResetData = () => {
    if (window.confirm('¿Seguro que deseas restablecer los datos a los valores de ejemplo originales?')) {
      setData(initialPortfolioData);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setIsCustomizerOpen(false);
      setToastMessage('Datos restablecidos a los valores originales');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#37352F] flex flex-col font-sans">
      {/* Notion Top Navigation Bar */}
      <Navbar
        studentName={data.personalInfo.name}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        onShare={handleShare}
      />

      {/* Main Notion Document Page Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-5 pb-16">
        {/* Header with Notion Cover, Icon, Title, Properties and Callout */}
        <HeaderSection
          info={data.personalInfo}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenPublishGuide={() => setIsPublishGuideOpen(true)}
        />

        {/* Sobre Mí (About Me) with Notion Toggles */}
        <AboutSection info={data.personalInfo} />

        {/* Proyectos y Prácticas with Gallery / Table Switcher & Filter */}
        <ProjectsSection projects={data.projects} />

        {/* Tecnologías y Herramientas */}
        <TechSection
          technologies={data.technologies}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Documentación y Archivos */}
        <DocsSection
          documents={data.documents}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      </main>

      {/* Notion Minimalist Footer */}
      <footer className="no-print border-t border-[#E9E9E7] bg-[#FBFBFA] py-8 text-xs text-[#787774]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#37352F]">
              {data.personalInfo.name}
            </span>
            <span>·</span>
            <span>FP Grado Superior DAW</span>
            <span>·</span>
            <span>{data.personalInfo.course}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsPublishGuideOpen(true)}
              className="hover:text-[#37352F] hover:underline cursor-pointer"
            >
              ¿Cómo publicar esta web gratis?
            </button>
            <span>·</span>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="hover:text-[#37352F] hover:underline cursor-pointer"
            >
              Personalizar datos
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

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
