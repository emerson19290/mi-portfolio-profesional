import React from 'react';
import { Project } from '../data/portfolioData';
import { X, Github, ExternalLink, FileText, Calendar, Tag, CheckCircle2, Bookmark } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-[#E9E9E7] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs px-5 py-3 border-b border-[#E9E9E7] flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs text-[#787774]">
            <span>{project.moduleName}</span>
            <span>·</span>
            <span className="font-mono">{project.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#F1F1EF] text-[#787774] hover:text-[#37352F] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Demo badge if applicable */}
          {project.isDemo && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFF9E6] border border-[#F3E7BE] text-[#8C6D1F] text-xs font-medium">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Proyecto de demostración (Puedes reemplazarlo por tu proyecto real)</span>
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-bold text-[#37352F] tracking-tight mb-1">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#787774] mb-5">
            {project.subtitle}
          </p>

          {/* Metadata Grid */}
          <div className="bg-[#FBFBFA] border border-[#E9E9E7] rounded-lg p-3.5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#787774]" />
              <span className="text-[#787774]">Fecha de desarrollo:</span>
              <span className="font-medium text-[#37352F]">{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#787774]" />
              <span className="text-[#787774]">Estado / Calificación:</span>
              <span className="font-medium text-[#37352F]">
                {project.status} {project.grade ? `(${project.grade})` : ''}
              </span>
            </div>
            <div className="sm:col-span-2 flex items-start gap-2">
              <Tag className="w-3.5 h-3.5 text-[#787774] mt-0.5" />
              <span className="text-[#787774] shrink-0">Stack tecnológico:</span>
              <div className="flex flex-wrap gap-1 text-[#37352F]">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-white border border-[#E9E9E7] px-1.5 py-0.5 rounded text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#787774] uppercase tracking-wider mb-2">
              Descripción y Objetivos Técnicos
            </h3>
            <p className="text-sm text-[#37352F] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Detailed Points */}
          {project.detailedPoints && project.detailedPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#787774] uppercase tracking-wider mb-2">
                Habilidades & Entregables de la Práctica
              </h3>
              <ul className="space-y-1.5 text-xs text-[#37352F]">
                {project.detailedPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2383E2] mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External Links Bar */}
          <div className="border-t border-[#E9E9E7] pt-4 mt-6 flex flex-wrap gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#37352F] bg-[#F7F6F3] hover:bg-[#EAEAEA] border border-[#E9E9E7] rounded transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Ver Repositorio GitHub</span>
                <ExternalLink className="w-3 h-3 text-[#787774]" />
              </a>
            )}

            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#37352F] bg-[#F7F6F3] hover:bg-[#EAEAEA] border border-[#E9E9E7] rounded transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Consultar Memoria / Docs</span>
                <ExternalLink className="w-3 h-3 text-[#787774]" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2383E2] hover:bg-[#1B6FB8] rounded transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver Aplicación en Vivo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
