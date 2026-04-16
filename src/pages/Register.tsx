import { useNavigate, Link } from "react-router-dom";
import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import google_icon from "../assets/Icons/google_icon.png";
import facebook_icon from "../assets/Icons/facebook_icon.png";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function Register() {
    const navigate = useNavigate();

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
                
                <h1 className="text-6xl font-black text-white mb-4 leading-tight">
                    Comece sua <br />
                    <span className="bg-linear-to-br from-proveup-orange to-proveup-dark-orange bg-clip-text text-transparent">
                        jornada!
                    </span>
                </h1>
                
                <p className="text-white text-base font-light mb-4 leading-relaxed">
                    Cadastre-se e tenha acesso a ferramentas que impulsionam sua evolução, 
                    organizam sua trajetória e destacam suas conquistas.
                </p>

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
                    </div>

                    <Button 
                        variant="primary" 
                        className="w-full h-12 text-lg mt-2"
                        onClick={() => navigate("/pre-questionnaire")}
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
                            <img src={google_icon} alt="Google" className="w-6 h-6" />
                        </div>
                        <div className="flex-1 flex h-12 bg-[#262626] rounded-2xl items-center justify-center cursor-pointer hover:bg-[#333] transition-colors">
                            <img src={facebook_icon} alt="Facebook" className="w-6 h-6" />
                        </div>
                    </div>

                    <p className="text-center text-white">
                        Já possui uma conta? <Link to="/login" className="font-medium hover:text-proveup-orange transition-colors">Faça seu login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
