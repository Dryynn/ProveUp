import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo-proveup.svg";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/useAuthStore";
import { useToastStore } from "../store/useToastStore";
import { 
    ShieldCheck, 
    Users, 
    FileSpreadsheet, 
    Compass, 
    KeyRound, 
    LogOut, 
    UserPlus, 
    Activity,
    Award,
    ExternalLink,
    Clock
} from "lucide-react";

export function AdminDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const addToast = useToastStore((state) => state.addToast);

    const handleLogout = () => {
        logout();
        addToast("Sessão administrativa finalizada com sucesso.", "success");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-proveup-dark text-white flex flex-col">
            {/* Topbar Administrativa */}
            <header className="border-b border-zinc-800 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard">
                            <img src={logo} alt="ProveUP" className="w-36" />
                        </Link>
                        <span className="hidden sm:inline-block h-6 w-px bg-zinc-700" />
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-proveup-orange/15 border border-proveup-orange/30 text-proveup-orange text-xs font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Painel do Administrador
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-white">{user?.name || "Administrador do Sistema"}</p>
                            <p className="text-xs text-gray-400">{user?.email || "admin@proveup.com.br"}</p>
                        </div>
                        <Button 
                            variant="secondary" 
                            className="!w-auto px-4 py-1.5 h-9 text-xs flex items-center gap-1.5 border-zinc-700 text-gray-300 hover:text-white hover:border-red-500 hover:bg-red-500/10 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-3.5 h-3.5 text-red-400" />
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-8">
                {/* Banner de Boas-Vindas */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-800 p-8 border border-white/5 shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-proveup-orange/20 text-proveup-orange text-xs font-semibold mb-3">
                            <Activity className="w-3.5 h-3.5" />
                            Gestão Ativa & Privilégios Concedidos
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                            Bem-vindo ao Controle Geral,{" "}
                            <span className="bg-linear-to-r from-proveup-orange to-proveup-dark-orange bg-clip-text text-transparent">
                                {user?.name ? user.name.split(" ")[0] : "Administrador"}!
                            </span>
                        </h1>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Você possui acesso administrativo irrestrito à plataforma ProveUP. Acompanhe os cadastros de usuários, gerencie critérios de afinidade profissional e monitore os resultados dos assessments comportamentais.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/admin/register">
                                <Button variant="primary" className="!w-auto px-5 h-10 text-sm flex items-center gap-2 font-medium cursor-pointer">
                                    <UserPlus className="w-4 h-4" />
                                    Cadastrar Outro Administrador
                                </Button>
                            </Link>
                            <Link to="/map">
                                <Button variant="secondary" className="!w-auto px-5 h-10 text-sm flex items-center gap-2 border-zinc-700 text-white cursor-pointer">
                                    <Compass className="w-4 h-4 text-proveup-orange" />
                                    Mapa de Carreiras
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-proveup-orange/15 to-transparent pointer-events-none hidden lg:block" />
                </div>

                {/* Grid de Métricas Principais */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#262626] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400">Total de Usuários</span>
                            <div className="w-9 h-9 rounded-xl bg-proveup-orange/10 flex items-center justify-center text-proveup-orange">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-white">128</span>
                            <span className="text-xs text-emerald-400 ml-2 font-medium">+14% este mês</span>
                        </div>
                        <p className="text-[11px] text-gray-500">Candidatos e profissionais ativos</p>
                    </div>

                    <div className="bg-[#262626] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400">Questionários Concluídos</span>
                            <div className="w-9 h-9 rounded-xl bg-proveup-orange/10 flex items-center justify-center text-proveup-orange">
                                <FileSpreadsheet className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-white">94</span>
                            <span className="text-xs text-emerald-400 ml-2 font-medium">73% conversão</span>
                        </div>
                        <p className="text-[11px] text-gray-500">Mapeamentos de perfil finalizados</p>
                    </div>

                    <div className="bg-[#262626] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400">Trilhas Recomendadas</span>
                            <div className="w-9 h-9 rounded-xl bg-proveup-orange/10 flex items-center justify-center text-proveup-orange">
                                <Award className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-white">8</span>
                            <span className="text-xs text-proveup-orange ml-2 font-medium">Eng. Software & Dados</span>
                        </div>
                        <p className="text-[11px] text-gray-500">Caminhos e afinidades cadastrados</p>
                    </div>

                    <div className="bg-[#262626] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400">Segurança da Organização</span>
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <KeyRound className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-emerald-400">Chave Ativa</span>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">PROVEUP_ADMIN_2026</p>
                        </div>
                        <p className="text-[11px] text-gray-500">Autenticação JWT com Role ADMIN</p>
                    </div>
                </div>

                {/* Seção Informativa de Sessão do Administrador */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Dados da Conta do Administrador */}
                    <div className="bg-[#262626] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="w-5 h-5 text-proveup-orange" />
                                <h3 className="text-lg font-bold text-white">Sua Conta de Gestão</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 bg-zinc-900/60 rounded-xl">
                                    <span className="text-xs text-gray-400 block">Nome Registrado</span>
                                    <span className="text-white font-medium">{user?.name || "Administrador"}</span>
                                </div>
                                <div className="p-3 bg-zinc-900/60 rounded-xl">
                                    <span className="text-xs text-gray-400 block">E-mail Institucional</span>
                                    <span className="text-white font-medium">{user?.email || "admin@proveup.com.br"}</span>
                                </div>
                                <div className="p-3 bg-zinc-900/60 rounded-xl flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Nível de Permissão</span>
                                        <span className="text-proveup-orange font-semibold">{user?.role || "ADMIN"}</span>
                                    </div>
                                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-proveup-orange/20 text-proveup-orange border border-proveup-orange/30">
                                        SUPERUSER
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-gray-400 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            Sessão autenticada via token Bearer JWT
                        </div>
                    </div>

                    {/* Atalhos Rápidos para Testes e Validações */}
                    <div className="lg:col-span-2 bg-[#262626] border border-white/5 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-white mb-2">Ações Rápidas do Administrador</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Navegue pelas áreas principais do sistema para auditar fluxos e avaliar a experiência dos usuários.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link 
                                to="/pre-questionnaire" 
                                className="group p-4 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-proveup-orange/40 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white group-hover:text-proveup-orange transition-colors">
                                            Questionário de Perfil
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-proveup-orange" />
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Inicie o fluxo de avaliação contínua em formato Stepper e Likert.
                                    </p>
                                </div>
                                <span className="text-[11px] text-proveup-orange font-medium mt-4 block">Visualizar questionário &rarr;</span>
                            </Link>

                            <Link 
                                to="/map" 
                                className="group p-4 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-proveup-orange/40 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white group-hover:text-proveup-orange transition-colors">
                                            Mapa de Conhecimento
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-proveup-orange" />
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Acesse o mapa visual interativo de habilidades e trilhas de aprendizagem.
                                    </p>
                                </div>
                                <span className="text-[11px] text-proveup-orange font-medium mt-4 block">Acessar mapa &rarr;</span>
                            </Link>

                            <Link 
                                to="/admin/register" 
                                className="group p-4 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-proveup-orange/40 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white group-hover:text-proveup-orange transition-colors">
                                            Novo Cadastro de Administrador
                                        </h4>
                                        <UserPlus className="w-4 h-4 text-gray-500 group-hover:text-proveup-orange" />
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Conceda acesso a novos gestores e mentores institucionais.
                                    </p>
                                </div>
                                <span className="text-[11px] text-proveup-orange font-medium mt-4 block">Ir para tela de cadastro &rarr;</span>
                            </Link>

                            <Link 
                                to="/login" 
                                className="group p-4 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-proveup-orange/40 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white group-hover:text-proveup-orange transition-colors">
                                            Tela de Login Geral
                                        </h4>
                                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-proveup-orange" />
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Retorne à tela de autenticação para testar acessos convencionais.
                                    </p>
                                </div>
                                <span className="text-[11px] text-proveup-orange font-medium mt-4 block">Acessar login &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
