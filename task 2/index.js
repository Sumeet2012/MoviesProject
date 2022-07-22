const API_KEY = 'api_key=a9008f95ab9518bc6449f00cff68e890';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500'
const SEARCHAPI =BASE_URL+'/search/movie?'+API_KEY;
const form=document.getElementById("form");
const search=document.getElementById("search");
const main=document.getElementById("main");
getMovies(API_URL);

//getMovie Funtion
async function getMovies(url) {
const resp = await fetch(url);
const respData = await resp.json();
console.log(respData);
showMovies(respData.results);
}

function showMovies(movies) {
// clear main
main.innerHTML = "";
    movies.forEach(movie => {
const { poster_path, title, vote_average, overview ,vote_count} = movie;
const movieEl = document.createElement('div');
movieEl.classList.add("movie");
        movieEl.innerHTML=`
      
        <img src="${IMG_URL+poster_path}"
            alt="${title}" class="movie-img">
    
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="rating">RATING : ${vote_average}</span>
            <span class="rating">VOTE COUNT : ${vote_count}</span>
        </div>
        <div class="overview">
            <h3 class="view"">Overview</h3>
       ${overview}
    </div>
   
    `;
    main.appendChild(movieEl);
    
});
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + '&query='+ searchTerm);
        search.value = "";
    }
    
});