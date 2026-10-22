import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import {
  LayoutGrid,
  Table as TableIcon,
  Github,
  ExternalLink,
  FileText,
  Bookmark,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  projects: Project[];
}

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

        {/* Notion Database View Switcher */}
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

      {/* GALLERY VIEW */}
      {viewMode === 'gallery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="group bg-white border border-[#E9E9E7] hover:border-[#D3D1CB] rounded-lg p-4 sm:p-5 transition-all flex flex-col justify-between hover:shadow-xs"
            >
              <div>
                {/* Header line with module and demo indicator */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-medium text-[#787774] bg-[#F7F6F3] px-2 py-0.5 rounded border border-[#E9E9E7]">
                    {project.moduleName}
                  </span>
                  
                  {project.isDemo && (
                    <span className="text-[10px] text-[#8C6D1F] bg-[#FFF9E6] px-1.5 py-0.5 rounded border border-[#F3E7BE]">
                      Demostración
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-base font-bold text-[#37352F] group-hover:text-[#2383E2] transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-[#787774] mb-3 line-clamp-1">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-[#37352F] leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#F7F6F3] text-[#5A5852] px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="border-t border-[#E9E9E7] pt-3 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-[#787774] hover:text-[#37352F] hover:bg-[#F1F1EF] transition-colors"
                      title="Ver repositorio GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.docsUrl && (
                    <a
                      href={project.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-[#787774] hover:text-[#37352F] hover:bg-[#F1F1EF] transition-colors"
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
                      className="p-1.5 rounded text-[#2383E2] hover:bg-[#EBF5EE] transition-colors"
                      title="Abrir demo en vivo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(project)}
                  className="flex items-center gap-1 text-xs font-medium text-[#787774] hover:text-[#37352F] py-1 px-2 rounded hover:bg-[#F1F1EF] transition-colors cursor-pointer"
                >
                  <span>Ver detalles</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
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
