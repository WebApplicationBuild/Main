import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import MatchingPage from './pages/MatchingPage';
import ProjectPage from './pages/ProjectPage'; // ★ 기존 임시 프로젝트 페이지 대신 실제 프로젝트 관리 페이지 연결
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/AuthProvider";

/*
    라우트:
      /                          → MainPage
      /login                     → LoginPage
      /matching                  → MatchingPage
      ★ projectId를 기반으로 실제 프로젝트 관리 페이지로 연결
      projectManage/:projectId  → ProjectPage
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

          {/* ★ 프로젝트 클릭 시 ProjectPage로 이동 */}
          <Route
            path="/projectManage/:projectId"
            element={<ProjectPage />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}