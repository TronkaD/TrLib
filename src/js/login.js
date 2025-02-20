// Importation de la fonction signInUser depuis le module d'authentification
import { signInUser } from "./auth.js";

/**
 * Initialisation de l'écouteur de l'événement d'ouverture de session
 */
const initializeSignInEventListener = () => {
    // Récupération du formulaire de connexion et des champs d'email et de mot de passe à partir du DOM
    const signInForm = document.getElementById("signin-form");
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    // Vérification de l'existence du formulaire et des champs requis
    if (!signInForm || !emailElement || !passwordElement) {
        console.warn("Le formulaire d'inscription n'est pas prêt"); // Avertissement si un élément requis est manquant
        return; // Sortie de la fonction si les éléments ne sont pas trouvés
    }

    // Ajout d'un écouteur d'événements pour le soumission du formulaire
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

        // Récupération des valeurs des champs d'email et de mot de passe
        const email = emailElement.value;
        const password = passwordElement.value;

        // Appel de la fonction signInUser avec les valeurs récupérées
        signInUser(email, password);
    });
};

// Exportation de la fonction pour qu'elle soit utilisée dans d'autres modules
export default initializeSignInEventListener;
