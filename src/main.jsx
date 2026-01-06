// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPageExecutive from './LandingPage'

// Importa las páginas (asegúrate de crearlas primero)
import Servicios from './pages/Servicios'
import Headhunting from './pages/Headhunting'
import Assessment from './pages/Assessment'
import DesarrolloOrganizacional from './pages/DesarrolloOrganizacional'
import Contacto from './pages/Contacto'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import GDPR from './pages/GDPR'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageExecutive />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/headhunting-ejecutivo" element={<Headhunting />} />
        <Route path="/assessment-liderazgo" element={<Assessment />} />
        <Route path="/desarrollo-organizacional" element={<DesarrolloOrganizacional />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
        <Route path="/terminos-servicio" element={<TermsOfService />} />
        <Route path="/gdpr-compliance" element={<GDPR />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)