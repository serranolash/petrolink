import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificar si ya está autenticado al cargar
  useEffect(() => {
    const savedAuth = localStorage.getItem('petrolink_admin_authenticated');
    if (savedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchCandidates();
    }
  }, [authenticated]);

  const fetchCandidates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const candidatesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Ordenar por fecha más reciente
      candidatesList.sort((a, b) => {
        const dateA = a.timestamp || a.submissionDate || a.createdAt || 0;
        const dateB = b.timestamp || b.submissionDate || b.createdAt || 0;
        return new Date(dateB) - new Date(dateA);
      });
      setCandidates(candidatesList);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    // Cambia esta contraseña por una más segura
    if (password === 'petrolink2024') {
      setAuthenticated(true);
      localStorage.setItem('petrolink_admin_authenticated', 'true');
    } else {
      alert('Contraseña incorrecta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('petrolink_admin_authenticated');
    setPassword('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Pantalla de autenticación
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
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
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Ingresar al Panel
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Acceso restringido al personal autorizado
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla principal del admin
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando candidatos...</p>
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
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Panel Administrativo - Petrolink Venezuela
                  </h1>
                  <p className="text-gray-600">Gestión de candidatos registrados</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-amber-50 px-4 py-2 rounded-lg">
                <div className="text-sm text-amber-700">Candidatos totales</div>
                <div className="text-2xl font-bold text-amber-800">{candidates.length}</div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de candidatos */}
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
                  <th className="px 6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{candidate.nombre || 'N/A'}</div>
                      <div className="text-sm text-gray-500">
                        {candidate.paisResidencia || 'País no especificado'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <a href={`mailto:${candidate.email}`} className="text-amber-600 hover:text-amber-800 font-medium block">
                          {candidate.email || 'N/A'}
                        </a>
                        <div className="text-gray-600 mt-1">{candidate.telefono || 'Teléfono no disponible'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.experienciaOilGas || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{candidate.ultimaPosicion || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{candidate.segmentoExperticia || 'N/A'}</div>
                      <div className="text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          {candidate.certificaciones && candidate.certificaciones !== "Seleccionar certificaciones" && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                              {candidate.certificaciones}
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.timestamp ? new Date(candidate.timestamp).toLocaleDateString('es-VE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            // Abrir detalles del candidato
                            const candidateDetails = `
Nombre: ${candidate.nombre || 'N/A'}
Email: ${candidate.email || 'N/A'}
Teléfono: ${candidate.telefono || 'N/A'}
Experiencia: ${candidate.experienciaOilGas || 'N/A'}
Última posición: ${candidate.ultimaPosicion || 'N/A'}
Especialidad: ${candidate.segmentoExperticia || 'N/A'}
País: ${candidate.paisResidencia || 'N/A'}
Inglés: ${candidate.nivelIngles || 'N/A'}
Expectativa salarial: ${candidate.expectativaSalarial || 'N/A'}
CV subido: ${candidate.cvUploaded ? 'Sí' : 'No'}
Fecha: ${candidate.timestamp ? new Date(candidate.timestamp).toLocaleString('es-VE') : 'N/A'}
                            `;
                            alert(candidateDetails);
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition"
                        >
                          Ver detalles
                        </button>
                        <button
                          onClick={() => {
                            const firebaseProject = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id';
                            window.open(`https://console.firebase.google.com/project/${firebaseProject}/firestore/data/~2Fcandidates~2F${candidate.id}`, '_blank');
                          }}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm hover:bg-amber-200 transition"
                        >
                          Firebase
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {candidates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No hay candidatos registrados todavía.</p>
              <p className="text-gray-400 mt-2">Los formularios enviados aparecerán aquí.</p>
            </div>
          )}

          {/* Footer con acciones */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-semibold">{candidates.length}</span> registros
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchCandidates}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar Lista
              </button>
              
              <button
                onClick={() => {
                  const headers = ['Nombre', 'Email', 'Teléfono', 'Experiencia', 'Última Posición', 'Especialidad', 'País', 'Inglés', 'Expectativa Salarial', 'Fecha'];
                  
                  const csvContent = candidates.map(c => [
                    `"${c.nombre || ''}"`,
                    `"${c.email || ''}"`,
                    `"${c.telefono || ''}"`,
                    `"${c.experienciaOilGas || ''}"`,
                    `"${c.ultimaPosicion || ''}"`,
                    `"${c.segmentoExperticia || ''}"`,
                    `"${c.paisResidencia || ''}"`,
                    `"${c.nivelIngles || ''}"`,
                    `"${c.expectativaSalarial || ''}"`,
                    `"${c.timestamp ? new Date(c.timestamp).toLocaleString('es-VE') : ''}"`
                  ].join(',')).join('\n');
                  
                  const csv = `${headers.join(',')}\n${csvContent}`;
                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `candidatos-petrolink-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar a CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats adicionales */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">CVs Subidos</div>
                <div className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.cvUploaded).length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
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
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Países principales</div>
                <div className="text-2xl font-bold text-gray-900">
                  {[...new Set(candidates.map(c => c.paisResidencia).filter(Boolean))].length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}