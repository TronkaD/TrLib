// Importation de la fonction d'initialisation de l'interface utilisateur depuis le module ui.js
import init from "./ui.js";

// Fonction asynchrone pour démarrer l'application
const startApp = async () => {
    init(); // Appel de la fonction d'initialisation de l'interface utilisateur
};

// Ajout d'un écouteur d'événements pour détecter le chargement complet du DOM
document.addEventListener("DOMContentLoaded", startApp);
