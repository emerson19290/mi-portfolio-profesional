import React from 'react';
import { ExternalLink, BookOpen, Share2, Settings, HelpCircle } from 'lucide-react';

interface NavbarProps {
  studentName: string;
  onOpenCustomizer: () => void;
  onOpenPublishGuide: () => void;
  onShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  studentName,
  onOpenCustomizer,
  onOpenPublishGuide,
  onShare
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E9E9E7] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold tracking-tight text-[#37352F] truncate">
            {studentName === "[Tu Nombre y Apellidos]" ? "Portafolio Académico DAW" : studentName}
          </span>
          <span className="hidden sm:inline-block text-xs text-[#787774] font-normal">
            / FP DAW
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#787774]">
          <a href="#sobre-mi" className="hover:text-[#37352F] transition-colors whitespace-nowrap">
            Sobre mí
          </a>
          <a href="#proyectos" className="hover:text-[#37352F] transition-colors whitespace-nowrap">
            Proyectos
          </a>
          <a href="#tecnologias" className="hover:text-[#37352F] transition-colors whitespace-nowrap">
            Tecnologías
          </a>
          <a href="#documentos" className="hover:text-[#37352F] transition-colors whitespace-nowrap">
            Documentación
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenPublishGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#37352F] hover:bg-[#F1F1EF] rounded border border-[#E9E9E7] transition-colors cursor-pointer"
            title="Cómo publicar esta web gratis sin login para el centro"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#787774]" />
            <span className="hidden sm:inline">Guía Publicación</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#37352F] hover:bg-[#F1F1EF] rounded border border-[#E9E9E7] transition-colors cursor-pointer"
            title="Editar textos, nombre y enlaces"
          >
            <Settings className="w-3.5 h-3.5 text-[#787774]" />
            <span className="hidden sm:inline">Personalizar</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-[#2383E2] hover:bg-[#1B6FB8] rounded transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir enlace</span>
          </button>
        </div>
      </div>
    </header>
  );
};
