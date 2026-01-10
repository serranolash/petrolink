// src/components/Layout.jsx - CORREGIDO (sin rayas duplicadas)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, ChevronRight, Menu, X, ArrowLeft,
  Mail, Phone, MapPin, Linkedin
} from 'lucide-react';

export default function Layout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="font-sans bg-white text-gray-900 antialiased min-h-screen">
      {/* Header/Navbar - QUITÉ EL BORDER DUPLICADO */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-sm">
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

      {/* Page Header - ELIMINÉ EL BORDER QUE CAUSABA LA RAYA */}
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

      {/* Footer - MODIFIQUÉ EL FOOTER PARA QUITAR BORDES DUPLICADOS */}
      <footer className="py-16 px-6 bg-gray-950 text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo y descripción - ELIMINÉ BORDER */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div className="text-xl font-bold text-white">
                  PETROLINK
                  <br />
                  <span className="text-amber-400">VENEZUELA</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Especialistas en reinserción del talento petrolero venezolano. 
                Conectamos experiencia internacional con las oportunidades de la apertura energética.
              </p>
            </div>
            
            {/* Enlaces rápidos - ELIMINÉ BORDER */}
            <div>
              <h4 className="text-white font-semibold mb-6">Para Especialistas</h4>
              <ul className="space-y-3">
                <li><Link to="/servicios" className="hover:text-amber-400 transition">Proceso de Reinserción</Link></li>
                <li><Link to="/headhunting-ejecutivo" className="hover:text-amber-400 transition">Posiciones Disponibles</Link></li>
                <li><Link to="/contacto" className="hover:text-amber-400 transition">Preguntas Frecuentes</Link></li>
              </ul>
            </div>
            
            {/* Equipo Directivo - SIMPLIFIQUE LOS BORDES */}
            <div>
              <h4 className="text-white font-semibold mb-6">Equipo Directivo</h4>
              <ul className="space-y-4">
                
                {/* Marielvis Malave */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600/20 to-orange-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail size={18} className="text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Lic. Marielvis Malave</div>
                      <div className="text-sm text-amber-300">Directora de Talento Humano</div>
                      <a href="mailto:marielvis@petrolinkvzla.com" 
                         className="text-white hover:text-amber-300 transition text-xs mt-1 block">
                        marielvis@petrolinkvzla.com
                      </a>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">Caracas, Venezuela</span>
                      </div>
                    </div>
                  </div>
                </li>
                
                {/* Mabel Rodríguez */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600/20 to-emerald-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Lic. Mabel Rodríguez</div>
                      <div className="text-sm text-green-300">Directora Zona Capital & Coach</div>
                      <a href="mailto:mabel.rodriguez@petrolinkvzla.com" 
                         className="text-white hover:text-green-300 transition text-xs mt-1 block">
                        mabel.rodriguez@petrolinkvzla.com
                      </a>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">Caracas, Venezuela</span>
                      </div>
                    </div>
                  </div>
                </li>
                
                {/* Alexis Anes Pulido */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Lic. Alexis Anes Pulido</div>
                      <div className="text-sm text-blue-300">Director Zona Oriente</div>
                      <a href="mailto:alexis.anes@petrolinkvzla.com" 
                         className="text-white hover:text-blue-300 transition text-xs mt-1 block">
                        alexis.anes@petrolinkvzla.com
                      </a>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">Anzoátegui, Venezuela</span>
                      </div>
                    </div>
                  </div>
                </li>
                
                {/* Alex Serrano */}
                <li className="group bg-gray-900/40 rounded-xl p-4 hover:bg-gray-800/60 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-violet-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">Ing. Alex Serrano</div>
                      <div className="text-sm text-purple-300">Director Tecnológico</div>
                      <a href="mailto:alex.serrano@petrolinkvzla.com" 
                         className="text-white hover:text-purple-300 transition text-xs mt-1 block">
                        alex.serrano@petrolinkvzla.com
                      </a>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">Miami, USA</span>
                      </div>
                    </div>
                  </div>
                </li>
                
              </ul>
              
              {/* Horario - SIMPLIFIQUE BORDER */}
              <div className="mt-6 p-3 bg-amber-900/10 rounded-lg">
                <p className="text-xs text-amber-200 text-center">
                  <span className="font-semibold">Horario:</span> L-V 9:00-18:00 • Respuesta en 24h
                </p>
              </div>
            </div>
            
            {/* Legal - SIN BORDER */}
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/politica-privacidad" className="hover:text-amber-400 transition">Confidencialidad</Link></li>
                <li><Link to="/terminos-servicio" className="hover:text-amber-400 transition">Términos del Servicio</Link></li>
                <li><Link to="/gdpr-compliance" className="hover:text-amber-400 transition">Protección de Datos</Link></li>
              </ul>
              
              {/* Redes Sociales - SIN BORDER */}
              <div className="mt-8 pt-6">
                <h5 className="text-white font-semibold mb-4">Síguenos</h5>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-amber-900/30 flex items-center justify-center transition">
                    <Linkedin size={18} className="text-gray-400 hover:text-amber-400" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-900/30 flex items-center justify-center transition">
                    <svg className="w-5 h-5 text-gray-400 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-pink-900/30 flex items-center justify-center transition">
                    <svg className="w-5 h-5 text-gray-400 hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright - MODIFIQUÉ EL BORDER */}
          <div className="pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Petrolink Venezuela. Todos los derechos reservados.
            </p>
            <p className="text-sm text-amber-400 font-medium">
              El Retorno de los Especialistas • Oil & Gas • Reinserción Internacional
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}