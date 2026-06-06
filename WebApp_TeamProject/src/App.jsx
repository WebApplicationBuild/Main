import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import MatchingPage from './pages/MatchingPage';
import ProjectPage from './pages/ProjectPage';
import Layout from './components/Layout';
import { ToastProvider } from './contexts/ToastContext';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
      <BrowserRouter>
        <ToastProvider>
            <Routes>
              {/* 공통 헤더가 있는 메인 레이아웃 */}
              <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/projectManage" element={<ProjectPage />} />
                <Route path="/projectManage/:projectId" element={<ProjectPage />} />
              </Route>

              {/* 헤더 없는 인증 페이지 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </ToastProvider>
      </BrowserRouter>
  );
}