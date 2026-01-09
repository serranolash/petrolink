import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Mail, Phone, User, MessageSquare, Download, RefreshCw, LogOut, Shield,
  Eye, Trash2, Filter, Calendar, Building, FileText, Globe, Award, Search,
  CheckCircle, XCircle, Clock, AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('candidates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    const email = localStorage.getItem('admin_email');
    
    if (token && email) {
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
        
        if (data.valid) {
          setAuthenticated(true);
          setUserEmail(data.user.email);
          fetchData();
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        clearAuth();
      }
    } else {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [candidatesSnapshot, messagesSnapshot] = await Promise.all([
        getDocs(collection(db, "candidates")),
        getDocs(collection(db, "messages"))
      ]);

      const candidatesList = candidatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const messagesList = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Ordenar por fecha
      candidatesList.sort((a, b) => {
        const dateA = a.timestamp || a.submissionDate || 0;
        const dateB = b.timestamp || b.submissionDate || 0;
        return new Date(dateB) - new Date(dateA);
      });

      messagesList.sort((a, b) => {
        const dateA = a.timestamp || a.createdAt || 0;
        const dateB = b.timestamp || b.createdAt || 0;
        return new Date(dateB) - new Date(dateA);
      });

      setCandidates(candidatesList);
      setMessages(messagesList);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert('Error al cargar datos. Verifica la conexión a Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    if (!password.trim()) {
      alert('Por favor ingrese la contraseña');
      return;
    }

    setAuthLoading(true);
    
    try {
      console.log('Intentando login...');
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

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
      }

      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_email', data.user.email);
        localStorage.setItem('admin_name', data.user.name);
        
        setAuthenticated(true);
        setUserEmail(data.user.email);
        setPassword('');
        
        // Recargar datos
        await fetchData();
      } else {
        throw new Error(data.error || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Login error details:', error);
      alert(`Error de autenticación: ${error.message}`);
      setPassword('');
    } finally {
      setAuthLoading(false);
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
    localStorage.removeItem('admin_name');
    setAuthenticated(false);
    setPassword('');
    setUserEmail('');
    setCandidates([]);
    setMessages([]);
    setLoading(true);
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
      
      // Actualizar lista localmente
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      ));
    } catch (error) {
      console.error("Error updating message status:", error);
      alert('Error al actualizar el estado del mensaje');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('¿Estás seguro de eliminar este mensaje?')) return;
    
    try {
      await deleteDoc(doc(db, "messages", messageId));
      
      // Actualizar lista localmente
      setMessages(messages.filter(msg => msg.id !== messageId));
      alert('Mensaje eliminado correctamente');
    } catch (error) {
      console.error("Error deleting message:", error);
      alert('Error al eliminar el mensaje');
    }
  };

  const exportToCSV = () => {
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Filtrar datos
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

  // Pantalla de login
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
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
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingrese la contraseña"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                disabled={authLoading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Email: admin@petrolinkvzla.com
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                authLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
              }`}
            >
              {authLoading ? (
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
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Acceso restringido al personal autorizado
              </p>
              <button
                type="button"
                onClick={() => {
                  // Prueba de conexión
                  fetch('/api/auth/health')
                    .then(r => r.json())
                    .then(data => console.log('API Status:', data))
                    .catch(err => console.error('API Error:', err));
                }}
                className="text-xs text-gray-400 mt-2 hover:text-gray-600"
              >
                Verificar conexión API
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Pantalla de carga principal
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
          <p className="text-sm text-gray-400 mt-2">Conectado como: {userEmail}</p>
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
                className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
                  activeTab === 'candidates' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('candidates')}
              >
                <User size={16} />
                Candidatos ({candidates.length})
              </button>
              <button
                className={`px-4 py-2 rounded-md font-medium transition flex items-center gap-2 ${
                  activeTab === 'messages' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                <MessageSquare size={16} />
                Mensajes ({messages.length})
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar en registros..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
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
        </div>

        {/* Contenido según pestaña */}
        {activeTab === 'candidates' ? (
          // Tabla de candidatos
          <CandidatesTable 
            candidates={filteredCandidates}
            onSelect={setSelectedCandidate}
            total={candidates.length}
            filtered={filteredCandidates.length}
          />
        ) : (
          // Tabla de mensajes
          <MessagesTable 
            messages={filteredMessages}
            onSelect={setSelectedMessage}
            onUpdateStatus={updateMessageStatus}
            onDelete={deleteMessage}
            total={messages.length}
            filtered={filteredMessages.length}
          />
        )}

        {/* Estadísticas */}
        <StatsSection 
          candidates={candidates}
          messages={messages}
        />
      </div>

      {/* Modales */}
      {selectedCandidate && (
        <CandidateModal 
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {selectedMessage && (
        <MessageModal 
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onUpdateStatus={updateMessageStatus}
        />
      )}
    </div>
  );
}

// Componente de tabla de candidatos
function CandidatesTable({ candidates, onSelect, total, filtered }) {
  if (candidates.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay candidatos registrados</h3>
        <p className="text-gray-500">Los formularios enviados aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Registros de Candidatos</h2>
          <p className="text-sm text-gray-500">
            Mostrando {filtered} de {total} registros
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experiencia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{candidate.nombre || 'N/A'}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Globe size={12} />
                    {candidate.paisResidencia || 'País no especificado'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <a href={`mailto:${candidate.email}`} className="text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1 text-sm">
                      <Mail size={12} />
                      {candidate.email || 'N/A'}
                    </a>
                    <div className="text-gray-600 flex items-center gap-1 text-sm">
                      <Phone size={12} />
                      {candidate.telefono || 'Teléfono no disponible'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{candidate.experienciaOilGas || 'N/A'}</div>
                  <div className="text-xs text-gray-500">{candidate.ultimaPosicion || ''}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{candidate.segmentoExperticia || 'N/A'}</div>
                  {candidate.certificaciones && candidate.certificaciones !== "Seleccionar certificaciones" && (
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Award size={12} />
                      {candidate.certificaciones}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {candidate.timestamp ? new Date(candidate.timestamp).toLocaleDateString('es-VE') : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelect(candidate)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition flex items-center gap-1"
                  >
                    <Eye size={12} />
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente de tabla de mensajes
function MessagesTable({ messages, onSelect, onUpdateStatus, onDelete, total, filtered }) {
  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay mensajes recibidos</h3>
        <p className="text-gray-500">Los mensajes del formulario de contacto aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Mensajes de Contacto</h2>
          <p className="text-sm text-gray-500">
            Mostrando {filtered} de {total} mensajes
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remitente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consulta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{message.nombre || 'N/A'}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={12} />
                    {message.email || 'N/A'}
                  </div>
                  {message.empresa && (
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Building size={12} />
                      {message.empresa}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.tipoConsulta === 'company' ? 'bg-blue-100 text-blue-800' :
                    message.tipoConsulta === 'specialist' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {message.tipoConsulta === 'company' ? 'Empresa' :
                     message.tipoConsulta === 'specialist' ? 'Especialista' :
                     message.tipoConsulta || 'Consulta'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate" title={message.mensaje}>
                    {message.mensaje || 'N/A'}
                  </div>
                  <button
                    onClick={() => onSelect(message)}
                    className="text-sm text-amber-600 hover:text-amber-800 mt-1"
                  >
                    Ver completo
                  </button>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={message.status || 'nuevo'}
                    onChange={(e) => onUpdateStatus(message.id, e.target.value)}
                    className={`px-2 py-1 rounded text-xs border ${
                      message.status === 'leido' ? 'bg-green-100 text-green-800 border-green-200' :
                      message.status === 'procesando' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="leido">Leído</option>
                    <option value="procesando">En proceso</option>
                    <option value="respondido">Respondido</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {message.timestamp ? new Date(message.timestamp).toLocaleDateString('es-VE') : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelect(message)}
                      className="p-1 hover:bg-amber-100 rounded text-amber-600"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                    <a
                      href={`mailto:${message.email}`}
                      className="p-1 hover:bg-blue-100 rounded text-blue-600"
                      title="Responder"
                    >
                      <Mail size={16} />
                    </a>
                    <button
                      onClick={() => onDelete(message.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente de estadísticas
function StatsSection({ candidates, messages }) {
  const newMessages = messages.filter(m => !m.status || m.status === 'nuevo').length;
  const cvsUploaded = candidates.filter(c => c.cvUploaded).length;
  const countries = [...new Set(candidates.map(c => c.paisResidencia).filter(Boolean))].length;
  
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Candidatos Totales</div>
            <div className="text-2xl font-bold text-gray-900">{candidates.length}</div>
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
            <div className="text-2xl font-bold text-gray-900">{newMessages}</div>
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
            <div className="text-2xl font-bold text-gray-900">{cvsUploaded}</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Países</div>
            <div className="text-2xl font-bold text-gray-900">{countries}</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal para candidato
function CandidateModal({ candidate, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Detalles del Candidato</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Nombre Completo</label>
                <p className="font-medium">{candidate.nombre || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{candidate.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Teléfono</label>
                <p className="font-medium">{candidate.telefono || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">País de Residencia</label>
                <p className="font-medium">{candidate.paisResidencia || 'N/A'}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Experiencia en Oil & Gas</label>
              <p className="font-medium">{candidate.experienciaOilGas || 'N/A'}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Última Posición</label>
                <p className="font-medium">{candidate.ultimaPosicion || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Segmento de Experticia</label>
                <p className="font-medium">{candidate.segmentoExperticia || 'N/A'}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Nivel de Inglés</label>
                <p className="font-medium">{candidate.nivelIngles || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Expectativa Salarial</label>
                <p className="font-medium">{candidate.expectativaSalarial || 'N/A'}</p>
              </div>
            </div>
            
            {candidate.certificaciones && candidate.certificaciones !== "Seleccionar certificaciones" && (
              <div>
                <label className="text-sm text-gray-500">Certificaciones</label>
                <p className="font-medium">{candidate.certificaciones}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm text-gray-500">CV Subido</label>
              <p className="font-medium">
                <span className={`px-2 py-1 rounded text-sm ${candidate.cvUploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {candidate.cvUploaded ? 'Sí' : 'No'}
                </span>
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <label className="text-sm text-gray-500">Fecha de Registro</label>
              <p className="font-medium">
                {candidate.timestamp ? new Date(candidate.timestamp).toLocaleString('es-VE') : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <a
              href={`mailto:${candidate.email}`}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Contactar
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal para mensaje
function MessageModal({ message, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(message.status || 'nuevo');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateStatus(message.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Detalles del Mensaje</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Nombre</label>
                <p className="font-medium">{message.nombre || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Empresa</label>
                <p className="font-medium">{message.empresa || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{message.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Teléfono</label>
                <p className="font-medium">{message.telefono || 'N/A'}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Tipo de Consulta</label>
              <p className="font-medium capitalize">{message.tipoConsulta || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Mensaje</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-wrap">{message.mensaje || 'N/A'}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <label className="text-sm text-gray-500">Fecha de envío</label>
              <p className="font-medium">
                {message.timestamp ? new Date(message.timestamp).toLocaleString('es-VE') : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <div>
              <label className="text-sm text-gray-500 mr-2">Estado:</label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-1 rounded border focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="nuevo">Nuevo</option>
                <option value="leido">Leído</option>
                <option value="procesando">En proceso</option>
                <option value="respondido">Respondido</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <a
                href={`mailto:${message.email}?subject=Respuesta: Consulta Petrolink Venezuela&body=Estimado/a ${message.nombre},%0D%0A%0D%0A`}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Responder
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}