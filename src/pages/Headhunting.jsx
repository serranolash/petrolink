// src/pages/Headhunting.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Users, Target, Search, Shield, Globe, Clock, CheckCircle2, BarChart3, Zap, HardHat, Briefcase, Building2, Cpu, Network, ShieldCheck, Rocket, Lightbulb, DollarSign, Award, Users as UsersIcon, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Headhunting() {
  const navigate = useNavigate();

  const industries = [
    "Energía & Petróleo", 
    "Infraestructura Estratégica", 
    "Tecnología & Digitalización",
    "Logística & Cadena de Suministro", 
    "Finanzas Corporativas",
    "Gestión Ambiental & Sostenibilidad",
    "Innovación & Desarrollo",
    "Consultoría Estratégica"
  ];

  const positions = [
    "Directores de Transformación Digital",
    "Gerentes de Proyectos Estratégicos",
    "Especialistas en Infraestructura",
    "Líderes en Sostenibilidad Corporativa",
    "Arquitectos de Soluciones Tecnológicas",
    "Consultores Estratégicos Senior",
    "Expertos en Operaciones Internacionales",
    "Coordinadores de Innovación"
  ];

  const services = [
    {
      icon: <Target size={28} />,
      title: "Búsqueda Ejecutiva",
      description: "Identificación de líderes senior para posiciones críticas en proyectos transformadores.",
      metrics: "C-Level • Directores • Gerencias",
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: <Search size={28} />,
      title: "Headhunting Especializado",
      description: "Captación de profesionales con expertise específico en industrias estratégicas.",
      metrics: "Expertos • Especialistas • Técnicos Senior",
      color: "from-orange-500 to-amber-600"
    },
    {
      icon: <Users size={28} />,
      title: "Construcción de Equipos",
      description: "Formación de equipos completos para proyectos de gran escala y complejidad.",
      metrics: "Equipos Multidisciplinarios • Proyectos EPC",
      color: "from-amber-600 to-orange-600"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Evaluación Integral",
      description: "Assessment profundo de competencias técnicas, liderazgo y fit cultural.",
      metrics: "Assessment 360° • Pruebas Especializadas",
      color: "from-orange-600 to-amber-700"
    }
  ];

  return (
    <Layout 
      title="Headhunting Ejecutivo & Estratégico" 
      subtitle="Búsqueda y captación de talento de alto nivel para proyectos transformadores en Venezuela."
    >
      <div className="space-y-20">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <Rocket className="text-amber-600" size={16} />
              <span className="text-sm font-semibold text-amber-700">TALENTO DE ALTO IMPACTO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Headhunting para Líderes Transformadores</h2>
            <p className="text-gray-600 text-lg mb-8">
              Especializados en la identificación y captación de profesionales ejecutivos 
              y técnicos senior para proyectos estratégicos que redefinen industrias en Venezuela.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Enfoque en talento global con experiencia internacional</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Red ejecutiva de más de 8,000 profesionales senior</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">95% de éxito en colocaciones de alto nivel</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Confidencialidad absoluta en procesos ejecutivos</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Target className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Enfoque Estratégico</h4>
                  <p className="text-gray-600 text-sm">Proyectos de transformación industrial y energética</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Globe className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alcance Global</h4>
                  <p className="text-gray-600 text-sm">Talentos ejecutivos en 35+ países</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Eficiencia Comprobada</h4>
                  <p className="text-gray-600 text-sm">25 días promedio desde brief hasta shortlist</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <DollarSign className="text-amber-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">ROI Garantizado</h4>
                  <p className="text-gray-600 text-sm">Modelo por resultados con garantía de retención</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Servicios de Headhunting Estratégico</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluciones especializadas según el nivel de complejidad y perfil requerido
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block">
                    {service.metrics}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries & Positions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Industries */}
          <div className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Building2 className="text-amber-600" size={20} />
              </div>
              <h3 className="text-2xl font-bold">Industrias que Servimos</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2 border border-gray-200">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-800">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Positions */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Briefcase className="text-amber-600" size={20} />
              </div>
              <h3 className="text-2xl font-bold">Posiciones que Cubrimos</h3>
            </div>
            <div className="space-y-3">
              {positions.map((position, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/70 rounded-lg px-4 py-3 border border-amber-100">
                  <Award size={16} className="text-amber-600" />
                  <span className="font-medium text-gray-800">{position}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Metodología de Headhunting Ejecutivo</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Proceso estructurado que garantiza la identificación del talento adecuado para cada desafío estratégico
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-0.5 bg-amber-500/30"></div>
                </div>
              </div>
              <h4 className="font-bold mb-3 text-lg">Brief Estratégico</h4>
              <p className="text-gray-300 text-sm">Análisis profundo de necesidades, cultura organizacional y objetivos del proyecto</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={24} />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-0.5 bg-amber-500/30"></div>
                </div>
              </div>
              <h4 className="font-bold mb-3 text-lg">Mapeo Global</h4>
              <p className="text-gray-300 text-sm">Búsqueda activa en redes ejecutivas globales y mercados especializados</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-0.5 bg-amber-500/30"></div>
                </div>
              </div>
              <h4 className="font-bold mb-3 text-lg">Evaluación Integral</h4>
              <p className="text-gray-300 text-sm">Assessment de competencias técnicas, liderazgo, fit cultural y potencial</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} />
              </div>
              <h4 className="font-bold mb-3 text-lg">Integración Exitosa</h4>
              <p className="text-gray-300 text-sm">Acompañamiento en incorporación y seguimiento post-contratación</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">25 días</div>
              <div className="text-sm text-gray-400">Promedio de proceso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">95%</div>
              <div className="text-sm text-gray-400">Tasa de éxito</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">8K+</div>
              <div className="text-sm text-gray-400">Talentos en red</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">35+</div>
              <div className="text-sm text-gray-400">Países de alcance</div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">¿Por qué elegir nuestro Headhunting?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShieldCheck className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-3">Confidencialidad Total</h4>
              <p className="text-gray-600">
                Procesos discretos con garantía de privacidad para empresas y candidatos ejecutivos
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-3">ROI Medible</h4>
              <p className="text-gray-600">
                Nuestro trabajo se traduce en impacto directo en los resultados de su organización
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-3">Alcance Global</h4>
              <p className="text-gray-600">
                Acceso exclusivo a talento internacional que de otra forma sería inaccesible
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-900/10 to-orange-900/10 border border-amber-900/20">
              <UsersIcon className="text-amber-700" size={16} />
              <span className="text-sm font-semibold text-amber-800">SOLICITA UNA PROPUESTA ESTRATÉGICA</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">¿Listo para potenciar tu equipo con talento de clase mundial?</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Nuestro equipo especializado está preparado para ayudarte a encontrar los líderes 
              que transformarán tus proyectos más ambiciosos en Venezuela.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contacto')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Solicitar Propuesta Ejecutiva
                <BarChart3 size={20} />
              </button>
              <button 
                onClick={() => navigate('/servicios')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-amber-700 font-bold rounded-xl border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
              >
                Conocer todos los servicios
                <Briefcase size={20} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              Procesos confidenciales • Garantía de resultados • Sin compromiso inicial
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}