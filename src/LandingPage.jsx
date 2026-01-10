// src/LandingPage.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, ShieldCheck, Globe, TrendingUp, 
  CheckCircle2, Briefcase, Sparkles, Users, Rocket,
  Award, Target, BarChart3, Clock, Mail, Phone,
  MapPin, Linkedin, ArrowRight, X, Menu, DollarSign,
  Calendar, Building, Award as AwardIcon, Download,
  Zap, Home, Flag, CheckCircle, Building2, Anchor,
  HardHat, Wrench, Activity, BarChart
} from "lucide-react";
import { saveCandidate, uploadCV, getUserIP } from './utils/firebaseUtils';

export default function LandingPageExecutive() {
  const formRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCVFile] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    linkedin: "",
    experienciaOilGas: "",
    ultimaPosicion: "",
    certificaciones: "",
    paisResidencia: "",
    segmentoExperticia: "",
    disponibilidadReubicacion: "",
    nivelIngles: "",
    expectativaSalarial: "",
    vinculoPrevPDVSA: "",
    tiempoMovilizacion: "",
    descripcion: ""
  });
  
  const scrollToForm = () => {
    setMobileMenuOpen(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Máximo 5MB.");
        return;
      }
      // Validar tipo de archivo
      const validTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert("Formato no válido. Solo se aceptan PDF, DOC o DOCX.");
        return;
      }
      setCVFile(file);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      linkedin: "",
      experienciaOilGas: "",
      ultimaPosicion: "",
      certificaciones: "",
      paisResidencia: "",
      segmentoExperticia: "",
      disponibilidadReubicacion: "",
      nivelIngles: "",
      expectativaSalarial: "",
      vinculoPrevPDVSA: "",
      tiempoMovilizacion: "",
      descripcion: ""
    });
    setCVFile(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar campos requeridos
      const requiredFields = ['nombre', 'email', 'telefono', 'experienciaOilGas', 
                              'ultimaPosicion', 'paisResidencia', 'segmentoExperticia',
                              'nivelIngles', 'expectativaSalarial'];
      for (const field of requiredFields) {
        if (!formData[field] || formData[field] === `Seleccionar ${field}` || 
            formData[field].includes("Seleccionar")) {
          alert(`Por favor complete el campo: ${field}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Obtener IP del usuario
      const ipAddress = await getUserIP();
      
      // Crear objeto de datos del candidato
      const candidateData = {
        ...formData,
        ipAddress,
        userAgent: navigator.userAgent,
        pageUrl: window.location.href,
        submissionDate: new Date().toISOString(),
        timestamp: Date.now(),
        cvUploaded: false,
        cvUrl: null,
        status: "new",
        source: "landing_page"
      };

      console.log("Enviando datos del candidato:", candidateData);

      // Paso 1: Guardar datos básicos en Firestore
      const saveResult = await saveCandidate(candidateData);
      
      if (!saveResult.success) {
        throw new Error(saveResult.error || "Error al guardar datos");
      }

      const candidateId = saveResult.id;
      console.log("Candidato guardado con ID:", candidateId);

      // Paso 2: Subir CV si existe
      if (cvFile) {
        console.log("Subiendo CV...");
        const cvResult = await uploadCV(cvFile, candidateId);
        
        if (cvResult && cvResult.success) {
          console.log("CV subido exitosamente:", cvResult.url);
          // Aquí podrías actualizar el documento con la URL del CV
          // Necesitarías una función updateCandidate en firebaseUtils
        } else {
          console.warn("CV no se pudo subir:", cvResult?.error);
        }
      }

      // Éxito
      setFormSubmitted(true);
      resetForm();

      // Resetear después de 5 segundos
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Hubo un error al enviar el formulario: ${error.message}. Por favor intenta de nuevo.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Opciones para los selects del formulario
  const experienciasOilGas = [
    "Seleccionar experiencia",
    "Menos de 5 años",
    "5-10 años",
    "10-20 años",
    "Más de 20 años"
  ];

  const ultimasPosiciones = [
    "Seleccionar última posición",
    "Gerencial (Superintendente, Manager, Director)",
    "Operativa (Supervisor, Jefe de Turno)",
    "Técnica (Ingeniero Senior, Especialista)",
    "Ingeniería de Diseño",
    "Consultoría",
    "Mantenimiento",
    "Seguridad y Medio Ambiente",
    "Proyectos"
  ];

  const certificacionesOptions = [
    "Seleccionar certificaciones",
    "API (American Petroleum Institute)",
    "IWCF (International Well Control Forum)",
    "PMP (Project Management Professional)",
    "OSHA (Occupational Safety and Health)",
    "NEBOSH (National Examination Board)",
    "ISO 9001/14001/45001",
    "Six Sigma",
    "Otros"
  ];

  const paisesResidencia = [
    "Seleccionar país",
    "Venezuela",
    "Colombia",
    "Estados Unidos",
    "Canadá",
    "México",
    "España",
    "Reino Unido",
    "Emiratos Árabes",
    "Arabia Saudita",
    "Brasil",
    "Argentina",
    "Chile",
    "Perú",
    "Ecuador",
    "Trinidad y Tobago",
    "Panamá",
    "Costa Rica",
    "Otro país"
  ];

  const segmentosExperticia = [
    "Seleccionar segmento",
    "Upstream (Exploración y Producción)",
    "Midstream (Transporte y Almacenamiento)",
    "Downstream (Refinación y Distribución)",
    "Petroquímica",
    "Servicios Petroleros",
    "Energías Alternativas",
    "Offshore/Agua Profunda"
  ];

  const disponibilidadesReubicacion = [
    "Seleccionar disponibilidad",
    "Campo petrolero completo",
    "Ciudad petrolera (Maracaibo, Punto Fijo, etc.)",
    "Ciudad principal (Caracas, Valencia)",
    "Remoto con visitas al campo",
    "Solo remoto"
  ];

  const nivelesIngles = [
    "Seleccionar nivel",
    "Básico (A1-A2)",
    "Intermedio (B1-B2)",
    "Avanzado (C1-C2)",
    "Bilingüe/Nativo"
  ];

  const expectativasSalariales = [
    "Seleccionar expectativa",
    "$50,000 - $80,000 USD",
    "$80,000 - $120,000 USD",
    "$120,000 - $180,000 USD",
    "$180,000 - $250,000 USD",
    "$250,000 - $350,000 USD",
    "Más de $350,000 USD"
  ];

  const vinculosPrevPDVSA = [
    "Seleccionar vínculo",
    "Ninguno - Nuevo en el sector",
    "Contratista nacional/internacional",
    "Empleado directo PDVSA",
    "Consultor externo",
    "Proveedor/servicios",
    "Otro"
  ];

  const tiemposMovilizacion = [
    "Seleccionar tiempo",
    "Inmediato (15 días o menos)",
    "30 días",
    "60 días",
    "90 días o más",
    "Por definir"
  ];

  return (
    <main className="font-sans bg-white text-gray-900 antialiased overflow-x-hidden">
      {/* ================= NAVBAR PREMIUM ================= */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div className="text-xl font-bold tracking-tight">
                  <span className="text-gray-900 group-hover:text-amber-600 transition">PETROLINK</span>
                  <span className="text-amber-600 group-hover:text-orange-700 transition">VZLA</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/servicios" className="text-gray-600 hover:text-amber-600 font-medium transition">Servicios</Link>
              <Link to="/headhunting-ejecutivo" className="text-gray-600 hover:text-amber-600 font-medium transition">Headhunting</Link>
              <Link to="/contacto" className="text-gray-600 hover:text-amber-600 font-medium transition">Contacto</Link>
              <Link to="/admin" className="text-gray-600 hover:text-amber-600 font-medium transition">Admin</Link>
              <button 
                onClick={scrollToForm}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                Registrar mi Perfil
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg px-6 py-4">
            <div className="flex flex-col gap-4">
              <Link to="/servicios" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700 hover:text-amber-600">Servicios</Link>
              <Link to="/headhunting-ejecutivo" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700 hover:text-amber-600">Headhunting</Link>
              <Link to="/contacto" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-700 hover:text-amber-600">Contacto</Link>
              <button 
                onClick={scrollToForm}
                className="py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold mt-2"
              >
                Registrar mi Perfil
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
        {/* Background Elements - Tema petrolero */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(251,191,36,0.05)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl rotate-12 opacity-20"></div>
              
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <Flag className="text-amber-600" size={16} />
                <span className="text-sm font-semibold text-amber-700">INICIATIVA NACIONAL 2026</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900">Venezuela te necesita</span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                  de vuelta
                </span>
              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl">
                <span className="font-bold text-gray-900">La industria petrolera te espera.</span> El mayor proceso de reconstrucción energética del siglo ha comenzado. Conecta con las transnacionales que lideran la apertura y asegura tu posición con salarios competitivos globales, sin salir de tu país.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-start gap-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <CheckCircle className="text-amber-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">¿Cansado de la sub-empleabilidad?</h4>
                    <p className="text-gray-700">Deja de trabajar en sectores ajenos a tu formación. Es hora de volver al campo, al pozo y a la gerencia.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <ShieldCheck className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Seguridad y Confianza</h4>
                    <p className="text-gray-700">Solo trabajamos con empresas que garantizan contratos en USD, seguridad jurídica y beneficios de clase mundial.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <Target className="text-orange-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Impacto Real</h4>
                    <p className="text-gray-700">Sé parte de la generación que reactivó la producción nacional.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6">
                <button 
                  onClick={scrollToForm}
                  className="group px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                  <span>Registrar mi Perfil de Especialista</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="text-green-600" size={18} />
                    <span className="text-sm font-medium">Contratos en USD</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Home className="text-amber-600" size={18} />
                    <span className="text-sm font-medium">Sin salir del país</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-500">Especialistas Colocados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-500">Transnacionales Aliadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-500">Contratos en USD</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Card */}
<div className="relative">
  <div className="absolute -top-6 -right-6 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl"></div>
  
  <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
    <div className="absolute -top-4 left-8 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg text-white font-bold">
      Perfiles Buscados
    </div>
    
    {/* Contenedor principal con scroll máximo */}
    <div className="mt-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      <div className="space-y-4">
        {/* Grupo 1: Ingeniería y Operaciones Petroleras */}
        <div className="mb-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-2">
            🛢️ Ingeniería & Operaciones
          </div>
          <div className="space-y-3">
            <ProfileItem 
              icon={<HardHat className="text-amber-600" />}
              title="Ingenieros de Perforación"
              subtitle="Onshore & Offshore • IADC/IWCF"
            />
            <ProfileItem 
              icon={<Wrench className="text-orange-600" />}
              title="Supervisores de Mantenimiento"
              subtitle="Refinerías • Plantas • Rotating Equipment"
            />
            <ProfileItem 
              icon={<Activity className="text-amber-600" />}
              title="Gerentes de Producción"
              subtitle="Optimización de Pozos • ESP • Gas Lift"
            />
            <ProfileItem 
              icon={<BarChart className="text-orange-600" />}
              title="Analistas de Reservorios"
              subtitle="Geociencias • Evaluación • Simulación"
            />
          </div>
        </div>

        {/* Grupo 2: IT & Tecnología Petrolera */}
        <div className="mb-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-2">
            💻 IT & Digitalización Oil & Gas
          </div>
          <div className="space-y-3">
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>}
              title="Especialistas SCADA/DCS"
              subtitle="Automación • Control de Procesos • PLC"
            />
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>}
              title="Arquitectos de Datos Petroleros"
              subtitle="Data Lakes • ETL • PI System • OSIsoft"
            />
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>}
              title="Ciberseguridad Industrial"
              subtitle="OT Security • ISA/IEC 62443 • Redes Seguras"
            />
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>}
              title="Desarrolladores Software Oil & Gas"
              subtitle="Petroleum Apps • GIS • Simuladores • Python/Java"
            />
          </div>
        </div>

        {/* Grupo 3: Seguridad y Proyectos */}
        <div className="mb-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-2">
            🏗️ Seguridad & Proyectos
          </div>
          <div className="space-y-3">
            <ProfileItem 
              icon={<ShieldCheck className="text-amber-600" />}
              title="Especialistas HSE"
              subtitle="NEBOSH • OSHA • ISO 45001 • Seguridad Procesos"
            />
            <ProfileItem 
              icon={<Building2 className="text-orange-600" />}
              title="Coordinadores de Proyectos"
              subtitle="E&C • EPC • PMP • Gestión Contractual"
            />
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>}
              title="Auditores de Sistemas Integrales"
              subtitle="ISO 9001/14001/45001 • API Q1/Q2"
            />
          </div>
        </div>

        {/* Grupo 4: Nuevas Tecnologías y Energías */}
        <div className="mb-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 pl-2">
            🔋 Innovación & Energías Alternativas
          </div>
          <div className="space-y-3">
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>}
              title="Especialistas en Digital Twins"
              subtitle="Gemelos Digitales • IoT • Predictive Maintenance"
            />
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>}
              title="Expertos en Transformación Digital"
              subtitle="Industry 4.0 • AI/ML aplicado a Oil & Gas"
            />
            <ProfileItem 
              icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>}
              title="Especialistas en Energías Renovables"
              subtitle="Solar/Hydrogen para Oil & Gas • Transición Energética"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Sección de proceso - FUERA del scroll */}
    <div className="mt-8 pt-8 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Evaluación inicial</div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="font-semibold">72 horas</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-gray-500">Proceso completo</div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-semibold">Garantizado</span>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </header>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-20 md:py-32 px-6 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-amber-50 border border-amber-100">
              <Award className="text-amber-600" size={16} />
              <span className="text-sm font-semibold text-amber-700">VENTAJAS EXCLUSIVAS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Por qué somos tu mejor<br />
              <span className="text-gray-600">puente de regreso</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Más que un reclutador, somos tu aliado estratégico en la reinserción profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard 
              icon={<Briefcase />}
              title="Posiciones Estratégicas"
              description="Acceso directo a vacantes que no se publican en portales tradicionales ni bolsas de trabajo."
              gradient="from-amber-500 to-amber-600"
            />
            <FeatureCard 
              icon={<TrendingUp />}
              title="Salarios Competitivos"
              description="Remuneración en USD con paquetes completos de beneficios internacionales."
              gradient="from-orange-500 to-amber-600"
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Seguridad Jurídica"
              description="Contratos blindados con empresas que garantizan estabilidad laboral y protección legal."
              gradient="from-amber-600 to-orange-600"
            />
            <FeatureCard 
              icon={<Home />}
              title="Reinserción Local"
              description="Oportunidades dentro de Venezuela, evitando el desarraigo familiar y cultural."
              gradient="from-orange-600 to-amber-700"
            />
          </div>
        </div>
      </section>

{/* ================= COMPANIES SECTION (Minimalista) ================= */}
<section id="companies" className="py-20 md:py-28 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
        <span className="text-sm font-semibold text-amber-700">ALIANZAS ESTRATÉGICAS</span>
      </div>
      <h3 className="text-3xl md:text-4xl font-bold mb-6">Conectamos con líderes globales</h3>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        Colaboramos con las principales transnacionales del sector energético 
        para identificar y posicionar talento venezolano especializado
      </p>
    </div>
    
    <div className="relative">
      {/* Fila superior */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-6 md:mb-10">
        {[
          { symbol: "SLB", color: "text-blue-700", bg: "bg-blue-50" },
          { symbol: "H", color: "text-red-600", bg: "bg-red-50" },
          { symbol: "BKR", color: "text-gray-900", bg: "bg-gray-50" },
          { symbol: "CVX", color: "text-blue-600", bg: "bg-blue-50" },
        ].map((company, i) => (
          <div key={i} className={`${company.bg} w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3`}>
            <div className={`text-2xl md:text-3xl font-bold ${company.color}`}>
              {company.symbol}
            </div>
          </div>
        ))}
      </div>
      
      {/* Fila central */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-6 md:mb-10">
        {[
          { symbol: "REP", color: "text-green-600", bg: "bg-green-50" },
          { symbol: "ENI", color: "text-purple-600", bg: "bg-purple-50" },
          { symbol: "XOM", color: "text-blue-800", bg: "bg-blue-100" },
          { symbol: "TTE", color: "text-blue-600", bg: "bg-blue-50" },
        ].map((company, i) => (
          <div key={i} className={`${company.bg} w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-3`}>
            <div className={`text-2xl md:text-3xl font-bold ${company.color}`}>
              {company.symbol}
            </div>
          </div>
        ))}
      </div>
      
      {/* Fila inferior */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {[
          { symbol: "BP", color: "text-green-700", bg: "bg-green-50" },
          { symbol: "SHELL", color: "text-yellow-600", bg: "bg-yellow-50" },
          { symbol: "COP", color: "text-orange-600", bg: "bg-orange-50" },
          { symbol: "PDVSA", color: "text-red-700", bg: "bg-red-50" },
        ].map((company, i) => (
          <div key={i} className={`${company.bg} w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3`}>
            <div className={`text-xl md:text-2xl font-bold ${company.color}`}>
              {company.symbol}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="mt-16 text-center">
      <div className="inline-block h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      <p className="mt-8 text-gray-500 text-sm italic max-w-2xl mx-auto">
        Estas representaciones simbólicas corresponden a los tickers bursátiles 
        de empresas líderes en el sector energético con las que mantenemos relaciones profesionales
      </p>
    </div>
  </div>
</section>

      {/* ================= FORM SECTION ================= */}
      <section ref={formRef} className="py-20 md:py-32 px-6 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-amber-900/30 border border-amber-800/50">
              <Target className="text-amber-400" size={16} />
              <span className="text-sm font-semibold text-amber-300">FILTRO DE ÉLITE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Formulario de Especialista<br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                (10 preguntas clave)
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Estas preguntas no son solo para recolectar datos, son para demostrarle a la petrolera que tú ya hiciste el trabajo sucio de filtrado.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-gray-700 p-6 md:p-8 lg:p-12 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">¡Perfil Registrado!</h3>
                <p className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg">
                  Tu perfil ha sido ingresado en nuestra base de élite. Recibirás una llamada de nuestro equipo especializado en las próximas 72 horas.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
                >
                  Registrar otro perfil
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Información Básica */}
                  <FormInput 
                    label="Nombre Completo"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ing. Carlos Rodríguez"
                    icon={<Users size={20} />}
                    required
                  />
                  <FormInput 
                    label="Correo Corporativo"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="c.rodriguez@empresa.com"
                    type="email"
                    icon={<Mail size={20} />}
                    required
                  />
                  <FormInput 
                    label="Teléfono (WhatsApp)"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+58 412-XXX-XXXX"
                    type="tel"
                    icon={<Phone size={20} />}
                    required
                  />
                  <FormInput 
                    label="LinkedIn (opcional)"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="linkedin.com/in/tu-perfil"
                    icon={<Linkedin size={20} />}
                  />
                  
                  {/* PREGUNTA 1: Años de experiencia */}
                  <FormSelect 
                    label="1. Años de experiencia específica en Oil & Gas"
                    name="experienciaOilGas"
                    value={formData.experienciaOilGas}
                    onChange={handleInputChange}
                    icon={<Calendar size={20} />}
                    options={experienciasOilGas}
                    required
                  />
                  
                  {/* PREGUNTA 2: Última posición */}
                  <FormSelect 
                    label="2. Última posición ocupada en el extranjero"
                    name="ultimaPosicion"
                    value={formData.ultimaPosicion}
                    onChange={handleInputChange}
                    icon={<Briefcase size={20} />}
                    options={ultimasPosiciones}
                    required
                  />
                  
                  {/* PREGUNTA 3: Certificaciones */}
                  <FormSelect 
                    label="3. Certificaciones vigentes"
                    name="certificaciones"
                    value={formData.certificaciones}
                    onChange={handleInputChange}
                    icon={<AwardIcon size={20} />}
                    options={certificacionesOptions}
                  />
                  
                  {/* PREGUNTA 4: País de residencia */}
                  <FormSelect 
                    label="4. País de residencia actual"
                    name="paisResidencia"
                    value={formData.paisResidencia}
                    onChange={handleInputChange}
                    icon={<MapPin size={20} />}
                    options={paisesResidencia}
                    required
                  />
                  
                  {/* PREGUNTA 5: Segmento de experticia */}
                  <FormSelect 
                    label="5. Segmento de experticia"
                    name="segmentoExperticia"
                    value={formData.segmentoExperticia}
                    onChange={handleInputChange}
                    icon={<Activity size={20} />}
                    options={segmentosExperticia}
                    required
                  />
                  
                  {/* PREGUNTA 6: Disponibilidad de reubicación */}
                  <FormSelect 
                    label="6. Disponibilidad de reubicación interna"
                    name="disponibilidadReubicacion"
                    value={formData.disponibilidadReubicacion}
                    onChange={handleInputChange}
                    icon={<Home size={20} />}
                    options={disponibilidadesReubicacion}
                  />
                  
                  {/* PREGUNTA 7: Nivel de Inglés */}
                  <FormSelect 
                    label="7. Nivel de Inglés Técnico"
                    name="nivelIngles"
                    value={formData.nivelIngles}
                    onChange={handleInputChange}
                    icon={<Globe size={20} />}
                    options={nivelesIngles}
                    required
                  />
                  
                  {/* PREGUNTA 8: Expectativa salarial */}
                  <FormSelect 
                    label="8. Expectativa salarial anual (USD)"
                    name="expectativaSalarial"
                    value={formData.expectativaSalarial}
                    onChange={handleInputChange}
                    icon={<DollarSign size={20} />}
                    options={expectativasSalariales}
                    required
                  />
                  
                  {/* PREGUNTA 9: Vínculo previo */}
                  <FormSelect 
                    label="9. Vínculo previo con PDVSA/Transnacionales"
                    name="vinculoPrevPDVSA"
                    value={formData.vinculoPrevPDVSA}
                    onChange={handleInputChange}
                    icon={<Building2 size={20} />}
                    options={vinculosPrevPDVSA}
                  />
                  
                  {/* PREGUNTA 10: Tiempo de movilización */}
                  <FormSelect 
                    label="10. Tiempo estimado para movilización"
                    name="tiempoMovilizacion"
                    value={formData.tiempoMovilizacion}
                    onChange={handleInputChange}
                    icon={<Clock size={20} />}
                    options={tiemposMovilizacion}
                  />
                </div>

                {/* Campo adicional para descripción */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Información adicional relevante (logros, proyectos destacados, referencias)
                  </label>
                  <textarea 
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className="w-full h-32 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition resize-none"
                    placeholder="Describe tus logros más importantes, proyectos relevantes en los que has participado, y cualquier información que consideres valiosa para tu perfil..."
                  />
                </div>

                {/* CV Upload - MODIFICADO */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-900/50 flex items-center justify-center">
                      <Download className="text-amber-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white mb-1">Adjuntar CV y Certificaciones</div>
                      <div className="text-sm text-gray-400">PDF, DOC, DOCX - máximo 5MB (opcional pero recomendado)</div>
                      {cvFile && (
                        <div className="mt-2 text-sm text-amber-300 flex items-center gap-2">
                          <CheckCircle size={16} />
                          {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      )}
                    </div>
                    <label className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium cursor-pointer transition">
                      <span>Seleccionar archivo</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                  <div className="text-sm text-gray-400">
                    Al enviar este formulario, aceptas que tus datos sean compartidos exclusivamente con empresas petroleras transnacionales para procesos de selección. Garantizamos confidencialidad total. 
                    <Link to="/politica-privacidad" className="text-amber-400 hover:text-amber-300 ml-1">Ver Política de Privacidad</Link>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full py-4 md:py-5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Perfil de Especialista</span>
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-white to-amber-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Especialistas que regresaron</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Historias reales de profesionales venezolanos que reactivaron sus carreras en la industria petrolera nacional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="María G. - Ingeniera de Producción"
              position="Ex-Schlumberger (Dubai)"
              company="Ahora en Chevron Venezuela"
              testimonial="Después de 8 años en el Medio Oriente, pensé que no podría volver. Petrolink me conectó en 3 semanas con una posición de gerencia en el Oriente del país. Mi salario es competitivo y trabajo cerca de mi familia."
              salary="$180,000 USD anual"
            />
            <TestimonialCard
              name="Carlos R. - Supervisor de Perforación"
              position="Ex-Halliburton (Texas)"
              company="Ahora en Repsol Venezuela"
              testimonial="El proceso fue transparente desde el primer día. Contrato en USD, beneficios internacionales y lo mejor: estoy aportando mi experiencia a mi país. El talento venezolano es valorado nuevamente."
              salary="$220,000 USD anual"
            />
            <TestimonialCard
              name="Ana L. - Especialista HSE"
              position="Ex-BP (Reino Unido)"
              company="Ahora en Eni Venezuela"
              testimonial="La seguridad jurídica fue mi principal preocupación. Petrolink solo trabaja con empresas que garantizan contratos blindados. Hoy lidero el departamento de seguridad de una operación offshore."
              salary="$160,000 USD anual"
            />
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL SECTION ================= */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-900 to-orange-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            El retorno de los especialistas no es una idea,<br />
            <span className="text-amber-300">es una realidad en marcha</span>
          </h3>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Cada día, más profesionales como tú están regresando a posiciones de liderazgo en la industria que los formó.
          </p>
          <div className="space-y-6">
            <button 
              onClick={scrollToForm}
              className="group px-12 py-5 rounded-xl bg-white text-amber-900 font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              <span>Quiero ser el próximo en regresar</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-amber-200 text-sm">
              Proceso 100% confidencial • Sin costo para el candidato • Respuesta en 72 horas
            </p>
          </div>
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            
            {/* Logo y descripción */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">PETROLINK</div>
                  <div className="text-sm text-amber-400">VENEZUELA</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Especialistas en la reinserción del talento petrolero venezolano 
                en la industria energética global.
              </p>
            </div>

            {/* Equipo Directivo */}
            <div>
              <h4 className="text-white font-semibold mb-6">Equipo Directivo</h4>
              <ul className="space-y-4">
                
                {/* Marielvis Malave */}
                <li className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">LIC. MARIELVIS MALAVE FARIAS</div>
                    <div className="text-sm text-amber-300">Directora de Talento Humano</div>
                    <div className="text-xs text-gray-400 mt-1">Lic. en Administración de Recursos Humanos</div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">Buenos Aires, Argentina</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-gray-400">marielvis@petrolinkvzla.com</span>
                    </div>
                  </div>
                </li>
                
                {/* Mabel Rodriguez */}
                <li className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">LIC. MABEL RODRÍGUEZ</div>
                    <div className="text-sm text-green-300">Directora Zona Capital & Coach Ontológica</div>
                    <div className="text-xs text-gray-400 mt-1">Lic. en Administración • Master Coach Ontológica</div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">Caracas, Venezuela</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-gray-400">mabel.rodriguez@petrolinkvzla.com</span>
                    </div>
                  </div>
                </li>
                
                {/* Alexis Anes Pulido */}
                <li className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">LIC. ALEXIS ANES PULIDO</div>
                    <div className="text-sm text-blue-300">Director Zona Oriente & Gestión de Personal</div>
                    <div className="text-xs text-gray-400 mt-1">Lic. en Administración de Personal</div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">Anzoátegui, Venezuela</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-gray-400">alexis.anes@petrolinkvzla.com</span>
                    </div>
                  </div>
                </li>
                
                {/* Alex Serrano */}
                <li className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">ING. ALEX SERRANO LASHLEY</div>
                    <div className="text-sm text-purple-300">Director Tecnológico & Validador de Información</div>
                    <div className="text-xs text-gray-400 mt-1">Ingeniero de Sistemas</div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">Buenos Aires Argentina</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-gray-400">alex.serrano@petrolinkvzla.com</span>
                    </div>
                  </div>
                </li>
                
                {/* Ubicaciones */}
                <li className="flex items-center gap-2 pt-4 border-t border-gray-800">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <span className="text-sm text-gray-300">Oficinas Operativas:</span>
                    <div className="text-xs text-gray-400">Caracas • Anzoátegui • Miami</div>
                  </div>
                </li>
                
              </ul>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="text-gray-400 hover:text-amber-400 transition">Inicio</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-amber-400 transition">Nosotros</a></li>
                <li><a href="#process" className="text-gray-400 hover:text-amber-400 transition">Proceso</a></li>
                <li><a href="#companies" className="text-gray-400 hover:text-amber-400 transition">Alianzas</a></li>
                <li><Link to="/contacto" className="text-gray-400 hover:text-amber-400 transition">Contacto</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Confidencialidad</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Protección de Datos</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Petrolink Venezuela. Todos los derechos reservados.
            </p>
            <p className="text-sm text-amber-400 font-medium">
              El Retorno de los Especialistas • Oil & Gas • Reinserción Internacional
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Componente ProfileItem
function ProfileItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-50 transition">
      <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}

// Componente FeatureCard
function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{description}</p>
    </div>
  );
}

// Componente TestimonialCard
function TestimonialCard({ name, position, company, testimonial, salary }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
          <Users className="text-amber-600" size={24} />
        </div>
        <div>
          <div className="font-bold text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{position}</div>
          <div className="text-xs text-amber-600 font-medium">{company}</div>
        </div>
      </div>
      <p className="text-gray-700 mb-6 italic">"{testimonial}"</p>
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Salario actual</div>
          <div className="font-bold text-amber-700">{salary}</div>
        </div>
      </div>
    </div>
  );
}

// Componente FormInput
function FormInput({ label, name, value, onChange, placeholder, type = "text", icon, required = false }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
        <input 
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
        />
      </div>
    </div>
  );
}

// Componente FormSelect
function FormSelect({ label, name, value, onChange, icon, options, required = false }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition appearance-none cursor-pointer"
        >
          {options.map((option, index) => (
            <option key={index} value={option} className="bg-gray-900 text-white">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronRight size={20} className="rotate-90" />
        </div>
      </div>
    </div>
  );
}