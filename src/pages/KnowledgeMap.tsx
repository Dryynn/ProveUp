import React, { useState } from 'react';
import { Home, Compass, LayoutDashboard, Clock, Trophy, BookOpen, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo-proveup.svg'; // Assuming this exists from previous files

// --- Tipos de Dados ---
type SkillLevel = 'locked' | 'explorando' | 'estudando' | 'consolidando';

interface Mission {
  id: string;
  title: string;
  type: 'video' | 'leitura' | 'pratica';
  url: string;
  completed: boolean;
}

interface Session {
  id: string;
  title: string;
  missions: Mission[];
}

interface TrackNode {
  id: string;
  title: string;
  level: SkillLevel;
  position: { row: number, col: number };
  sessions: Session[];
}

// --- Dados Iniciais (Mock) ---
const MOCK_DATA: Record<string, TrackNode> = {
  html: {
    id: 'html',
    title: 'HTML',
    level: 'explorando',
    position: { row: 1, col: 1 },
    sessions: [
      {
        id: 'html-s1',
        title: 'Introdução e Base',
        missions: [
          { id: 'm1', title: 'O que é a Web e como o HTML funciona?', type: 'video', url: '#', completed: false },
          { id: 'm2', title: 'Crie sua primeira página', type: 'pratica', url: '#', completed: false },
        ]
      },
      {
        id: 'html-s2',
        title: 'Semântica Web',
        missions: [
          { id: 'm3', title: 'Tags Semânticas Essenciais', type: 'leitura', url: '#', completed: false },
          { id: 'm4', title: 'Acessibilidade na prática', type: 'video', url: '#', completed: false },
        ]
      }
    ]
  },
  css: {
    id: 'css',
    title: 'CSS',
    level: 'locked',
    position: { row: 1, col: 2 },
    sessions: []
  },
  js: {
    id: 'js',
    title: 'JavaScript',
    level: 'locked',
    position: { row: 2, col: 1 },
    sessions: []
  },
  ui: {
    id: 'ui',
    title: 'UI Design',
    level: 'locked',
    position: { row: 0, col: 1 },
    sessions: []
  },
  ux: {
    id: 'ux',
    title: 'UX Design',
    level: 'locked',
    position: { row: 0, col: 2 },
    sessions: []
  }
};

// --- Componentes Auxiliares ---

// Hexágono
const Hexagon = ({ title, level, isSelected, onClick }: { title: string, level: SkillLevel, isSelected: boolean, onClick: () => void }) => {
  // Cores baseadas no nível
  const getLevelColor = () => {
    switch (level) {
      case 'explorando': return 'bg-[#EE7A2F] text-white'; // Laranja
      case 'estudando': return 'bg-[#E1A902] text-white'; // Amarelo
      case 'consolidando': return 'bg-[#15A12F] text-white'; // Verde
      default: return 'bg-[#262626] text-gray-500'; // Locked / Cinza
    }
  };

  return (
    <div 
      onClick={level !== 'locked' ? onClick : undefined}
      className={`
        relative flex items-center justify-center cursor-pointer transition-transform duration-300
        w-32 h-36 lg:w-40 lg:h-44 
        ${level !== 'locked' ? 'hover:scale-105' : 'opacity-60 cursor-not-allowed'}
        ${isSelected ? 'drop-shadow-[0_0_15px_rgba(238,122,47,0.5)] z-10' : ''}
      `}
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      }}
    >
      <div className={`absolute inset-0 ${getLevelColor()} flex flex-col items-center justify-center p-4 text-center border-1 border-[#161616]`}>
         <span className="font-semibold text-sm lg:text-lg">{title}</span>
      </div>
    </div>
  );
};


// --- Página Principal ---
export default function KnowledgeMap() {
  const [nodes, setNodes] = useState(MOCK_DATA);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = selectedNodeId ? nodes[selectedNodeId] : null;

  // Atualiza o progresso de uma missão
  const toggleMission = (nodeId: string, sessionId: string, missionId: string) => {
    setNodes(prev => {
      const newNodes = { ...prev };
      
      const node = {
        ...newNodes[nodeId],
        sessions: newNodes[nodeId].sessions.map(session => {
          if (session.id !== sessionId) return session;
          return {
            ...session,
            missions: session.missions.map(mission => {
              if (mission.id !== missionId) return mission;
              return { ...mission, completed: !mission.completed };
            })
          };
        })
      };

      newNodes[nodeId] = node;

      // Lógica de mudança de nível baseada no progresso (Simples)
      const totalMissions = node.sessions.reduce((acc, s) => acc + s.missions.length, 0);
      const completedMissions = node.sessions.reduce((acc, s) => acc + s.missions.filter(m => m.completed).length, 0);
      
      if (completedMissions === 0) node.level = 'explorando';
      else if (completedMissions < totalMissions) node.level = 'estudando';
      else node.level = 'consolidando';

      // Se concluiu HTML, desbloqueia CSS e JS
      if (nodeId === 'html' && completedMissions === totalMissions) {
        newNodes.css = { ...newNodes.css, level: 'explorando' };
        newNodes.js = { ...newNodes.js, level: 'explorando' };
      }

      return newNodes;
    });
  };

  // Calcula progresso total da área
  const calculateProgress = (node: TrackNode) => {
    const total = node.sessions.reduce((acc, s) => acc + s.missions.length, 0);
    if (total === 0) return 0;
    const completed = node.sessions.reduce((acc, s) => acc + s.missions.filter(m => m.completed).length, 0);
    return Math.round((completed / total) * 100);
  };


  return (
    <div className="min-h-screen bg-[#161616] text-white flex font-sans overflow-hidden">
      
      {/* Sidebar Esquerda (Navegação) */}
      <aside className="w-[264px] border-r border-[#262626] flex-shrink-0 flex flex-col items-center py-6 h-screen sticky top-0 hidden lg:flex">
        <div className="w-full px-6 mb-8 flex justify-center">
            <img src={logo} alt="ProveUP" className="h-10" />
        </div>

        <nav className="flex flex-col gap-3 w-full px-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <Home size={20} /> Página Inicial
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white bg-gradient-to-r from-[#ee7a2f] to-[#ea3323] rounded-xl font-medium shadow-lg">
            <Compass size={20} /> Mapa de Habilidades
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <Clock size={20} /> Linha do Tempo
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <Trophy size={20} /> Conquistas
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <BookOpen size={20} /> Central de conteúdo
          </a>
        </nav>

        <div className="mt-auto w-full px-4 border-t border-[#262626] pt-6 flex flex-col gap-3">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <Settings size={20} /> Configurações
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-[#262626] rounded-xl transition-colors">
            <LogOut size={20} /> Logout
          </a>
        </div>
      </aside>

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        
        {/* Header / Trilha Atual */}
        <header className="p-8 pb-0">
          <div className="bg-[#262626] rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-[#ee7a2f]">
                <Compass size={32} />
              </div>
              <div>
                <p className="text-white/50 text-sm mb-1 font-light">Trilha atual:</p>
                <h1 className="text-2xl font-semibold">Desenvolvimento Front-End</h1>
                <p className="text-white/50 text-xs mt-1">8 áreas em desenvolvimento</p>
              </div>
            </div>
            
            <div className="flex gap-4">
               {/* Legenda */}
               <div className="flex gap-6 items-center text-xs text-white/60">
                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EE7A2F]"></span> Explorando</div>
                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E1A902]"></span> Estudando</div>
                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#15A12F]"></span> Consolidando</div>
               </div>
            </div>
          </div>
        </header>

        {/* Mapa (Colmeia) */}
        <div className="flex-1 flex items-center justify-center relative p-8">
            <p className="absolute top-4 left-8 text-white/40 text-sm">Clique em uma área para ver o guia de estudos.</p>
            
            {/* Grid Simples (Mock visual da colmeia) */}
            <div className="relative w-[500px] h-[500px]">
                {/* Ajustando posições baseadas numa grid em colmeia simples */}
                {/* Coluna 1 (Meio) */}
                <div className="absolute top-[30%] left-[17%]">
                    <Hexagon {...nodes.html} isSelected={selectedNodeId === 'html'} onClick={() => setSelectedNodeId('html')} />
                </div>
                <div className="absolute top-[66%] left-[17%]">
                    <Hexagon {...nodes.js} isSelected={selectedNodeId === 'js'} onClick={() => setSelectedNodeId('js')} />
                </div>

                {/* Coluna 2 (Baixo/Cima) */}
                <div className="absolute top-[12.5%] left-[50%]">
                    <Hexagon {...nodes.ui} isSelected={selectedNodeId === 'ui'} onClick={() => setSelectedNodeId('ui')} />
                </div>
                <div className="absolute top-[48.5%] left-[50%]">
                    <Hexagon {...nodes.css} isSelected={selectedNodeId === 'css'} onClick={() => setSelectedNodeId('css')} />
                </div>
            </div>
        </div>
      </main>

      {/* Painel Lateral Direito (Drawer de Curadoria) */}
      <aside className={`
        w-[400px] border-l border-[#262626] bg-[#1a1a1a] flex-shrink-0 flex flex-col h-screen overflow-y-auto transition-all duration-300
        ${selectedNode ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-[400px]'}
        absolute right-0 lg:static z-50
      `}>
        {selectedNode ? (
          <div className="p-8 flex flex-col h-full">
            
            {/* Cabeçalho do Painel */}
            <div className="mb-8">
              <button 
                className="text-white/50 hover:text-white mb-4 lg:hidden"
                onClick={() => setSelectedNodeId(null)}
              >
                ← Voltar para o Mapa
              </button>
              <h2 className="text-sm uppercase tracking-widest text-white/50 mb-2">Guia de Estudos</h2>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#ee7a2f] to-[#ea3323] bg-clip-text text-transparent">
                {selectedNode.title}
              </h3>
              
              <div className="mt-6 flex items-center gap-4">
                 <div className="flex-1 bg-[#262626] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ee7a2f] to-[#ea3323] transition-all duration-500"
                      style={{ width: `${calculateProgress(selectedNode)}%` }}
                    />
                 </div>
                 <span className="text-sm font-semibold">{calculateProgress(selectedNode)}%</span>
              </div>
            </div>

            {/* Sessões e Missões */}
            {selectedNode.sessions.length > 0 ? (
                <div className="flex flex-col gap-8 flex-1">
                {selectedNode.sessions.map((session) => (
                    <div key={session.id} className="flex flex-col gap-4">
                    <h4 className="text-lg font-medium border-b border-white/10 pb-2">{session.title}</h4>
                    
                    <ul className="flex flex-col gap-3">
                        {session.missions.map((mission) => (
                        <li 
                            key={mission.id}
                            className={`
                            flex items-start gap-4 p-4 rounded-xl border transition-colors
                            ${mission.completed ? 'bg-[#15a12f]/10 border-[#15a12f]/30' : 'bg-[#262626] border-transparent hover:border-white/20'}
                            `}
                        >
                            <button 
                                onClick={() => toggleMission(selectedNode.id, session.id, mission.id)}
                                className={`
                                shrink-0 w-6 h-6 rounded flex items-center justify-center border mt-0.5 transition-colors
                                ${mission.completed ? 'bg-[#15a12f] border-[#15a12f]' : 'border-white/30 hover:border-white/60'}
                                `}
                            >
                                {mission.completed && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                            </button>
                            
                            <div className="flex flex-col flex-1">
                                <a href={mission.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline hover:text-[#ee7a2f] transition-colors leading-tight mb-1">
                                    {mission.title}
                                </a>
                                <span className="text-[10px] uppercase text-white/40 font-semibold tracking-wider">
                                    {mission.type === 'video' ? '📺 Vídeo' : mission.type === 'leitura' ? '📄 Leitura' : '💻 Prática'}
                                </span>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-white/40">
                    <Compass size={48} className="mb-4 opacity-20" />
                    <p>Esta área ainda está bloqueada ou sem conteúdo.</p>
                    <p className="text-sm mt-2">Complete as áreas anteriores para desbloquear.</p>
                </div>
            )}

          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center h-full text-center text-white/40">
            {/* Placeholder quando nada está selecionado (Mostra Últimas atualizações) */}
            <h3 className="text-xl font-medium mb-4 text-white">Últimas Atualizações</h3>
            <p className="text-sm">Clique em uma área no mapa para ver o guia de estudos.</p>
          </div>
        )}
      </aside>

    </div>
  );
}
