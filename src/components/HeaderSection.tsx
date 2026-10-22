import React from 'react';
import { PersonalInfo } from '../data/portfolioData';
import {
  GraduationCap,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Printer,
  Copy,
  Check,
  Edit3,
  ExternalLink,
  BookOpen,
  Info
} from 'lucide-react';

interface HeaderSectionProps {
  info: PersonalInfo;
  onOpenCustomizer: () => void;
  onOpenPublishGuide: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  info,
  onOpenCustomizer,
  onOpenPublishGuide
}) => {
  return (
    <section className="mb-10">
      {/* Notion Cover Image */}
      <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-xl overflow-hidden bg-[#F7F6F3] border border-[#E9E9E7] shadow-xs">
        <img
          src="/src/assets/images/portfolio_cover_minimalist_1792656994744.jpg"
          alt="Portada Portafolio Académico DAW"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle cover watermark indicator */}
        <div className="absolute bottom-3 right-3 text-[11px] text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
          DAW · 2025/2026
        </div>
      </div>

      {/* Notion Breadcrumbs & Header Details */}
      <div className="mt-4">
        {/* Breadcrumb line */}
        <div className="flex items-center gap-1.5 text-xs text-[#787774] mb-3">
          <span>Formación Profesional</span>
          <span>/</span>
          <span>Grado Superior</span>
          <span>/</span>
          <span className="text-[#37352F] font-medium">DAW (Desarrollo de Aplicaciones Web)</span>
        </div>

        {/* Notion Icon & Title Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="text-3xl sm:text-4xl p-2 bg-[#F7F6F3] rounded-lg border border-[#E9E9E7] select-none shrink-0" aria-hidden="true">
              💻
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#37352F]">
                  {info.name}
                </h1>
                <button
                  onClick={onOpenCustomizer}
                  className="no-print inline-flex items-center gap-1 text-[11px] font-medium text-[#787774] hover:text-[#37352F] bg-[#F7F6F3] hover:bg-[#EAEAEA] border border-[#E9E9E7] px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="Modificar nombre, textos y enlaces"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Editar</span>
                </button>
              </div>

              <p className="text-sm sm:text-base font-normal text-[#787774] mt-1">
                {info.subtitle}
              </p>
            </div>
          </div>

        </div>

        {/* Notion Properties Grid (Table of properties) */}
        <div className="mt-6 border-y border-[#E9E9E7] py-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2.5 gap-x-6 text-xs">
          <div className="flex items-center gap-2 text-[#787774]">
            <Building2 className="w-4 h-4 text-[#787774] shrink-0" />
            <span className="text-[#787774] w-24 shrink-0">Centro:</span>
            <span className="font-medium text-[#37352F] truncate">{info.institute}</span>
          </div>

          <div className="flex items-center gap-2 text-[#787774]">
            <Calendar className="w-4 h-4 text-[#787774] shrink-0" />
            <span className="text-[#787774] w-24 shrink-0">Curso:</span>
            <span className="font-medium text-[#37352F]">{info.course}</span>
          </div>

          <div className="flex items-center gap-2 text-[#787774]">
            <Clock className="w-4 h-4 text-[#787774] shrink-0" />
            <span className="text-[#787774] w-24 shrink-0">Prácticas:</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#EBF5EE] text-[#1E7E34] border border-[#D3E8D7]">
              Disponible para prácticas
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#787774]">
            <MapPin className="w-4 h-4 text-[#787774] shrink-0" />
            <span className="text-[#787774] w-24 shrink-0">Modalidad:</span>
            <span className="font-medium text-[#37352F]">{info.fctModality}</span>
          </div>

          <div className="flex items-center gap-2 text-[#787774]">
            <Mail className="w-4 h-4 text-[#787774] shrink-0" />
            <span className="text-[#787774] w-24 shrink-0">Correo:</span>
            <a href={`mailto:${info.email}`} className="font-medium text-[#2383E2] hover:underline truncate">
              {info.email}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
