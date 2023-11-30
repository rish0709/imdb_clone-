const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const listId = document.getElementById('list-id');
const favList = document.getElementById('favourites_list');

// to load movies
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=dc89a5e6`;
    const res = await fetch(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=dc89a5e6`);
    const data = await res.json();
    if (data.Response == "True") displayMoviesList(data.Search);
}

document.getElementById("movie-search-box").addEventListener("keyup", findMovies, false);
document.getElementById("favourite_button").addEventListener("click", see_fav_list, false);

// to find movies
function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }
    else {
        searchList.classList.add('hide-search-list');
    }
}

// to display movies after searching
function displayMoviesList(movies) {

    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');


        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster;
            console.log(moviePoster, "******movie poster");

        }
        else {
            moviePoster = "image_not_found.png";
        }

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;

        searchList.appendChild(movieListItem);
        console.log(searchList, "******");
    }
    
    loadMovieDetails();

}

// to load details of particular movie which u have selected
function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        
        movie.addEventListener('click', async () => {
            
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=dc89a5e6`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

// to display details of particular movie which u have selected
function displayMovieDetails(details) {

    
    searchList.innerHTML = "";
    
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    

    <button type = "submit" onClick = "add_to_fav_list('${details.Poster}','${details.Title}')" id = "favouriteButton">Add to Favourites</button>
    `;
    




}




var fav_movie = "";
// function to add selected movies in favourite list
function add_to_fav_list(poster, title) {
    
    favouriteButton.innerHTML = "<b>Added to Favourites</b>";
    fav_movie += `
    <div class = "fav_movie_div_${title}">
    <div class = "fav_movie-poster">
        <img src = "${(poster != "N/A") ? poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "fav_movie-info">
        <h3 class = "movie-title">${title}</h3>
        </div>
    
    <button id = "remove_fav_button" onClick = "remove_from_favourites('${title}')">Remove from Favourites</button>
        <br>
        <br>
        </div>`

    



};

// function to remove movies from favourite list
function remove_from_favourites(title){
    
    mov = `fav_movie_div_${title}`;
    
    const favDiv = document.getElementsByClassName(mov);

  
    favDiv[0].classList.add('remove_fav_movie');
    


};

// function to see favourite list

function see_fav_list(){
    
    favList.innerHTML = `${fav_movie}`;
    resultGrid.innerHTML = "";
};



window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});



























