import { signUpUser }  from "./auth.js";


/**  Initialize signup event listener */
const initializeSignupEventListener = () => {
    const signupForm = document.getElementById("signup-form");
    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if(!signupForm || !emailElement || !passwordElement){
        console.warn("Le formulaire d'inscription n'est pas prêt");
        return;
    };

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = emailElement.value;
        const password = passwordElement.value;

       signUpUser(email, password); 
    });
};

export default initializeSignupEventListener;
