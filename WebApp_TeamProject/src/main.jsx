import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./store/AuthProvider";
import { MatchingDataProvider } from "./store/MatchingDataProvider";
import {ProjectManageDataProvider} from "./store/ProjectManageDataProvider"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MatchingDataProvider>
        <ProjectManageDataProvider>
          <App />
        </ProjectManageDataProvider>
      </MatchingDataProvider>
    </AuthProvider>
  </StrictMode>,
)
