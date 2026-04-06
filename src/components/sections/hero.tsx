import { Button } from "../ui/button";
import heroimg from "../../assets/hero_image.png";

export function Hero(){
    return(
        <main className="px-2 flex flex-col md:flex-row py-10 md:py-5 items-center justify-center gap-5 md:gap-15 lg:gap-15">
            <img src={heroimg} alt="Banner de mulher segurando livros" className="w-full md:max-w-md lg:max-w-xl xl:max-w-2xl md:flex-1 lg:flex-1 h-auto" />
            <div className=" flex flex-col gap-5 md:gap-9 justify-center text-center md:text-left items-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl">Evoluir é só o <span className="text-proveup-orange">começo!</span></h1>
                <p className="w-full md:max-w-2xl text-sm md:text-base">Centralize, valide e apresente suas experiências de aprendizado com facilidade. O ProveUP usa tecnologia para simplificar o registro de certificados e atividades, tornando sua trajetória acadêmica e profissional mais visível e valorizada.</p>
                <div className="flex flex-col sm:flex-row gap-5 md:gap-13 justify-center lg:justify-start">
                    <Button variant="primary" className="px-5 md:px-10 h-10 md:h-13 text-lg md:text-2xl">Começar agora</Button>
                    <Button variant="secondary" className="px-5 md:px-10 h-10 md:h-13 text-lg md:text-2xl">Já possuo uma conta</Button>
                </div>
            </div>
        </main>
    );
}