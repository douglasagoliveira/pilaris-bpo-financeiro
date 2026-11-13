export default function PeoExploreServices() {
  const activeSlide = 0;

  const services = [
    {
      num: '001.',
      title: 'Presença e dedicação',
      desc: 'Estamos ao seu lado, acompanhando a rotina financeira da sua empresa com atenção e responsabilidade.',
    },
    {
      num: '002.',
      title: 'Processos organizados',
      desc: 'Padronizamos e estruturamos a operação financeira para ganhar eficiência e reduzir falhas operacionais.',
    },
    {
      num: '003.',
      title: 'Informação para decidir',
      desc: 'Relatórios claros e dados confiáveis para você decidir com segurança.',
    },
    {
      num: '004.',
      title: 'Atendimento nacional',
      desc: 'Sediados em Belo Horizonte, atendemos empresas de todo o Brasil com tecnologia e proximidade.',
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F2F5F7] relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header with Title on Left */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-normal uppercase tracking-wider text-[#3B82F6] mb-3">
              <img src="/brand/peo-star.svg" alt="" className="w-3.5 h-3.5" loading="lazy" decoding="async" />
              <span>POR QUE ESCOLHER A PILARIS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[46px] font-semibold tracking-[-0.035em] text-[#0F172A] leading-[1.15]">
              Uma base sólida para <br />
              <span className="text-[#3B82F6]">decisões mais seguras.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3D4857] leading-relaxed max-w-2xl">
              Com a rotina acompanhada e a informação confiável, decidir deixa de
              ser apenas opinião.
            </p>
          </div>
        </div>

        {/* 4 Feature Boxes Grid (Peo style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <a
              key={item.num}
              href="/nossas-solucoes"
              className={`group cursor-pointer bg-white rounded-2xl p-7 lg:p-8 border shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#3B82F6]/50 transition-all duration-400 hover:-translate-y-2 flex flex-col justify-between ${
                activeSlide === idx ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/20' : 'border-slate-200/80'
              }`}
            >
              <div>
                <span className="font-mono text-sm font-bold text-[#3B82F6] group-hover:text-[#0F172A] transition-colors block mb-6">
                  {item.num}
                </span>

                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A] group-hover:text-[#3B82F6] transition-colors mb-4 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#3D4857] leading-relaxed mb-6 font-normal">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
