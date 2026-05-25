import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./store/AuthProvider";
import { ProjectDataProvider } from "./store/ProjectDataProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProjectDataProvider>
        <App />
      </ProjectDataProvider>
    </AuthProvider>
  </StrictMode>,
)
