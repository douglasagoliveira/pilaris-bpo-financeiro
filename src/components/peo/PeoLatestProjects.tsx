import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PeoLatestProjects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const pilares = [
    {
      num: "01",
      tag: "[2026] [Clareza]",
      title: "Números traduzidos em informação útil para a gestão.",
      desc: "DRE gerencial e demonstrativos descomplicados para você entender o fôlego real da empresa.",
      image: "/images/pilar-clareza.jpg",
      alt: "Dashboard financeiro no notebook sobre mesa de escritório",
    },
    {
      num: "02",
      tag: "[2026] [Controle]",
      title: "Rotinas financeiras acompanhadas, sem tarefa solta.",
      desc: "Conciliação diária, esteira blindada de pagamentos e aprovações com 1 clique para os sócios.",
      image: "/images/calendario-mesa-escritorio.jpg",
      alt: "Calendário espiral sobre a mesa de escritório",
    },
    {
      num: "03",
      tag: "[2026] [Previsibilidade]",
      title: "Visão antecipada do caixa para decidir com segurança.",
      desc: "Projeção preditiva a 90 dias para planejar investimentos, contratações e expansão sem surpresas.",
      image: "/images/pilaris-bpo-office-detail.jpg",
      alt: "Detalhe do escritório da Pilaris BPO",
    },
  ];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const sections = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
    if (sections.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1199px)", () => {
      // Peo's exact Des Portfolio Pin & Stacking Animation
      gsap.set(sections, { scale: 1 });

      sections.forEach((section, index) => {
        const isLast = index === sections.length - 1;

        gsap.to(section, {
          scale: isLast ? 1 : 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 14%",
            end: "bottom 80%",
            scrub: true,
            pin: true,
            pinSpacing: false,
            endTrigger: wrap,
            markers: false,
          },
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#080E1E] text-white relative overflow-hidden tp-project-5-2-area">
      {/* Peo Marquee Banner "NOSSOS PILARES" com marca de crescimento (Continuous scroll loop) */}
      <div className="overflow-hidden border-b border-white/10 pb-8 mb-14 lg:mb-20">
        <div className="animate-peo-marquee flex whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 text-5xl font-normal tracking-tight text-white/20 select-none px-6"
            >
              <img
                src="/brand/pattern-crescimento-pilaris-bpo.png"
                alt=""
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
              <span>NOSSOS PILARES</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Horizontal Stacking Cards Container matching Peo des-portfolio-wrap */}
        <div
          ref={wrapRef}
          className="des-portfolio-wrap space-y-12 lg:space-y-24 relative pb-16"
        >
          {pilares.map((pilar, idx) => (
            <a
              key={pilar.num}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              href="/nossas-solucoes"
              className="des-portfolio-panel project-box-items block w-full rounded-2xl lg:rounded-3xl border border-white/15 bg-white/[0.08] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer will-change-transform"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] lg:min-h-[500px]">
                {/* Left Side: Glassmorphic Content Panel with Glowing Orb & Watermark Number */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white/[0.06] to-transparent">
                  {/* Subtle Glowing Cyan/Blue Orb behind text */}
                  <div className="absolute top-10 left-12 w-48 h-48 bg-[#3B82F6]/25 rounded-full blur-3xl pointer-events-none" />

                  {/* Giant Outline Watermark Number (e.g. 01, 02, 03) */}
                  <div
                    className="font-mono font-bold select-none pointer-events-none absolute -bottom-10 left-10 lg:left-14 hidden sm:block"
                    style={{
                      fontSize: "170px",
                      lineHeight: 1,
                      WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.12)",
                      color: "transparent",
                    }}
                  >
                    {pilar.num}
                  </div>

                  {/* Top Tag with blue dot */}
                  <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
                    <span className="font-mono text-sm sm:text-base font-bold text-slate-300 tracking-tight">
                      {pilar.tag}
                    </span>

                    {/* Blue dot indicator */}
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse" />
                    </div>
                  </div>

                  {/* Main Title */}
                  <div className="relative z-10 my-auto py-4">
                    <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.035em] text-white group-hover:text-[#3B82F6] transition-colors leading-[1.12]">
                      {pilar.title}
                    </h3>
                    <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                      {pilar.desc}
                    </p>
                  </div>

                  {/* Bottom: Circular Blue Button with Arrow */}
                  <div className="relative z-10 pt-6 flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#055ED3] group-hover:bg-white text-white group-hover:text-[#0F172A] flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-105">
                      <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                      Conhecer pilar operacional
                    </span>
                  </div>
                </div>

                {/* Right Side: Full-bleed image */}
                <div className="lg:col-span-5 relative overflow-hidden min-h-[300px] lg:min-h-full bg-slate-900">
                  <img
                    src={pilar.image}
                    alt={pilar.alt}
                    fetchPriority="low"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#080E1E] via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
