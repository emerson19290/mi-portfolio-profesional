import React from 'react';
import { TechCategory } from '../data/portfolioData';
import { Code2, Server, Database, Wrench, Layers } from 'lucide-react';

interface TechSectionProps {
  technologies: TechCategory[];
  onOpenCustomizer?: () => void;
}

export const TechSection: React.FC<TechSectionProps> = ({ technologies }) => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-4 h-4 text-[#2383E2]" />;
      case 1:
        return <Server className="w-4 h-4 text-[#0F7B6C]" />;
      case 2:
        return <Database className="w-4 h-4 text-[#D9730D]" />;
      case 3:
      default:
        return <Wrench className="w-4 h-4 text-[#6940A5]" />;
    }
  };

  return (
    <section id="tecnologias" className="mb-12 scroll-mt-16">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#37352F] tracking-tight">
            Tecnologías y herramientas
          </h2>
        </div>
        <p className="text-xs text-[#787774] mt-0.5">
          Lenguajes de programación, frameworks, motores de bases de datos y herramientas dominadas.
        </p>
      </div>

      {/* Grid of 4 Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {technologies.map((category, catIdx) => (
          <div
            key={catIdx}
            className="bg-white border border-[#E9E9E7] rounded-lg p-4 sm:p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {getCategoryIcon(catIdx)}
                <h3 className="text-sm font-bold text-[#37352F]">
                  {category.category}
                </h3>
              </div>
              <p className="text-xs text-[#787774] mb-3.5 leading-relaxed">
                {category.description}
              </p>

              {/* Technologies List */}
              <div className="space-y-2">
                {category.items.map((tech, techIdx) => (
                  <div
                    key={techIdx}
                    className="p-2 rounded bg-[#FBFBFA] border border-[#E9E9E7] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-semibold text-[#37352F] block truncate">
                        {tech.name}
                      </span>
                      <span className="text-[11px] text-[#787774] block truncate">
                        {tech.subtext}
                      </span>
                    </div>

                    <span className="text-[10px] font-medium text-[#787774] bg-white border border-[#E9E9E7] px-2 py-0.5 rounded shrink-0">
                      {tech.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
