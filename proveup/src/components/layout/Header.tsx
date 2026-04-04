// src/components/layout/Header.tsx
import logo from "../../assets/logo-proveup.svg";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Seus links do menu, tirados direto da imagem_1.png
  const navLinks = ["Fale conosco", "Nossas funções", "Ver planos"];

  return (
    <header className="w-full h-20 px-6 md:p-12 flex justify-between items-center relative z-50 ">
      {/* Logo */}
      <img src={logo} alt="Logo ProveUP" />

      <div className="hidden md:flex gap-15">
        {/* Navegação Desktop (esconde no celular) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-gray-300 hover:text-white font-medium transition-colors">
              {link}
            </a>
          ))}
        </nav>

        {/* Botão de Call-to-Action */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="primary" fullWidth>Login</Button>
          <Button variant="secondary" fullWidth>
            Inscreva-se
          </Button>
        </div>
      </div>

      {/* Menu Mobile Button (aparece no celular) */}
      <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu Mobile Open (dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-proveup-dark border-t border-gray-700/50 p-6 flex flex-col gap-6 text-center z-40">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-lg text-gray-300 hover:text-white font-medium transition-colors">
              {link}
            </a>
          ))}
          <div className="h-px bg-gray-700/50 w-full my-2"></div>
          <button className="w-full text-gray-400 font-bold hover:text-white py-2">Login</button>
          <button className="w-full bg-proveup-orange text-white py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
            Inscreva-se
          </button>
        </div>
      )}
    </header>
  );
}