import initializeSignupEventListener from "./signup.js";
import initializeSignInEventListener from "./login.js";
import initializeProtectionRouterListener from "./middleware.js";
import initializeLogoutEventListener from "./logout.js";

const init = () => {
    initializeSignupEventListener();
    initializeSignInEventListener();
    initializeProtectionRouterListener();
    initializeLogoutEventListener();
};
export default init;