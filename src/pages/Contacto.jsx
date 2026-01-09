// src/pages/Contacto.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Users, Zap } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast, Toaster } from 'react-hot-toast';

export default function Contacto() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tipoConsulta: '',
    mensaje: ''
  });

  const offices = [
    {
      city: "Caracas, Venezuela",
      address: "Torre Petrolera, El Rosal",
      phone: "+58 412-PETROLINK",
      email: "caracas@petrolinkvzla.com"
    },
    {
      city: "Maracaibo, Venezuela",
      address: "Zona Industrial, Costa Oriental",
      phone: "+58 416-PETROLINK",
      email: "maracaibo@petrolinkvzla.com"
    },
    {
      city: "Punto Fijo, Venezuela",
      address: "Centro de Refinación Paraguaná",
      phone: "+58 414-PETROLINK",
      email: "puntofijo@petrolinkvzla.com"
    },
    {
      city: "Houston, USA",
      address: "Energy Corridor, Suite 1500",
      phone: "+1 (713) 555-PETRO",
      email: "houston@petrolinkvzla.com"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Guardar en Firebase
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: serverTimestamp(),
        tipo: 'contacto',
        status: 'nuevo'
      });

      setFormSubmitted(true);
      toast.success('¡Mensaje enviado exitosamente!');
      
      // Reset form
      setFormData({
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        tipoConsulta: '',
        mensaje: ''
      });

      // También podrías enviar email de notificación aquí
      // await sendEmailNotification(formData);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast.error('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }
  };

  return (
    <Layout 
      title="Contacto Petrolero" 
      subtitle="Conecta con nuestro equipo especializado en reinserción del talento petrolero venezolano."
    >
      <Toaster position="top-right" />
      
      <div className="space-y-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
            <Zap className="text-amber-600" size={16} />
            <span className="text-sm font-semibold text-amber-700">CONTACTO ESTRATÉGICO</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Conectamos Talento con Oportunidad</h2>
          <p className="text-gray-600 text-lg">
            Ya sea que busques retornar a la industria petrolera o necesites talento especializado, 
            nuestro equipo está listo para facilitar la conexión.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Envía tu Consulta</h3>
            
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={36} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3">¡Mensaje Enviado!</h4>
                <p className="text-gray-600">
                  Hemos recibido tu mensaje. Nuestro equipo especializado se pondrá en contacto 
                  contigo en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input 
                      type="text" 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                      placeholder="Ing. Carlos Rodríguez"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa/Posición *
                    </label>
                    <input 
                      type="text" 
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                      placeholder="Superintendente de Producción"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                      placeholder="c.rodriguez@empresa.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input 
                      type="tel" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                      placeholder="+58 412-XXX-XXXX"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Consulta *
                  </label>
                  <select 
                    name="tipoConsulta"
                    value={formData.tipoConsulta}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="specialist">Soy especialista buscando reinserción</option>
                    <option value="company">Represento una empresa petrolera</option>
                    <option value="other">Otra consulta</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea 
                    rows="4"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                    placeholder="Describe brevemente tu situación y cómo podemos ayudarte..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Offices */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Oficinas Estratégicas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="text-amber-600" size={20} />
                      <h4 className="font-bold">{office.city}</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>{office.address}</div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        {office.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        {office.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contacto Directo</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-900 flex items-center justify-center">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Consultas Generales</div>
                    <div className="text-amber-300">marielvismalave@petrolinkvzla.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-900 flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Especialistas Petroleros</div>
                    <div className="text-amber-300">especialistas@petrolinkvzla.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-900 flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Horario de Atención</div>
                    <div className="text-amber-300">24/7 para emergencias de talento crítico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}