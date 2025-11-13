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
const rating = filme.imdbRating ? `⭐ ${filme.imdbRating}` : `⭐ N/A`;

// Conteúdo HTML do card, usando as novas calsses CSS
Card.innerHTML = `
<img src"${filme.Poster !== `N/A` ? filme.Poster : 'placeholder.jpg'}"
alt="${filme.Title}"
class="poster-filme">
<span class="avaliacao">${rating}</span>
<div class="card-detalhes">
<h3 class="botao-adicionar" data-title="${filme.Title} (${filme.Year})</h3>
<button class="botao-adicionar" data-title"${filme.Title}">
+ Minha Lista
</button>
</div>
`;

// Adicinar um listener para a funcionalidade do trailer (Se vocÊ tiver a API)
// Se vocÊ usar a OMDB, precisá uma segunda chamada para os detalhes
Card.addEventListener('click', () => buscarEExibirDetalhes(filme.;imdbID));

return card
}

// --- B. Função Principal de Buscar ---
/** 
 * Buscar o filme na OMDB e atuliza o container. 
 * @param {string} termo - Termo de busca digitando pelo usuário.
 */
async function buscarFilmes(termo) {
if (!termo) return; // Não busca se o campo estiver vazio

// Limpa a lista anterior e mostra um indicador de carregamento
listaFilmesContainer.innerHTML = `<p style="text-align: center; color: gray;">Carregamento...</p>`;

try {
// Busca na OMDB (O parámetro 's' é para busca por termo)
const response = await fetch(`https://www.omdbapi.com/?s=${termo}&apikey=${OMDB_API_KEY}`);
const data = await response;.json();

//Limpa o contrainer novamente
listaFilmesContainer.innerHTML = '';

if (data.Response === 'True' && data.Search) {
    data.Search.forEach(async (filmeBase) => {
// A OMDB retorna apenas dados básicos na busca (s=).
// Precisamos de uma segunda busca (i=) para pegar o Rating.
const filmeDetalhado = await buscarDetalhes(filmeBase.imdbID);
if (filmeDetalhado) {
    listaFilmesContainer.appendChild(criarCardFilme(filmeDetalhado));
}
});
   } else {     

   }
        
console.error("Erro ao buscar filmes:", error);
listaFilmesContainer.innerHTML = `<p style="text-align; center; color: red;">Erro na conexão com a API.</p>`;
  }
}

// --- C. Função para buscar Detalhes e Trailer (Chamada Adicinar) ---
// É NECESSÁRIA pois a OMDB não retorna o Rating na busca por 's'
async function buscarDetalhes(imbID){
try {
// Busca na OMDB (O parámetro 'i' é para busca por ID)
const response = await fetch(`https://www.omdbapi.com/?i=${imbID}&plot=full&apikey=${OMDB_API_KEY}`);
const data = await response.json();
return data.Response === 'True' ? data : null;
} catch (error) {
console.error("Erro ao buscar detalhes:", error);
return null;
  }
}


// --- D. Lógica para Exibir Detalhes/Trailer (Implementação do Modal) ---
// Se vocÊ usava uma API diferente para trailer, integre-a aqui.














