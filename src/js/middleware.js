import { getUser } from "./auth.js";
import { changeView, getCurrentRoute } from "./router.js";

/**
 *  Initialiser une protection de routeur sur chaque route
 */

const initializeProtectionRouterListener = async () => {
    const user = await getUser();
    const currentRoute = getCurrentRoute();

    if(!user && currentRoute === "board"){
        changeView("login");
    }

    if(user && (currentRoute === "login" || currentRoute === "register")) {
        changeView("board");
    }

    if(user && currentRoute === "board"){
        const boardContentDiv = document.getElementById("body-board");

        if(!boardContentDiv){
            console.error("Le board n'as pas de contenu HTML");
        }
        boardContentDiv.style.display = "block";
    }

}

export default initializeProtectionRouterListener;