import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import {
  LayoutGrid,
  Table as TableIcon,
  Github,
  ExternalLink,
  FileText,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  projects: Project[];
}

// Helper to render branded tech pills with icons
const getTechBadgeDetails = (tech: string) => {
  const lower = tech.toLowerCase();

  // Docker Compose
  if (lower.includes('docker compose')) {
    return {
      bg: 'bg-[#E1F5FE]',
      text: 'text-[#0277BD]',
      border: 'border-[#B3E5FC]',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#0277BD] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a4 4 0 0 0-4 4c0 1.25.58 2.37 1.48 3.11-.63.4-1.32.93-1.96 1.62-1.12 1.21-1.77 2.68-1.5 4.09.24 1.22 1.09 2.23 2.22 2.68.86.34 1.83.25 2.56-.22.5.58 1.22.95 2.02.95s1.52-.37 2.02-.95c.73.47 1.7.56 2.56.22 1.13-.45 1.98-1.46 2.22-2.68.27-1.41-.38-2.88-1.5-4.09-.64-.69-1.33-1.22-1.96-1.62.9-.74 1.48-1.86 1.48-3.11a4 4 0 0 0-4-4zm-1.5 4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
        </svg>
      )
    };
  }

  // Docker
  if (lower.includes('docker')) {
    return {
      bg: 'bg-[#E5F2FD]',
      text: 'text-[#0062A3]',
      border: 'border-[#CCE6FC]',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#0062A3] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.98 10.02h2.24v2.09h-2.24zm-2.73 0h2.24v2.09h-2.24zm-2.72 0h2.23v2.09H8.53zm5.45-2.52h2.24v2.09h-2.24zm-2.73 0h2.24v2.09h-2.24zm-2.72 0h2.23v2.09H8.53zm-2.73 0h2.24v2.09H5.8zm2.73-2.53h2.23v2.1H8.53zm14.15 6.94c-.2-.14-1.92-1.28-4.25-.66-.35.1-.68.23-.99.39-.77-.85-1.9-1.39-3.15-1.39H4.12C3.5 10.25 3 10.75 3 11.37v4.61c0 2.22 1.48 4.12 3.53 4.71 1.77.51 5.92.56 8.52-.39 2.1-.77 3.73-2.45 4.6-4.75 1.74-.08 2.82-.93 2.95-1.04.22-.19.29-.51.17-.78-.12-.27-.4-.44-.69-.44l.6.97z"/>
        </svg>
      )
    };
  }

  // Nginx
  if (lower.includes('nginx')) {
    return {
      bg: 'bg-[#E8F5E9]',
      text: 'text-[#2E7D32]',
      border: 'border-[#C8E6C9]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#009639] text-white text-[8px] font-bold leading-none shrink-0 shadow-2xs">
          N
        </span>
      )
    };
  }

  // Bash Scripting / Terminal
  if (lower.includes('bash') || lower.includes('terminal')) {
    return {
      bg: 'bg-[#ECEBE7]',
      text: 'text-[#37352F]',
      border: 'border-[#DDDCD7]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#2D3748] text-[#38BDF8] text-[8px] font-mono font-bold leading-none shrink-0">
          &gt;_
        </span>
      )
    };
  }

  // MariaDB
  if (lower.includes('mariadb')) {
    return {
      bg: 'bg-[#E0F2F1]',
      text: 'text-[#004D40]',
      border: 'border-[#B2DFDB]',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#004D40] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.9 8.2c-.4-.4-1-.5-1.5-.3-1.2.6-2.6 1.1-4 1.1-.9 0-1.8-.2-2.7-.6-1.5-.7-3.1-1.8-5.1-1.8-2.6 0-5 1.8-6.1 4.1-.7 1.5-.8 3.2-.2 4.7.7 1.8 2.2 3.1 4 3.7 1.8.6 3.8.4 5.5-.4 1.9-.9 3.4-2.4 4.8-4 1.1-1.3 2.3-2.7 3.7-3.7.8-.5 1.8-.8 1.9-1.9.1-.4 0-.7-.3-.9z"/>
        </svg>
      )
    };
  }

  // Linux (Ubuntu Server)
  if (lower.includes('linux') || lower.includes('ubuntu')) {
    return {
      bg: 'bg-[#F1F3F5]',
      text: 'text-[#333333]',
      border: 'border-[#E2E5E9]',
      icon: (
        <svg className="w-3.5 h-3.5 text-[#E95420] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zM6.5 14.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5zm11 0a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z"/>
        </svg>
      )
    };
  }

  // PHP
  if (lower.includes('php')) {
    return {
      bg: 'bg-[#EEF2FF]',
      text: 'text-[#4338CA]',
      border: 'border-[#E0E7FF]',
      icon: (
        <span className="inline-flex items-center justify-center w-4 h-3.5 rounded bg-[#777BB4] text-white text-[7px] font-bold leading-none shrink-0">
          PHP
        </span>
      )
    };
  }

  // MySQL
  if (lower.includes('mysql')) {
    return {
      bg: 'bg-[#E0F2FE]',
      text: 'text-[#0369A1]',
      border: 'border-[#BAE6FD]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#00758F] text-white text-[7px] font-bold leading-none shrink-0">
          SQL
        </span>
      )
    };
  }

  // PostgreSQL
  if (lower.includes('postgres')) {
    return {
      bg: 'bg-[#EFF6FF]',
      text: 'text-[#1D4ED8]',
      border: 'border-[#DBEAFE]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#336791] text-white text-[7px] font-bold leading-none shrink-0">
          PG
        </span>
      )
    };
  }

  // Java
  if (lower.includes('java')) {
    return {
      bg: 'bg-[#FFF7ED]',
      text: 'text-[#C2410C]',
      border: 'border-[#FFEDD5]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#EA2D2E] text-white text-[7px] font-bold leading-none shrink-0">
          ☕
        </span>
      )
    };
  }

  // Spring Boot
  if (lower.includes('spring')) {
    return {
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#15803D]',
      border: 'border-[#DCFCE7]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#6DB33F] text-white text-[7px] font-bold leading-none shrink-0">
          🌱
        </span>
      )
    };
  }

  // Figma
  if (lower.includes('figma')) {
    return {
      bg: 'bg-[#FEF2F2]',
      text: 'text-[#B91C1C]',
      border: 'border-[#FEE2E2]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#F24E1E] text-white text-[7px] font-bold leading-none shrink-0">
          F
        </span>
      )
    };
  }

  // JavaScript
  if (lower.includes('javascript') || lower.includes('es6')) {
    return {
      bg: 'bg-[#FEFCE8]',
      text: 'text-[#854D0E]',
      border: 'border-[#FEF08A]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#F7DF1E] text-black text-[8px] font-bold leading-none shrink-0">
          JS
        </span>
      )
    };
  }

  // Tailwind
  if (lower.includes('tailwind')) {
    return {
      bg: 'bg-[#F0F9FF]',
      text: 'text-[#0369A1]',
      border: 'border-[#BAE6FD]',
      icon: (
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#38BDF8] text-white text-[7px] font-bold leading-none shrink-0">
          TW
        </span>
      )
    };
  }

  // Default / Fallback
  return {
    bg: 'bg-[#F3F4F6]',
    text: 'text-[#374151]',
    border: 'border-[#E5E7EB]',
    icon: (
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-[#9CA3AF] text-white text-[7px] font-mono leading-none shrink-0">
        #
      </span>
    )
  };
};

// Abstract Technology Header Visual Banner with gradient, blurred code lines & geometric network mesh
const TechAbstractBanner: React.FC<{ index: number }> = ({ index }) => {
  // Variations for visually diverse cards
  const gradientStyles = [
    'from-[#080E1E] via-[#101B38] to-[#27103D]',
    'from-[#091326] via-[#132247] to-[#1C163D]',
    'from-[#06111E] via-[#0C2138] to-[#24133A]',
    'from-[#0A0D1E] via-[#151B3B] to-[#280F38]',
    'from-[#071024] via-[#101E42] to-[#221035]'
  ];
  const activeGradient = gradientStyles[index % gradientStyles.length];

  return (
    <div className={`relative h-28 sm:h-32 w-full overflow-hidden bg-gradient-to-r ${activeGradient} select-none`}>
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`meshGrad-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id={`ambientGlow-${index}`} cx="85%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <rect width="400" height="120" fill={`url(#ambientGlow-${index})`} />

        {/* Blurred Syntax Code Lines (Left Side) */}
        <g opacity="0.45" transform="translate(16, 20)">
          <text x="0" y="0" fill="#E2E8F0" fontSize="7" fontFamily="monospace" opacity="0.75">
            {"> docker-compose up -d --build"}
          </text>
          <text x="0" y="14" fill="#38BDF8" fontSize="7" fontFamily="monospace">
            {"const server = express();"}
          </text>
          <text x="8" y="26" fill="#94A3B8" fontSize="6.5" fontFamily="monospace">
            {"server.use(nginx.proxy({ port: 8080 }));"}
          </text>
          <text x="0" y="38" fill="#FBBF24" fontSize="6.5" fontFamily="monospace">
            {"await database.connect(pool);"}
          </text>
          <text x="8" y="50" fill="#34D399" fontSize="6.5" fontFamily="monospace">
            {"// cluster status: OK [200]"}
          </text>
          <text x="0" y="62" fill="#818CF8" fontSize="6.5" fontFamily="monospace">
            {"export default server.listen();"}
          </text>
        </g>

        {/* Geometric Constellation / Mesh Pattern (Right Side) */}
        <g stroke={`url(#meshGrad-${index})`} strokeWidth="0.85" opacity="0.7">
          <line x1="230" y1="20" x2="275" y2="45" />
          <line x1="275" y1="45" x2="330" y2="25" />
          <line x1="330" y1="25" x2="385" y2="50" />
          <line x1="275" y1="45" x2="265" y2="85" />
          <line x1="265" y1="85" x2="320" y2="92" />
          <line x1="330" y1="25" x2="320" y2="92" />
          <line x1="320" y1="92" x2="385" y2="82" />
          <line x1="385" y1="50" x2="385" y2="82" />
          <line x1="275" y1="45" x2="320" y2="92" />
          <line x1="230" y1="20" x2="265" y2="85" />

          {/* Glowing Mesh Nodes */}
          <circle cx="230" cy="20" r="2.2" fill="#38BDF8" />
          <circle cx="275" cy="45" r="2.8" fill="#60A5FA" />
          <circle cx="330" cy="25" r="3.2" fill="#C084FC" />
          <circle cx="385" cy="50" r="2.4" fill="#38BDF8" />
          <circle cx="265" cy="85" r="2.4" fill="#818CF8" />
          <circle cx="320" cy="92" r="2.8" fill="#E879F9" />
          <circle cx="385" cy="82" r="2.2" fill="#60A5FA" />
        </g>
      </svg>

      {/* Subtle bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'gallery' | 'table'>('gallery');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'ALL', label: 'Todos' },
    { id: 'DWES', label: 'Servidor (DWES)' },
    { id: 'DWEC', label: 'Cliente (DWEC)' },
    { id: 'DIW', label: 'Diseño (DIW)' },
    { id: 'PROYECTO_FINAL', label: 'Despliegue / Final' },
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="proyectos" className="mb-12 scroll-mt-16">
      {/* Section Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#37352F] tracking-tight">
              Proyectos y prácticas
            </h2>
          </div>
          <p className="text-xs text-[#787774] mt-0.5">
            Colección de aplicaciones, prácticas de aula y desarrollos con código fuente y documentación.
          </p>
        </div>

        {/* Database View Switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-[#F1F1EF] border border-[#E9E9E7] rounded-md self-start sm:self-auto">
          <button
            onClick={() => setViewMode('gallery')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-white text-[#37352F] shadow-2xs font-semibold'
                : 'text-[#787774] hover:text-[#37352F]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Galería</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-[#37352F] shadow-2xs font-semibold'
                : 'text-[#787774] hover:text-[#37352F]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabla</span>
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 text-xs">
        <Filter className="w-3.5 h-3.5 text-[#787774] shrink-0 mr-1" />
        {categories.map(cat => {
          const count = cat.id === 'ALL'
            ? projects.length
            : projects.filter(p => p.category === cat.id).length;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#37352F] text-white font-medium'
                  : 'bg-[#F7F6F3] text-[#787774] hover:text-[#37352F] hover:bg-[#EAEAEA]'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* GALLERY VIEW - Complete Redesign matching reference mockup */}
      {viewMode === 'gallery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.13)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* 1. Cabecera Visual Abstracta */}
              <TechAbstractBanner index={index} />

              {/* Card Body with Overlapping Badges */}
              <div className="px-5 pt-0 pb-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* 2. Badges o Etiquetas Superpuestas */}
                  <div className="flex items-center justify-between -mt-4 mb-3.5 gap-2 relative z-10">
                    {/* Left: Module Name (Light blue background, dark text) */}
                    <span className="bg-[#DCEBFE] text-[#1E429F] border border-[#BFDBFE] font-medium text-[11px] sm:text-xs px-3 py-1 rounded-md shadow-xs shrink-0 max-w-[62%] truncate">
                      {project.moduleName}
                    </span>

                    {/* Right: Discrete White Capsule with State */}
                    <div className="bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1 shadow-xs text-right shrink-0">
                      <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-[#166534] leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
                        <span>• Completado</span>
                      </div>
                      <span className="text-[9px] text-[#6B7280] font-normal leading-tight block mt-0.5">
                        Proyecto Académico
                      </span>
                    </div>
                  </div>

                  {/* 3. Contenido y Jerarquía */}
                  <h3 className="text-base sm:text-lg font-bold text-[#111827] tracking-tight group-hover:text-[#1D4ED8] transition-colors mb-1 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#6B7280] font-normal mb-3 line-clamp-1">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-[#374151] leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* 4. Etiquetas de Tecnologías con Iconos Oficiales */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech, idx) => {
                      const badge = getTechBadgeDetails(tech);
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {badge.icon}
                          <span>{tech}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Footer y Enlaces (Parte Inferior) */}
                <div className="border-t border-[#E5E7EB] pt-3.5 mt-auto flex items-center justify-between gap-2">
                  {/* Left: Square rounded action buttons */}
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#E5E7EB] text-[#1F2937] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs"
                        title="Ver repositorio en GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.docsUrl && (
                      <a
                        href={project.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#E5E7EB] text-[#4B5563] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs"
                        title="Ver memoria o documentación"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs"
                        title="Abrir demo en vivo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Right: Ver detalles > link */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-1 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors group/btn cursor-pointer py-1 px-1"
                  >
                    <span>Ver detalles</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW (Notion Database View) */}
      {viewMode === 'table' && (
        <div className="border border-[#E9E9E7] rounded-lg overflow-x-auto bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBFBFA] border-b border-[#E9E9E7] text-[#787774] uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-2.5 px-3.5">Proyecto</th>
                <th className="py-2.5 px-3.5">Módulo DAW</th>
                <th className="py-2.5 px-3.5">Tecnologías</th>
                <th className="py-2.5 px-3.5">Fecha</th>
                <th className="py-2.5 px-3.5">Enlaces</th>
                <th className="py-2.5 px-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9E7] text-[#37352F]">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-[#FBFBFA] transition-colors">
                  <td className="py-2.5 px-3.5 font-medium max-w-xs">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-left hover:text-[#2383E2] hover:underline cursor-pointer font-semibold block truncate"
                    >
                      {project.title}
                    </button>
                    <span className="text-[11px] text-[#787774] block truncate">
                      {project.subtitle}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-[#5A5852] whitespace-nowrap">
                    {project.moduleName}
                  </td>
                  <td className="py-2.5 px-3.5 max-w-xs">
                    <span className="truncate block text-[#5A5852]">
                      {project.technologies.slice(0, 3).join(', ')}
                      {project.technologies.length > 3 ? ` +${project.technologies.length - 3}` : ''}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-[#787774] whitespace-nowrap">
                    {project.date}
                  </td>
                  <td className="py-2.5 px-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#787774] hover:text-[#37352F]"
                          title="GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.docsUrl && (
                        <a
                          href={project.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#787774] hover:text-[#37352F]"
                          title="Memoria"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2383E2] hover:underline"
                          title="Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-[#2383E2] hover:underline text-xs cursor-pointer"
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
