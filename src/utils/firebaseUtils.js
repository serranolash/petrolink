// src/utils/firebaseUtils.js
import { db, storage } from '../firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Guardar candidato
export const saveCandidate = async (candidateData) => {
  try {
    const docRef = await addDoc(collection(db, "candidates"), {
      ...candidateData,
      createdAt: serverTimestamp(),
      status: "pending",
      processed: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving candidate:", error);
    return { success: false, error: error.message };
  }
};

// Subir archivo CV
export const uploadCV = async (file, candidateId) => {
  try {
    if (!file) return null;
    
    const storageRef = ref(storage, `cvs/${candidateId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading CV:", error);
    return null;
  }
};

// Obtener contador de candidatos (para estadísticas)
export const getCandidatesCount = async () => {
  try {
    const q = query(collection(db, "candidates"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting count:", error);
    return 0;
  }
};

// Obtener IP del usuario
export const getUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};