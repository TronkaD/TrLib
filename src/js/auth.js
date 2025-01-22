
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase-config.js'; 
import { changeView } from './router.js';

/**
 * Inscription de l'utilisateur
 * @param {string} email -- user email
 * @param {string} password -- user password
 * @returns { void}
 */
const signUpUser =  (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            console.log("Inscription réussie", userCredential);
        })
        .catch((err) => {
            console.warn ("Ooops erreur", err);
        });
};

/**
 * Connexion d'un utilisateur
 * @param {String} email - L'adresse email de l'utilisateur
 * @param {String} password - Le mot de passe de l'utilisateur
 * @returns {void}
 */
const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        changeView("board");
    })
    .catch((err) => {
        console.log("Erreur de connexion", err);
               
    });
}

/**
 *  Obtienir de manière asynchrone l'utilisateur authentifié actuel
 * @returns {Promise<User | null>} -- L'objet utilisateur s'il est connecté, sinon null
*/
const getUser = async () => 
    new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (user) => {
                unsubscribe();
                if(user) {
                    resolve(user);
                }else {
                    resolve(null);
                }
            },
            reject,
        );
    });


export { signUpUser, signInUser, getUser};

