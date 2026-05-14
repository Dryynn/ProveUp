import logo from "../assets/logo-proveup.svg";
import escritorio from "../assets/Intersect.png";
import { useNavigate } from "react-router-dom";

export function QuestionnaireResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#161616] text-white font-sans">
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

            {/* Orange Card (Hero Result) */}
            <div className="w-full rounded-[34px] bg-linear-to-r from-[#ee7a2f] to-[#ea3323] p-10 lg:p-12 flex flex-col relative drop-shadow-[0px_0px_15px_rgba(255,102,0,0.45)]">
                <div className="flex flex-col gap-7">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="shrink-0">
                                <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M71.3 11.5L80.5 20.7L32.2 69L11.5 73.6L16.1 52.9L64.4 4.6C66.3 2.7 69.4 2.7 71.3 4.6L71.3 11.5ZM16.1 52.9L25.3 62.1L64.4 23L55.2 13.8L16.1 52.9ZM69 13.8L73.6 18.4L78.2 13.8L73.6 9.2L69 13.8Z" fill="white" fillOpacity="0.8"/>
                                </svg>
                            </span>
                            <div className="flex flex-col">
                                <span className="text-lg lg:text-xl font-normal text-white/90">A trilha recomendada para você é:</span>
                                <h1 className="text-4xl lg:text-[50px] font-bold leading-tight">Design & Criatividade</h1>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-end shrink-0 text-right">
                            <span className="text-5xl lg:text-[50px] font-bold leading-none">%95</span>
                            <span className="text-lg lg:text-xl font-normal mt-1">De afinidade</span>
                        </div>
                    </div>
                    
                    <p className="text-lg lg:text-xl font-normal leading-normal text-white">
                        A Trilha de Design e Criatividade foi desenvolvida para usuários que demonstram afinidade com expressão visual, pensamento criativo e construção estética. Ela reúne conhecimentos essenciais para quem deseja ingressar ou evoluir em áreas relacionadas à criação, seja no design digital, gráfico, de interfaces ou de marcas.
                    </p>
                </div>
            </div>
        </section>

        {/* Detailed Info Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Why indicate this track */}
            <div className="bg-[#262626] p-10 lg:px-[92px] lg:py-[34px] rounded-[52px] shadow-[8px_8px_15px_rgba(0,0,0,0.15)] flex flex-col justify-center">
                <div className="flex items-center gap-8 mb-10">
                    <span className="shrink-0 text-[#ee7a2f]">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor">
                            <path d="M40 40H10V10H14V36H40V40ZM18 32H22V18H18V32ZM26 32H30V14H26V32ZM34 32H38V22H34V32Z" />
                        </svg>
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-normal bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent">Veja abaixo o</h3>
                        <h4 className="text-[32px] font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent leading-tight">Porquê indicamos essa trilha:</h4>
                    </div>
                </div>
                <ul className="flex flex-col gap-5">
                    {[
                        "Interesse em composição visual",
                        "Afinidade com atividades criativas",
                        "Facilidade em gerar ideias",
                        "Compreensão de elementos e estética",
                        "Interesse em design digital",
                        "Preferência em aprendizado prático"
                    ].map((item, id) => (
                        <li key={id} className="flex items-center gap-5 text-xl font-normal text-white">
                            <span className="shrink-0 text-white">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            </span> 
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* What you will develop */}
            <div className="bg-[#262626] p-10 lg:px-[92px] lg:py-[34px] rounded-[52px] shadow-[8px_8px_15px_rgba(0,0,0,0.15)] flex flex-col justify-center">
                <div className="flex items-center gap-8 mb-10">
                    <span className="shrink-0 text-[#ee7a2f]">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor">
                            <path d="M25 5L10 15V25C10 33.3 16.7 40 25 40C33.3 40 40 33.3 40 25V15L25 5ZM25 15L35 25H15L25 15Z" />
                        </svg>
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-xl font-normal bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent">Veja abaixo</h3>
                        <h4 className="text-[32px] font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent leading-tight">O que você vai desenvolver:</h4>
                    </div>
                </div>
                <ul className="flex flex-col gap-5">
                    {[
                        "Criatividade aplicada",
                        "Domínio das cores e tipografia",
                        "Layout e composição visual",
                        "Fundamentos de UI/UX",
                        "Uso de ferramentas como Figma/Adobe",
                        "Construção de portfólio"
                    ].map((item, id) => (
                        <li key={id} className="flex items-center gap-5 text-xl font-normal text-white">
                            <span className="shrink-0 text-white">
                                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            </span> 
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* Related Areas */}
        <section className="flex flex-col gap-6 mt-4">
            <h4 className="text-2xl font-semibold text-white">Áreas relacionadas:</h4>
            <div className="flex flex-wrap gap-12 items-center">
                {["Criatividade", "Cores", "Tipografia", "Composição", "UI", "UX", "Ferramentas", "Portfólio"].map(area => (
                    <span key={area} className="px-[22px] py-[5px] bg-[#262626] shadow-[8px_8px_15px_rgba(0,0,0,0.15)] rounded-[40px] text-xl font-normal text-white cursor-default">
                        {area}
                    </span>
                ))}
                <button className="px-[39px] py-[4px] bg-transparent border border-[#ee7a2f] rounded-[14px] text-lg font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent hover:opacity-80 transition-opacity">Editar áreas</button>
            </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row justify-center gap-[89px] mt-8">
            <button className="px-[75px] py-[4px] h-[50px] rounded-[14px] bg-linear-to-r from-[#ee7a2f] to-[#ea3323] text-lg font-semibold text-white shadow-lg hover:opacity-90 transition-opacity" onClick={() => navigate("/questionnaire")}>Refazer questionário</button>
            <button className="px-[39px] py-[4px] h-[50px] w-full sm:w-[339px] border border-[#ee7a2f] rounded-[14px] text-lg font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent hover:bg-white/5 transition-all" onClick={() => navigate("/map")}>Seguir com essa trilha</button>
            <button className="px-[75px] py-[4px] h-[50px] w-full sm:w-[339px] rounded-[14px] bg-linear-to-r from-[#ee7a2f] to-[#ea3323] text-lg font-semibold text-white shadow-lg hover:opacity-90 transition-opacity">Explorar outras trilhas</button>
        </section>

        {/* Extra Tracks Section */}
        <section className="mt-12">
            <h3 className="text-2xl font-semibold mb-10 text-white">Trilhas que você também pode gostar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                {[
                    { title: "Desenvolvimento front-end", affinity: 80, text: "Seu resultado mostra interesse em construção visual e lógica de páginas. A Trilha de Desenvolvimento Front-end se encaixa perfeitamente nos seus objetivos." },
                    { title: "Desenvolvimento back-end", affinity: 65, text: "As suas respostas indicam forte inclinação para resolver problemas complexos e construir a estrutura interna das aplicações. Por isso, sugerimos a Trilha de Back-end." },
                    { title: "Criação de banco de dados", affinity: 50, text: "Com base nas suas respostas, identificamos afinidade com organização, análise e estruturação de informações. A Trilha de Banco de Dados é a adequada para você." }
                ].map((track, i) => (
                    <div key={i} className="bg-[#262626] p-10 lg:px-[67px] lg:py-[36px] rounded-[24px] flex flex-col items-center gap-7 group hover:shadow-xl transition-all duration-300">
                        {/* Affinity Badge Circular */}
                        <div className="relative flex flex-col items-center">
                            <div className="relative w-[89px] h-[89px]">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle className="text-white/10" strokeWidth="6" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                                    <circle className="text-white" strokeWidth="6" strokeDasharray={264} strokeDashoffset={264 - (264 * track.affinity) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-normal text-white">{track.affinity}%</span>
                                </div>
                            </div>
                            <span className="text-xl font-light text-white mt-2">de afinidade</span>
                        </div>
                        
                        <div className="text-center">
                            <h4 className="text-[32px] font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent leading-tight mb-7">{track.title}</h4>
                            <p className="text-xl font-normal text-white leading-normal">
                                {track.text}
                            </p>
                        </div>
                        <button className="px-[75px] py-[4px] h-[35px] rounded-[14px] bg-linear-to-r from-[#ee7a2f] to-[#ea3323] text-lg font-semibold text-white mt-auto">Ver mais</button>
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
