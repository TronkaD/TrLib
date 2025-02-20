// Importation des fonctions nécessaires pour interagir avec Firestore
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
// Importation de la configuration de la base de données Firestore
import { db } from '../../firebase-config.js';
// Importation de la fonction pour obtenir l'utilisateur connecté
import { getUser } from './auth.js'; 

/**
 * Fonction asynchrone pour ajouter un livre à la base de données
 * @param {string} auteur - L'auteur du livre
 * @param {string} titre - Le titre du livre
 * @param {string} urlImage - L'URL de l'image du livre
 * @param {string} isbnElm - L'ISBN du livre
 * @param {string} datePublication - La date de publication du livre
 * @param {string} statusSelect - Le statut du livre
 */
const addbook = async (auteur, titre, urlImage, isbnElm, datePublication, statusSelect) => {
  const user = await getUser(); // Récupération de l'utilisateur connecté

  // Vérification si un utilisateur est connecté
  if (!user) {
    console.warn("Aucun utilisateur connecté. Impossible de créer le livre.");
    return; // Sortir de la fonction si aucun utilisateur n'est connecté
  }

  // Création d'un ID unique pour le livre basé sur l'UID de l'utilisateur et l'heure actuelle
  const bookId = `${user.uid}_${Date.now()}`;
  const bookRef = doc(db, "books", bookId); // Référence au document du livre dans Firestore

  try {
    // Ajout du livre à la base de données
    await setDoc(bookRef, {
      author: auteur,
      title: titre,
      image: urlImage,
      isbn: isbnElm,
      dateOfPublication: datePublication,
      status: statusSelect,
      userId: user.uid, // Stockage de l'ID de l'utilisateur qui a ajouté le livre
    });
    console.log("Livre ajouté avec ID: ", bookRef.id);
    // Mettre à jour le tableau après l'ajout
    fetchBooks();
  } catch (err) {
    // Gestion des erreurs lors de l'ajout du livre
    console.error("Erreur lors de l'ajout du livre: ", err);
    alert("Oups, impossible d'ajouter le livre. Recommencez.");
  }
};

/**
 * Fonction asynchrone pour afficher les livres dans le tableau
 */
const fetchBooks = async () => {
  const getTableBody = document.getElementById('table-body'); // Récupération du corps du tableau
  getTableBody.innerHTML = ''; // Réinitialiser le corps du tableau pour éviter les doublons

  try {
    // Récupération des documents de la collection "books"
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      const book = doc.data(); // Récupération des données du document
      const row = document.createElement('tr'); // Création d'une nouvelle ligne pour le tableau
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.dateOfPublication}</td>
        <td>${book.isbn}</td>
        <td>${book.status}</td>
        <td>
          <button 
          type="button"
          class="btn btn-success"
          id="open-form-booked" 
          data-bs-toggle="modal" 
          data-bs-target="#myModal"
          data-book-id="${doc.id}"
          data-book-title="${book.title}"
          data-book-status="${book.status}"
          onclick="openModal(this)"
          >${book.status}
          </button>
        </td>
      `;
      getTableBody.appendChild(row); // Ajouter la ligne au tableau
    });
  } catch (err) {
    // Gestion des erreurs lors de la récupération des livres
    console.error("Impossible de récupérer ces données !", err);
  }
};

/**
 * Fonction pour gérer la soumission du formulaire d'ajout de livre
 */
const addData = () => {
  const form = document.getElementById('add-book-form'); // Récupération du formulaire

  // Écouteur d'événement pour la soumission du formulaire
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs du formulaire
    const auteur = document.getElementById('author').value;
    const titre = document.getElementById('title').value;
    const isbn = document.getElementById('isbn').value;
    const datePublication = document.getElementById('dateOfPublication').value;
    const status = document.getElementById('status').value;

    const urlImage = ''; // Ajoutez ici la logique pour récupérer l'URL de l'image si nécessaire

    // Appel de la fonction addbook pour ajouter le livre
    await addbook(auteur, titre, urlImage, isbn, datePublication, status);

    // Réinitialiser le formulaire après l'ajout
    form.reset();
  });

  // Récupérer les livres au chargement de la page
  fetchBooks();
}

// Exportation des fonctions addData et fetchBooks pour utilisation dans d'autres modules
export { addData, fetchBooks };

