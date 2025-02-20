import initializeSignupEventListener from "./signup.js";
import initializeSignInEventListener from "./login.js";
import initializeProtectionRouterListener from "./middleware.js";
import initializeLogoutEventListener from "./logout.js";
import { addData } from "./books.js";
import addFilterEvents from "./board.js";
import openModal from "./borrow.js";

const init = () => {
    initializeSignupEventListener();
    initializeSignInEventListener();
    initializeProtectionRouterListener();
    initializeLogoutEventListener();
    addData();
    addFilterEvents();
    openModal();
   
};
export default init;