// src/pages/Contacto.jsx - CORREGIDO (sin teléfonos en oficinas)
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Users, Zap, User, Building, Globe, Briefcase, Target, ShieldCheck } from 'lucide-react';
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
      type: "Sede Operativa",
      color: "from-amber-50 to-amber-100"
    },
    {
      city: "Buenos Aires, Argentina",
      address: "Recoleta, Oficina Corporativa",
      type: "Sede Central",
      color: "from-blue-50 to-cyan-100"
    },
    {
      city: "Miami, USA",
      address: "Brickell Avenue, Suite 850",
      type: "Enlace Internacional",
      color: "from-green-50 to-emerald-100"
    }
  ];

  const teamMembers = [
    {
      name: "Lic. Marielvis Malave Farias",
      position: "Directora de Talento Humano & Desarrollo Organizacional",
      expertise: "Administración de Recursos Humanos • Gestión del Talento Global • Estrategia Organizacional",
      location: "Buenos Aires, Argentina",
      email: "marielvis@petrolinkvzla.com",
      color: "amber"
    },
    {
      name: "Lic. Mabel Rodríguez",
      position: "Directora Zona Capital & Coach Ontológica Ejecutiva",
      expertise: "Coaching Ontológico Ejecutivo • Desarrollo de Liderazgo • Estrategia Corporativa",
      location: "Caracas, Venezuela",
      email: "mabel.rodriguez@petrolinkvzla.com",
      color: "green"
    },
    {
      name: "Lic. Alexis Anes Pulido",
      position: "Director Zona Oriente & Gestión Estratégica del Personal",
      expertise: "Administración de Personal • Gestión Operativa • Desarrollo Organizacional",
      location: "Anzoátegui, Venezuela",
      email: "alexis.anes@petrolinkvzla.com",
      color: "blue"
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
      title="Contacto Estratégico" 
      subtitle="Conecta con nuestro equipo especializado en talento global para proyectos transformadores."
    >
      <Toaster position="top-right" />
      
      <div className="space-y-20">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
            <Globe className="text-amber-600" size={16} />
            <span className="text-sm font-semibold text-amber-700">CONEXIÓN GLOBAL ESTRATÉGICA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Tu Puente hacia Proyectos Transformadores</h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Conectamos profesionales internacionales con oportunidades estratégicas en Venezuela. 
            Nuestro equipo directivo te acompaña en cada paso del proceso.
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
              <h3 className="text-2xl md:text-3xl font-bold">Consulta Estratégica</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Completa el formulario para una consulta personalizada con nuestro equipo directivo.
            </p>
            
            {formSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={36} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold mb-3">¡Consulta Recibida!</h4>
                <p className="text-gray-600">
                  Nuestro equipo directivo revisará tu mensaje personalmente y te contactará 
                  en las próximas 24 horas hábiles para coordinar una reunión estratégica.
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
                      Empresa / Posición Actual *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Briefcase size={18} />
                      </div>
                      <input 
                        type="text" 
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        required 
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="Director de Proyectos / Consultor Senior"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Profesional *
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
                        placeholder="nombre.apellido@empresa.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono (Opcional)
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
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Consulta Estratégica *
                  </label>
                  <select 
                    name="tipoConsulta"
                    value={formData.tipoConsulta}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="professional">Soy profesional interesado en proyectos estratégicos</option>
                    <option value="company">Represento una empresa buscando talento especializado</option>
                    <option value="leadership">Busco oportunidades de liderazgo en transformación</option>
                    <option value="consulting">Consultoría en gestión de talento y proyectos</option>
                    <option value="partnership">Posibles alianzas estratégicas</option>
                    <option value="other">Otra consulta especializada</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje Estratégico *
                  </label>
                  <textarea 
                    rows="4"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition resize-none"
                    placeholder="Describe tu experiencia internacional, competencias clave, y tus objetivos profesionales en proyectos transformadores..."
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
                      Enviando Consulta...
                    </>
                  ) : (
                    <>
                      Enviar Consulta Estratégica
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Equipo Directivo */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-900 flex items-center justify-center">
                  <Users size={24} />
                </div>
                Equipo Directivo
              </h3>
              
              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color === 'amber' ? 'from-amber-600 to-orange-600' : member.color === 'green' ? 'from-green-600 to-emerald-600' : 'from-blue-600 to-cyan-600'} flex items-center justify-center flex-shrink-0`}>
                        <User className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg">{member.name}</div>
                        <div className={`text-sm ${member.color === 'amber' ? 'text-amber-300' : member.color === 'green' ? 'text-green-300' : 'text-blue-300'}`}>
                          {member.position}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Target size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-gray-400 text-sm">Área de Experticia</div>
                          <div className="text-gray-300 text-sm">{member.expertise}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="text-gray-400 text-sm">Ubicación</div>
                          <div className="text-white text-sm">{member.location}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="text-gray-400 text-sm">Contacto</div>
                          <a href={`mailto:${member.email}`} 
                             className="text-white hover:text-amber-300 transition font-medium text-sm">
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Horario */}
                <div className="flex items-center gap-4 p-4 bg-amber-900/20 rounded-xl border border-amber-800/30">
                  <Clock className="text-amber-400" size={24} />
                  <div>
                    <div className="font-bold">Horario de Atención Estratégica</div>
                    <div className="text-sm text-amber-300">Lunes a Viernes 9:00 - 18:00 (GMT-3) • Respuesta en 24h hábiles</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Oficinas - SIN TELÉFONOS */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe size={24} className="text-amber-600" />
                Presencia Global
              </h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className={`bg-gradient-to-br ${office.color} rounded-xl p-5 border border-gray-200`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center">
                        <MapPin className={index === 0 ? "text-amber-600" : index === 1 ? "text-blue-600" : "text-green-600"} size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{office.city}</h4>
                        <div className={`text-xs ${index === 0 ? 'bg-amber-100 text-amber-800' : index === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full inline-block`}>
                          {office.type}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-500" />
                        <span className="font-medium">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-gray-500" />
                        <span className="text-gray-600">Contacto seguro por email</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Proceso de Contacto */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nuestro Proceso de Contacto</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Garantizamos una comunicación estratégica y efectiva con nuestro equipo directivo
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageSquare className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Consulta Inicial</h4>
              <p className="text-sm text-gray-600">Envías tu mensaje estratégico</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Revisión Directiva</h4>
              <p className="text-sm text-gray-600">Análisis por el equipo directivo correspondiente</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Coordinación</h4>
              <p className="text-sm text-gray-600">Agenda reunión estratégica en 24h</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="text-amber-600" size={24} />
              </div>
              <h4 className="font-bold mb-2">Seguimiento</h4>
              <p className="text-sm text-gray-600">Acompañamiento continuo personalizado</p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-amber-900 to-orange-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20">
            <ShieldCheck className="text-amber-300" size={16} />
            <span className="text-sm font-semibold text-amber-200">CONFIDENCIALIDAD GARANTIZADA</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para conectarte con oportunidades estratégicas globales?
          </h3>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Más de 800 profesionales internacionales ya han confiado en nuestro equipo para proyectos transformadores. 
            Tu experiencia global es nuestro activo estratégico más valioso.
          </p>
          <button 
            onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-amber-900 font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Send size={18} />
            Contactar al Equipo Directivo
          </button>
        </div>
      </div>
    </Layout>
  );
}