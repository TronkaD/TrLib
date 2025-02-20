// Importation des fonctions pour interagir avec Firestore
import { collection, getDocs } from "firebase/firestore";
// Importation de la configuration de la base de données Firestore
import { db } from "../../firebase-config.js";

// Fonction asynchrone pour récupérer les livres avec des filtres
const fetchBooks = async (statusFilter = 'all', searchTerm = '') => {
    const getTableBody = document.getElementById('table-body'); // Récupération du corps du tableau
    getTableBody.innerHTML = ''; // Réinitialiser le corps du tableau pour éviter les doublons

    try {
        // Récupération des documents de la collection "books"
        const querySnapshot = await getDocs(collection(db, "books"));
        querySnapshot.forEach((doc) => {
            const book = doc.data(); // Récupération des données du document

            // Appliquer le filtre de statut
            let showBook = true;
            if (statusFilter === 'disponible' && book.status !== 'disponible') {
                showBook = false; // Filtrer les livres non disponibles
            } else if (statusFilter === 'emprunter' && book.status !== 'emprunter') {
                showBook = false; // Filtrer les livres non empruntés
            }

            // Appliquer le filtre de recherche
            if (searchTerm) {
                const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Conversion du terme de recherche en minuscules
                // Vérification si le titre, l'auteur ou l'ISBN contiennent le terme de recherche
                if (
                    !book.title.toLowerCase().includes(lowerCaseSearchTerm) &&
                    !book.author.toLowerCase().includes(lowerCaseSearchTerm) &&
                    !book.isbn.toLowerCase().includes(lowerCaseSearchTerm)
                ) {
                    showBook = false; // Ne pas afficher le livre si aucun critère n'est rempli
                }
            }

            // Si le livre doit être affiché, l'ajouter au tableau
            if (showBook) {
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
                getTableBody.appendChild(row); // Ajouter la ligne au corps du tableau
            }
        });
    } catch (err) {
        // Gestion des erreurs lors de la récupération des données
        console.error("Impossible de récupérer ces données !", err);
    }
};

// Fonction pour ajouter des événements de filtrage
const addFilterEvents = () => {
    const statusSelect = document.getElementById('inputGroupSelect01'); // Sélecteur de statut
    const searchInput = document.getElementById('searchInput'); // Champ de recherche
    const searchButton = document.getElementById('button-search'); // Bouton de recherche

    // Événement pour le changement de filtre
    statusSelect.addEventListener('change', () => {
        const statusFilter = statusSelect.value; // Récupérer la valeur du filtre de statut
        const searchTerm = searchInput.value; // Récupérer le terme de recherche
        fetchBooks(statusFilter, searchTerm); // Appeler fetchBooks avec le filtre de statut et le terme de recherche
    });

    // Événement pour la recherche
    searchButton.addEventListener('click', () => {
        const statusFilter = statusSelect.value; // Récupérer la valeur du filtre de statut
        const searchTerm = searchInput.value; // Récupérer le terme de recherche
        fetchBooks(statusFilter, searchTerm); // Appeler fetchBooks avec le filtre de statut et le terme de recherche
    });

    // Événement pour la recherche en temps réel
    searchInput.addEventListener('input', () => {
        const statusFilter = statusSelect.value; // Récupérer la valeur du filtre de statut
        const searchTerm = searchInput.value; // Récupérer le terme de recherche
        fetchBooks(statusFilter, searchTerm); // Appeler fetchBooks lors de la saisie
    });
};

// Appeler addFilterEvents après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    addFilterEvents(); // Ajouter les événements de filtrage
    fetchBooks(); // Charger les livres au démarrage
});

// Exportation de la fonction addFilterEvents pour une utilisation dans d'autres modules
export default addFilterEvents;

