import React, { useState } from 'react';
import { PersonalInfo } from '../data/portfolioData';
import { ChevronRight, ChevronDown, CheckCircle2, Award, Briefcase, Code } from 'lucide-react';

interface AboutSectionProps {
  info: PersonalInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
  const [openToggles, setOpenToggles] = useState<{ [key: string]: boolean }>({
    curriculum: true,
    interests: true,
    fct: false
  });

  const toggleBlock = (key: string) => {
    setOpenToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="sobre-mi" className="mb-12 scroll-mt-16">
      <div className="mb-4">
        <h2 className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#25352b] text-[#ffffff] border border-[#25352b] shadow-2xs text-sm sm:text-base font-bold tracking-tight">
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#e7c684]" aria-hidden="true" />
            <span>Sobre mí</span>
          </span>
          <span className="text-xs font-normal text-[#e7c684]">
            Perfil profesional y académico
          </span>
        </h2>
      </div>

      {/* Main presentation paragraph */}
      <div className="text-sm text-[#37352F] leading-relaxed mb-4">
        <p className="mb-2.5">
          {info.aboutShort}
        </p>
        {info.aboutDetails && info.aboutDetails.length > 0 && info.aboutDetails.map((paragraph, idx) => (
          <p key={idx} className="mb-2.5 text-[#5A5852]">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Notion Toggle Blocks */}
      <div className="space-y-2 mt-4">
        {/* Toggle: Módulos DAW Cursados */}
        <div className="border border-[#E9E9E7] rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => toggleBlock('curriculum')}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#37352F] hover:bg-[#FBFBFA] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#787774]">
                {openToggles.curriculum ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </span>
              <span>Módulos oficiales cursados en el ciclo de DAW</span>
            </div>
            <span className="text-[11px] font-normal text-[#787774]">
              Plan oficial FP
            </span>
          </button>

          {openToggles.curriculum && (
            <div className="px-4 py-3 bg-[#FBFBFA] border-t border-[#E9E9E7] text-xs text-[#37352F] space-y-3">
              <div>
                <span className="font-semibold text-[#787774] block mb-1">
                  Segundo Curso (Especialización Web):
                </span>
                <p className="text-[#5A5852] leading-relaxed">
                  Desarrollo Web en Entorno Cliente (DWEC - JavaScript/DOM/APIs), Desarrollo Web en Entorno Servidor (DWES - PHP/Java/MVC), Despliegue de Aplicaciones Web (DAW - Docker/Servidores), Diseño de Interfaces Web (DIW - UX/UI/Figma/CSS), Empresa e Iniciativa Emprendedora (EIE).
                </p>
              </div>
              <div className="border-t border-[#E9E9E7] pt-2">
                <span className="font-semibold text-[#787774] block mb-1">
                  Primer Curso (Fundamentos de Software y Sistemas):
                </span>
                <p className="text-[#5A5852] leading-relaxed">
                  Programación (Java POO), Bases de Datos (SQL / Modelado Relacional), Lenguajes de Marcas (HTML5, XML, JSON), Entornos de Desarrollo (Git, UML), Sistemas Informáticos (Linux, Redes).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
