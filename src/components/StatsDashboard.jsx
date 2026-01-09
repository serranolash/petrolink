import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Users, TrendingUp, MapPin, Award } from 'lucide-react';

export default function StatsDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    byExperience: {},
    byCountry: {},
    bySpecialty: {}
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const snapshot = await getDocs(collection(db, 'candidates'));
    const candidates = snapshot.docs.map(doc => doc.data());
    
    const byExperience = {};
    const byCountry = {};
    const bySpecialty = {};
    
    candidates.forEach(candidate => {
      // Conteo por experiencia
      const exp = candidate.experienciaOilGas || 'No especificado';
      byExperience[exp] = (byExperience[exp] || 0) + 1;
      
      // Conteo por país
      const country = candidate.paisResidencia || 'No especificado';
      byCountry[country] = (byCountry[country] || 0) + 1;
      
      // Conteo por especialidad
      const specialty = candidate.especialidad || 'No especificado';
      bySpecialty[specialty] = (bySpecialty[specialty] || 0) + 1;
    });
    
    setStats({
      total: candidates.length,
      byExperience,
      byCountry,
      bySpecialty
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-lg">
            <Users className="text-amber-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-gray-600">Candidatos Totales</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold">
              {Object.keys(stats.byExperience).length}
            </div>
            <div className="text-gray-600">Niveles de Experiencia</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <MapPin className="text-green-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold">
              {Object.keys(stats.byCountry).length}
            </div>
            <div className="text-gray-600">Países</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Award className="text-purple-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold">
              {Object.keys(stats.bySpecialty).length}
            </div>
            <div className="text-gray-600">Especialidades</div>
          </div>
        </div>
      </div>
    </div>
  );
}