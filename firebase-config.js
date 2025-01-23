// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFireStore } from "firebase/firestore";  

// Configuration de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBHvxrUctfR0M4QCM8qS1l0f3MSyDM2jC4",
    projectId: "trlib-7d82b",
    appId: "787853478961"
};
// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);
// Initialisation de l'authentification et de Firestore
const auth = getAuth(app);
const db = getFireStore(app);  
// Exportation des instances pour utilisation ailleurs
export { auth, db };