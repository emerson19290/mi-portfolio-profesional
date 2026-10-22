import React, { useState } from 'react';
import { X, Globe, Terminal, CheckCircle2, Copy, Check, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';

interface PublishGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishGuideModal: React.FC<PublishGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'vercel' | 'github' | 'netlify'>('vercel');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-[#E9E9E7] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs px-5 py-3.5 border-b border-[#E9E9E7] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#2383E2]" />
            <h2 className="text-sm font-bold text-[#37352F]">
              Guía de Alojamiento y Publicación Gratuita
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#F1F1EF] text-[#787774] hover:text-[#37352F] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-xs text-[#37352F]">
          {/* Important Security Notice */}
          <div className="p-3.5 bg-[#FBFBFA] border border-[#E9E9E7] rounded-lg mb-5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E7E34] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-[#37352F] block">
                Acceso público sin contraseña ni registro para el centro:
              </strong>
              Al desplegar esta web en cualquiera de las siguientes plataformas gratuitas, obtendrás un enlace público (HTTPS) que cualquier profesor o tutor de FCT podrá abrir con un solo clic desde cualquier navegador, móvil u ordenador, <strong>sin tener que iniciar sesión</strong>.
            </div>
          </div>

          {/* Platform Selector Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F1F1EF] rounded-lg mb-5">
            <button
              onClick={() => setActiveTab('vercel')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer text-center ${
                activeTab === 'vercel'
                  ? 'bg-white text-[#37352F] shadow-2xs font-semibold'
                  : 'text-[#787774] hover:text-[#37352F]'
              }`}
            >
              1. Vercel (Recomendado)
            </button>
            <button
              onClick={() => setActiveTab('github')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer text-center ${
                activeTab === 'github'
                  ? 'bg-white text-[#37352F] shadow-2xs font-semibold'
                  : 'text-[#787774] hover:text-[#37352F]'
              }`}
            >
              2. GitHub Pages
            </button>
            <button
              onClick={() => setActiveTab('netlify')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer text-center ${
                activeTab === 'netlify'
                  ? 'bg-white text-[#37352F] shadow-2xs font-semibold'
                  : 'text-[#787774] hover:text-[#37352F]'
              }`}
            >
              3. Netlify (Arrastrar carpeta)
            </button>
          </div>

          {/* TAB 1: VERCEL */}
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <div className="bg-[#F7F6F3] p-3 rounded-lg border border-[#E9E9E7]">
                <span className="font-semibold text-[#37352F] block mb-1">
                  ¿Por qué Vercel?
                </span>
                <p className="text-[#5A5852] leading-relaxed">
                  Es 100% gratuita, detecta automáticamente proyectos Vite + React y actualiza tu web cada vez que haces <code>git push</code> en tu repositorio.
                </p>
              </div>

              <ol className="space-y-3 list-decimal list-inside text-[#37352F] leading-relaxed">
                <li className="pl-1">
                  <strong>Sube tu código a GitHub:</strong> Crea un repositorio público en tu cuenta de GitHub (por ejemplo <code>portafolio-daw</code>) y sube este código.
                </li>
                <li className="pl-1">
                  <strong>Entra en Vercel:</strong> Visita{' '}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#2383E2] underline inline-flex items-center gap-0.5">
                    vercel.com <ExternalLink className="w-2.5 h-2.5" />
                  </a>{' '}
                  e inicia sesión con tu cuenta de GitHub.
                </li>
                <li className="pl-1">
                  <strong>Importa tu repositorio:</strong> Haz clic en <em>"Add New... &gt; Project"</em> y selecciona tu repositorio de GitHub.
                </li>
                <li className="pl-1">
                  <strong>Haz clic en "Deploy":</strong> Vercel compilará automáticamente el proyecto y te entregará una URL pública instantánea como <code>https://tu-nombre-daw.vercel.app</code>.
                </li>
              </ol>

              <div className="p-3 bg-[#EBF5EE] border border-[#D3E8D7] rounded-md text-[#1E7E34] text-xs">
                ✓ ¡Listo! Ese enlace es el que debes enviar por correo a la secretaría o departamento de prácticas de tu instituto.
              </div>
            </div>
          )}

          {/* TAB 2: GITHUB PAGES */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="bg-[#F7F6F3] p-3 rounded-lg border border-[#E9E9E7]">
                <span className="font-semibold text-[#37352F] block mb-1">
                  ¿Por qué GitHub Pages?
                </span>
                <p className="text-[#5A5852] leading-relaxed">
                  Utiliza la misma plataforma donde ya guardas tus repositorios de clase de DAW. Es totalmente gratuito y no requiere crear cuentas externas.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  <strong>Paso 1: Generar la compilación de producción en tu ordenador:</strong>
                </p>
                <div className="relative bg-[#201F1D] text-white p-3 rounded-lg font-mono text-xs">
                  <code>npm run build</code>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'build')}
                    className="absolute right-2 top-2 p-1 rounded bg-[#37352F] hover:bg-[#4A4843] transition-colors cursor-pointer"
                  >
                    {copiedCmd === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  </button>
                </div>
                <p className="text-[#787774]">
                  Esto creará una carpeta optimizada llamada <code>dist</code>.
                </p>

                <p>
                  <strong>Paso 2: Configurar GitHub Pages:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-[#5A5852]">
                  <li>Ve a tu repositorio en GitHub y haz clic en <strong>Settings &gt; Pages</strong>.</li>
                  <li>En <em>"Build and deployment"</em>, selecciona <strong>GitHub Actions</strong> o usa la rama donde publiques la carpeta <code>dist</code>.</li>
                  <li>Tu página estará accesible en <code>https://tu-usuario.github.io/tu-repositorio/</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: NETLIFY */}
          {activeTab === 'netlify' && (
            <div className="space-y-4">
              <div className="bg-[#F7F6F3] p-3 rounded-lg border border-[#E9E9E7]">
                <span className="font-semibold text-[#37352F] block mb-1">
                  Netlify Drop (Sin Git ni comandos difíciles)
                </span>
                <p className="text-[#5A5852] leading-relaxed">
                  Ideal si quieres publicar en 30 segundos sin configurar nada en la nube.
                </p>
              </div>

              <ol className="space-y-3 list-decimal list-inside text-[#37352F] leading-relaxed">
                <li className="pl-1">
                  Ejecuta en tu terminal <code>npm run build</code> para generar la carpeta <code>dist</code>.
                </li>
                <li className="pl-1">
                  Abre tu navegador y entra en{' '}
                  <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-[#2383E2] underline inline-flex items-center gap-0.5">
                    app.netlify.com/drop <ExternalLink className="w-2.5 h-2.5" />
                  </a>.
                </li>
                <li className="pl-1">
                  Arrastra y suelta tu carpeta <code>dist</code> en el recuadro que aparece en la pantalla.
                </li>
                <li className="pl-1">
                  Netlify te dará una URL pública gratuita al instante (puedes personalizar el subdominio en Site Settings).
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#FBFBFA] px-6 py-3 border-t border-[#E9E9E7] flex items-center justify-between">
          <span className="text-[11px] text-[#787774]">
            Código limpio · Compatible con cualquier hosting estático
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#37352F] hover:bg-[#201F1D] rounded transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
