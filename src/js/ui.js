import initializeSignupEventListener from "./signup.js";
import initializeSignInEventListener from "./login.js";
import initializeProtectionRouterListener from "./middleware.js";

const init = () => {
    initializeSignupEventListener();
    initializeSignInEventListener();
    initializeProtectionRouterListener();
};
export default init;