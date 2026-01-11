// src/pages/Servicios.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Target, Users, BarChart3, TrendingUp, CheckCircle2, FileText, Shield, Home, Flag, Zap, HardHat, Wrench, Globe, Building2, Cpu, Network, ShieldCheck, Users as UsersIcon, Briefcase, Rocket, Lightbulb } from 'lucide-react';

export default function Servicios() {
  const services = [
    {
      icon: <Users size={32} />,
      title: "Reclutamiento Estratégico",
      description: "Identificación y captación de talento especializado para proyectos de transformación industrial y energética.",
      features: [
        "Búsqueda global de profesionales", 
        "Evaluación técnica y de liderazgo", 
        "Filtro por competencias estratégicas",
        "Assessment internacional"
      ],
      gradient: "from-amber-500 to-amber-600"
    },
    {
      icon: <Target size={32} />,
      title: "Integración de Talento Global",
      description: "Proceso completo de incorporación de profesionales internacionales en proyectos estratégicos en Venezuela.",
      features: [
        "Asesoría legal y migratoria", 
        "Negociación de paquetes competitivos", 
        "Adaptación cultural y logística",
        "Orientación profesional"
      ],
      gradient: "from-orange-500 to-amber-600"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Consultoría en Gestión del Talento",
      description: "Asesoramiento estratégico a empresas en procesos de captación y retención de talento especializado.",
      features: [
        "Estrategia de talento para proyectos", 
        "Mapeo de competencias críticas", 
        "Diseño de planes sucesorios",
        "Análisis de mercado laboral"
      ],
      gradient: "from-amber-600 to-orange-600"
    },
    {
      icon: <Building2 size={32} />,
      title: "Desarrollo de Liderazgo",
      description: "Programas de capacitación y coaching para líderes que gestionan equipos internacionales y proyectos complejos.",
      features: [
        "Coaching ejecutivo internacional", 
        "Capacitación en gestión intercultural", 
        "Desarrollo de habilidades estratégicas",
        "Mentoría para transiciones"
      ],
      gradient: "from-orange-600 to-amber-700"
    },
    {
      icon: <Cpu size={32} />,
      title: "Transformación Digital & Innovación",
      description: "Servicios especializados para la digitalización de procesos y adopción de tecnologías emergentes.",
      features: [
        "Diagnóstico de madurez digital", 
        "Implementación de soluciones Industry 4.0", 
        "Gestión del cambio tecnológico",
        "Capacitación en nuevas tecnologías"
      ],
      gradient: "from-amber-700 to-orange-700"
    },
    {
      icon: <Network size={32} />,
      title: "Gestión de Proyectos Estratégicos",
      description: "Soporte especializado en la planificación y ejecución de proyectos de alto impacto.",
      features: [
        "Metodologías ágiles y tradicionales", 
        "Gestión de stakeholders internacionales", 
        "Control y monitoreo de proyectos",
        "Optimización de procesos"
      ],
      gradient: "from-orange-700 to-amber-800"
    }
  ];

  const industries = [
    { name: "Energía & Petróleo", icon: <Zap size={20} /> },
    { name: "Infraestructura", icon: <Building2 size={20} /> },
    { name: "Tecnología", icon: <Cpu size={20} /> },
    { name: "Logística", icon: <Network size={20} /> },
    { name: "Finanzas Estratégicas", icon: <TrendingUp size={20} /> },
    { name: "Gestión Ambiental", icon: <ShieldCheck size={20} /> },
    { name: "Innovación", icon: <Lightbulb size={20} /> },
    { name: "Consultoría", icon: <Briefcase size={20} /> }
  ];

  return (
    <Layout 
      title="Servicios Estratégicos de Talento" 
      subtitle="Soluciones integrales para conectar profesionales globales con proyectos transformadores en Venezuela."
    >
      <div className="space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
            <Globe className="text-amber-600" size={16} />
            <span className="text-sm font-semibold text-amber-700">TALENTO GLOBAL PARA PROYECTOS ESTRATÉGICOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Conectamos Experiencia Global con Oportunidades Transformadoras</h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Facilitamos la integración de profesionales internacionales en proyectos que están redefiniendo 
            el panorama industrial y energético de Venezuela con estándares mundiales.
          </p>
        </div>

        {/* Industries We Serve */}
        <div className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Sectores que Transformamos</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestra experiencia abarca múltiples industrias estratégicas que requieren talento especializado
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <div className="text-amber-600">{industry.icon}</div>
                </div>
                <h4 className="font-bold text-gray-900">{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
              <div className="p-8 flex-1">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8 pt-4 border-t border-gray-100">
                <a 
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold group/link"
                >
                  Solicitar información
                  <TrendingUp size={20} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Metodología de Integración Global</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proceso estructurado que garantiza éxito en la incorporación de talento internacional
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-amber-600" size={24} />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-0.5 bg-amber-200"></div>
                </div>
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Evaluación Integral</h4>
              <p className="text-sm text-gray-600">Análisis profundo de competencias, experiencia internacional y potencial de adaptación</p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-amber-600" size={24} />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-0.5 bg-amber-200"></div>
                </div>
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Emparejamiento Estratégico</h4>
              <p className="text-sm text-gray-600">Conectamos profesionales con proyectos que maximizan su impacto y desarrollo</p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-amber-600" size={24} />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <div className="w-8 h-0.5 bg-amber-200"></div>
                </div>
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Negociación Internacional</h4>
              <p className="text-sm text-gray-600">Garantía de condiciones competitivas, seguridad jurídica y beneficios globales</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Integración Exitosa</h4>
              <p className="text-sm text-gray-600">Acompañamiento continuo en adaptación cultural, profesional y logística</p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-2xl p-8">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-6">
              <Globe className="text-amber-400" size={24} />
            </div>
            <h4 className="text-xl font-bold mb-4">Alcance Global</h4>
            <p className="text-gray-300">
              Red internacional de profesionales y acceso a oportunidades en proyectos de clase mundial
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-2xl p-8">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-6">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold mb-4">Seguridad Integral</h4>
            <p className="text-amber-100">
              Garantizamos condiciones laborales estables, contratos blindados y protección jurídica
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-amber-700 text-white rounded-2xl p-8">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-6">
              <Rocket className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold mb-4">Impacto Medible</h4>
            <p className="text-orange-100">
              Nuestros servicios generan resultados tangibles en productividad y desarrollo profesional
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-3xl p-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20">
            <UsersIcon className="text-amber-300" size={16} />
            <span className="text-sm font-semibold text-amber-200">SOLICITA UNA CONSULTA ESTRATÉGICA</span>
          </div>
          <h3 className="text-3xl font-bold mb-6">¿Listo para liderar proyectos transformadores?</h3>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Agenda una consulta estratégica gratuita con nuestro equipo de especialistas en talento global.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contacto"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-amber-900 font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Solicitar Evaluación
              <TrendingUp size={20} />
            </Link>
            <Link 
              to="/headhunting-ejecutivo"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              Conocer Headhunting
              <Briefcase size={20} />
            </Link>
          </div>
          <p className="text-amber-200 text-sm mt-8">
            Proceso 100% confidencial • Consultoría especializada • Respuesta en 48 horas
          </p>
        </div>
      </div>
    </Layout>
  );
}