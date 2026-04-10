import './App.css'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import MatchingPage from './pages/MatchingPage';
import ProjectManagePage from './pages/ProjectManagePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/projectManage" element={<ProjectManagePage />} />
      </Routes>
    </BrowserRouter>
  );
}