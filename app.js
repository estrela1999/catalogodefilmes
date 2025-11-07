// Substitua pela sua chave real do omdb api
const OMDB_API_KEY =' 6a4c7aad';
const listaFilmesContainer = document.querySelector('.lista-fimes');
const searchInput = document.querySelector('.search-input');

// --- A. Função para Criar o HTML do Card ---
/** 
 * Criar o elemento HTML de um Card de filme com os dados da OMDB.
 * @param {object} filme - objeto dce filme retornado pela API
 */
function criarCardFilme(filme) {
const Card = document.createElement('div');
Card.classList.add('card-filme');
// Adicina o IMDB ID como um data-attribute para buscar detalhes/trailer depois
Card.dataset.imbID = filme.imbID;

// garante que o rating seja um v alor presente
const rating = filme.imdbRating ? 

}