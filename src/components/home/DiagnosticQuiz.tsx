import { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, RefreshCw } from 'lucide-react';
import { whatsappLink } from '../../data/site';

interface Question {
  id: number;
  title: string;
  options: {
    label: string;
    points: number;
    tip: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: 'Como é feita a conciliação bancária na sua empresa?',
    options: [
      {
        label: 'Não fazemos ou apenas conferimos por cima no fim do mês',
        points: 0,
        tip: 'Risco crítico: cobranças indevidas, furos de caixa e perda do controle financeiro.'
      },
      {
        label: 'Fazemos semanalmente com planilhas manuais',
        points: 15,
        tip: 'Gera retrabalho e é altamente suscetível a erros de digitação e esquecimentos.'
      },
      {
        label: 'Conciliamos diariamente via software especializado',
        points: 25,
        tip: 'Excelente. A conciliação diária é o pilar da saúde financeira.'
      }
    ]
  },
  {
    id: 2,
    title: 'Com que antecedência você projeta o fluxo de caixa futuro?',
    options: [
      {
        label: 'Não projetamos: vivemos apagando incêndios do dia',
        points: 0,
        tip: 'Impossível antecipar necessidades de capital de giro ou investimentos.'
      },
      {
        label: 'Projetamos apenas para os próximos 15 a 30 dias',
        points: 15,
        tip: 'Visão curta que pode ser surpreendida por impostos ou sazonalidades.'
      },
      {
        label: 'Temos projeção clara para 60 a 90 dias ou mais',
        points: 25,
        tip: 'Previsibilidade madura para expandir com segurança e sem depender de juros.'
      }
    ]
  },
  {
    id: 3,
    title: 'Quem executa a rotina operacional no Internet Banking?',
    options: [
      {
        label: 'O próprio sócio perde horas cadastrando boletos e pagamentos',
        points: 5,
        tip: 'Tempo nobre de gestão e vendas desperdiçado em burocracia operacional.'
      },
      {
        label: 'Um funcionário interno generalista sem especialização',
        points: 15,
        tip: 'Risco de desvios, falhas tributárias e custos trabalhistas elevados.'
      },
      {
        label: 'Equipe especializada prepara os lotes e os sócios só autorizam',
        points: 25,
        tip: 'Governança perfeita: segregação de funções, segurança e aprovação com 1 clique.'
      }
    ]
  },
  {
    id: 4,
    title: 'Você recebe DRE Gerencial mensal para avaliar lucratividade?',
    options: [
      {
        label: 'Não sei se a empresa teve lucro ou prejuízo no último mês',
        points: 0,
        tip: 'Falta do indicador vital: faturamento alto não significa dinheiro no bolso.'
      },
      {
        label: 'Apenas a DRE contábil oficial meses depois',
        points: 10,
        tip: 'A DRE contábil é para o Fisco, não para decisões táticas do dia a dia.'
      },
      {
        label: 'Recebo DRE gerencial por centro de custo até o 5º dia útil',
        points: 25,
        tip: 'Nível executivo: decisões tomadas com base em lucratividade real.'
      }
    ]
  }
];

/** Interactive self-assessment card (4 questions → score and recommendation). */
export default function DiagnosticQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelectOption = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setCompleted(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  let diagnosisLevel = {
    badge: 'Estágio Crítico: Risco Operacional',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    headline: 'Seu financeiro necessita de estruturação urgente',
    description:
      'Sua empresa está operando com baixa previsibilidade e os sócios estão sobrecarregados com rotinas bancárias. O risco de multas, furos de caixa e perda de lucratividade é alto.',
    action: 'Diagnóstico de emergência recomendado'
  };

  if (totalScore >= 75) {
    diagnosisLevel = {
      badge: 'Estágio Avançado: Alta Maturidade',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      headline: 'Processos estruturados e prontos para escalar',
      description:
        'Sua empresa possui boa governança. Com o BPO Financeiro da Pilaris, você libera 100% do tempo dos diretores da operação bancária e foca apenas na expansão comercial.',
      action: 'Consultoria de otimização de margens e escala'
    };
  } else if (totalScore >= 45) {
    diagnosisLevel = {
      badge: 'Estágio Intermediário: Oportunidade de Otimização',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      headline: 'Processos existem, mas faltam previsibilidade e automação',
      description:
        'Você mantém as contas pagas, mas ainda despende tempo demais com retrabalho ou não possui projeção preditiva a 90 dias. A Pilaris pode assumir essa esteira com custo muito menor que um CLT.',
      action: 'Estruturação de fluxo preditivo e esteira de pagamentos'
    };
  }

  const resultWhatsappUrl = whatsappLink(
    `Olá Pilaris! Fiz o Diagnóstico Financeiro no site e minha pontuação foi ${totalScore}/100 (${diagnosisLevel.badge}). Gostaria de entender como estruturar minha operação.`
  );
  const progress = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div
      aria-live="polite"
      className="rounded-[32px] bg-white/[0.05] border border-white/15 p-6 sm:p-10 backdrop-blur-xl shadow-2xl"
    >
      {!completed ? (
        <div>
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 mb-4">
            <span>Pergunta {currentStep + 1} de {questions.length}</span>
            <span>{progress}% respondido</span>
          </div>
          <div
            role="progressbar"
            aria-label="Progresso do diagnóstico"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="w-full h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden"
          >
            <div
              className="h-full bg-[#055ED3] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-6">
            {questions[currentStep].title}
          </h3>

          <div className="space-y-3">
            {questions[currentStep].options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(opt.points)}
                className="w-full text-left p-5 rounded-2xl bg-white/5 hover:bg-[#055ED3] border border-white/10 hover:border-blue-400 transition-all duration-200 group flex items-center justify-between cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-semibold text-white">
                    {opt.label}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-blue-100 transition-colors">
                    {opt.tip}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4 space-y-6 animate-fadeIn">
          <span className={`inline-block px-4 py-1.5 rounded-full font-mono-code text-xs uppercase font-normal border ${diagnosisLevel.badgeColor}`}>
            {diagnosisLevel.badge}
          </span>

          <div className="space-y-2">
            <div className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white font-mono-code">
              {totalScore}<span className="text-2xl text-slate-400 font-normal">/100</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-normal text-white">
              {diagnosisLevel.headline}
            </h3>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            {diagnosisLevel.description}
          </p>

          <div className="p-5 rounded-2xl bg-[#055ED3]/20 border border-[#055ED3]/40 max-w-md mx-auto text-sm text-blue-100 flex items-center gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Recomendação: {diagnosisLevel.action} com os analistas da Pilaris BPO.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={resultWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#055ED3] hover:bg-white hover:text-[#021A39] text-white font-bold text-sm transition-all duration-300 shadow-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar resultado e falar com especialista</span>
            </a>

            <button
              type="button"
              onClick={resetQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-sm transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refazer teste</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
