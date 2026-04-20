import { useState, useEffect } from "react";
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

const QUESTIONS_PART_1 = [
  { id: "q1", text: "Tenho interesse em tecnologia e gosto de usar ferramentas digitais no meu dia a dia." },
  { id: "q2", text: "Me sinto motivado(a) ao resolver problemas analíticos ou desafios lógicos." },
  { id: "q3", text: "Atividades criativas, como design, escrita, arte ou marketing, fazem parte do que eu gosto de aprender." },
  { id: "q4", text: "Sou uma pessoa organizada e gosto de seguir processos estruturados." },
  { id: "q5", text: "Gosto de aprender coisas novas com frequência e explorar diferentes áreas." },
];

const QUESTIONS_PART_2 = [
  { id: "q6", text: "Gosto de trabalhar em equipe e me comunico bem com outras pessoas." },
  { id: "q7", text: "Prefiro tarefas que exigem criatividade em vez de rotinas repetitivas." },
  { id: "q8", text: "Me sinto confortável lidando com números, lógica ou informações detalhadas." },
  { id: "q9", text: "Tenho facilidade para planejar, organizar e estruturar projetos." },
  { id: "q10", text: "Me identifico com desafios que exigem pensamento crítico e tomada de decisão." },
];

export function QuestionnairePage() {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions = currentPart === 1 ? QUESTIONS_PART_1 : QUESTIONS_PART_2;
  const progress = currentPart === 1 ? "w-1/2" : "w-full";

  const handleNext = () => {
    const unanswered = questions.filter((q) => answers[q.id] === undefined);
    
    if (unanswered.length > 0) {
      addToast("Por favor, responda todas as perguntas para prosseguir.", "error");
      return;
    }
    if (currentPart === 1) {
      setCurrentPart(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/result");
    }
  };

  const handleBack = () => {
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

      {/* Questions List */}
      <div className="flex flex-col gap-12 w-full items-center mb-16 px-2">
        {questions.map((q) => (
          <div key={q.id} className="flex flex-col items-center gap-6 w-full max-w-2xl text-center">
            <h2 className="text-sm lg:text-base font-medium text-white px-4">
              {q.text}
            </h2>
            <LikertScale 
                questionId={q.id} 
                value={answers[q.id]}
                onChange={(val) => setAnswers(prev => ({ ...prev, [q.id]: val }))}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4 w-full max-w-md pb-10">
        <Button className="h-12 flex-1" onClick={handleNext}>
          {currentPart === 1 ? "Avançar" : "Finalizar"}
        </Button>
        <Button 
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
