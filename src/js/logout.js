// Importation des fonctions nécessaires depuis les modules d'authentification et de routage
import { logout } from "./auth.js"; // Fonction pour gérer la déconnexion de l'utilisateur
import { changeView } from "./router.js"; // Fonction pour changer de vue dans l'application

/**
 * Initialise l'écouteur d'événements pour la déconnexion
 */
const initializeLogoutEventListener = () => {
    // Récupération du bouton de déconnexion à partir du DOM
    const disconnectBtn = document.getElementById("logout-btn");

    // Vérification de l'existence du bouton de déconnexion
    if (!disconnectBtn) {
        console.warn("Le bouton de déconnexion n'est pas prêt"); // Avertissement si le bouton n'est pas trouvé
        return; // Sortie de la fonction si le bouton n'existe pas
    }
    
    // Ajout d'un écouteur d'événements pour le clic sur le bouton de déconnexion
    disconnectBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du bouton

        // Appel de la fonction logout pour déconnecter l'utilisateur
        logout()
        .then(() => {
            // Si la déconnexion réussit, redirige vers la page de connexion
            changeView("login");
        })
        .catch((err) => {
            // Gestion des erreurs en cas de problème lors de la déconnexion
            console.log("Oups... Erreur lors de la déconnexion");
            console.log(err); // Affichage de l'erreur dans la console
        });
    });
};

// Exportation de la fonction pour qu'elle soit utilisée dans d'autres modules
export default initializeLogoutEventListener;
