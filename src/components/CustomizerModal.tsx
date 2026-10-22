import React, { useState } from 'react';
import { PortfolioData, Project, AcademicDoc } from '../data/portfolioData';
import { X, Save, RotateCcw, Copy, Check, Plus, Trash2, Edit2, Sparkles, FileCode } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'personal' | 'projects' | 'docs' | 'export'>('personal');
  const [copiedJson, setCopiedJson] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddDoc, setShowAddDoc] = useState(false);

  // New project state
  const [newProj, setNewProj] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'DWES',
    moduleName: 'Desarrollo Web en Entorno Servidor',
    description: '',
    technologies: [],
    githubUrl: '',
    demoUrl: '',
    docsUrl: '',
    date: '2026',
    status: 'Completado',
    isDemo: false
  });

  // New doc state
  const [newDoc, setNewDoc] = useState<Partial<AcademicDoc>>({
    title: '',
    category: 'Memorias de Prácticas',
    description: '',
    fileType: 'PDF',
    externalUrl: '',
    lastUpdated: '2026',
    isDemo: false
  });

  if (!isOpen) return null;

  const handlePersonalChange = (field: keyof PortfolioData['personalInfo'], val: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: val
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAddProject = () => {
    if (!newProj.title) return;
    const projectToAdd: Project = {
      id: `proj-${Date.now()}`,
      title: newProj.title || 'Nuevo Proyecto',
      subtitle: newProj.subtitle || '',
      category: newProj.category as any || 'GENERAL',
      moduleName: newProj.moduleName || 'Módulo DAW',
      description: newProj.description || '',
      technologies: typeof newProj.technologies === 'string'
        ? (newProj.technologies as string).split(',').map(s => s.trim()).filter(Boolean)
        : (newProj.technologies || []),
      githubUrl: newProj.githubUrl || undefined,
      demoUrl: newProj.demoUrl || undefined,
      docsUrl: newProj.docsUrl || undefined,
      date: newProj.date || '2026',
      status: 'Completado',
      isDemo: false
    };

    setFormData(prev => ({
      ...prev,
      projects: [projectToAdd, ...prev.projects]
    }));
    setShowAddProject(false);
    setNewProj({
      title: '',
      subtitle: '',
      category: 'DWES',
      moduleName: 'Desarrollo Web en Entorno Servidor',
      description: '',
      technologies: [],
      githubUrl: '',
      demoUrl: '',
      docsUrl: '',
      date: '2026',
      status: 'Completado',
      isDemo: false
    });
  };

  const handleDeleteProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const handleAddDoc = () => {
    if (!newDoc.title) return;
    const docToAdd: AcademicDoc = {
      id: `doc-${Date.now()}`,
      title: newDoc.title || 'Nuevo Documento',
      category: newDoc.category as any || 'Memorias de Prácticas',
      description: newDoc.description || '',
      fileType: newDoc.fileType as any || 'PDF',
      externalUrl: newDoc.externalUrl || '#',
      lastUpdated: newDoc.lastUpdated || '2026',
      isDemo: false
    };

    setFormData(prev => ({
      ...prev,
      documents: [docToAdd, ...prev.documents]
    }));
    setShowAddDoc(false);
    setNewDoc({
      title: '',
      category: 'Memorias de Prácticas',
      description: '',
      fileType: 'PDF',
      externalUrl: '',
      lastUpdated: '2026',
      isDemo: false
    });
  };

  const handleDeleteDoc = (id: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }));
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-[#E9E9E7] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-xl flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-[#E9E9E7] flex items-center justify-between z-10 shrink-0">
          <div>
            <h2 className="text-base font-bold text-[#37352F]">
              Personalizar tu Portafolio de DAW
            </h2>
            <p className="text-xs text-[#787774]">
              Modifica tus datos de estudiante, reemplaza los proyectos de ejemplo y añade tus enlaces.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#F1F1EF] text-[#787774] hover:text-[#37352F] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 border-b border-[#E9E9E7] flex items-center gap-2 overflow-x-auto text-xs font-medium shrink-0 bg-[#FBFBFA]">
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'personal'
                ? 'border-[#37352F] text-[#37352F] font-semibold'
                : 'border-transparent text-[#787774] hover:text-[#37352F]'
            }`}
          >
            Datos Personales & FCT
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'projects'
                ? 'border-[#37352F] text-[#37352F] font-semibold'
                : 'border-transparent text-[#787774] hover:text-[#37352F]'
            }`}
          >
            Proyectos ({formData.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`py-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'docs'
                ? 'border-[#37352F] text-[#37352F] font-semibold'
                : 'border-transparent text-[#787774] hover:text-[#37352F]'
            }`}
          >
            Documentación ({formData.documents.length})
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'export'
                ? 'border-[#37352F] text-[#37352F] font-semibold'
                : 'border-transparent text-[#787774] hover:text-[#37352F]'
            }`}
          >
            Exportar Código JSON
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {/* TAB 1: PERSONAL INFO */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    Tu Nombre y Apellidos:
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={e => handlePersonalChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="Ej: Laura Gómez Pérez"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    Subtítulo / Especialidad:
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.subtitle}
                    onChange={e => handlePersonalChange('subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="Estudiante de Desarrollo de Aplicaciones Web (DAW)"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    Centro Educativo / Instituto:
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.institute}
                    onChange={e => handlePersonalChange('institute', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="Ej: IES Virgen de la Paloma"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    Curso Académico:
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.course}
                    onChange={e => handlePersonalChange('course', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="2º Curso DAW (2025/2026)"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    Correo electrónico de contacto:
                  </label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={e => handlePersonalChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="estudiante@ejemplo.es"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    URL de tu perfil en GitHub:
                  </label>
                  <input
                    type="url"
                    value={formData.personalInfo.github}
                    onChange={e => handlePersonalChange('github', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="https://github.com/tu-usuario"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    URL de tu perfil en LinkedIn:
                  </label>
                  <input
                    type="url"
                    value={formData.personalInfo.linkedin}
                    onChange={e => handlePersonalChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="https://linkedin.com/in/tu-perfil"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#37352F] block mb-1">
                    Disponibilidad para Prácticas / FCT:
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.fctAvailability}
                    onChange={e => handlePersonalChange('fctAvailability', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                    placeholder="Marzo - Junio 2026"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#37352F] block mb-1">
                  Presentación personal ("Sobre mí"):
                </label>
                <textarea
                  rows={3}
                  value={formData.personalInfo.aboutShort}
                  onChange={e => handlePersonalChange('aboutShort', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                  placeholder="Explica brevemente quién eres, tu motivación y tus objetivos en el ciclo de DAW..."
                />
              </div>

              <div>
                <label className="font-semibold text-[#37352F] block mb-1">
                  Nota para el Departamento de Prácticas:
                </label>
                <textarea
                  rows={2}
                  value={formData.personalInfo.tutorNote}
                  onChange={e => handlePersonalChange('tutorNote', e.target.value)}
                  className="w-full px-3 py-2 border border-[#E9E9E7] rounded bg-white text-[#37352F] focus:outline-hidden focus:border-[#2383E2]"
                  placeholder="Mensaje dirigido al tutor o centro educativo..."
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#787774]">
                  Gestiona las prácticas y proyectos visibles en la web.
                </span>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2383E2] hover:bg-[#1B6FB8] rounded cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir proyecto</span>
                </button>
              </div>

              {/* Form to add project */}
              {showAddProject && (
                <div className="bg-[#FBFBFA] border border-[#E9E9E7] rounded-lg p-4 space-y-3">
                  <h4 className="font-bold text-[#37352F] text-xs">Nuevo Proyecto / Práctica</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Título:</label>
                      <input
                        type="text"
                        value={newProj.title}
                        onChange={e => setNewProj({ ...newProj, title: e.target.value })}
                        placeholder="Ej: Tienda en PHP MVC"
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Subtítulo / Módulo:</label>
                      <input
                        type="text"
                        value={newProj.subtitle}
                        onChange={e => setNewProj({ ...newProj, subtitle: e.target.value })}
                        placeholder="Ej: Práctica evaluable del módulo DWES"
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Categoría:</label>
                      <select
                        value={newProj.category}
                        onChange={e => setNewProj({ ...newProj, category: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      >
                        <option value="DWES">Servidor (DWES)</option>
                        <option value="DWEC">Cliente (DWEC)</option>
                        <option value="DIW">Diseño (DIW)</option>
                        <option value="BBDD">Bases de Datos</option>
                        <option value="PROYECTO_FINAL">Proyecto / Despliegue</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Tecnologías (separadas por comas):</label>
                      <input
                        type="text"
                        value={Array.isArray(newProj.technologies) ? newProj.technologies.join(', ') : newProj.technologies}
                        onChange={e => setNewProj({ ...newProj, technologies: e.target.value as any })}
                        placeholder="PHP, MySQL, CSS3"
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">URL GitHub:</label>
                      <input
                        type="url"
                        value={newProj.githubUrl}
                        onChange={e => setNewProj({ ...newProj, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">URL Demo en vivo (opcional):</label>
                      <input
                        type="url"
                        value={newProj.demoUrl}
                        onChange={e => setNewProj({ ...newProj, demoUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#787774] mb-1">Descripción breve:</label>
                    <textarea
                      rows={2}
                      value={newProj.description}
                      onChange={e => setNewProj({ ...newProj, description: e.target.value })}
                      placeholder="Explica qué hace la aplicación, arquitectura usada..."
                      className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddProject(false)}
                      className="px-3 py-1 rounded text-[#787774] hover:bg-[#EAEAEA] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddProject}
                      className="px-3 py-1 rounded text-white bg-[#37352F] hover:bg-[#201F1D] cursor-pointer font-medium"
                    >
                      Guardar Proyecto
                    </button>
                  </div>
                </div>
              )}

              {/* Existing projects list */}
              <div className="divide-y divide-[#E9E9E7] border border-[#E9E9E7] rounded-lg">
                {formData.projects.map(p => (
                  <div key={p.id} className="p-3 flex items-center justify-between gap-3 hover:bg-[#FBFBFA]">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#37352F] truncate">{p.title}</span>
                        {p.isDemo && (
                          <span className="text-[10px] text-[#8C6D1F] bg-[#FFF9E6] px-1.5 py-0.2 rounded border border-[#F3E7BE]">
                            Ejemplo
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#787774] block truncate">
                        {p.moduleName} · {p.technologies.join(', ')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-1.5 text-[#787774] hover:text-red-600 rounded hover:bg-[#FFEBEE] transition-colors cursor-pointer shrink-0"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'docs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#787774]">
                  Enlaza tus memorias de Google Drive, GitHub o documentos PDF.
                </span>
                <button
                  onClick={() => setShowAddDoc(!showAddDoc)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2383E2] hover:bg-[#1B6FB8] rounded cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir documento</span>
                </button>
              </div>

              {/* Form to add document */}
              {showAddDoc && (
                <div className="bg-[#FBFBFA] border border-[#E9E9E7] rounded-lg p-4 space-y-3">
                  <h4 className="font-bold text-[#37352F] text-xs">Nuevo Documento / Memoria</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Título del documento:</label>
                      <input
                        type="text"
                        value={newDoc.title}
                        onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                        placeholder="Ej: Memoria de prácticas PHP"
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Categoría:</label>
                      <select
                        value={newDoc.category}
                        onChange={e => setNewDoc({ ...newDoc, category: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      >
                        <option value="Memorias de Prácticas">Memorias de Prácticas</option>
                        <option value="Bases de Datos & SQL">Bases de Datos & SQL</option>
                        <option value="Despliegue & Servidores">Despliegue & Servidores</option>
                        <option value="Currículum & Certificados">Currículum & Certificados</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">Tipo de alojamiento:</label>
                      <select
                        value={newDoc.fileType}
                        onChange={e => setNewDoc({ ...newDoc, fileType: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      >
                        <option value="Drive">Google Drive</option>
                        <option value="PDF">Enlace PDF directo</option>
                        <option value="GitHub">GitHub Docs</option>
                        <option value="Notion">Notion público</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#787774] mb-1">URL pública del archivo:</label>
                      <input
                        type="url"
                        value={newDoc.externalUrl}
                        onChange={e => setNewDoc({ ...newDoc, externalUrl: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#787774] mb-1">Descripción:</label>
                    <textarea
                      rows={2}
                      value={newDoc.description}
                      onChange={e => setNewDoc({ ...newDoc, description: e.target.value })}
                      placeholder="Breve resumen del contenido de la memoria..."
                      className="w-full px-2.5 py-1.5 border border-[#E9E9E7] rounded bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddDoc(false)}
                      className="px-3 py-1 rounded text-[#787774] hover:bg-[#EAEAEA] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddDoc}
                      className="px-3 py-1 rounded text-white bg-[#37352F] hover:bg-[#201F1D] cursor-pointer font-medium"
                    >
                      Guardar Documento
                    </button>
                  </div>
                </div>
              )}

              {/* Existing documents list */}
              <div className="divide-y divide-[#E9E9E7] border border-[#E9E9E7] rounded-lg">
                {formData.documents.map(d => (
                  <div key={d.id} className="p-3 flex items-center justify-between gap-3 hover:bg-[#FBFBFA]">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#37352F] truncate">{d.title}</span>
                        {d.isDemo && (
                          <span className="text-[10px] text-[#8C6D1F] bg-[#FFF9E6] px-1.5 py-0.2 rounded border border-[#F3E7BE]">
                            Ejemplo
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#787774] block truncate">
                        {d.category} · {d.fileType}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteDoc(d.id)}
                      className="p-1.5 text-[#787774] hover:text-red-600 rounded hover:bg-[#FFEBEE] transition-colors cursor-pointer shrink-0"
                      title="Eliminar documento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT JSON */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#FBFBFA] border border-[#E9E9E7] rounded-lg text-[#5A5852] leading-relaxed">
                <strong className="text-[#37352F] block mb-1">¿Cómo guardar estos cambios para siempre en tu código?</strong>
                Los cambios que guardas aquí se almacenan en el navegador. Si deseas que queden grabados permanentemente en tu repositorio de GitHub, copia este JSON y reemplázalo en el archivo <code>src/data/portfolioData.ts</code>.
              </div>

              <div className="relative">
                <pre className="p-4 bg-[#201F1D] text-slate-200 rounded-lg overflow-x-auto max-h-72 font-mono text-[11px] leading-snug">
                  {JSON.stringify(formData, null, 2)}
                </pre>
                <button
                  onClick={copyJson}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#37352F] hover:bg-[#4A4843] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? "¡Copiado!" : "Copiar JSON"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#FBFBFA] px-6 py-3.5 border-t border-[#E9E9E7] flex items-center justify-between shrink-0">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-[#787774] hover:text-red-600 transition-colors cursor-pointer"
            title="Restablecer todos los campos a los valores de ejemplo originales"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer valores de ejemplo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-[#787774] hover:text-[#37352F] hover:bg-[#EAEAEA] rounded transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#2383E2] hover:bg-[#1B6FB8] rounded transition-colors shadow-2xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
