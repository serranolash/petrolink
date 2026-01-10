// src/components/Layout.jsx - VERSIÓN MINIMALISTA
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, ChevronRight, Menu, X, ArrowLeft,
  Mail, MapPin
} from 'lucide-react';

export default function Layout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="font-sans bg-white text-gray-900 antialiased min-h-screen">
      {/* Header/Navbar SIMPLIFICADO */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="flex flex-col px-6 py-4">
              <Link to="/servicios" onClick={() => setMobileMenuOpen(false)} className="py-3 text-gray-700 hover:text-amber-600 border-b border-gray-100">Servicios</Link>
              <Link to="/headhunting-ejecutivo" onClick={() => setMobileMenuOpen(false)} className="py-3 text-gray-700 hover:text-amber-600 border-b border-gray-100">Headhunting</Link>
              <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className="py-3 text-gray-700 hover:text-amber-600 border-b border-gray-100">Contacto</Link>
              <button 
                onClick={() => {
                  navigate('/contacto');
                  setMobileMenuOpen(false);
                }}
                className="py-3 mt-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold"
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header SIN BORDES */}
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

      {/* Footer SUPER MINIMALISTA */}
      <footer className="py-12 px-6 bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div className="text-xl font-bold text-white">
                  PETROLINK
                  <div className="text-amber-400 text-sm">VENEZUELA</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 max-w-md">
                Especialistas en reinserción del talento petrolero venezolano.
              </p>
            </div>

            {/* Contacto Único - SÓLO EMAIL */}
            <div className="bg-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600/20 to-orange-700/20 flex items-center justify-center">
                  <Mail className="text-amber-400" size={20} />
                </div>
                <div>
                  <div className="font-medium text-white">Contacto General</div>
                  <div className="text-sm text-amber-300">Respuesta en 24h</div>
                </div>
              </div>
              <a 
                href="mailto:info@petrolinkvzla.com" 
                className="text-white hover:text-amber-300 transition text-sm font-medium block"
              >
                info@petrolinkvzla.com
              </a>
            </div>

            {/* Enlaces básicos */}
            <div>
              <h4 className="text-white font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-amber-400 transition">Inicio</Link></li>
                <li><Link to="/servicios" className="hover:text-amber-400 transition">Servicios</Link></li>
                <li><Link to="/contacto" className="hover:text-amber-400 transition">Contacto</Link></li>
              </ul>
            </div>
          </div>

          {/* Ubicaciones mínimas */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-sm text-gray-300">Oficinas Operativas</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">Buenos Aires</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">Caracas</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-xs">Miami</span>
            </div>
          </div>

          {/* Copyright SIN BORDER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Petrolink Venezuela. Todos los derechos reservados.
            </p>
            <p className="text-sm text-amber-400">
              Reinserción del Talento Petrolero
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}