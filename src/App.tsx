import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Register } from "./pages/Register";
import { RegisterAdmin } from "./pages/RegisterAdmin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PreQuestionnaire } from "./pages/PreQuestionnaire";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { QuestionnaireResult } from "./pages/QuestionnaireResult";
import KnowledgeMap from "./pages/KnowledgeMap";
import { ToastContainer } from "./components/ui/toast";


function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login  />} />

        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas Administrativas */}
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route path="/register-adm" element={<RegisterAdmin />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/pre-questionnaire" element={<PreQuestionnaire />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/result" element={<QuestionnaireResult />} />
        <Route path="/result/:assessmentId" element={<QuestionnaireResult />} />
        <Route path="/map" element={<KnowledgeMap />} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App