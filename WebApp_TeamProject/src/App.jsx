import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import MatchingPage from './pages/MatchingPage';
import ProjectPage from './pages/ProjectPage'; // ★ 기존 임시 프로젝트 페이지 대신 실제 프로젝트 관리 페이지 연결

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./store/AuthProvider";

/*
  ☆ 수정:
  프로젝트 상태를 전역으로 관리하기 위한 Provider 추가

  역할:
  - 프로젝트별 일정 관리
  - 프로젝트별 팀원 관리
  - 프로젝트별 투표 관리

  장점:
  - 페이지 이동 시 데이터 유지
  - 다른 페이지에서도 프로젝트 데이터 접근 가능
*/
import { ProjectProvider } from "./store/ProjectProvider";

/*
    라우트:
      /                          → MainPage
      /login                     → LoginPage
      /matching                  → MatchingPage
      ★ projectId를 기반으로 실제 프로젝트 관리 페이지로 연결
      projectManage/:projectId  → ProjectPage

  ex)
      /projectManage/201
      → useParams()로 projectId 꺼내서 사용
*/
export default function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        {/* 
          ☆ 수정:
          프로젝트 데이터를 전역으로 공급

          하위 컴포넌트 어디서든

          const {
            projectData,
            setProjectData
          } = useContext(ProjectContext);

          형태로 사용 가능
        */}
        <ProjectProvider>

          <Routes>

            <Route path="/" element={<MainPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/signup" element={<SignupPage />} />

            <Route path="/matching" element={<MatchingPage />} />

            {/* ★ 프로젝트 전체보기 (선택 전) */}
            <Route
              path="/projectManage"
              element={<ProjectPage />}
            />

            {/* ★ 프로젝트 클릭 시 ProjectPage로 이동 */}
            <Route
              path="/projectManage/:projectId"
              element={<ProjectPage />}
            />

          </Routes>

        </ProjectProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}