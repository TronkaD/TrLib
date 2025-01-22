import { signInUser } from "./auth.js";

/**
 * Initialisation de l'écouteur de l'événement d'ouverture de la session
 */
const initializeSignInEventListener = () => {
    const  signInForm = document.getElementById("signin-form");
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if(!signInForm || !emailElement || !passwordElement){
        console.warn("Le formulaire d'inscription n'est pas prêt");
        return;
    }

    signInForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailElement.value;
        const password = passwordElement.value;
        signInUser(email, password);
        
    });
};

export default initializeSignInEventListener;