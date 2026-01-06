// pages/Assessment.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Target, BarChart3, Users, Brain, TrendingUp, CheckCircle2, FileText, Shield } from 'lucide-react';

export default function Assessment() {
  const methodologies = [
    {
      icon: <Users size={24} />,
      title: "Evaluación 360°",
      description: "Feedback integral de colegas, subordinados y superiores"
    },
    {
      icon: <Brain size={24} />,
      title: "Assessment Psicológico",
      description: "Evaluación de competencias cognitivas y emocionales"
    },
    {
      icon: <Target size={24} />,
      title: "Simulaciones Ejecutivas",
      description: "Casos reales de liderazgo y toma de decisiones"
    },
    {
      icon: <FileText size={24} />,
      title: "Entrevistas Estructuradas",
      description: "Sesiones profundas con metodología STAR"
    }
  ];

  const benefits = [
    "Identificación de talento de alto potencial",
    "Reducción de rotación ejecutiva",
    "Mejora en la toma de decisiones de promoción",
    "Desarrollo de planes de carrera personalizados",
    "Alineación con objetivos estratégicos",
    "Mejora del clima organizacional"
  ];

  return (
    <Layout 
      title="Assessment de Liderazgo" 
      subtitle="Evaluación integral de competencias directivas para optimizar el desarrollo y potencial ejecutivo."
    >
      <div className="space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <Target className="text-blue-600" size={16} />
            <span className="text-sm font-semibold text-blue-700">EVALUACIÓN EJECUTIVA</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Maximiza el Potencial de Liderazgo</h2>
          <p className="text-gray-600 text-lg">
            Metodologías validadas internacionalmente para evaluar y desarrollar las competencias 
            críticas de liderazgo en el sector industrial.
          </p>
        </div>

        {/* Methodologies */}
        <div>
          <h3 className="text-3xl font-bold mb-12 text-center">Nuestras Metodologías</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologies.map((method, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                  {method.icon}
                </div>
                <h4 className="font-bold text-lg mb-3">{method.title}</h4>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-8">Beneficios del Assessment Ejecutivo</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="font-bold">Clientes Satisfechos</div>
                <div className="text-2xl font-bold text-amber-600">98%</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="font-bold">Ejecutivos Evaluados</div>
                <div className="text-2xl font-bold text-amber-600">1,200+</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="font-bold">Tasa de Retención</div>
                <div className="text-2xl font-bold text-amber-600">92%</div>
              </div>
              
              <div className="pt-6 border-t border-blue-100">
                <div className="text-sm text-gray-600">
                  Datos basados en evaluaciones realizadas en los últimos 24 meses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-12 text-center">Proceso de Assessment</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-4">01</div>
              <h4 className="font-bold mb-3">Diagnóstico Inicial</h4>
              <p className="text-gray-300">Definición de competencias clave y diseño de evaluación</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-4">02</div>
              <h4 className="font-bold mb-3">Implementación</h4>
              <p className="text-gray-300">Aplicación de metodologías y recolección de datos</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-4">03</div>
              <h4 className="font-bold mb-3">Entrega de Resultados</h4>
              <p className="text-gray-300">Reporte ejecutivo y plan de desarrollo personalizado</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">¿Interesado en evaluar el potencial de liderazgo en tu organización?</h3>
            <p className="text-gray-600 mb-6">
              Agenda una demostración de nuestras herramientas de assessment.
            </p>
            <a 
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Solicitar Demostración
              <TrendingUp size={20} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}