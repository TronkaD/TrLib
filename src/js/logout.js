import { logout } from "./auth.js";
import { changeView } from "./router.js";


/**
 * Initialize logout event listener
 */
const initializeLogoutEventListener = () => {
    const disconnectBtn = document.getElementById("logout-btn");
    if (!disconnectBtn) {
        console.warn("Le bouton de déconnexion n'est pas prêt");
        return;
    }
    
    disconnectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        logout()
        .then(() => {
            changeView("login");
        })
        .catch((err) => {
            console.log("Oups... Erreur lors de la déconnexion");
            console.log(err);
        });
    });
};

export default initializeLogoutEventListener;