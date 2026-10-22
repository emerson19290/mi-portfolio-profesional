import React, { useState } from 'react';
import { AcademicDoc } from '../data/portfolioData';
import {
  FileText,
  ExternalLink,
  FolderOpen,
  Bookmark,
  Share2,
  HardDrive,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface DocsSectionProps {
  documents: AcademicDoc[];
  onOpenCustomizer: () => void;
}

export const DocsSection: React.FC<DocsSectionProps> = ({ documents, onOpenCustomizer }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Todos' },
    { id: 'Memorias de Prácticas', label: 'Memorias Técnicas' },
    { id: 'Bases de Datos & SQL', label: 'Bases de Datos' },
    { id: 'Despliegue & Servidores', label: 'Despliegue' },
    { id: 'Currículum & Certificados', label: 'CV & Certificados' },
  ];

  const filteredDocs = selectedCategory === 'ALL'
    ? documents
    : documents.filter(d => d.category === selectedCategory);

  const getFileBadge = (type: string) => {
    switch (type) {
      case 'PDF':
        return <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]">PDF</span>;
      case 'Drive':
        return <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#E8F0FE] text-[#1967D2] border border-[#D2E3FC]">Drive</span>;
      case 'Notion':
        return <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F7F6F3] text-[#37352F] border border-[#E9E9E7]">Notion</span>;
      case 'GitHub':
        return <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F1F1EF] text-[#24292F] border border-[#D0D7DE]">GitHub</span>;
      default:
        return <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F7F6F3] text-[#787774] border border-[#E9E9E7]">{type}</span>;
    }
  };

  return (
    <section id="documentos" className="mb-12 scroll-mt-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#37352F] tracking-tight">
              Documentación y archivos
            </h2>
          </div>
          <p className="text-xs text-[#787774] mt-0.5">
            Archivos externos enlazados a Google Drive, GitHub y repositorios oficiales del centro.
          </p>
        </div>

        <button
          onClick={onOpenCustomizer}
          className="no-print text-xs font-medium text-[#787774] hover:text-[#37352F] hover:underline cursor-pointer self-start sm:self-auto"
        >
          + Añadir documento
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 text-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#37352F] text-white font-medium'
                : 'bg-[#F7F6F3] text-[#787774] hover:text-[#37352F] hover:bg-[#EAEAEA]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notion Files List */}
      <div className="border border-[#E9E9E7] rounded-lg divide-y divide-[#E9E9E7] bg-white overflow-hidden">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="p-3.5 sm:p-4 hover:bg-[#FBFBFA] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2 bg-[#F7F6F3] rounded text-[#787774] shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-[#37352F]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#37352F] truncate">
                    {doc.title}
                  </h3>
                  {getFileBadge(doc.fileType)}
                  {doc.isDemo && (
                    <span className="text-[10px] text-[#8C6D1F] bg-[#FFF9E6] px-1.5 py-0.2 rounded border border-[#F3E7BE]">
                      Ejemplo
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5A5852] leading-relaxed line-clamp-2 mb-1.5">
                  {doc.description}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#787774]">
                  <span>{doc.category}</span>
                  <span>·</span>
                  <span>Actualizado: {doc.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="self-end sm:self-center shrink-0">
              <a
                href={doc.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#37352F] bg-[#F7F6F3] hover:bg-[#EAEAEA] border border-[#E9E9E7] rounded transition-colors"
              >
                <span>Abrir archivo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#787774]" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Notion Note for external cloud hosting */}
      <div className="mt-3 p-3 bg-[#FBFBFA] border border-[#E9E9E7] rounded-md flex items-start gap-2.5 text-xs text-[#787774]">
        <HelpCircle className="w-4 h-4 text-[#787774] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#37352F]">Cómo enlazar tus archivos reales:</strong> No necesitas subir PDFs pesados al código. Puedes subir tus memorias a <span className="font-medium text-[#37352F]">Google Drive</span> (asegurándote de poner el enlace como <em>"Cualquiera con el enlace puede ver"</em>), o a un repositorio en <span className="font-medium text-[#37352F]">GitHub</span> o página pública de <span className="font-medium text-[#37352F]">Notion</span>.
        </p>
      </div>
    </section>
  );
};
