import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function PeoTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      quote:
        'Transformamos a gestão financeira da sua empresa em uma operação organizada, segura e eficiente. Cuidamos dos processos essenciais para que você tenha informações confiáveis, decisões mais estratégicas e tranquilidade para focar no crescimento.',
      author: 'Equipe Pilaris BPO',
      role: 'Especialistas em BPO Financeiro e Fiscal',
      avatar: '/brand/symbol-blue.svg',
      avatarClass: 'object-contain bg-white p-2'
    },
    {
      quote:
        'Delegar não significa simplesmente passar uma tarefa adiante. Significa confiar. E é essa confiança que construímos todos os dias com cada empresa que escolhe a Pilaris.',
      author: 'Leandro e Leandra Costa',
      role: 'Fundadores da Pilaris BPO Financeiro',
      avatar: '/images/socios-pilaris.jpg',
      avatarClass: 'object-cover object-[32%_22%] scale-[1.9] origin-[32%_22%]'
    },
    {
      quote:
        'Crescer também significa aprender a delegar. No início, o empresário faz tudo sozinho. Mas quando a empresa cresce, concentrar o financeiro gera falhas que custam caro.',
      author: 'Leandro e Leandra Costa',
      role: 'Bacharéis em Administração de Empresas',
      avatar: '/images/socios-pilaris.jpg',
      avatarClass: 'object-cover object-[70%_24%] scale-[1.9] origin-[70%_24%]'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-normal uppercase tracking-wider text-[#3B82F6] mb-3">
            <img src="/brand/peo-star.svg" alt="" className="w-3.5 h-3.5" loading="lazy" decoding="async" />
            <span>O QUE NOS GUIA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#0F172A] leading-[1.15]">
            Confiança se constrói <br />
            <span className="text-[#3B82F6]">todos os dias.</span>
          </h2>
        </div>

        {/* Testimonial Box (Peo style) */}
        <div className="bg-[#F2F5F7] rounded-3xl p-8 sm:p-12 lg:p-16 relative text-center shadow-xs">
          {/* Quote Icon watermark */}
          <div className="w-16 h-16 rounded-full bg-white text-[#3B82F6] flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Quote className="w-8 h-8 fill-current" />
          </div>

          {/* 5 Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-6 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          {/* Quote Text */}
          <blockquote className="text-lg sm:text-2xl font-bold tracking-tight text-[#0F172A] leading-relaxed max-w-2xl mx-auto mb-8 min-h-[100px] flex items-center justify-center">
            "{testimonials[activeIdx].quote}"
          </blockquote>

          {/* Author Details */}
          <div className="mb-8">
            <div className="text-lg font-extrabold text-[#0F172A]">
              {testimonials[activeIdx].author}
            </div>
            <div className="text-xs sm:text-sm text-[#3D4857] font-medium mt-0.5">
              {testimonials[activeIdx].role}
            </div>
          </div>

          {/* Client Thumbnails Navigation (Peo style) */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              className="p-2 rounded-full bg-white text-slate-600 hover:text-[#055ED3] shadow-xs cursor-pointer"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                    activeIdx === idx
                      ? 'border-[#055ED3] scale-110 shadow-md ring-2 ring-[#055ED3]/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={t.avatar} alt={t.author} className={`w-full h-full ${t.avatarClass}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              className="p-2 rounded-full bg-white text-slate-600 hover:text-[#055ED3] shadow-xs cursor-pointer"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
