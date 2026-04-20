import logo from "../assets/logo-proveup.svg";
import escritorio from "../assets/Intersect.png";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export function QuestionnaireResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-proveup-dark text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <img src={logo} alt="ProveUP" className="w-40" />
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-proveup-orange overflow-hidden">
                <span className="text-sm font-bold">A</span>
            </div>
            <span className="text-gray-400 text-sm">▼</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col gap-10">
        <h2 className="text-gray-400 text-sm font-medium">Tela de resultado do questionário</h2>

        {/* Hero Result Section */}
        <section className="w-full flex flex-col gap-6">
            {/* Background Image Area */}
            <div className="w-full h-64 lg:h-[400px] rounded-[2.5rem] overflow-hidden shrink-0">
                <img src={escritorio} alt="Workspace" className="w-full h-full object-cover object-center" />
            </div>

            {/* Orange Card */}
            <div className="w-full rounded-[2.5rem] bg-linear-to-br from-proveup-orange to-proveup-dark-orange p-10 lg:p-12 flex flex-col relative shadow-[0_4px_20px_rgba(242,116,39,0.3)]">
                <div className="flex items-center gap-3 mb-6">
                    <span className="p-2 bg-white/20 rounded-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 10-4 4"></path><path d="m18 8-4-4"></path><path d="M18.4 2.6a2.1 2.1 0 0 1 3 3L16 21l-4 1 1-4Z"></path></svg>
                    </span>
                    <span className="text-sm font-medium text-white/90">A trilha recomendada para você é:</span>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="flex-1">
                        <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                            Design & Criatividade
                        </h1>
                        <p className="max-w-3xl text-sm lg:text-base text-white/90 leading-relaxed font-light">
                            A Trilha de Design e Criatividade foi desenvolvida para usuários que demonstram afinidade com expressão visual, pensamento criativo e construção estética. Ela reúne conhecimentos essenciais para quem deseja ingressar ou evoluir em áreas relacionadas à criação, seja no design digital, gráfico, de interfaces ou de marcas.
                        </p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pt-2 text-right">
                        <span className="text-5xl lg:text-6xl font-black">%95</span>
                        <span className="text-[10px] lg:text-xs tracking-widest text-white/80 mt-1">De afinidade</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Detailed Info Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Why indicate this track */}
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                    <span className="p-3 bg-red-500/10 rounded-xl">📊</span>
                    <div>
                        <h3 className="text-xs text-gray-500 uppercase tracking-widest">Veja abaixo o</h3>
                        <h4 className="text-xl font-bold">Porquê indicamos essa trilha:</h4>
                    </div>
                </div>
                <ul className="flex flex-col gap-4">
                    {[
                        "Interesse em composição visual",
                        "Afinidade com atividades criativas",
                        "Facilidade em gerar ideias",
                        "Compreensão de elementos e estética",
                        "Interesse em design digital",
                        "Preferência em aprendizado prático"
                    ].map((item, id) => (
                        <li key={id} className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="text-proveup-orange">✓</span> {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* What you will develop */}
            <div className="bg-[#1A1A1A] p-10 rounded-[2rem] border border-white/5">
                <div className="flex items-center gap-4 mb-8">
                    <span className="p-3 bg-blue-500/10 rounded-xl">🚀</span>
                    <div>
                        <h3 className="text-xs text-gray-500 uppercase tracking-widest">Veja abaixo</h3>
                        <h4 className="text-xl font-bold">O que você vai desenvolver:</h4>
                    </div>
                </div>
                <ul className="flex flex-col gap-4">
                    {[
                        "Criatividade aplicada",
                        "Domínio das cores e tipografia",
                        "Layout e composição visual",
                        "Fundamentos de UI/UX",
                        "Uso de ferramentas como Figma/Adobe",
                        "Construção de portfólio"
                    ].map((item, id) => (
                        <li key={id} className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="text-proveup-orange">✓</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* Related Areas */}
        <section className="flex flex-col gap-6 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Áreas relacionadas:</h4>
            <div className="flex flex-wrap gap-3 items-center">
                {["HTML", "CSS", "Javascript", "Responsividade", "UI Design", "Frameworks", "Projeto Real"].map(area => (
                    <span key={area} className="px-5 py-2.5 bg-[#1A1A1A] border border-white/5 rounded-full text-xs hover:border-white/20 transition-colors cursor-default text-gray-300">
                        {area}
                    </span>
                ))}
                <button className="px-5 py-2.5 bg-transparent border border-proveup-orange rounded-full text-xs text-proveup-orange hover:bg-proveup-orange/10 transition-colors ml-2">Editar áreas</button>
            </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <Button variant="secondary" className="px-8 h-12 w-full sm:w-auto" onClick={() => navigate("/questionnaire")}>Refazer questionário</Button>
            <Button variant="secondary" className="px-8 h-12 w-full sm:w-auto">Seguir com essa trilha</Button>
            <Button className="px-8 h-12 font-bold w-full sm:w-auto">Explorar outras trilhas</Button>
        </section>

        {/* Extra Tracks Placeholder */}
        <section className="mt-12">
            <h3 className="text-sm font-bold mb-10 text-white">Trilhas que você também pode gostar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {[
                    { title: "Desenvolvimento front-end", affinity: "95%" },
                    { title: "Desenvolvimento back-end", affinity: "65%" },
                    { title: "Criação de banco de dados", affinity: "50%" }
                ].map((track, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-8 rounded-[2rem] border border-white/5 flex flex-col items-center gap-6 group hover:border-proveup-orange/50 transition-all duration-300 relative mt-6">
                        {/* Affinity Badge */}
                        <div className="absolute -top-10 w-20 h-20 rounded-full border border-white/10 bg-[#1A1A1A] flex flex-col items-center justify-center shadow-lg">
                            <span className="text-sm font-bold text-proveup-orange">{track.affinity}</span>
                            <span className="text-[8px] uppercase text-gray-500 mt-1 text-center leading-none">de<br/>afinidade</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-center leading-tight mt-6 text-proveup-orange">{track.title}</h4>
                        <p className="text-xs text-gray-400 text-center leading-relaxed">
                            Seu resultado mostra interesse em estética e design. Além de uma percepção aguçada, a Trilha de front-end se encaixa perfeitamente nos seus objetivos.
                        </p>
                        <Button variant="secondary" className="h-10 text-xs w-full mt-auto">Ver mais</Button>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <footer className="py-20 text-center text-gray-600 text-sm">
        &copy; 2026 ProveUP - Todos os direitos reservados.
      </footer>
    </div>
  );
}
