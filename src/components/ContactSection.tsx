import React, { useState } from 'react';
import { PersonalInfo } from '../data/portfolioData';
import { Mail, Github, Linkedin, Copy, Check, Send, CheckCircle } from 'lucide-react';

interface ContactSectionProps {
  info: PersonalInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ info }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(info.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contacto" className="mb-14 scroll-mt-16">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-bold text-[#37352F] tracking-tight">
          Contacto y disponibilidad FCT
        </h2>
      </div>

      <div className="bg-[#FBFBFA] border border-[#E9E9E7] rounded-xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-base font-bold text-[#37352F] mb-1.5">
              ¿Deseas concertar una entrevista o revisar documentación adicional?
            </h3>
            <p className="text-xs text-[#5A5852] leading-relaxed mb-4">
              Estoy a disposición del departamento de Formación en Centros de Trabajo (FCT), profesores tutores y empresas colaboradoras para aclarar dudas sobre los proyectos desarrollados o realizar una entrevista técnica.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#787774] w-28 shrink-0">Disponibilidad:</span>
                <span className="font-semibold text-[#37352F]">{info.fctAvailability}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#787774] w-28 shrink-0">Modalidad:</span>
                <span className="font-medium text-[#37352F]">{info.fctModality}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#787774] w-28 shrink-0">Horas requeridas:</span>
                <span className="font-medium text-[#37352F]">{info.fctHours}</span>
              </div>
            </div>
          </div>

          {/* Direct Contact Action Box */}
          <div className="bg-white border border-[#E9E9E7] rounded-lg p-4 sm:w-72 shrink-0 flex flex-col justify-between shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-[#787774] uppercase tracking-wider block mb-2">
                Canales de Contacto
              </span>

              {/* Email row with copy button */}
              <div className="flex items-center justify-between p-2 rounded bg-[#F7F6F3] border border-[#E9E9E7] mb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-[#787774] shrink-0" />
                  <span className="text-xs text-[#37352F] font-medium truncate">
                    {info.email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-1 text-[#787774] hover:text-[#37352F] rounded hover:bg-[#EAEAEA] transition-colors cursor-pointer"
                  title="Copiar correo"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* External Links */}
              <div className="space-y-1.5 text-xs">
                {info.github && (
                  <a
                    href={info.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded hover:bg-[#F7F6F3] text-[#37352F] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#787774]" />
                    <span className="font-medium">Perfil en GitHub</span>
                  </a>
                )}
                {info.linkedin && (
                  <a
                    href={info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded hover:bg-[#F7F6F3] text-[#37352F] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    <span className="font-medium">Perfil en LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E9E9E7]">
              <a
                href={`mailto:${info.email}?subject=Contacto%20Prácticas%20FP%20DAW`}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-[#37352F] hover:bg-[#201F1D] rounded transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
