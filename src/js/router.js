// Methode : getCurrentRoute
const getCurrentRoute = () => {
    const currentFullPath = window.location.pathname;
    const currentRoute = currentFullPath.split("/").pop();
    return currentRoute.replace(".html", "");
}

// Methode : redirect
const redirect = (view, isFormIndex) => {
    const currentFullPath = window.location.pathname;
    const currentRoute = currentFullPath.split("/").pop();
    const baseURL = currentFullPath.replace(`/${currentRoute}`, ""); 

    if(isFormIndex) {
        const newPath = `${baseURL}/views/${view}.html`;
        window.location.href = newPath;
        return; 
    }

    const newPath = `${baseURL}/${view}.html`;
    window.location.href = newPath;
};

// Methode : changeView 
const changeView = (view, isFormIndex) => {

    if(view === "login"){
        redirect("login", isFormIndex);
    }
    if(view === "register"){
        redirect("register", isFormIndex);
    }
    if(view === "board"){
        redirect("board");
    }
};

window.changeView = changeView;

export {changeView, getCurrentRoute};