import escritorio from "../assets/Intersect.png";
import google_icon from "../assets/Icons/google_icon.png"
import logo from "../assets/logo-proveup.svg"
import facebook_icon from  "../assets/Icons/facebook_icon.png"
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";



export function Login(){
    return( 
        <div className="h-screen bg-proveup-dark flex flex-row gap-20 items-center justify-center">

            <div className="hidden lg:block">
                <img 
                    src={escritorio} 
                    alt="Ambiente de trabalho" 
                    className="w-auto max-h-[90vh] rounded-[3rem] object-cover" 
                />
            </div>
            <div className=" flex flex-col justify-center ">
                <img src={logo} alt="logo prove up" className="lg:w-3xs pb-10" />
                <h1 className="pb-6">Acesse sua jornada!</h1>
                <p className="pb-13">
                    Entre na sua conta para acompanhar seu progresso, <br />explorar habilidades e continuar evoluindo com o ProveUP.
                </p>
                <div className="flex flex-col justify-center  w-md">
                    <form action="get" className="flex flex-col pb-3">
                        <Input idDaProp="Email" placeholder="Insira seu email" fullWidth className="m   b-7" >Email</Input>
                        <Input idDaProp="Senha" placeholder="Insira sua senha" fullWidth>Senha</Input>
                    </form>
                    <Link to="/recover-password" style={{ display: 'block', paddingBottom: '3rem' }} className="text-xs text-gray-200">Esqueci minha senha...</Link>
                    <Button className="mb-8 h-12 ">Entrar</Button>
                    
                    <span className="flex flex-row items-center justify-center text-center gap-5 pb-8">
                        <hr className="w-full text-gray-500 "></hr>
                        <p className=" whitespace-nowrap  gap-5 text-gray-500 ">Ou entre com</p>
                        <hr className="w-full text-gray-500  "/>
                    </span>
                    <div className="flex flex-row gap-5 pb-8">
                        <div className=" flex w-36 h-12 bg-[#262626] rounded-2xl items-center justify-center"><img src={google_icon} alt="" /></div>
                        <div className=" flex w-36 h-12 bg-[#262626] rounded-2xl items-center justify-center"><img src={facebook_icon} alt="" /></div>
                    </div>
                    <p>Não possui uma conta? <Link to="/register" className="font-medium hover:text-proveup-orange transition-colors">Cadastre-se agora!</Link></p>
                </div>
            </div>
        </div>
    );
}