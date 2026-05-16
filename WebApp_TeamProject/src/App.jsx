import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import MatchingPage from './pages/MatchingPage';
import ProjectManagePage from './pages/ProjectManagePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthProvider";

/*
   라우트:
     /                          → MainPage
     /login                     → LoginPage
     /matching                  → MatchingPage
     /projectManage             → ProjectManagePage (전체 프로젝트 관리)
     /projectManage/:projectId  → ProjectManagePage (특정 프로젝트 관리)
 ex) /projectManage/201 → useParams()로 projectId 꺼내서 사용
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/projectManage/:projectId" element={<ProjectManagePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
