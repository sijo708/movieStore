const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzFmOWYxYjEwZDc4MGNlN2E3YTdmYjc2YWRkNmJmMiIsInN1YiI6IjY1YjNkMTZjOWJhODZhMDE2MjMwMDQzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rF35iLU3sMqf4jESqQzducjdqzarhUUBKsVEXzDt2yQ'

async function getPopularMovies() {
    const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular';

    let response = await fetch(popularMoviesUrl, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })

    let data = await response.json();

    displayMovies(data.results)
       // .then(response => response.json())
       // .then(data => displayMovies(data.results));
}

function displayMovies(movies) {
    // get our movie card template
    const movieCardTemplate = document.getElementById('movie-card-template');
    // find the element where the movie card will go
    const movieRow = document.getElementById('movie-row');
    movieRow.innerHTML = '';

    // for each movie in the movies array
    movies.forEach(movie => {
        // -copy the template
        let movieCard = movieCardTemplate.content.cloneNode(true);
        // - modify  it for this movie
        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;

        let descriptionElement = movieCard.querySelector('.card-text');
        descriptionElement.textContent = movie.overview;

        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path);

        let infoButton = movieCard.querySelector('.btn-primary');
        infoButton.setAttribute('data-movieId', movie.id);

        // - add it to the page
        movieRow.appendChild(movieCard);
    });

}

async function getMovieDetails(infoBtn) {
    const movieId = infoBtn.getAttribute("data-movieId");
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;

    let response = await fetch(movieDetailsUrl, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });

    let data = await response.json();

    displayMovieDetails(data);
}

function displayMovieDetails(movieDetails) {
    let movieModal = document.getElementById('movieModal');
    let modalTitle = movieModal.querySelector('.modal-title');
    let moviePoster = movieModal.querySelector('#movie-poster');
    let movieTitle = movieModal.querySelector('#movie-title');
    let movieDetailsContainer = movieModal.querySelector('#movie-details');

    modalTitle.textContent = movieDetails.title;
    moviePoster.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path);
    movieTitle.textContent = movieDetails.title;

    
    movieDetailsContainer.innerHTML = '';

    
    const detailsArray = [       
        `Release Date: ${movieDetails.release_date}`,       
        `Runtime: ${movieDetails.runtime} mins`,        
        `Overview: ${movieDetails.overview}`
    ];

    detailsArray.forEach(detail => {
        let detailElement = document.createElement('p');
        detailElement.textContent = detail;
        movieDetailsContainer.appendChild(detailElement);
    });

    $('#movieModal').modal('show');
}