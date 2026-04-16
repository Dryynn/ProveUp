import { useNavigate } from "react-router-dom";
import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function RecoverPassword() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-proveup-dark flex flex-row gap-20 items-center justify-center p-8 overflow-y-auto">
            {/* Left side: Image */}
            <div className="hidden lg:block">
                <img 
                    src={escritorio} 
                    alt="Ambiente de trabalho" 
                    className="w-auto max-h-[90vh] rounded-[3rem] object-cover" 
                />
            </div>

            {/* Right side: Form */}
            <div className="flex flex-col justify-center max-w-md w-full">
                <img src={logo} alt="logo prove up" className="w-48 mb-16" />
                
                <h1 className="text-7xl font-black text-white mb-6">
                    Recuperar <span className="text-proveup-orange">senha</span>
                </h1>
                
                <p className="text-white text-base font-light mb-12 leading-relaxed">
                    Insira o e-mail que você usou ao se cadastrar para recuperar sua senha. 
                    Você receberá um link para redefinir sua senha.
                </p>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <Input 
                            idDaProp="email" 
                            placeholder="Insira seu e-mail" 
                            fullWidth
                        >
                            E-mail
                        </Input>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Button 
                            variant="primary" 
                            className="w-full h-12 text-lg"
                        >
                            Enviar link
                        </Button>
                        
                        <Button 
                            variant="ghost" 
                            className="w-full h-12 text-lg text-white border border-white/20 hover:bg-white/5 transition-colors"
                            onClick={() => navigate("/login")}
                        >
                            Voltar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
