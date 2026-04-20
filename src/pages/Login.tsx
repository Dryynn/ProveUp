import { useState } from "react";
import escritorio from "../assets/Intersect.png";
import google_icon from "../assets/Icons/google_icon.png"
import logo from "../assets/logo-proveup.svg"
import facebook_icon from "../assets/Icons/facebook_icon.png"
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useToastStore } from "../store/useToastStore";

export function Login() {
    const navigate = useNavigate();
    const addToast = useToastStore((state) => state.addToast);
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});

    const handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        const newErrors: { email?: string; senha?: string } = {};

        if (!email) {
            newErrors.email = "O email é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Formato de email inválido.";
        }

        if (!senha) {
            newErrors.senha = "A senha é obrigatória.";
        } else if (senha.length < 6) {
            newErrors.senha = "A senha precisa ter no mínimo 6 caracteres.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            addToast("Login efetuado com sucesso!", "success");
            navigate("/pre-questionnaire");
        } else {
            addToast("Por favor, corrija os erros do formulário.", "error");
        }
    };

    return (
        <div className="min-h-screen bg-proveup-dark flex flex-row gap-20 items-center justify-center p-4 overflow-x-auto">

            <div className="hidden lg:block shrink-0">
                <img
                    src={escritorio}
                    alt="Ambiente de trabalho"
                    className="w-auto max-h-[90vh] rounded-[3rem] object-cover"
                />
            </div>


            <div className="flex flex-col justify-center max-w-md w-full">
                <img src={logo} alt="logo prove up" className="w-48 pb-10" />

                <h1 className="pb-6 text-6xl leading-tight">
                    Acesse sua jornada!
                </h1>
                <p className="pb-10 text-sm lg:text-base">
                    Entre na sua conta para acompanhar seu progresso, <br className="hidden lg:block" />explorar habilidades e continuar evoluindo com o ProveUP.
                </p>
                <form className="flex flex-col gap-2 pb-3" onSubmit={(e) => e.preventDefault()}>
                    <Input 
                        idDaProp="Email" 
                        placeholder="Insira seu email" 
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                    >
                        Email
                    </Input>
                    <Input 
                        idDaProp="Senha" 
                        placeholder="Insira sua senha" 
                        fullWidth
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        error={errors.senha}
                    >
                        Senha
                    </Input>
                </form>
                <Link to="/recover-password" style={{ display: 'block', paddingBottom: '2rem' }} className="text-xs text-gray-200 hover:text-gray-400 transition-colors">Esqueci minha senha...</Link>
                <Button className="mb-8 h-12" onClick={handleLogin}>Entrar</Button>

                <span className="flex flex-row items-center justify-center text-center gap-5 pb-8">
                    <hr className="w-full border-gray-700" />
                    <p className="whitespace-nowrap text-gray-500 text-sm">Ou entre com</p>
                    <hr className="w-full border-gray-700" />
                </span>
                <div className="flex flex-row gap-5 pb-8">
                    <div className="flex-1 flex h-12 bg-[#262626] rounded-2xl items-center justify-center cursor-pointer hover:bg-[#333] transition-colors">
                        <img src={google_icon} alt="Google" />
                    </div>
                    <div className="flex-1 flex h-12 bg-[#262626] rounded-2xl items-center justify-center cursor-pointer hover:bg-[#333] transition-colors">
                        <img src={facebook_icon} alt="Facebook" />
                    </div>
                </div>
                <p>Não possui uma conta? <Link to="/register" className="font-medium hover:text-proveup-orange transition-colors">Cadastre-se agora!</Link></p>
            </div>
        </div>
    );
}