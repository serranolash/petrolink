// Panel de admin básico para ver candidatos
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminPanel() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const candidatesList = [];
      querySnapshot.forEach((doc) => {
        candidatesList.push({ id: doc.id, ...doc.data() });
      });
      setCandidates(candidatesList);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="mb-4">
        <p className="text-gray-600">Total de candidatos: {candidates.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Experiencia</th>
              <th className="py-2 px-4 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="py-2 px-4 border">{candidate.nombre}</td>
                <td className="py-2 px-4 border">{candidate.email}</td>
                <td className="py-2 px-4 border">{candidate.experienciaOilGas}</td>
                <td className="py-2 px-4 border">
                  {new Date(candidate.submissionDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}