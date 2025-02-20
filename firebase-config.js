// Importation des fonctions nécessaires depuis Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase avec les clés d'API et les identifiants du projet
const firebaseConfig = {
    apiKey: "AIzaSyBHvxrUctfR0M4QCM8qS1l0f3MSyDM2jC4", // Clé API pour l'authentification
    projectId: "trlib-7d82b", // Identifiant du projet Firebase
    appId: "787853478961" // Identifiant de l'application Firebase
};

// Initialisation de l'application Firebase avec la configuration fournie
const app = initializeApp(firebaseConfig);

// Initialisation du service d'authentification Firebase
const auth = getAuth(app);

// Initialisation de Firestore, la base de données de Firebase
const db = getFirestore(app);  

// Exportation des instances d'authentification et de Firestore pour une utilisation dans d'autres modules
export { auth, db };
