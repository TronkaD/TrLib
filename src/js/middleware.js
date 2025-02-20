// Importation des fonctions nécessaires depuis les modules d'authentification et de routage
import { getUser } from "./auth.js"; // Fonction pour récupérer les informations de l'utilisateur
import { changeView, getCurrentRoute } from "./router.js"; // Fonctions pour changer de vue et obtenir la route actuelle

/**
 * Initialiser une protection de routeur sur chaque route
 */
const initializeProtectionRouterListener = async () => {
    // Récupération des informations de l'utilisateur de manière asynchrone
    const user = await getUser();

    // Obtention de la route actuelle
    const currentRoute = getCurrentRoute();

    // Vérification si l'utilisateur n'est pas connecté et si la route actuelle est "board"
    if (!user && currentRoute === "board") {
        changeView("login"); // Redirige vers la page de connexion
    }

    // Vérification si l'utilisateur est connecté et si la route actuelle est "login" ou "register"
    if (user && (currentRoute === "login" || currentRoute === "register")) {
        changeView("board"); // Redirige vers le tableau de bord
    }

    // Vérification si l'utilisateur est connecté et si la route actuelle est "board"
    if (user && currentRoute === "board") {
        const boardContentDiv = document.getElementById("body-board"); // Récupération de l'élément HTML du tableau de bord

        // Vérification si l'élément du tableau de bord existe
        if (!boardContentDiv) {
            console.error("Le board n'a pas de contenu HTML"); // Affichage d'une erreur dans la console si l'élément est manquant
        }
        
        // Affichage du contenu du tableau de bord
        boardContentDiv.style.display = "block";
    }
}

// Exportation de la fonction pour être utilisée dans d'autres modules
export default initializeProtectionRouterListener;
