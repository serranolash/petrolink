// pages/TermsOfService.jsx
import React from 'react';
import Layout from '../components/Layout';
import { FileText, Scale, Clock, AlertCircle, CheckCircle2, Users } from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      title: "Definiciones",
      content: [
        "Servicio: Refiere a los servicios de reclutamiento ejecutivo, assessment y desarrollo organizacional proporcionados por Ventalent Executive.",
        "Cliente: Empresa que contrata nuestros servicios para búsqueda de talento ejecutivo.",
        "Candidato: Profesional que participa en procesos de selección ejecutiva."
      ]
    },
    {
      title: "Alcance de los Servicios",
      content: [
        "Proporcionamos servicios de headhunting ejecutivo confidencial para posiciones de liderazgo.",
        "Realizamos assessment de competencias directivas y evaluación de potencial.",
        "Ofrecemos consultoría en desarrollo organizacional y transformación cultural.",
        "Los servicios se prestan de acuerdo con las especificaciones acordadas en cada contrato."
      ]
    },
    {
      title: "Confidencialidad",
      content: [
        "Nos comprometemos a mantener la confidencialidad de toda información sensible proporcionada por clientes y candidatos.",
        "Los candidatos serán presentados a clientes solo con su consentimiento expreso.",
        "No compartiremos información de clientes con competidores directos.",
        "Toda información se maneja según nuestra Política de Privacidad y normativas GDPR."
      ]
    },
    {
      title: "Tarifas y Pagos",
      content: [
        "Las tarifas se establecen en contratos individuales por servicio.",
        "Para servicios de headhunting, aplican tarifas de éxito basadas en salario anual garantizado.",
        "Los pagos se realizan en 30 días desde la facturación.",
        "Las tarifas están sujetas a revisión anual con 60 días de notificación previa."
      ]
    },
    {
      title: "Garantías",
      content: [
        "Garantía de reemplazo: 90 días para posiciones ejecutivas.",
        "Compromiso de calidad en procesos de evaluación.",
        "Cumplimiento de plazos acordados en contratos.",
        "Protección de datos según normativas aplicables."
      ]
    },
    {
      title: "Limitación de Responsabilidad",
      content: [
        "No garantizamos la contratación de candidatos específicos.",
        "La decisión final de contratación recae exclusivamente en el cliente.",
        "No nos hacemos responsables por decisiones de negocio tomadas por candidatos colocados.",
        "La responsabilidad máxima está limitada al monto de los honorarios pagados."
      ]
    }
  ];

  return (
    <Layout 
      title="Términos del Servicio" 
      subtitle="Condiciones legales que rigen nuestra relación con clientes y candidatos."
    >
      <div className="space-y-12">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <Scale className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Términos y Condiciones</h2>
              <p className="text-gray-600">Vigentes desde Enero 2026</p>
            </div>
          </div>
          <p className="text-gray-700">
            Estos términos establecen las condiciones bajo las cuales Ventalent Executive 
            proporciona sus servicios de reclutamiento ejecutivo y consultoría.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <FileText size={24} className="text-blue-600" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Plazos Clave
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">Respuesta a consultas</div>
                  <div className="text-sm text-gray-600">24-48 horas hábiles</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Presentación de candidatos</div>
                  <div className="text-sm text-gray-600">10-15 días hábiles</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Periodo de garantía</div>
                  <div className="text-sm text-gray-600">90 días calendario</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Obligaciones del Cliente
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Proporcionar información precisa y completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Cumplir con plazos de respuesta acordados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Respetar acuerdos de confidencialidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Informar decisiones de contratación</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Para Candidatos
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Al participar en nuestros procesos:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Autorizas el uso de tu información</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Confirmas la veracidad de tus datos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Aceptas nuestra Política de Privacidad</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold mb-2">Nota Importante</h4>
              <p className="text-gray-600">
                Estos términos pueden actualizarse periódicamente. Los cambios serán notificados 
                con 30 días de anticipación. El uso continuado de nuestros servicios después de 
                cambios constituye aceptación de los nuevos términos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}