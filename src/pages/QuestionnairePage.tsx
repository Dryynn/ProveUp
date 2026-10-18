import { loadQuestionnaire, submitAssessment } from '../services/assessments';
import type { Questionnaire } from '../services/assessments';
import { useEffect, useState } from "react";
import { StepIndicator } from "../components/StepIndicator";
import type { Step } from "../components/StepIndicator";
import { LikertScale } from "../components/LikertScale";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../store/useToastStore";

const STEPS: Step[] = [
  {
    id: "step1",
    number: "Passo 01",
    title: "Responda as perguntas",
    description: "Informe o quanto cada afirmação se aplica a você.",
  },
  {
    id: "step2",
    number: "Passo 02",
    title: "Analisamos seu perfil",
    description: "Com base nas suas respostas, identificamos seus interesses.",
  },
  {
    id: "step3",
    number: "Passo 03",
    title: "Criamos sua trilha personalizada",
    description: "Você receberá uma trilha de aprendizado exclusiva.",
  },
];


export function QuestionnairePage() {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [loadError, setLoadError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    let active = true;
    loadQuestionnaire().then(data => { if (active) setQuestionnaire(data); })
      .catch(error => { if (active) setLoadError(error instanceof Error ? error.message : 'Não foi possível carregar as perguntas.'); });
    return () => { active = false; };
  }, []);
  const questions = questionnaire?.questions.filter(q => q.stage === (currentPart === 1 ? 'comportamento' : 'interesse')) ?? [];
  const progress = currentPart === 1 ? "w-1/2" : "w-full";

  const handleNext = async () => {
    if (!questionnaire || isSubmitting) return;
    const unanswered = questions.filter((q) => answers[q.id] === undefined);
    
    if (unanswered.length > 0) {
      addToast("Por favor, responda todas as perguntas para prosseguir.", "error");
      return;
    }
    if (currentPart === 1) {
      setCurrentPart(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSubmitting(true);
      try {
        const result = await submitAssessment(questionnaire.version, answers);
        navigate('/result/' + result.id);
      } catch (error) {
        addToast(error instanceof Error ? error.message : 'Não foi possível calcular seu resultado.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (isSubmitting) return;
    if (currentPart === 2) {
      setCurrentPart(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/pre-questionnaire");
    }
  };

  return (
    <div className="min-h-screen bg-proveup-dark flex flex-col items-center py-10 px-4">
      {/* Header / Steps */}
      <div className="w-full max-w-4xl mb-12">
        <StepIndicator steps={STEPS} currentStepIndex={0} />
      </div>

      {/* Secondary Navigation (Part 2 only) */}
      {currentPart === 2 && (
        <div className="w-full max-w-2xl mb-8 flex items-center">
            <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
                <span className="text-lg">←</span> Página anterior
            </button>
        </div>
      )}

      {/* Progress Bar Area */}
      <div className="w-full max-w-2xl mb-16">
        <div className="flex flex-col items-center gap-2">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full bg-linear-to-r from-proveup-orange to-proveup-red ${progress} rounded-full transition-all duration-500 ease-in-out`} />
          </div>
          <span className="text-xs text-gray-500">Passo {currentPart} de 2</span>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-white text-center mb-8">{currentPart === 1 ? 'Como você prefere trabalhar?' : 'Quais atividades despertam seu interesse?'}</h1>
      {!questionnaire && !loadError && <p role="status" className="text-gray-300 mb-8">Carregando perguntas…</p>}
      {loadError && <div role="alert" className="text-white text-center mb-8"><p>{loadError}</p><Button className="mt-4" onClick={() => window.location.reload()}>Tentar novamente</Button></div>}
      {/* Questions List */}
      <div className="flex flex-col gap-12 w-full items-center mb-16 px-2">
        {questions.map((q) => (
          <div key={q.id} className="flex flex-col items-center gap-6 w-full max-w-2xl text-center">
            <h2 id={`${q.id}-label`} className="text-sm lg:text-base font-medium text-white px-4">
              {q.text}
            </h2>
            <LikertScale 
                questionId={q.id} 
                disabled={isSubmitting}
                value={answers[q.id] ?? null}
                onChange={(val) => setAnswers(prev => ({ ...prev, [q.id]: val }))}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4 w-full max-w-md pb-10">
        <Button className="h-12 flex-1" disabled={!questionnaire || isSubmitting} onClick={handleNext}>
          {isSubmitting ? "Calculando resultado…" : currentPart === 1 ? "Avançar" : "Finalizar"}
        </Button>
        <Button 
            disabled={isSubmitting}
            variant="secondary" 
            className="h-12 flex-1 bg-transparent border-gray-700 text-gray-400 hover:border-gray-500" 
            onClick={handleBack}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
