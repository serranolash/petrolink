// pages/PrivacyPolicy.jsx
import React from 'react';
import Layout from '../components/Layout';
import { Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Información que Recopilamos",
      content: "Recopilamos información personal que nos proporcionas directamente, como nombre, dirección de correo electrónico, información profesional, y datos de contacto. También recopilamos información automáticamente a través de cookies y tecnologías similares."
    },
    {
      title: "Uso de la Información",
      content: "Utilizamos tu información personal para: proveer nuestros servicios de reclutamiento ejecutivo, comunicarnos contigo sobre oportunidades relevantes, mejorar nuestros servicios, y cumplir con obligaciones legales."
    },
    {
      title: "Compartición de Información",
      content: "Compartimos información solo con empresas clientes para procesos de reclutamiento específicos, con tu consentimiento previo. No vendemos ni alquilamos tu información personal a terceros."
    },
    {
      title: "Seguridad de Datos",
      content: "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción."
    },
    {
      title: "Tus Derechos",
      content: "Tienes derecho a acceder, corregir, eliminar o limitar el uso de tu información personal. También puedes oponerte al procesamiento de tus datos o solicitar la portabilidad de los mismos."
    },
    {
      title: "Retención de Datos",
      content: "Conservamos tu información personal durante el tiempo necesario para los fines descritos en esta política, a menos que la ley requiera o permita un período de retención más largo."
    }
  ];

  return (
    <Layout 
      title="Política de Privacidad" 
      subtitle="Comprometidos con la protección y privacidad de tus datos personales."
    >
      <div className="space-y-12">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Protección de Datos Ejecutivos</h2>
              <p className="text-gray-600">Última actualización: Enero 2026</p>
            </div>
          </div>
          <p className="text-gray-700">
            En Ventalent Executive, nos tomamos muy en serio la privacidad y protección de tus datos. 
            Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" />
                Principios Clave
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm">Transparencia en el procesamiento</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm">Limitación de la finalidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm">Minimización de datos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm">Exactitud de la información</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm">Almacenamiento limitado</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl p-6 text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Eye size={20} />
                Contacto DPO
              </h4>
              <p className="text-white-600 text-sm mb-4">
                Para preguntas sobre protección de datos, contacta a nuestro 
                Delegado de Protección de Datos:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-amber-300" />
                  <span className="text-sm">dpo@ventalentexec.com</span>
                </div>
                <div className="text-xs text-blue-200">
                  Respuesta en 72 horas hábiles
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Database size={20} className="text-blue-600" />
                Cumplimiento
              </h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Nuestras prácticas cumplen con:
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text--700 rounded-full text-xs font-medium">GDPR</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">CCPA</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">LGPD</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-6">
            ¿Tienes preguntas sobre cómo manejamos tus datos?
          </p>
          <a 
            href="/contacto"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition"
          >
            <Mail size={18} />
            Contactar al DPO
          </a>
        </div>
      </div>
    </Layout>
  );
}