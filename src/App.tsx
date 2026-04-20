import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Register } from "./pages/Register";
import { PreQuestionnaire } from "./pages/PreQuestionnaire";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { QuestionnaireResult } from "./pages/QuestionnaireResult";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/pre-questionnaire" element={<PreQuestionnaire />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/result" element={<QuestionnaireResult />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App