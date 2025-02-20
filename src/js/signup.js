// Importation de la fonction signUpUser depuis le module d'authentification
import { signUpUser } from "./auth.js";

/** 
 * Initialise l'écouteur d'événements pour le formulaire d'inscription
 */
const initializeSignupEventListener = () => {
    // Récupération des éléments du DOM
    const signupForm = document.getElementById("signup-form"); // Formulaire d'inscription
    const emailElement = document.getElementById("email"); // Champ pour l'email
    const passwordElement = document.getElementById("password"); // Champ pour le mot de passe

    // Vérification de l'existence des éléments nécessaires
    if (!signupForm || !emailElement || !passwordElement) {
        console.warn("Le formulaire d'inscription n'est pas prêt");
        return; // Sortie de la fonction si les éléments ne sont pas trouvés
    }

    // Ajout d'un écouteur d'événements pour la soumission du formulaire
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupération des valeurs saisies par l'utilisateur
        const email = emailElement.value; // Valeur de l'email
        const password = passwordElement.value; // Valeur du mot de passe

        // Appel de la fonction signUpUser avec les valeurs récupérées
        signUpUser(email, password); 
    });
};

// Exportation de la fonction pour utilisation dans d'autres modules
export default initializeSignupEventListener;

