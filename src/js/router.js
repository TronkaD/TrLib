/* Méthode : getCurrentRoute => Cette méthode récupère le chemin actuel de l'URL et renvoie la route actuelle sans l'extension .html */
const getCurrentRoute = () => {
    // Récupération du chemin complet de l'URL
    const currentFullPath = window.location.pathname;

    // Extraction de la dernière partie du chemin (la route actuelle)
    const currentRoute = currentFullPath.split("/").pop();

    // Retourne la route sans l'extension .html
    return currentRoute.replace(".html", "");
}

/* Méthode : redirect => Cette méthode redirige l'utilisateur vers une nouvelle vue spécifiée */
const redirect = (view, isFormIndex) => {
    // Récupération du chemin complet de l'URL
    const currentFullPath = window.location.pathname;

    // Extraction de la route actuelle
    const currentRoute = currentFullPath.split("/").pop();

    // Construction de l'URL de base en retirant la route actuelle
    const baseURL = currentFullPath.replace(`/${currentRoute}`, ""); 

    // Détermination du nouveau chemin en fonction de isFormIndex
    if(isFormIndex){
        // Redirection vers le dossier views si isFormIndex est vrai
        const newPath = `${baseURL}/views/${view}.html`;
        window.location.href = newPath;
        return;
    }

    // Redirection vers la racine si faux
    const newPath = `${baseURL}/${view}.html`;

    // Redirection de l'utilisateur vers le nouveau chemin
    window.location.href = newPath;
};

/* Méthode : changeView => Cette méthode change la vue actuelle en fonction de l'argument 'view' */
const changeView = (view, isFormIndex) => {
    // Redirection vers la vue appropriée en fonction de la valeur de 'view'
    switch (view) {
        case "login":
            redirect("login", isFormIndex);
            break;
        case "register":
            redirect("register", isFormIndex);
            break;
        case "board":
            redirect("board");
            break;
        default:
            // Lorsque la vue n'existe pas 
            console.warn(`Vue inconnue : ${view}`); 
    }
};

// Exposition de la méthode changeView à l'objet window pour un accès global
window.changeView = changeView;

// Exportation des méthodes changeView et getCurrentRoute pour utilisation dans d'autres modules
export { changeView, getCurrentRoute };
