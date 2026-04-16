import { useNavigate } from "react-router-dom";
import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function ResetPassword() {
    const navigate = useNavigate();

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
                            idDaProp="nova-senha" 
                            placeholder="Insira sua nova senha" 
                            fullWidth
                        >
                            Nova senha
                        </Input>
                    </div>

                    <div className="flex flex-col">
                        <Input 
                            idDaProp="confirmar-senha" 
                            placeholder="Confirme sua nova senha" 
                            fullWidth
                        >
                            Confirmar senha
                        </Input>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Button 
                            variant="primary" 
                            className="w-full h-12 text-lg"
                            onClick={() => navigate("/login")}
                        >
                            Definir
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
