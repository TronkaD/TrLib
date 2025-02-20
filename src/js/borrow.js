const openModal = (button) => {
    // Récupération du titre et de l'ID du livre à partir du bouton cliqué
    const bookTitle = button.getAttribute('data-book-title');
    const bookId = button.getAttribute('data-book-id');
    
    // Sélection de l'élément modal pour afficher le titre
    const modalTitle = document.getElementsByClassName('modal-title-booked')[0]; // Accéder au premier élément

    // Mise à jour du titre de la modal
    modalTitle.textContent = `Emprunté le livre : ${bookTitle}`;

    // Vous pouvez également utiliser bookId pour d'autres logiques si nécessaire
    console.log(`ID du livre : ${bookId}`);
};

export default openModal;

