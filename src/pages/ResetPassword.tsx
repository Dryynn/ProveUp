import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToastStore } from "../store/useToastStore";
import { apiRequest } from "../services/api";

export function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const addToast = useToastStore((state) => state.addToast);

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryEmail = searchParams.get("email");
        if (queryEmail) {
            setEmail(queryEmail);
        }
    }, [searchParams]);

    const handleReset = async () => {
        if (!email.trim() || !token.trim() || !novaSenha) {
            addToast("Preencha todos os campos obrigatórios.", "error");
            return;
        }

        if (novaSenha.length < 6) {
            addToast("A nova senha deve ter no mínimo 6 caracteres.", "error");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            addToast("As senhas não coincidem.", "error");
            return;
        }

        try {
            setLoading(true);
            const data = await apiRequest<{ message: string }>('/auth/reset-password', {
                method: 'POST',
                data: {
                    email: email.trim(),
                    token: token.trim(),
                    newPassword: novaSenha,
                },
            });

            addToast(data.message || "Senha redefinida com sucesso!", "success");
            navigate("/login");
        } catch (err: any) {
            addToast(err.message || "Erro ao redefinir senha.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-proveup-dark flex flex-row gap-20 items-center justify-center p-8 overflow-y-auto">
            {/* Esquerda: Imagem */}
            <div className="hidden lg:block">
                <img 
                    src={escritorio} 
                    alt="Ambiente de trabalho" 
                    className="w-auto max-h-[90vh] rounded-[3rem] object-cover" 
                />
            </div>

            {/* Direita: Formulário */}
            <div className="flex flex-col justify-center max-w-md w-full">
                <img src={logo} alt="logo prove up" className="w-48 mb-16" />
                
                <h1 className="text-7xl font-black text-white mb-6">
                    Criar nova <span className="text-proveup-orange">senha</span>
                </h1>
                
                <p className="text-white text-base font-light mb-12 leading-relaxed">
                    Redefina sua senha com segurança e volte a explorar sua jornada de aprendizado.
                </p>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <Input 
                            idDaProp="email-recuperacao" 
                            placeholder="Insira seu e-mail" 
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            E-mail
                        </Input>
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            idDaProp="codigo-recuperacao" 
                            placeholder="Código recebido (ex: 123456)" 
                            fullWidth
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        >
                            Código de verificação
                        </Input>
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            idDaProp="nova-senha" 
                            type="password"
                            placeholder="Insira sua nova senha" 
                            fullWidth
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        >
                            Nova senha
                        </Input>
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            idDaProp="confirmar-senha" 
                            type="password"
                            placeholder="Confirme sua nova senha" 
                            fullWidth
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        >
                            Confirmar senha
                        </Input>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Button 
                            variant="primary" 
                            className="w-full h-12 text-lg"
                            onClick={handleReset}
                        >
                            {loading ? "Redefinindo..." : "Definir"}
                        </Button>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mt-12 text-center">
                    Se precisa ajuda, <span className="text-white font-medium cursor-pointer">entre em contato com nossa equipe</span>
                </p>
            </div>
        </div>
    );
}
