import logo from "../assets/logo-proveup.svg";
import escritorio from "../assets/Intersect.png";
import pencilLogo from "../assets/Icons/pencil.png"
import barChart from "../assets/Icons/bar-chart-Icon.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import penLogo from "../assets/Icons/pen.png";

export function QuestionnaireResult() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#161616] text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-4 lg:px-8 py-6 max-w-[1400px] mx-auto ">
        <img src={logo} alt="ProveUP" className="w-40" />
      </header>

      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 flex flex-col gap-10">

        {/* Hero Result Section */}
        <section className="w-full flex flex-col gap-6">
            {/* Background Image Area */}
            <div className="w-full h-64 lg:h-[400px] rounded-[2.5rem] overflow-hidden shrink-0">
                <img src={escritorio} alt="Workspace" className="w-full h-full object-cover object-center" />
            </div>

            {/* Orange Card (Hero Result) */}
            <div className="w-full rounded-[34px] bg-linear-to-r from-[#ee7a2f] to-[#ea3323] p-6 sm:p-10 lg:p-12 flex flex-col relative drop-shadow-[0px_0px_15px_rgba(255,102,0,0.45)]">
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <span className="shrink-0">
                                <img src={penLogo} alt="Caneta Logo" className="w-12 h-12 sm:w-auto sm:h-auto" />
                            </span>
                            <div className="flex flex-col">
                                <span className="text-base sm:text-lg lg:text-xl font-normal text-white/90">A trilha recomendada para você é:</span>
                                <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold leading-tight">Desenvolvimento Front-end</h1>
                            </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col items-center sm:items-end shrink-0 gap-2 sm:gap-0 sm:text-right">
                            <span className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-none">%95</span>
                            <span className="text-base sm:text-lg lg:text-xl font-normal mt-1">De afinidade</span>
                        </div>
                    </div>
                    
                    <p className="text-base sm:text-lg lg:text-xl font-normal leading-normal text-white">
                        A Trilha de Desenvolvimento Front-end foi desenvolvida para usuários que demonstram interesse na construção visual e lógica de páginas web. Ela reúne conhecimentos essenciais para quem deseja ingressar ou evoluir na criação de interfaces interativas, traduzindo design em código e garantindo a melhor experiência para o usuário.
                    </p>
                </div>
            </div>
        </section>

        {/* Detailed Info Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Why indicate this track */}
            <div className="bg-[#262626] p-6 sm:p-10 lg:px-[92px] lg:py-[34px] rounded-[34px] sm:rounded-[52px] shadow-[8px_8px_15px_rgba(0,0,0,0.15)] flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6 sm:mb-10">
                    <span className="shrink-0 text-[#ee7a2f]">
                        <img src={barChart} alt="" className="w-10 h-10 sm:w-auto sm:h-auto" />
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-lg sm:text-xl font-normal bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent">Veja abaixo o</h3>
                        <h4 className="text-2xl sm:text-[32px] font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent leading-tight">Porquê indicamos essa trilha:</h4>
                    </div>
                </div>
                <ul className="flex flex-col gap-5">
                    {[
                        "Interesse em construção visual",
                        "Afinidade com lógica de programação",
                        "Facilidade em criar interfaces",
                        "Compreensão de experiência do usuário",
                        "Interesse em tecnologias web",
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
            <div className="bg-[#262626] p-6 sm:p-10 lg:px-[92px] lg:py-[34px] rounded-[34px] sm:rounded-[52px] shadow-[8px_8px_15px_rgba(0,0,0,0.15)] flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6 sm:mb-10">
                    <span className="shrink-0 text-[#ee7a2f]">
                        <img src={pencilLogo} alt="Bar Chart" className="w-10 h-10 sm:w-auto sm:h-auto" />
                    </span>
                    <div className="flex flex-col">
                        <h3 className="text-lg sm:text-xl font-normal bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent">Veja abaixo</h3>
                        <h4 className="text-xl sm:text-[34px] font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent leading-tight">O que você vai desenvolver:</h4>
                    </div>
                </div>
                <ul className="flex flex-col gap-5">
                    {[
                        "Lógica de programação",
                        "Domínio de HTML, CSS e JS",
                        "Interfaces responsivas",
                        "Fundamentos de UI/UX",
                        "Uso de frameworks web",
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
        <section className="flex flex-col gap-6 mt-7">
            <h4 className="text-2xl font-semibold text-white">Áreas relacionadas:</h4>
            <div className="flex flex-wrap gap-12 items-center">
                {["Front-end", "Programação", "Web", "Interfaces", "UI", "UX", "Frameworks", "Portfólio"].map(area => (
                    <span key={area} className="px-[22px] py-[5px] bg-[#262626] shadow-[8px_8px_15px_rgba(0,0,0,0.15)] rounded-[40px] text-xl font-normal text-white cursor-default">
                        {area}
                    </span>
                ))}
                {/* <Button variant="secondary" className="px-[39px] h-auto py-[4px] rounded-[14px]! text-lg ">Editar áreas</Button> */}
            </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4 lg:gap-[89px] mt-8 sm:px-4">
            <Button variant="primary" className="w-full lg:w-[339px] lg:text-lg h-[50px] rounded-[14px] text-[15px] " onClick={() => navigate("/questionnaire")}>Refazer questionário</Button>
            <Button variant="secondary" className="w-full lg:w-[339px] md:text-lg h-[50px] rounded-[14px] text-[15px]" onClick={() => navigate("/map")}>Seguir com essa trilha</Button>
            <Button variant="primary" className="w-full lg:w-[339px] md:text-lg h-[50px] rounded-[14px] text-[15px]">Explorar outras trilhas</Button>
        </section>

        {/* Extra Tracks Section */}
        <section className="mt-16">
            <h3 className="text-2xl font-semibold mb-10 text-white">Trilhas que você também pode gostar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                {[
                    { title: "Desenvolvimento mobile", affinity: 80, text: "Seu resultado aponta para um interesse em criar soluções portáteis e interativas. A Trilha de Desenvolvimento Mobile é ideal para você construir aplicativos de sucesso." },
                    { title: "Desenvolvimento back-end", affinity: 65, text: "As suas respostas indicam forte inclinação para resolver problemas complexos e construir a estrutura interna das aplicações. Por isso, sugerimos a Trilha de Back-end." },
                    { title: "Criação de banco de dados", affinity: 50, text: "Com base nas suas respostas, identificamos afinidade com organização, análise e estruturação de informações. A Trilha de Banco de Dados é a adequada para você." }
                ].map((track, i) => (
                    <div key={i} className="bg-[#262626] p-6 sm:p-10 lg:px-[67px] lg:py-[36px] rounded-[24px] flex flex-col items-center gap-7 group hover:shadow-xl transition-all duration-300">
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
                            <h4 className="text-2xl sm:text-[32px] font-semibold bg-linear-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent leading-tight mb-4 sm:mb-7">{track.title}</h4>
                            <p className="text-base sm:text-xl font-normal text-white leading-normal">
                                {track.text}
                            </p>
                        </div>
                        <Button variant="primary" className="px-[75px] h-[35px] rounded-[14px]! text-lg mt-auto">Ver mais</Button>
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
