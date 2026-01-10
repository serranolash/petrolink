// src/pages/Contacto.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Users, Zap, User, Building } from 'lucide-react';
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
      address: "Centro Financiero Confinanzas",
      phone: "+58 412-PETROLINK",
      type: "Sede Operativa",
      color: "from-amber-50 to-amber-100"
    },
    {
      city: "Buenos Aires, Argentina",
      address: "Recoleta, Oficina Corporativa",
      phone: "+54 1159121384",
      type: "Sede Central",
      color: "from-blue-50 to-cyan-100"
    },
    {
      city: "Miami, USA",
      address: "Brickell Avenue, Suite 850",
      phone: "+1 (786) 555-4892",
      type: "Enlace Internacional",
      color: "from-green-50 to-emerald-100"
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
        status: 'nuevo',
        source: 'contacto_page'
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Conectamos Talento Petrolero</h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Tu experiencia es valiosa. Conéctate directamente con nuestra directora de talento 
            para oportunidades reales en la industria petrolera.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                <Send className="text-white" size={20} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Envía tu Consulta</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Completa el formulario y Marielvis se comunicará contigo personalmente.
            </p>
            
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={36} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3">¡Mensaje Enviado!</h4>
                <p className="text-gray-600">
                  Marielvis Malave revisará tu mensaje personalmente y te contactará 
                  en las próximas 24 horas hábiles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <User size={18} />
                      </div>
                      <input 
                        type="text" 
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required 
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="Ing. Carlos Rodríguez"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa/Posición *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Building size={18} />
                      </div>
                      <input 
                        type="text" 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        required 
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="Superintendente de Producción"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="c.rodriguez@empresa.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Phone size={18} />
                      </div>
                      <input 
                        type="tel" 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required 
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="+58 412-XXX-XXXX"
                      />
                    </div>
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
                    <option value="specialist">Soy especialista petrolero</option>
                    <option value="returning">Quiero regresar a Venezuela</option>
                    <option value="company">Soy empresa buscando talento</option>
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition resize-none"
                    placeholder="Describe brevemente tu experiencia, certificaciones y lo que buscas en tu próximo rol..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar a Marielvis Malave
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contacto Directo */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-900 flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                Contacto Directo
              </h3>
              
              <div className="space-y-6">
                {/* Marielvis Malave */}
                <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Lic. Marielvis Malave</div>
                      <div className="text-amber-300 text-sm">Directora de Talento Petrolero</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-gray-400" />
                      <div>
                        <div className="text-gray-400 text-sm">Correo profesional</div>
                        <a href="mailto:marielvis.malave@petrolinkvzla.com" 
                           className="text-white hover:text-amber-300 transition font-medium">
                          marielvis.malave@petrolinkvzla.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <div className="text-gray-400 text-sm">Teléfono directo</div>
                        <div className="text-white font-medium">Disponible por correo</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Horario */}
                <div className="flex items-center gap-4 p-4 bg-amber-900/20 rounded-xl border border-amber-800/30">
                  <Clock className="text-amber-400" size={24} />
                  <div>
                    <div className="font-bold">Horario de Atención</div>
                    <div className="text-sm text-amber-300">Lunes a Viernes 9:00 - 18:00 (GMT-3)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Oficinas */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Oficinas Operativas</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className={`bg-gradient-to-br ${office.color} rounded-xl p-5 border border-gray-200`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                        <MapPin className={index === 0 ? "text-amber-600" : index === 1 ? "text-blue-600" : "text-green-600"} size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{office.city}</h4>
                        <div className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded-full inline-block">
                          {office.type}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-500" />
                        {office.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-500" />
                        {office.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para tu próximo paso en la industria petrolera?
          </h3>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Más de 500 especialistas ya han confiado en nosotros para su reinserción profesional. 
            Tu experiencia es nuestro activo más valioso.
          </p>
          <button 
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-amber-900 font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Send size={18} />
            Contactar a Marielvis
          </button>
        </div>
      </div>
    </Layout>
  );
}