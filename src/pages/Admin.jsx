// Aquí tienes una versión mejorada del Admin.jsx con pestañas:
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Mail, User, Phone, Building, Calendar, MessageSquare, Trash2, Eye, EyeOff, Filter, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Admin() {
  const [candidates, setCandidates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('candidates');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const ADMIN_PASSWORD = 'petrolink2024';

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('petrolink_admin');
    if (savedAuth === 'true') {
      setAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      // Fetch candidates
      const candidatesSnapshot = await getDocs(collection(db, "candidates"));
      const candidatesList = candidatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCandidates(candidatesList);

      // Fetch messages
      const messagesSnapshot = await getDocs(collection(db, "messages"));
      const messagesList = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('petrolink_admin', 'true');
      fetchData();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      await updateDoc(doc(db, "messages", messageId), {
        status: newStatus
      });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('¿Estás seguro de eliminar este mensaje?')) {
      try {
        await deleteDoc(doc(db, "messages", messageId));
        fetchData();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const exportToExcel = () => {
    const data = activeTab === 'candidates' ? candidates : messages;
    
    const formattedData = data.map(item => {
      if (activeTab === 'candidates') {
        return {
          'Nombre': item.nombre || '',
          'Email': item.email || '',
          'Teléfono': item.telefono || '',
          'Experiencia': item.experienciaOilGas || '',
          'Área': item.areaExperiencia || '',
          'Fecha': item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : '',
          'ID': item.id
        };
      } else {
        return {
          'Nombre': item.nombre || '',
          'Empresa': item.empresa || '',
          'Email': item.email || '',
          'Teléfono': item.telefono || '',
          'Tipo': item.tipoConsulta || '',
          'Mensaje': item.mensaje || '',
          'Estado': item.status || 'nuevo',
          'Fecha': item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleDateString() : '',
          'ID': item.id
        };
      }
    });

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeTab === 'candidates' ? 'Candidatos' : 'Mensajes');
    XLSX.writeFile(wb, `petrolink_${activeTab}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filteredData = activeTab === 'candidates' 
    ? candidates.filter(candidate =>
        Object.values(candidate).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : messages.filter(message =>
        Object.values(message).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Acceso Administrativo</h2>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Panel Administrativo</h1>
            <p className="text-gray-600">Petrolink Venezuela</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="px-4 py-2 pl-10 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download size={18} />
              Exportar Excel
            </button>
            
            <button
              onClick={() => {
                sessionStorage.removeItem('petrolink_admin');
                setAuthenticated(false);
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Candidatos</p>
                <p className="text-3xl font-bold">{candidates.length}</p>
              </div>
              <User className="text-amber-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Mensajes Recibidos</p>
                <p className="text-3xl font-bold">{messages.length}</p>
              </div>
              <Mail className="text-blue-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Mensajes Nuevos</p>
                <p className="text-3xl font-bold">
                  {messages.filter(m => m.status === 'nuevo').length}
                </p>
              </div>
              <MessageSquare className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'candidates' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('candidates')}
          >
            Candidatos ({candidates.length})
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'messages' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('messages')}
          >
            Mensajes ({messages.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">Cargando...</div>
        ) : (
          <>
            {/* Candidates Table */}
            {activeTab === 'candidates' && (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">Nombre</th>
                      <th className="px-6 py-3 text-left">Contacto</th>
                      <th className="px-6 py-3 text-left">Experiencia</th>
                      <th className="px-6 py-3 text-left">Área</th>
                      <th className="px-6 py-3 text-left">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((candidate) => (
                      <tr key={candidate.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium">{candidate.nombre || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-400" />
                              {candidate.email || 'N/A'}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-gray-400" />
                              {candidate.telefono || 'N/A'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{candidate.experienciaOilGas || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                            {candidate.areaExperiencia || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            {candidate.timestamp 
                              ? new Date(candidate.timestamp.seconds * 1000).toLocaleDateString()
                              : 'N/A'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredData.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No hay candidatos registrados
                  </div>
                )}
              </div>
            )}

            {/* Messages Table */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">Remitente</th>
                      <th className="px-6 py-3 text-left">Tipo</th>
                      <th className="px-6 py-3 text-left">Mensaje</th>
                      <th className="px-6 py-3 text-left">Estado</th>
                      <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((message) => (
                      <tr key={message.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{message.nombre}</div>
                            <div className="text-sm text-gray-500">{message.empresa}</div>
                            <div className="text-sm">{message.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            message.tipoConsulta === 'company' 
                              ? 'bg-blue-100 text-blue-800'
                              : message.tipoConsulta === 'specialist'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {message.tipoConsulta === 'company' ? 'Empresa' : 
                             message.tipoConsulta === 'specialist' ? 'Especialista' : 
                             'Otro'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate" title={message.mensaje}>
                            {message.mensaje}
                          </div>
                          <button
                            onClick={() => setSelectedMessage(message)}
                            className="text-sm text-amber-600 hover:text-amber-800 mt-1"
                          >
                            Ver completo
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={message.status || 'nuevo'}
                            onChange={(e) => handleStatusChange(message.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm border ${
                              message.status === 'leido' 
                                ? 'bg-green-100 text-green-800'
                                : message.status === 'procesando'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="nuevo">Nuevo</option>
                            <option value="leido">Leído</option>
                            <option value="procesando">En proceso</option>
                            <option value="respondido">Respondido</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedMessage(message)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Ver detalles"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="p-1 hover:bg-red-50 rounded text-red-600"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredData.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No hay mensajes recibidos
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Summary */}
        <div className="mt-6 text-gray-600">
          Mostrando {filteredData.length} {activeTab === 'candidates' ? 'candidatos' : 'mensajes'}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">Detalles del Mensaje</h3>
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
                    <p className="font-medium">{selectedMessage.nombre}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Empresa</label>
                    <p className="font-medium">{selectedMessage.empresa}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Teléfono</label>
                    <p className="font-medium">{selectedMessage.telefono}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Tipo de Consulta</label>
                  <p className="font-medium capitalize">{selectedMessage.tipoConsulta}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Mensaje</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedMessage.mensaje}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <label className="text-sm text-gray-500">Fecha de envío</label>
                    <p>
                      {selectedMessage.timestamp 
                        ? new Date(selectedMessage.timestamp.seconds * 1000).toLocaleString()
                        : 'N/A'}
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Responder
                    </a>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedMessage.id, 'leido');
                        setSelectedMessage(null);
                      }}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Marcar como leído
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}