import iconMap from "../../assets/Icons/Icon-map.png";
import iconTime from "../../assets/Icons/Icon-time.png";
import iconPaste from "../../assets/Icons/Icon-paste.png";
import iconFocus from "../../assets/Icons/Icon-focus.png";



const ListItem = ({ img, altImg, title, desc}: {img: string, altImg: string, title: string, desc: string}) =>(
    <li className="flex flex-col items-center text-center justify-center">
        <img src={img} alt={altImg} className="w-14" />
        <h3 className="font-semibold">{title}</h3>
        <p className="w-50">{desc}</p>
    </li>
);


export function FeaturesBar(){ 
    return(
        <div className="flex w-full h-45 bg-linear-to-r from-proveup-orange to-proveup-dark-orange shadow-[0_0_30px_rgba(242,116,39,0.4)] justify-center items-center">
            <ul className="flex flex-row items-center text-center justify-center gap-16">
                <ListItem img={iconTime} altImg="Imagem de um relogio" title="Linha do Tempo" desc="Vizualize todo seu progresso" />
                <ListItem img={iconMap} altImg="" title="Mapa de Habilidades" desc="Entenda suas competencias" />
                <ListItem img={iconPaste} altImg="" title="Gestor de Cursos" desc="Organize suas atividades com facilidade" />
                <ListItem img={iconFocus} altImg="" title="Modo Foco" desc="Elimine todas suas distrações" />
            </ul>
        </div>
    );
}