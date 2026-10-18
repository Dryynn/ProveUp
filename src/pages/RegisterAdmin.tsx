import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToastStore } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";
import { apiRequest } from "../services/api";
import { 
    ShieldCheck, 
    Lock, 
    KeyRound, 
    Eye, 
    EyeOff, 
    ArrowLeft,
    Sparkles,
    HelpCircle
} from "lucide-react";

export function RegisterAdmin() {
    const navigate = useNavigate();
    const addToast = useToastStore((state) => state.addToast);
    const setAuth = useAuthStore((state) => state.setAuth);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [adminKey, setAdminKey] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [termoAdmin, setTermoAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
    const [showAdminKey, setShowAdminKey] = useState(false);
    const [showKeyHint, setShowKeyHint] = useState(false);

    const [errors, setErrors] = useState<{
        nome?: string;
        email?: string;
        adminKey?: string;
        senha?: string;
        confirmarSenha?: string;
        termoAdmin?: string;
    }>({});

    // Avaliação de força de senha
    const calculateStrength = (pass: string) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length >= 6) score += 1;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
        return score;
    };

    const passwordStrength = calculateStrength(senha);
    const strengthLabel = ["", "Fraca", "Moderada", "Boa", "Excelente"][passwordStrength];
    const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-emerald-500", "bg-green-400"][passwordStrength];

    const handleRegisterAdmin = async (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};

        if (!nome.trim()) {
            newErrors.nome = "Nome completo do administrador é obrigatório.";
        } else if (nome.trim().split(" ").length < 2) {
            newErrors.nome = "Insira nome e sobrenome.";
        }

        if (!email.trim()) {
            newErrors.email = "E-mail corporativo é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Formato de e-mail inválido.";
        }

        if (!adminKey.trim()) {
            newErrors.adminKey = "A chave de segurança administrativa é obrigatória.";
        }

        if (!senha) {
            newErrors.senha = "A senha é obrigatória.";
        } else if (senha.length < 6) {
            newErrors.senha = "A senha deve ter no mínimo 6 caracteres.";
        }

        if (!confirmarSenha) {
            newErrors.confirmarSenha = "Confirme a senha de administrador.";
        } else if (senha !== confirmarSenha) {
            newErrors.confirmarSenha = "As senhas não coincidem.";
        }

        if (!termoAdmin) {
            newErrors.termoAdmin = "É obrigatório aceitar o termo de governança e sigilo.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            addToast("Revise as pendências no formulário.", "error");
            return;
        }

        try {
            setLoading(true);
            const data = await apiRequest<{ user: any; token: string }>('/auth/register-admin', {
                method: 'POST',
                data: {
                    name: nome.trim(),
                    email: email.trim(),
                    password: senha,
                    adminKey: adminKey.trim(),
                },
            });

            setAuth(data.user, data.token);
            addToast("Administrador cadastrado com sucesso! Acesso liberado.", "success");
            navigate("/admin/dashboard");
        } catch (err: any) {
            addToast(err.message || "Erro ao realizar cadastro de administrador.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-proveup-dark flex flex-row gap-12 lg:gap-16 items-center justify-center p-4 lg:p-8 overflow-y-auto">
            {/* Esquerda: Imagem institucional com overlay de badge */}
            <div className="hidden lg:block relative shrink-0">
                <img
                    src={escritorio}
                    alt="Ambiente administrativo ProveUP"
                    className="w-auto max-h-[92vh] rounded-[3rem] object-cover shadow-2xl border border-white/5"
                />
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-proveup-orange/20 border border-proveup-orange/40 text-proveup-orange text-xs font-semibold backdrop-blur-md w-fit mb-3">
                        <ShieldCheck className="w-4 h-4 text-proveup-orange" />
                        Acesso de Alta Governança
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Painel de Gestão ProveUP</h3>
                    <p className="text-gray-300 text-sm max-w-sm">
                        Cadastre lideranças e administradores para gerenciar trilhas de competências, avaliar métricas e acompanhar o desenvolvimento de usuários.
                    </p>
                </div>
            </div>

            {/* Direita: Formulário Administrativo */}
            <div className="flex flex-col justify-center max-w-lg w-full py-6">
                <div className="flex items-center justify-between mb-4">
                    <img src={logo} alt="Logo ProveUP" className="w-44" />
                    <Link 
                        to="/login"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-proveup-orange transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Login
                    </Link>
                </div>

                {/* Badge de papel administrativo */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-proveup-orange/20 to-proveup-dark-orange/20 border border-proveup-orange/40 text-proveup-orange text-xs font-semibold w-fit mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    MODO ADMINISTRADOR (ADMIN)
                </div>

                <h1 className="text-4xl lg:text-5xl text-white font-extrabold mb-3 leading-tight tracking-tight">
                    Cadastro de <br />
                    <span className="bg-linear-to-br from-proveup-orange to-proveup-dark-orange bg-clip-text text-transparent">
                        Administrador
                    </span>
                </h1>

                <p className="text-gray-300 text-sm font-light mb-6 leading-relaxed">
                    Preencha os dados e informe a <strong className="text-white font-semibold">Chave de Segurança</strong> corporativa para criar uma conta com privilégios de gestão.
                </p>

                <form className="flex flex-col gap-3.5" onSubmit={handleRegisterAdmin}>
                    {/* Campo Nome */}
                    <Input 
                        idDaProp="nome-adm" 
                        placeholder="Ex: Carlos Eduardo de Oliveira" 
                        fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        error={errors.nome}
                    >
                        Nome completo do administrador
                    </Input>

                    {/* Campo E-mail */}
                    <Input 
                        idDaProp="email-adm" 
                        placeholder="admin@organizacao.com.br" 
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                    >
                        E-mail institucional / corporativo
                    </Input>

                    {/* Campo Chave de Acesso Administrativo com Toggle */}
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between pl-1">
                            <label htmlFor="adminKey" className="text-white text-sm flex items-center gap-1.5 font-medium">
                                <KeyRound className="w-3.5 h-3.5 text-proveup-orange" />
                                Chave de Segurança Administrativa
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowKeyHint(!showKeyHint)}
                                className="text-xs text-proveup-orange/80 hover:text-proveup-orange flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                <HelpCircle className="w-3 h-3" />
                                {showKeyHint ? "Ocultar dica" : "Qual é a chave?"}
                            </button>
                        </div>

                        {showKeyHint && (
                            <div className="p-3 bg-zinc-900/90 border border-proveup-orange/30 rounded-xl text-xs text-gray-300 flex items-start gap-2 animate-in fade-in duration-200">
                                <Sparkles className="w-4 h-4 text-proveup-orange shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-semibold text-white">Chave Mestra Padrão de Desenvolvimento:</span>{" "}
                                    <code className="bg-black/60 px-1.5 py-0.5 rounded text-proveup-orange font-mono">PROVEUP_ADMIN_2026</code>
                                    <p className="mt-1 text-[11px] text-gray-400">
                                        Use este código para aprovar o privilégio de administrador nesta instalação local.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="relative">
                            <input
                                id="adminKey"
                                type={showAdminKey ? "text" : "password"}
                                placeholder="Insira a chave mestra de administrador"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                className={`w-full text-white bg-transparent border-2 ${
                                    errors.adminKey ? "border-red-500 focus:border-red-500" : "border-proveup-orange focus:border-proveup-dark-orange"
                                } rounded-xl px-4 py-2 pr-11 placeholder-white/50 focus:outline-hidden transition-colors font-mono tracking-wider`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowAdminKey(!showAdminKey)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                title={showAdminKey ? "Ocultar chave" : "Mostrar chave"}
                            >
                                {showAdminKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.adminKey && (
                            <span className="text-red-500 text-xs px-1 inline-block min-h-[16px]">{errors.adminKey}</span>
                        )}
                    </div>

                    {/* Campo Senha com Força */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="senha-adm" className="text-white text-sm pl-1 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-proveup-orange" />
                            Senha de acesso
                        </label>
                        <div className="relative">
                            <input
                                id="senha-adm"
                                type={showSenha ? "text" : "password"}
                                placeholder="Mínimo de 6 caracteres"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className={`w-full text-white bg-transparent border-2 ${
                                    errors.senha ? "border-red-500 focus:border-red-500" : "border-proveup-orange focus:border-proveup-dark-orange"
                                } rounded-xl px-4 py-2 pr-11 placeholder-white/50 focus:outline-hidden transition-colors`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowSenha(!showSenha)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                                {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.senha && (
                            <span className="text-red-500 text-xs px-1 inline-block min-h-[16px]">{errors.senha}</span>
                        )}

                        {/* Barra de Força da Senha */}
                        {senha.length > 0 && (
                            <div className="flex items-center gap-2 px-1 mt-1">
                                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div
                                            key={step}
                                            className={`h-full flex-1 transition-all duration-300 ${
                                                passwordStrength >= step ? strengthColor : "bg-transparent"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
                                    Segurança: <span className="text-white">{strengthLabel}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Campo Confirmar Senha */}
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="confirmar-senha-adm" className="text-white text-sm pl-1">
                            Confirmação de senha
                        </label>
                        <div className="relative">
                            <input
                                id="confirmar-senha-adm"
                                type={showConfirmarSenha ? "text" : "password"}
                                placeholder="Repita a senha de administrador"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                className={`w-full text-white bg-transparent border-2 ${
                                    errors.confirmarSenha ? "border-red-500 focus:border-red-500" : "border-proveup-orange focus:border-proveup-dark-orange"
                                } rounded-xl px-4 py-2 pr-11 placeholder-white/50 focus:outline-hidden transition-colors`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                                {showConfirmarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.confirmarSenha && (
                            <span className="text-red-500 text-xs px-1 inline-block min-h-[16px]">{errors.confirmarSenha}</span>
                        )}
                    </div>

                    {/* Checkbox Termo de Governança */}
                    <div className="flex flex-col gap-1 py-1">
                        <div className="flex items-start gap-2.5">
                            <input 
                                type="checkbox" 
                                id="terms-admin" 
                                className="mt-1 w-4 h-4 accent-proveup-orange bg-[#262626] border-none rounded cursor-pointer shrink-0" 
                                checked={termoAdmin}
                                onChange={(e) => setTermoAdmin(e.target.checked)}
                            />
                            <label htmlFor="terms-admin" className="text-xs text-gray-300 leading-snug cursor-pointer select-none">
                                Estou ciente das responsabilidades administrativas e concordo com os{" "}
                                <span className="text-proveup-orange underline hover:text-white transition-colors">
                                    termos de governança, confidencialidade e LGPD da ProveUP
                                </span>.
                            </label>
                        </div>
                        {errors.termoAdmin && <span className="text-red-500 text-xs px-1">{errors.termoAdmin}</span>}
                    </div>

                    {/* Botão de Cadastro */}
                    <Button
                        variant="primary"
                        className="w-full h-12 text-lg mt-3 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-proveup-orange/20"
                        disabled={loading}
                        onClick={handleRegisterAdmin}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Validando credenciais...
                            </div>
                        ) : (
                            <>
                                <ShieldCheck className="w-5 h-5" />
                                Cadastrar Administrador
                            </>
                        )}
                    </Button>

                    {/* Links de navegação secundária */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800 text-center text-sm">
                        <p className="text-gray-400">
                            Já possui uma conta de administrador?{" "}
                            <Link to="/login" className="text-proveup-orange font-medium hover:underline">
                                Faça login
                            </Link>
                        </p>
                        <p className="text-xs text-gray-500">
                            Não é administrador?{" "}
                            <Link to="/register" className="text-gray-400 hover:text-white transition-colors underline">
                                Criar conta comum de usuário
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
