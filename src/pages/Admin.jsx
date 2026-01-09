import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Download, 
  RefreshCw, 
  LogOut, 
  Shield,
  Eye,
  Trash2,
  Filter,
  Calendar,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  DollarSign,
  Award
} from 'lucide-react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('candidates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  
  // Verificar si ya está autenticado al cargar
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const email = localStorage.getItem('admin_email');
    
    if (token && email) {
      // Verificar token con la API
      verifyToken(token).then(isValid => {
        if (isValid) {
          setAuthenticated(true);
          setUserEmail(email);
        } else {
          clearAuth();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  const verifyToken = async (token) => {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Token verification failed:', data.error);
      return false;
    }

    return data.valid;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

  const fetchData = async () => {
    try {
      // Obtener candidatos y mensajes en paralelo
      const [candidatesSnapshot, messagesSnapshot] = await Promise.all([
        getDocs(collection(db, "candidates")),
        getDocs(collection(db, "messages"))
      ]);

      // Procesar candidatos
      const candidatesList = candidatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Ordenar por fecha más reciente
      candidatesList.sort((a, b) => {
        const dateA = a.timestamp || a.submissionDate || a.createdAt || 0;
        const dateB = b.timestamp || b.submissionDate || b.createdAt || 0;
        return new Date(dateB) - new Date(dateA);
      });

      // Procesar mensajes
      const messagesList = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Ordenar mensajes por fecha más reciente
      messagesList.sort((a, b) => {
        const dateA = a.timestamp || a.createdAt || 0;
        const dateB = b.timestamp || b.createdAt || 0;
        return new Date(dateB) - new Date(dateA);
      });

      setCandidates(candidatesList);
      setMessages(messagesList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
  if (!password.trim()) {
    alert('Por favor ingrese la contraseña');
    return;
  }

  setLoading(true);
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@petrolinkvzla.com',
        password: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error de autenticación');
    }

    if (data.success) {
      // Guardar token y email
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_email', data.user.email);
      localStorage.setItem('admin_name', data.user.name);
      setAuthenticated(true);
      setUserEmail(data.user.email);
    } else {
      throw new Error(data.error || 'Error de autenticación');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Error de conexión con el servidor');
    setPassword('');
  } finally {
    setLoading(false);
  }
};

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      clearAuth();
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setAuthenticated(false);
    setPassword('');
    setUserEmail('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      await updateDoc(doc(db, "messages", messageId), {
        status: status,
        updatedAt: new Date().toISOString()
      });
      fetchData(); // Actualizar la lista
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      try {
        await deleteDoc(doc(db, "messages", messageId));
        fetchData(); // Actualizar la lista
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const exportToExcel = () => {
    const data = activeTab === 'candidates' ? candidates : messages;
    
    const headers = activeTab === 'candidates' 
      ? ['Nombre', 'Email', 'Teléfono', 'Experiencia', 'Última Posición', 'Especialidad', 'País', 'Inglés', 'Expectativa Salarial', 'CV Subido', 'Fecha']
      : ['Nombre', 'Email', 'Empresa', 'Teléfono', 'Tipo Consulta', 'Mensaje', 'Estado', 'Fecha'];
    
    const csvContent = data.map(item => {
      if (activeTab === 'candidates') {
        return [
          `"${item.nombre || ''}"`,
          `"${item.email || ''}"`,
          `"${item.telefono || ''}"`,
          `"${item.experienciaOilGas || ''}"`,
          `"${item.ultimaPosicion || ''}"`,
          `"${item.segmentoExperticia || ''}"`,
          `"${item.paisResidencia || ''}"`,
          `"${item.nivelIngles || ''}"`,
          `"${item.expectativaSalarial || ''}"`,
          `"${item.cvUploaded ? 'Sí' : 'No'}"`,
          `"${item.timestamp ? new Date(item.timestamp).toLocaleString('es-VE') : ''}"`
        ].join(',');
      } else {
        return [
          `"${item.nombre || ''}"`,
          `"${item.email || ''}"`,
          `"${item.empresa || ''}"`,
          `"${item.telefono || ''}"`,
          `"${item.tipoConsulta || ''}"`,
          `"${item.mensaje || ''}"`,
          `"${item.status || 'nuevo'}"`,
          `"${item.timestamp ? new Date(item.timestamp).toLocaleString('es-VE') : ''}"`
        ].join(',');
      }
    }).join('\n');
    
    const csv = `${headers.join(',')}\n${csvContent}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `petrolink-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filtrar datos según búsqueda
  const filteredCandidates = candidates.filter(candidate =>
    Object.values(candidate).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredMessages = messages.filter(message =>
    Object.values(message).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pantalla de autenticación
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">PETROLINK</div>
                <div className="text-sm font-semibold text-amber-600">PANEL ADMIN</div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Acceso Administrativo</h2>
            <p className="text-gray-600">Ingrese la contraseña para acceder al panel</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingrese la contraseña"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                disabled={loading}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Verificando...
                </>
              ) : (
                <>
                  Ingresar al Panel
                  <Shield size={18} />
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <Shield className="inline w-3 h-3 mr-1" />
                Acceso restringido al personal autorizado
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Panel Administrativo - Petrolink Venezuela
                  </h1>
                  <p className="text-gray-600">Gestión de candidatos y mensajes</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Conectado como: <span className="font-semibold">{userEmail}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-amber-50 px-4 py-2 rounded-lg">
                <div className="text-sm text-amber-700">Candidatos</div>
                <div className="text-2xl font-bold text-amber-800">{candidates.length}</div>
              </div>
              
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <div className="text-sm text-blue-700">Mensajes</div>
                <div className="text-2xl font-bold text-blue-800">{messages.length}</div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs y búsqueda */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-4 py-2 rounded-md font-medium transition ${
                  activeTab === 'candidates' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('candidates')}
              >
                <User className="inline w-4 h-4 mr-2" />
                Candidatos ({candidates.length})
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium transition ${
                  activeTab === 'messages' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Mensajes ({messages.length})
              </button>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Exportar</span>
              </button>
              
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center gap-2"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === 'candidates' ? (
          /* TABLA DE CANDIDATOS */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Registros de Candidatos</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experiencia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Especialidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{candidate.nombre || 'N/A'}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Globe size={12} />
                          {candidate.paisResidencia || 'País no especificado'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <a href={`mailto:${candidate.email}`} className="text-amber-600 hover:text-amber-800 font-medium block">
                            <Mail size={12} className="inline mr-1" />
                            {candidate.email || 'N/A'}
                          </a>
                          <div className="text-gray-600 mt-1 flex items-center gap-1">
                            <Phone size={12} />
                            {candidate.telefono || 'Teléfono no disponible'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.experienciaOilGas || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{candidate.ultimaPosicion || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.segmentoExperticia || 'N/A'}</div>
                        <div className="text-xs text-gray-500">
                          {candidate.certificaciones && candidate.certificaciones !== "Seleccionar certificaciones" && (
                            <span className="inline-flex items-center gap-1 mt-1">
                              <Award size={10} />
                              {candidate.certificaciones}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {candidate.timestamp ? new Date(candidate.timestamp).toLocaleDateString('es-VE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition flex items-center gap-1"
                          >
                            <Eye size={12} />
                            Ver
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <User className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg">No hay candidatos registrados todavía.</p>
                <p className="text-gray-400 mt-2">Los formularios enviados aparecerán aquí.</p>
              </div>
            )}
          </div>
        ) : (
          /* TABLA DE MENSAJES */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Mensajes de Contacto</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remitente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Consulta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mensaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{message.nombre || 'N/A'}</div>
                        <div className="text-sm text-gray-500">
                          <Mail size={12} className="inline mr-1" />
                          {message.email || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          <Building size={12} className="inline mr-1" />
                          {message.empresa || 'Sin empresa'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          message.tipoConsulta === 'company' 
                            ? 'bg-blue-100 text-blue-800'
                            : message.tipoConsulta === 'specialist'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.tipoConsulta === 'company' ? 'Empresa' : 
                           message.tipoConsulta === 'specialist' ? 'Especialista' : 
                           'Otra consulta'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate" title={message.mensaje}>
                          {message.mensaje || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={message.status || 'nuevo'}
                          onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs border ${
                            message.status === 'leido' 
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : message.status === 'procesando'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="leido">Leído</option>
                          <option value="procesando">En proceso</option>
                          <option value="respondido">Respondido</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {message.timestamp ? new Date(message.timestamp).toLocaleDateString('es-VE', {
                            day: '2-digit',
                            month: '2-digit'
                          }) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedMessage(message)}
                            className="px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition flex items-center gap-1"
                            title="Ver detalles"
                          >
                            <Eye size={12} />
                          </button>
                          <a
                            href={`mailto:${message.email}`}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition flex items-center gap-1"
                            title="Responder"
                          >
                            <Mail size={12} />
                          </a>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition flex items-center gap-1"
                            title="Eliminar"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MessageSquare className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg">No hay mensajes recibidos.</p>
                <p className="text-gray-400 mt-2">Los mensajes del formulario de contacto aparecerán aquí.</p>
              </div>
            )}
          </div>
        )}

        {/* Estadísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Total Candidatos</div>
                <div className="text-2xl font-bold text-gray-900">
                  {candidates.length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <User className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Mensajes Nuevos</div>
                <div className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => !m.status || m.status === 'nuevo').length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">CVs Subidos</div>
                <div className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.cvUploaded).length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Último registro</div>
                <div className="text-2xl font-bold text-gray-900">
                  {candidates.length > 0 ? 
                    new Date(candidates[0].timestamp).toLocaleDateString('es-VE', {
                      day: '2-digit',
                      month: 'short'
                    }) : 'N/A'}
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales para ver detalles */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">Detalles del Candidato</h3>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Nombre Completo</label>
                    <p className="font-medium">{selectedCandidate.nombre || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{selectedCandidate.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Teléfono</label>
                    <p className="font-medium">{selectedCandidate.telefono || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">País de Residencia</label>
                    <p className="font-medium">{selectedCandidate.paisResidencia || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Experiencia en Oil & Gas</label>
                  <p className="font-medium">{selectedCandidate.experienciaOilGas || 'N/A'}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Última Posición</label>
                    <p className="font-medium">{selectedCandidate.ultimaPosicion || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Segmento de Experticia</label>
                    <p className="font-medium">{selectedCandidate.segmentoExperticia || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Nivel de Inglés</label>
                    <p className="font-medium">{selectedCandidate.nivelIngles || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Expectativa Salarial</label>
                    <p className="font-medium">{selectedCandidate.expectativaSalarial || 'N/A'}</p>
                  </div>
                </div>
                
                {selectedCandidate.certificaciones && selectedCandidate.certificaciones !== "Seleccionar certificaciones" && (
                  <div>
                    <label className="text-sm text-gray-500">Certificaciones</label>
                    <p className="font-medium">{selectedCandidate.certificaciones}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm text-gray-500">CV Subido</label>
                  <p className="font-medium">{selectedCandidate.cvUploaded ? 'Sí' : 'No'}</p>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="text-sm text-gray-500">Fecha de Registro</label>
                  <p className="font-medium">
                    {selectedCandidate.timestamp 
                      ? new Date(selectedCandidate.timestamp).toLocaleString('es-VE')
                      : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <a
                  href={`mailto:${selectedCandidate.email}`}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Contactar
                </a>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">Detalles del Mensaje</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Nombre</label>
                    <p className="font-medium">{selectedMessage.nombre || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Empresa</label>
                    <p className="font-medium">{selectedMessage.empresa || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{selectedMessage.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Teléfono</label>
                    <p className="font-medium">{selectedMessage.telefono || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Tipo de Consulta</label>
                  <p className="font-medium capitalize">{selectedMessage.tipoConsulta || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Mensaje</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.mensaje || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="text-sm text-gray-500">Fecha de envío</label>
                  <p className="font-medium">
                    {selectedMessage.timestamp 
                      ? new Date(selectedMessage.timestamp).toLocaleString('es-VE')
                      : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between gap-3 mt-6">
                <div>
                  <label className="text-sm text-gray-500 mr-2">Estado:</label>
                  <select
                    value={selectedMessage.status || 'nuevo'}
                    onChange={(e) => {
                      updateMessageStatus(selectedMessage.id, e.target.value);
                      setSelectedMessage({...selectedMessage, status: e.target.value});
                    }}
                    className="px-3 py-1 rounded border"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="leido">Leído</option>
                    <option value="procesando">En proceso</option>
                    <option value="respondido">Respondido</option>
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    Responder
                  </a>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}