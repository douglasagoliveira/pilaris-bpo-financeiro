import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartHandshake, Workflow, LineChart, Globe2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PeoReasonForChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number>(2); // Default active is Card 2 (Blue) matching the screenshot!

  const cards = [
    {
      icon: HeartHandshake,
      title: "Organização",
      desc: "Um único lugar para registrar e acompanhar tudo o que movimenta o caixa, com processos padronizados desde o início.",
      tags: [
        "Organização financeira",
        "Estruturação operacional",
        "Processos padronizados",
      ],
    },
    {
      icon: Workflow,
      title: "Rotina Operacional",
      desc: "Controle de vencimentos e recebimentos, e cruzamento entre extrato e lançamentos, para que nenhuma divergência passe despercebida.",
      tags: ["Contas a pagar", "Contas a receber", "Conciliação bancária"],
    },
    {
      icon: LineChart,
      title: "Cobrança e Fiscal",
      desc: "Boletos e notas fiscais emitidos dentro do fluxo e do prazo, com as obrigações fiscais acompanhadas junto da rotina financeira.",
      tags: ["Emissão de boletos", "Emissão de NF", "Interface fiscal"],
    },
    {
      icon: Globe2,
      title: "Gestão e Decisão",
      desc: "Visão atualizada de entradas e saídas, e números organizados em informação útil, facilitando a análise, tomada de decisão e gestão do negócio.",
      tags: ["Fluxo de caixa", "Relatórios", "Indicadores (KPIs)"],
    },
  ];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const items = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (items.length < 4) return;

    // Responsive GSAP ScrollTrigger matchMedia
    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      // The cards start in the tilted fanned-out deck position from the reference screenshot
      // and as you scroll down through the section, they smoothly rotate and translate into the upright vertical 4-column row!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
          end: "top 28%",
          scrub: 1.2,
          markers: false,
        },
      });

      // Tilted fanned-out initial state matching Peo's exact geometry and screenshot 1:
      // Card 0: tilted left, shifted right
      // Card 1: tilted slightly right, shifted right
      // Card 2: tilted slightly left, prominent in front
      // Card 3: tilted right, shifted left
      tl.fromTo(
        items[0],
        { xPercent: 95, yPercent: 12, rotate: -8.5 },
        { xPercent: 0, yPercent: 0, rotate: 0, ease: "power1.out" },
      )
        .fromTo(
          items[1],
          { xPercent: 32, yPercent: 4, rotate: 4.13 },
          { xPercent: 0, yPercent: 0, rotate: 0, ease: "power1.out" },
          "<",
        )
        .fromTo(
          items[2],
          { xPercent: -30, yPercent: 0, rotate: -6.42 },
          { xPercent: 0, yPercent: 0, rotate: 0, ease: "power1.out" },
          "<",
        )
        .fromTo(
          items[3],
          { xPercent: -90, yPercent: 8, rotate: 12.15 },
          { xPercent: 0, yPercent: 0, rotate: 0, ease: "power1.out" },
          "<",
        );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-slate-100"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header with Decorative Blue Dot (as in Peo screenshot) */}
        <div className="relative text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          {/* Decorative pulse dot at the top right of header (as in screenshot) */}
          <div className="hidden lg:flex absolute top-4 right-0 xl:-right-12 w-8 h-8 rounded-full bg-blue-100 items-center justify-center pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-[#3B82F6] shadow-sm animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono font-normal uppercase tracking-wider text-[#3B82F6] mb-3">
            <img
              src="/brand/peo-star.svg"
              alt=""
              className="w-3.5 h-3.5"
              loading="lazy"
              decoding="async"
            />
            <span>NOSSAS SOLUÇÕES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[46px] font-semibold tracking-[-0.035em] text-[#0F172A] leading-[1.15]">
            Gestão financeira estruturada e integrada, <br />
            <span className="text-[#3B82F6]">do dia a dia à decisão.</span>
          </h2>
        </div>

        {/* 4 Cards in .advance-wrap animated container */}
        <div
          ref={wrapRef}
          className="advance-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          style={{ perspective: 1000 }}
        >
          {cards.map((card, idx) => {
            const isActive = activeCard === idx;
            const Icon = card.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => setActiveCard(idx)}
                onMouseEnter={() => setActiveCard(idx)}
                className={`group advance-item will-change-transform cursor-pointer transition-colors duration-400 ${
                  idx === 2
                    ? "z-30"
                    : idx === 1
                      ? "z-20"
                      : idx === 3
                        ? "z-20"
                        : "z-10"
                }`}
              >
                <div
                  className={`service-card-item rounded-2xl p-8 sm:p-9 min-h-[330px] h-full flex flex-col justify-between transition-all duration-400 relative overflow-hidden ${
                    isActive
                      ? "bg-[#3B82F6] text-white shadow-2xl shadow-blue-500/25 scale-[1.02]"
                      : "bg-[#F2F5F7] text-[#0F172A] border border-slate-200/60 hover:border-[#3B82F6]/40 hover:bg-slate-100/90"
                  }`}
                >
                  <div>
                    {/* Icon Container matching Peo (Lucide icon pack for site-wide consistency) */}
                    <div
                      className={`w-[72px] h-[68px] rounded-xl flex items-center justify-center mb-8 bg-white text-[#3B82F6] transition-all duration-300 group-hover:scale-105 ${
                        isActive ? "shadow-md" : "shadow-sm"
                      }`}
                    >
                      <Icon className="w-9 h-9" strokeWidth={1.6} />
                    </div>

                    <h3
                      className={`text-xl sm:text-[22px] font-semibold tracking-tight mb-3 transition-colors ${
                        isActive ? "text-white" : "text-[#0F172A]"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        isActive ? "text-white/90" : "text-[#3D4857]"
                      }`}
                    >
                      {card.desc}
                    </p>

                    <div
                      className={`mt-5 pt-4 border-t space-y-1.5 transition-colors ${
                        isActive ? "border-white/20" : "border-slate-200"
                      }`}
                    >
                      {card.tags.map((tag, tIdx) => (
                        <div
                          key={tIdx}
                          className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                            isActive ? "text-white/90" : "text-slate-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-white" : "bg-[#3B82F6]"
                            }`}
                          />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`pt-6 border-t text-xs font-mono font-semibold flex items-center justify-between ${
                      isActive
                        ? "border-white/20 text-white"
                        : "border-slate-200 text-slate-400"
                    }`}
                  >
                    <span>0{idx + 1}.</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
