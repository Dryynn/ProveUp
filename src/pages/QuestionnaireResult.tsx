import { AnimatedDisclosure } from '../components/AnimatedDisclosure';
import { useCareerMotion } from '../hooks/useCareerMotion';
import './career-result.css';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo-proveup.svg';
import escritorio from '../assets/Intersect.png';
import { careers } from '../data/careers';
import { careerPresentation, explainReasons } from '../data/careerPresentation';
import { loadAssessment } from '../services/assessments';
import type { AssessmentResult, Career } from '../services/assessments';

const primaryAction = 'career-action career-action-primary';
const secondaryAction = 'career-action career-action-secondary';
const format = (value: number) => value.toLocaleString('pt-BR', { maximumFractionDigits: 1 });

function CareerPresentation({ assessment }: { assessment: AssessmentResult }) {
  const [selectedCareer, setSelectedCareer] = useState<Career>(assessment.recommendedCareer);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const { scrollTo } = useCareerMotion(rootRef, selectedCareer);
  const experimentRef = useRef<HTMLElement>(null);
  const displayed = assessment.ranking.find(result => result.career === selectedCareer) ?? assessment.ranking[0];
  const profile = careers[displayed.career];
  const presentation = careerPresentation[displayed.career];
  const isRecommended = displayed.career === assessment.recommendedCareer;
  const explanation = explainReasons(displayed.reasons);

  const showCareer = (career: Career) => {
    setChallengeOpen(false);
    setBreakdownOpen(false);
    setSelectedCareer(career);
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      scrollTo(0);
    });
  };
  const openExperiment = () => {
    if (!experimentRef.current) return;
    setChallengeOpen(true);
    requestAnimationFrame(() => {
      if (experimentRef.current) scrollTo(experimentRef.current, () => experimentRef.current?.querySelector('button')?.focus({ preventScroll: true }));
    });
  };

  return (
    <div ref={rootRef} className="career-page min-h-screen text-white font-sans">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <img src={logo} alt="ProveUP" className="w-32 sm:w-36" />
        <Link to="/questionnaire" className="inline-flex items-center gap-2 rounded text-sm text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-proveup-orange"><RotateCcw size={15} aria-hidden="true" />Refazer questionário</Link>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 pb-16 pt-4 sm:gap-12 sm:px-8">
        <section aria-labelledby="career-title" className="career-hero">
          <div className="grid lg:grid-cols-[1fr_220px]">
            <div className="career-hero-copy">
              <div data-intro className="mb-6 flex items-center gap-3 text-xs font-semibold text-[#161616]"><span className="h-1.5 w-1.5 rounded-full bg-[#161616]" />{isRecommended ? 'Seu resultado' : 'Outra carreira para conhecer'}</div>
              <p data-intro className="mb-3 text-sm text-[#161616]">{isRecommended ? 'A carreira recomendada para você é' : 'Conheça também'}</p>
              <h1 data-intro id="career-title" ref={headingRef} tabIndex={-1} className="outline-none">{profile.title}</h1>
              <p data-intro className="mt-5 max-w-2xl text-sm leading-relaxed text-[#161616] sm:text-base">{profile.description}</p>
              <div data-intro className="career-score">
                <strong><span aria-hidden="true"><span data-score data-value={displayed.afinidade}>{format(displayed.afinidade)}</span>%</span><span className="sr-only">{format(displayed.afinidade)}% de afinidade</span></strong>
                <div className="career-score-label">Afinidade com seus interesses<br /><span className="text-[11px]">Com base nas suas respostas</span></div>
              </div>
              <div data-intro className="flex flex-wrap gap-3">
                <button data-interactive type="button" className={primaryAction} onClick={openExperiment}>Experimentar esta carreira<ArrowRight data-arrow size={17} aria-hidden="true" /></button>
                <button data-interactive type="button" className={secondaryAction} onClick={() => { const target = rootRef.current?.querySelector('#other-careers'); if (target) scrollTo(target); }}>Ver outras carreiras</button>
              </div>
            </div>
            <div className="career-photo hidden lg:block" aria-hidden="true"><img src={escritorio} alt="" /></div>
          </div>
        </section>

        {!isRecommended && <button type="button" className="inline-flex w-fit items-center gap-2 rounded text-sm text-proveup-orange hover:text-proveup-orange focus-visible:outline-2 focus-visible:outline-proveup-orange" onClick={() => showCareer(assessment.recommendedCareer)}><ArrowLeft size={16} aria-hidden="true" />Voltar à minha recomendação: {careers[assessment.recommendedCareer].title}</button>}

        <section data-reveal aria-labelledby="why-title" className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 id="why-title" className="max-w-sm text-2xl font-semibold leading-snug tracking-tight">{isRecommended ? 'O que pesou no seu resultado' : 'O que conecta você a essa área'}</h2>
          <p className="text-sm leading-7 text-gray-300 sm:text-base">{explanation ?? 'Conheça as atividades desta área e experimente o exercício abaixo para perceber o que desperta seu interesse.'}</p>
        </section>

        <section data-reveal aria-labelledby="activities-title">
          <div className="career-section-heading"><span>01</span><h2 id="activities-title">O trabalho no dia a dia</h2></div>
          <div data-activities className="grid gap-x-8 md:grid-cols-3">
            {presentation.activities.map((activity, index) => <article key={activity} className="career-activity"><span>{String(index + 1).padStart(2, '0')}</span><p>{activity}</p></article>)}
          </div>
        </section>

        <section data-reveal ref={experimentRef} aria-labelledby="challenge-title" className="career-experiment">
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm font-medium text-proveup-orange">Teste na prática</span><span className="inline-flex items-center gap-2 text-xs text-gray-300"><Clock size={15} aria-hidden="true" />{presentation.challenge.duration}</span></div>
          <h2 id="challenge-title" className="mt-4 text-2xl font-semibold tracking-tight">{presentation.challenge.title}</h2>
          <p className="mb-2 mt-3 max-w-2xl text-sm leading-6 text-gray-300">{presentation.challenge.description}</p>
          <AnimatedDisclosure key={displayed.career} title="Ver o passo a passo" open={challengeOpen} onToggle={() => setChallengeOpen(value => !value)}>
            <ol className="space-y-4">
              {presentation.challenge.steps.map((step, index) => <li key={step} className="flex items-start gap-4 text-sm leading-6 text-gray-200"><span className="font-semibold text-proveup-orange">{index + 1}.</span><span>{step}</span></li>)}
            </ol>
            <div className="mt-6 border-t border-white/10 pt-5"><h3 className="text-sm font-semibold">Depois de experimentar</h3><p className="mt-2 text-sm leading-6 text-gray-300">{presentation.challenge.reflection}</p></div>
          </AnimatedDisclosure>
        </section>

        <section data-reveal aria-labelledby="skills-title" className="grid gap-6 md:grid-cols-2">
          <div><div className="career-section-heading"><span>02</span><h2 id="skills-title">O que você vai aprender</h2></div><ul className="mt-4 space-y-3">{profile.skills.map(skill => <li key={skill} className="flex items-start gap-3 text-sm leading-6 text-gray-300"><Check size={17} className="mt-1 shrink-0 text-proveup-orange" aria-hidden="true" />{skill}</li>)}</ul></div>
          <div className="border-t border-white/10 pt-5 md:border-t-0 md:border-l md:pl-8 md:pt-0"><h3 className="text-base font-semibold">Continue explorando</h3><div className="mt-4 flex flex-wrap gap-2">{profile.areas.map(area => <span key={area} className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-300">{area}</span>)}</div>
            {displayed.career === 'frontend' ? <><p className="mt-5 text-sm leading-6 text-gray-300">Conheça os primeiros conteúdos no mapa de habilidades de Front-end.</p><Link className={`${secondaryAction} mt-4`} to="/map">Abrir mapa de habilidades<ArrowRight size={16} aria-hidden="true" /></Link></> : <p className="mt-5 text-sm leading-6 text-gray-400">A trilha de estudos desta carreira ainda está em preparação. Você já pode começar pela atividade proposta acima.</p>}
          </div>
        </section>

        <section data-reveal className="border-y border-white/10 py-2"><AnimatedDisclosure title="Entenda sua afinidade" open={breakdownOpen} onToggle={() => setBreakdownOpen(value => !value)}>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">{[{ label: 'Preferências comportamentais', value: displayed.comportamento, weight: '40% do resultado' }, { label: 'Interesses profissionais', value: displayed.interesse, weight: '60% do resultado' }].map(item => <div key={item.label} className="rounded-xl bg-white/5 p-4"><div className="flex flex-wrap items-center justify-between gap-2 text-sm"><span>{item.label}</span><strong className="text-proveup-orange">{format(item.value)}%</strong></div><p className="mt-2 text-xs text-gray-400">{item.weight}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><div className="h-full rounded-full bg-proveup-orange" style={{ width: `${item.value}%` }} /></div></div>)}</div>
          <p className="mt-4 text-xs leading-6 text-gray-400">Os índices combinam as 20 respostas do questionário. Cada carreira é avaliada separadamente, por isso os percentuais não precisam somar 100%. Esta é uma orientação inicial para explorar interesses, sem prever seu sucesso profissional.</p>
        </AnimatedDisclosure></section>

        <section data-reveal id="other-careers" aria-labelledby="others-title" className="scroll-mt-6">
          <div className="career-section-heading"><span>03</span><h2 id="others-title">E se você explorar outra área?</h2></div><p className="mt-2 text-sm text-gray-400">Compare as atividades e descubra outras possibilidades.</p>
          <div className="mt-5 grid gap-x-10 sm:grid-cols-2">
            {assessment.ranking.filter(result => result.career !== displayed.career).map(result => <button type="button" key={result.career} data-interactive className="career-alternative" onClick={() => showCareer(result.career)}><div className="min-w-0 flex-1"><span className="text-xs text-gray-400">{result.career === assessment.recommendedCareer ? 'Sua recomendação principal' : 'Outra possibilidade'}</span><h3 className="mt-1 text-base font-semibold">{careers[result.career].title}</h3><span className="mt-2 inline-flex items-center gap-2 text-xs text-proveup-orange">Conhecer a carreira<ArrowRight size={14} aria-hidden="true" /></span></div><strong className="shrink-0">{format(result.afinidade)}%</strong><ArrowRight data-arrow size={18} aria-hidden="true" /></button>)}
          </div>
        </section>
      </main>
      <footer className="border-t border-white/5 px-5 py-7 text-center text-xs text-gray-500">ProveUP · Seu desenvolvimento começa aqui.</footer>
    </div>
  );
}

export function QuestionnaireResult() {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [loaded, setLoaded] = useState<{ id: string; data?: AssessmentResult; error?: string } | null>(null);
  useEffect(() => {
    if (!assessmentId) return;
    let active = true;
    loadAssessment(assessmentId).then(data => { if (active) setLoaded({ id: assessmentId, data }); })
      .catch(error => { if (active) setLoaded({ id: assessmentId, error: error instanceof Error ? error.message : 'Não foi possível carregar o resultado.' }); });
    return () => { active = false; };
  }, [assessmentId]);
  const current = loaded?.id === assessmentId ? loaded : null;
  if (current?.data) return <CareerPresentation key={current.id} assessment={current.data} />;
  return <main className="career-page flex min-h-screen flex-col items-center justify-center gap-6 bg-[#161616] p-8 text-center text-white"><img src={logo} alt="ProveUP" className="mb-4 w-36" /><p role={current?.error ? 'alert' : 'status'}>{current?.error || (!assessmentId ? 'Responda ao questionário para conhecer suas afinidades.' : 'Preparando sua recomendação…')}</p>{current?.error && <button className={primaryAction} onClick={() => window.location.reload()}>Tentar novamente</button>}{(current?.error || !assessmentId) && <button className={secondaryAction} onClick={() => navigate('/questionnaire')}>Responder questionário</button>}</main>;
}
