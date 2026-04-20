import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Register } from "./pages/Register";
import { PreQuestionnaire } from "./pages/PreQuestionnaire";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { QuestionnaireResult } from "./pages/QuestionnaireResult";
<<<<<<< HEAD
import { ToastContainer } from "./components/ui/toast";
=======
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16


function App() {
  return (
<<<<<<< HEAD
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16

        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/pre-questionnaire" element={<PreQuestionnaire />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/result" element={<QuestionnaireResult />} />

      </Routes>
<<<<<<< HEAD
      </BrowserRouter>
    </>
=======
    </BrowserRouter>
>>>>>>> cab9461b75b7f04df8793dec543c56166fddde16
  )
}

export default App