// Importation des fonctions d'authentification de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
// Importation de la configuration d'authentification Firebase
import { auth } from '../../firebase-config.js'; 
// Importation de la fonction pour changer de vue dans l'application
import { changeView } from './router.js';

/**
 * Inscription de l'utilisateur
 * @param {string} email -- email de l'utilisateur
 * @param {string} password -- mot de passe de l'utilisateur
 * @returns {void}
 */
const signUpUser = (email, password) => {
    // Création d'un nouvel utilisateur avec email et mot de passe
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Affichage d'un message de succès en cas d'inscription réussie
            console.log("Inscription réussie", userCredential);
        })
        .catch((err) => {
            // Affichage d'un avertissement en cas d'erreur lors de l'inscription
            console.warn("Ooops erreur", err);
        });
};

/**
 * Connexion d'un utilisateur
 * @param {String} email - L'adresse email de l'utilisateur
 * @param {String} password - Le mot de passe de l'utilisateur
 * @returns {void}
 */
const signInUser = (email, password) => {
    // Authentification de l'utilisateur avec email et mot de passe
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Changement de vue après une connexion réussie
            changeView("board");
        })
        .catch((err) => {
            // Affichage d'un message d'erreur en cas d'échec de la connexion
            console.log("Erreur de connexion", err);
        });
}

/**
 * Obtention de manière asynchrone l'utilisateur authentifié actuel
 * @returns {Promise<User | null>} -- L'objet utilisateur s'il est connecté, sinon null
 */
const getUser = async () => 
    new Promise((resolve, reject) => {
        // Écoute des changements d'état d'authentification
        const unsubscribe = onAuthStateChanged(
            auth, 
            (user) => {
                unsubscribe(); // Désinscription de l'écouteur après la première exécution
                if (user) {
                    resolve(user); // Résolution de la promesse avec l'utilisateur connecté
                } else {
                    resolve(null); // Résolution de la promesse avec null si aucun utilisateur n'est connecté
                }
            },
            reject, // Gestion des erreurs
        );
    });

/**
 * Déconnexion de l'utilisateur
 */
const logout = () => signOut(auth); // Appel de la fonction signOut pour déconnecter l'utilisateur

// Exportation des fonctions pour qu'elles soient utilisées dans d'autres modules
export { signUpUser, signInUser, getUser, logout };


