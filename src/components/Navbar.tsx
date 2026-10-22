import React from 'react';

interface NavbarProps {
  studentName: string;
  onOpenCustomizer?: () => void;
  onOpenPublishGuide?: () => void;
  onShare?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  studentName
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E9E9E7] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold tracking-tight text-[#37352F] truncate">
            {studentName === "[Tu Nombre y Apellidos]"
              ? "Portafolio Académico DAW"
              : studentName}
          </span>

          <span className="hidden sm:inline-block text-xs text-[#787774] font-normal">
            / FP DAW
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#787774]">
          <a
            href="#sobre-mi"
            className="hover:text-[#37352F] transition-colors whitespace-nowrap"
          >
            Sobre mí
          </a>

          <a
            href="#proyectos"
            className="hover:text-[#37352F] transition-colors whitespace-nowrap"
          >
            Proyectos
          </a>

          <a
            href="#tecnologias"
            className="hover:text-[#37352F] transition-colors whitespace-nowrap"
          >
            Tecnologías
          </a>

          <a
            href="#documentos"
            className="hover:text-[#37352F] transition-colors whitespace-nowrap"
          >
            Documentación
          </a>
        </nav>

      </div>
    </header>
  );
};
