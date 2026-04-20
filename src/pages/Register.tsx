<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16
import { useNavigate, Link } from "react-router-dom";
import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import google_icon from "../assets/Icons/google_icon.png";
import facebook_icon from "../assets/Icons/facebook_icon.png";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
<<<<<<< HEAD
import { useToastStore } from "../store/useToastStore";

export function Register() {
    const navigate = useNavigate();
    const addToast = useToastStore((state) => state.addToast);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [termos, setTermos] = useState(false);

    const [errors, setErrors] = useState<{
        nome?: string;
        email?: string;
        senha?: string;
        confirmarSenha?: string;
        termos?: string;
    }>({});

    const handleRegister = (e: React.MouseEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};

        if (!nome) newErrors.nome = "Nome é obrigatório.";
        
        if (!email) {
            newErrors.email = "O email é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Formato de email inválido.";
        }

        if (!senha) {
            newErrors.senha = "A senha é obrigatória.";
        } else if (senha.length < 6) {
            newErrors.senha = "Mínimo 6 caracteres.";
        }

        if (!confirmarSenha) {
            newErrors.confirmarSenha = "Confirme sua senha.";
        } else if (senha !== confirmarSenha) {
            newErrors.confirmarSenha = "As senhas não coincidem.";
        }

        if (!termos) {
            newErrors.termos = "Você precisa aceitar os termos.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            addToast("Cadastro realizado com sucesso!", "success");
            navigate("/pre-questionnaire");
        } else {
            addToast("Revise os campos antes de continuar.", "error");
        }
    };
=======

export function Register() {
    const navigate = useNavigate();
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16

    return (
        <div className="min-h-screen bg-proveup-dark flex flex-row gap-20 items-center justify-center p-4 overflow-y-auto">
            {/* Esquerda: Imagem */}
            <div className="hidden lg:block">
                <img
                    src={escritorio}
                    alt="Ambiente de trabalho"
                    className="w-auto max-h-[90vh] rounded-[3rem] object-cover"
                />
            </div>

            {/* Direita: Formulário */}
            <div className="flex flex-col justify-center max-w-md w-full py-4">
                <img src={logo} alt="logo prove up" className="w-48 mb-4" />

                <h1 className="text-6xl text-white mb-4 leading-tight">
                    Comece sua <br />
                    <span className="bg-linear-to-br from-proveup-orange to-proveup-dark-orange bg-clip-text text-transparent">
                        jornada!
                    </span>
                </h1>

                <p className="text-white text-base font-light mb-4 leading-relaxed">
                    Cadastre-se e tenha acesso a ferramentas que impulsionam sua evolução,
                    organizam sua trajetória e destacam suas conquistas.
                </p>

<<<<<<< HEAD
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <Input 
                        idDaProp="nome" 
                        placeholder="Insira seu nome completo" 
                        fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        error={errors.nome}
                    >
                        Nome completo
                    </Input>
                    <Input 
                        idDaProp="email" 
                        placeholder="Insira seu e-mail" 
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                    >
                        E-mail
                    </Input>
                    <Input 
                        idDaProp="senha" 
                        placeholder="Insira sua senha" 
                        fullWidth
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        error={errors.senha}
                    >
                        Senha
                    </Input>
                    <Input 
                        idDaProp="confirmar-senha" 
                        placeholder="Confirme sua nova senha" 
                        fullWidth
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        error={errors.confirmarSenha}
                    >
                        Confirmação de senha
                    </Input>

                    <div className="flex flex-col gap-1 py-1">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                className="w-4 h-4 accent-proveup-orange bg-[#262626] border-none rounded cursor-pointer" 
                                checked={termos}
                                onChange={(e) => setTermos(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-xs text-gray-400">
                                Concordo com os <span className="text-white underline cursor-pointer hover:text-proveup-orange">termos e política de privacidade</span>
                            </label>
                        </div>
                        {errors.termos && <span className="text-red-500 text-xs px-1">{errors.termos}</span>}
=======
                <div className="flex flex-col gap-3">
                    <Input idDaProp="nome" placeholder="Insira seu nome completo" fullWidth>Nome completo</Input>
                    <Input idDaProp="email" placeholder="Insira seu e-mail" fullWidth>E-mail</Input>
                    <Input idDaProp="senha" placeholder="Insira sua senha" fullWidth>Senha</Input>
                    <Input idDaProp="confirmar-senha" placeholder="Confirme sua nova senha" fullWidth>Confirmação de senha</Input>

                    <div className="flex items-center gap-2 py-2">
                        <input type="checkbox" id="terms" className="w-4 h-4 accent-proveup-orange bg-[#262626] border-none rounded" />
                        <label htmlFor="terms" className="text-xs text-gray-400">
                            Concordo com os <span className="text-white underline cursor-pointer">termos e política de privacidade</span>
                        </label>
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16
                    </div>

                    <Button
                        variant="primary"
                        className="w-full h-12 text-lg mt-2"
<<<<<<< HEAD
                        onClick={handleRegister}
=======
                        onClick={() => navigate("/pre-questionnaire")}
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16
                    >
                        Avançar
                    </Button>

                    <span className="flex flex-row items-center justify-center text-center gap-5 my-4">
                        <hr className="w-full border-gray-700" />
                        <p className="whitespace-nowrap text-gray-500 text-sm font-light">Ou crie com</p>
                        <hr className="w-full border-gray-700" />
                    </span>

                    <div className="flex flex-row gap-5 mb-6">
                        <div className="flex-1 flex h-12 bg-[#262626] rounded-2xl items-center justify-center cursor-pointer hover:bg-[#333] transition-colors">
                            <img src={google_icon} alt="Google" />
                        </div>
                        <div className="flex-1 flex h-12 bg-[#262626] rounded-2xl items-center justify-center cursor-pointer hover:bg-[#333] transition-colors">
                            <img src={facebook_icon} alt="Facebook" />
                        </div>
                    </div>

                    <p className="text-center text-white">
                        Já possui uma conta? <Link to="/login" className="font-medium hover:text-proveup-orange transition-colors">Faça seu login</Link>
                    </p>
<<<<<<< HEAD
                </form>
=======
                </div>
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16
            </div>
        </div>
    );
}
