// src/pages/Servicios.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Target, Users, BarChart3, TrendingUp, CheckCircle2, FileText, Shield, Home, Flag, Zap, HardHat, Wrench } from 'lucide-react';

export default function Servicios() {
  const services = [
    {
      icon: <Users size={32} />,
      title: "Reclutamiento Petrolero",
      description: "Identificación y captación de talento especializado para la industria Oil & Gas.",
      features: ["Búsqueda en la diáspora", "Evaluación técnica especializada", "Filtro por segmento"],
      gradient: "from-amber-500 to-amber-600"
    },
    {
      icon: <Target size={32} />,
      title: "Reinserción Local",
      description: "Proceso completo de integración de talento retornado al mercado nacional.",
      features: ["Asesoría legal", "Negociación salarial", "Adaptación cultural"],
      gradient: "from-orange-500 to-amber-600"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Consultoría Especializada",
      description: "Asesoramiento a empresas transnacionales en procesos de localización.",
      features: ["Estrategia de talento", "Mapeo de competencias", "Planes sucesorios"],
      gradient: "from-amber-600 to-orange-600"
    }
  ];

  return (
    <Layout 
      title="Servicios de Reinserción Petrolera" 
      subtitle="Soluciones especializadas para el retorno del talento venezolano a la industria Oil & Gas."
    >
      <div className="space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
            <Zap className="text-amber-600" size={16} />
            <span className="text-sm font-semibold text-amber-700">EL RETORNO DE LOS ESPECIALISTAS</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Puente entre el Talento y la Oportunidad</h2>
          <p className="text-gray-600 text-lg">
            Facilitamos el reencuentro del talento petrolero venezolano con las oportunidades 
            estratégicas de la apertura energética nacional.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold group/link"
                >
                  Más información
                  <TrendingUp size={20} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nuestro Proceso de Reinserción</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Metodología probada que garantiza éxito en el retorno del talento especializado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Evaluación</h4>
              <p className="text-sm text-gray-600">Análisis profundo del perfil y certificaciones</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Match</h4>
              <p className="text-sm text-gray-600">Emparejamiento con oportunidades estratégicas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Negociación</h4>
              <p className="text-sm text-gray-600">Garantía de condiciones y seguridad jurídica</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Integración</h4>
              <p className="text-sm text-gray-600">Acompañamiento en la reinserción local</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">¿Listo para retornar a la industria petrolera?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Agenda una evaluación gratuita con nuestro equipo de especialistas en reinserción.
          </p>
          <a 
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Solicitar Evaluación
            <TrendingUp size={20} />
          </a>
        </div>
      </div>
    </Layout>
  );
}