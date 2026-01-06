// src/pages/Headhunting.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Users, Target, Search, Shield, Globe, Clock, CheckCircle2, BarChart3, Zap, HardHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Headhunting() {
  const navigate = useNavigate();

  const industries = [
    "Exploración y Producción", "Perforación", "Refinación", 
    "Petroquímica", "Gas Natural", "Servicios Petroleros",
    "Offshore", "Mantenimiento Industrial"
  ];

  const positions = [
    "Gerente de Campo",
    "Superintendente de Producción",
    "Ingeniero de Perforación Senior",
    "Supervisor de Mantenimiento",
    "Especialista HSE",
    "Geocientífico Senior",
    "Ingeniero de Reservorios",
    "Coordinador de Proyectos EPC"
  ];

  return (
    <Layout 
      title="Headhunting Petrolero" 
      subtitle="Búsqueda y captación de talento especializado para la industria Oil & Gas en Venezuela."
    >
      <div className="space-y-20">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <HardHat className="text-amber-600" size={16} />
              <span className="text-sm font-semibold text-amber-700">TALENTO PETROLERO</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Búsqueda Estratégica de Especialistas</h2>
            <p className="text-gray-600 text-lg mb-8">
              Especializados en la identificación y captación de profesionales petroleros 
              para posiciones críticas en empresas transnacionales operando en Venezuela.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Enfoque en la diáspora venezolana</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Red global de más de 5,000 especialistas</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">98% de éxito en colocaciones petroleras</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Target className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Enfoque Específico</h4>
                  <p className="text-gray-600 text-sm">Industria Oil & Gas venezolana</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Globe className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Alcance Global</h4>
                  <p className="text-gray-600 text-sm">Talentos en 25+ países</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Tiempo Promedio</h4>
                  <p className="text-gray-600 text-sm">30 días desde evaluación hasta contratación</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-12 text-center">Nuestro Proceso de Headhunting Petrolero</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={24} />
              </div>
              <h4 className="font-bold mb-3">Mapeo</h4>
              <p className="text-gray-300 text-sm">Identificación de talento en la diáspora petrolera</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={24} />
              </div>
              <h4 className="font-bold mb-3">Evaluación</h4>
              <p className="text-gray-300 text-sm">Validación técnica y certificaciones</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={24} />
              </div>
              <h4 className="font-bold mb-3">Presentación</h4>
              <p className="text-gray-300 text-sm">Introducción estratégica a transnacionales</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={24} />
              </div>
              <h4 className="font-bold mb-3">Integración</h4>
              <p className="text-gray-300 text-sm">Acompañamiento en reinserción local</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">¿Necesitas talento petrolero especializado?</h3>
            <p className="text-gray-600 mb-8">
              Nuestro equipo especializado está listo para ayudarte a encontrar al especialista ideal 
              para tus operaciones en Venezuela.
            </p>
            <button 
              onClick={() => navigate('/contacto')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Solicitar Propuesta
              <BarChart3 size={20} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}