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
              <h4 className="text-white font-semibold mb-6">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><Mail size={16} /> talento@petrolinkvzla.com</li>
                <li className="flex items-center gap-2"><Phone size={16} /> +58 412-PETROLINK</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> Caracas • Maracaibo • Punto Fijo</li>
              </ul>
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