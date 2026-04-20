import escritorio from "../assets/Intersect.png";
import logo from "../assets/logo-proveup.svg";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";

export function PreQuestionnaire() {
  const navigate = useNavigate();
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
        <img src={logo} alt="logo prove up" className="w-48 pb-8" />

        <h1 className="text-5xl lg:text-6xl pb-4">
          Seja <span className="text-transparent bg-clip-text bg-linear-to-br from-proveup-orange to-proveup-dark-orange">bem-vindo!</span>
        </h1>

        <p className="text-sm lg:text-base pb-8 text-gray-300">
          Este é o seu ponto de partida: organize certificados, monitore habilidades,
          siga trilhas personalizadas e veja sua evolução ganhar forma.
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Input
              idDaProp="curso"
              placeholder="Insira sua formação acadêmica"
              fullWidth
            >
              Curso ou formação atual
            </Input>
          </div>

          <p className="text-xs text-gray-400">
            Complete o questionário inicial e receba sua trilha personalizada,
            criada automaticamente com base nos seus objetivos e interesses.
          </p>

          <div className="flex flex-col gap-4">
            <Button className="h-12 w-full" onClick={() => navigate("/questionnaire")}>
              Criar trilha personalizada
            </Button>

            <div className="flex flex-row items-center justify-center text-center gap-4 py-2">
              <hr className="w-full border-gray-700" />
              <p className="text-xs text-gray-500 uppercase tracking-wider">Ou</p>
              <hr className="w-full border-gray-700" />
            </div>

            <Button className="h-12 w-full">
              Fazer depois
            </Button>

            <Button variant="secondary" className="h-12 w-full bg-transparent border-proveup-orange">
              Já tenho uma trilha
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
