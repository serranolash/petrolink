// pages/DesarrolloOrganizacional.jsx
import React from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Users, Target, BarChart3, CheckCircle2, Lightbulb, RefreshCw, Globe } from 'lucide-react';

export default function DesarrolloOrganizacional() {
  const services = [
    {
      icon: <Users size={24} />,
      title: "Planificación Sucesoria",
      description: "Identificación y desarrollo de talento para posiciones críticas futuras"
    },
    {
      icon: <Target size={24} />,
      title: "Mentoría Ejecutiva",
      description: "Acompañamiento personalizado para desarrollo de líderes"
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Transformación Cultural",
      description: "Gestión del cambio y desarrollo de culturas organizacionales de alto desempeño"
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Innovación Organizacional",
      description: "Diseño de estructuras y procesos para la innovación continua"
    }
  ];

  const results = [
    "Incremento del 40% en retención de talento",
    "Mejora del 35% en engagement ejecutivo",
    "Reducción del 50% en tiempo de adaptación de nuevos líderes",
    "Aumento del 25% en productividad de equipos directivos"
  ];

  return (
    <Layout 
      title="Desarrollo Organizacional" 
      subtitle="Transformación estratégica y desarrollo de capacidades para organizaciones del sector industrial."
    >
      <div className="space-y-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Construyendo Organizaciones del Futuro</h2>
            <p className="text-gray-600 text-lg mb-8">
              Ayudamos a empresas del sector energía, minería e industria a transformar sus 
              capacidades organizacionales para enfrentar los desafíos del mañana.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Enfoque en resultados medibles</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Metodologías validadas globalmente</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="font-medium">Equipo multidisciplinario de expertos</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Impacto Demostrable</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold mb-2">40%</div>
                  <div className="text-blue-200">Aumento en retención de talento</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">35%</div>
                  <div className="text-blue-200">Mejora en engagement ejecutivo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">25%</div>
                  <div className="text-blue-200">Incremento en productividad</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-3xl font-bold mb-12 text-center">Nuestros Servicios de Desarrollo</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h4 className="font-bold text-lg mb-3">{service.title}</h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-12 text-center">Resultados Comprobados</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {results.map((result, index) => (
              <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{result.split(' ')[0]} {result.split(' ')[1]}</h4>
                  <p className="text-gray-600 text-sm">{result.split(' ').slice(2).join(' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-900/50 border border-blue-800">
                <Globe size={16} />
                <span className="text-sm font-semibold">CASO DE ÉXITO</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Transformación en Multinacional Minera</h3>
              <p className="text-gray-300 mb-6">
                Implementamos un programa integral de desarrollo organizacional para una empresa minera 
                global con operaciones en 15 países, logrando una transformación cultural completa en 18 meses.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>Reducción del 60% en rotación ejecutiva</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>Aumento del 45% en satisfacción del personal</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <span>Mejora del 30% en eficiencia operativa</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">60%</div>
                  <div className="text-gray-300">Reducción en rotación ejecutiva</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">45%</div>
                  <div className="text-gray-300">Aumento en satisfacción</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">30%</div>
                  <div className="text-gray-300">Mejora en eficiencia</div>
                </div>
                <div className="pt-6 border-t border-gray-700">
                  <div className="text-sm text-gray-400">Resultados medidos después de 24 meses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">¿Listo para transformar tu organización?</h3>
            <p className="text-gray-600 mb-8">
              Agenda una consulta estratégica con nuestros expertos en desarrollo organizacional.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Solicitar Consulta
              <TrendingUp size={20} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}