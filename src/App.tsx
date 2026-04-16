import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Register } from "./pages/Register";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rota temporária para o pré-questionário */}
        <Route path="/pre-questionnaire" element={<div className="text-white p-20 text-center">Tela de Pré-questionário em breve!</div>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App