// src/components/Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, Mail, Phone, MapPin, Linkedin,
  ChevronRight, Menu, X, ArrowLeft, Zap,
  Home, Flag, CheckCircle
} from 'lucide-react';

export default function Layout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="font-sans bg-white text-gray-900 antialiased min-h-screen">
      {/* Header/Navbar con nuevos colores */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                <Zap className="text-white" size={20} />
              </div>
              <div className="text-xl font-bold tracking-tight">
                <span className="text-gray-900 group-hover:text-amber-600 transition">PETROLINK</span>
                <span className="text-amber-600 group-hover:text-orange-700 transition">VZLA</span>
              </div>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/servicios" className="text-gray-600 hover:text-amber-600 font-medium transition">Servicios</Link>
            <Link to="/headhunting-ejecutivo" className="text-gray-600 hover:text-amber-600 font-medium transition">Headhunting</Link>
            <Link to="/contacto" className="text-gray-600 hover:text-amber-600 font-medium transition">Contacto</Link>
            <button 
              onClick={() => navigate('/contacto')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              Contactar
              <ChevronRight size={18} />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-50"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg px-6 py-4">
            <div className="flex flex-col gap-4">
              <Link to="/servicios" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700 hover:text-amber-600">Servicios</Link>
              <Link to="/headhunting-ejecutivo" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700 hover:text-amber-600">Headhunting</Link>
              <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700 hover:text-amber-600">Contacto</Link>
              <button 
                onClick={() => {
                  navigate('/contacto');
                  setMobileMenuOpen(false);
                }}
                className="py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold mt-2"
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header con colores petroleros */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-6"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && <p className="text-xl text-gray-600 max-w-3xl">{subtitle}</p>}
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer con colores petroleros */}
      <footer className="py-16 px-6 bg-gray-950 text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div className="text-xl font-bold text-white">PETROLINK<br /><span className="text-amber-400">VENEZUELA</span></div>
              </div>
              <p className="text-sm text-gray-500">
                Especialistas en reinserción del talento petrolero venezolano. Conectamos experiencia internacional con las oportunidades de la apertura energética.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Para Especialistas</h4>
              <ul className="space-y-3">
                <li><Link to="/servicios" className="hover:text-amber-400 transition">Proceso de Reinserción</Link></li>
                <li><Link to="/headhunting-ejecutivo" className="hover:text-amber-400 transition">Posiciones Disponibles</Link></li>
                <li><Link to="/contacto" className="hover:text-amber-400 transition">Preguntas Frecuentes</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Contacto Directo</h4>
              <ul className="space-y-4">
                
                {/* Email principal - Marielvis */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300 border border-gray-800 hover:border-amber-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600/20 to-orange-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail size={20} className="text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Lic. Marielvis Malave</div>
                      <div className="text-sm text-amber-300">Directora de Talento</div>
                      <a href="mailto:marielvismalave@gmail.com" 
                        className="text-white hover:text-amber-300 transition text-sm md:text-base mt-1 block">
                        marielvismalave@gmail.com
                      </a>
                    </div>
                  </div>
                </li>
                
                {/* WhatsApp */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300 border border-gray-800 hover:border-green-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600/20 to-emerald-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone size={20} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">WhatsApp Empresarial</div>
                      <div className="text-sm text-green-300">Respuesta rápida</div>
                      <a href="https://wa.me/541159121384" target="_blank" rel="noopener noreferrer"
                        className="text-white hover:text-green-300 transition text-sm md:text-base mt-1 block">
                        +54 1159121384
                      </a>
                    </div>
                    <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
                      Activo
                    </span>
                  </div>
                </li>
                
                {/* Ubicaciones */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300 border border-gray-800 hover:border-blue-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin size={20} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Oficinas Internacionales</div>
                      <div className="text-sm text-blue-300">Presencia global</div>
                      <div className="text-white text-sm md:text-base mt-1 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-900/30 rounded text-xs">Buenos Aires</span>
                        <span className="px-2 py-1 bg-amber-900/30 rounded text-xs">Caracas</span>
                        <span className="px-2 py-1 bg-green-900/30 rounded text-xs">Miami</span>
                      </div>
                    </div>
                  </div>
                </li>
                
              </ul>
              
              {/* Horario */}
              <div className="mt-6 p-3 bg-amber-900/10 rounded-lg border border-amber-800/30">
                <p className="text-xs text-amber-200 text-center">
                  <span className="font-semibold">Horario:</span> L-V 9:00-18:00 GMT-3 • Respuesta en 24h
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/politica-privacidad" className="hover:text-amber-400 transition">Confidencialidad</Link></li>
                <li><Link to="/terminos-servicio" className="hover:text-amber-400 transition">Términos del Servicio</Link></li>
                <li><Link to="/gdpr-compliance" className="hover:text-amber-400 transition">Protección de Datos</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2026 PETROLINK VENEZUELA. Todos los derechos reservados.</p>
            <p className="text-sm">El Retorno de los Especialistas • Oil & Gas • Reinserción Profesional</p>
          </div>
        </div>
      </footer>
    </div>
  );
}