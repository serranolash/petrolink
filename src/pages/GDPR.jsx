// pages/GDPR.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Shield, Lock, Globe, CheckCircle2, FileText, Users, Database, AlertCircle } from 'lucide-react';

export default function GDPR() {
  const rights = [
    {
      icon: <FileText size={20} />,
      title: "Derecho de Acceso",
      description: "Puedes solicitar información sobre qué datos tenemos y cómo los procesamos."
    },
    {
      icon: <CheckCircle2 size={20} />,
      title: "Derecho de Rectificación",
      description: "Puedes solicitar la corrección de datos inexactos o incompletos."
    },
    {
      icon: <Database size={20} />,
      title: "Derecho al Olvido",
      description: "Puedes solicitar la eliminación de tus datos personales en ciertas circunstancias."
    },
    {
      icon: <Lock size={20} />,
      title: "Derecho de Limitación",
      description: "Puedes solicitar la restricción del procesamiento de tus datos."
    },
    {
      icon: <Globe size={20} />,
      title: "Derecho de Portabilidad",
      description: "Puedes recibir tus datos en formato estructurado y transferirlos."
    },
    {
      icon: <Users size={20} />,
      title: "Derecho de Oposición",
      description: "Puedes oponerte al procesamiento de tus datos en ciertas situaciones."
    }
  ];

  const complianceMeasures = [
    "Designación de Delegado de Protección de Datos (DPO)",
    "Registro de actividades de procesamiento",
    "Evaluaciones de impacto de protección de datos",
    "Notificación de violaciones de datos en 72 horas",
    "Contratos de procesamiento con proveedores",
    "Capacitación periódica del personal"
  ];

  return (
    <Layout 
      title="GDPR Compliance" 
      subtitle="Cumplimiento integral del Reglamento General de Protección de Datos de la UE."
    >
      <div className="space-y-16">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto mb-6">
              <Shield className="text-white" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Cumplimiento GDPR</h2>
            <p className="text-gray-600 text-lg">
              Nos comprometemos con la protección de datos según el Reglamento General de 
              Protección de Datos (GDPR) de la Unión Europea.
            </p>
          </div>
        </div>

        {/* GDPR Overview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">¿Qué es el GDPR?</h3>
            <p className="text-gray-600 mb-6">
              El Reglamento General de Protección de Datos (GDPR) es la normativa de 
              protección de datos más estricta del mundo, aplicable a todas las organizaciones 
              que procesan datos de ciudadanos de la Unión Europea.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="text-blue-600" size={20} />
                <span className="font-medium">Aplicación extraterritorial</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="text-blue-600" size={20} />
                <span className="font-medium">Multas de hasta 4% del volumen global</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span className="font-medium">En vigor desde Mayo 2018</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 text-white">
            <h4 className="text-xl font-bold mb-6">Nuestro Compromiso</h4>
            <div className="space-y-6">
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-300">Cumplimiento GDPR verificable</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-gray-300">Monitoreo de seguridad de datos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">72h</div>
                <div className="text-gray-300">Notificación de violaciones</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rights Section */}
        <div>
          <h3 className="text-3xl font-bold mb-12 text-center">Tus Derechos bajo el GDPR</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rights.map((right, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                  {right.icon}
                </div>
                <h4 className="font-bold text-lg mb-3">{right.title}</h4>
                <p className="text-gray-600 text-sm">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Measures */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-12 text-center">Medidas de Cumplimiento</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceMeasures.map((measure, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-blue-600" size={16} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Medida {index + 1}</h4>
                  <p className="text-gray-600 text-sm">{measure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Processing Principles */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
            <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
              <Lock className="text-blue-600" />
              Principios de Procesamiento
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Liceitud, lealtad y transparencia</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Limitación de la finalidad</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Minimización de datos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Exactitud</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Limitación del plazo de conservación</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Integridad y confidencialidad</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-8 text-white">
            <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
              <AlertCircle className="text-blue-400" />
              Ejercer Tus Derechos
            </h4>
            <p className="text-gray-300 mb-6">
              Para ejercer cualquier derecho GDPR, contacta a nuestro Delegado de 
              Protección de Datos (DPO):
            </p>
            <div className="space-y-4">
              <div>
                <div className="font-bold mb-1">Email del DPO</div>
                <div className="text-blue-300">dpo@ventalentexec.com</div>
              </div>
              <div>
                <div className="font-bold mb-1">Tiempo de Respuesta</div>
                <div className="text-gray-300">Máximo 30 días calendario</div>
              </div>
              <div>
                <div className="font-bold mb-1">Sin Costo</div>
                <div className="text-gray-300">Ejercer derechos es gratuito</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-6">
            Para más información sobre nuestro cumplimiento GDPR o para ejercer tus derechos
          </p>
          <a 
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Contactar al DPO
            <Shield size={20} />
          </a>
        </div>
      </div>
    </Layout>
  );
}