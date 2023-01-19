window.onload = () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const movieList = document.getElementById("movie-list");

    searchButton.addEventListener("click", async event => {
        event.preventDefault();
        const searchTerm = searchInput.value;
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=d61ac1b7&s=${searchTerm}`);
            if (response.ok) {
                const results = await response.json();
                if(results.Search){
                    console.log(results)
                    displayResults(results.Search);
                }
            }
        } catch (error) {
            console.log(error);
        }
    });

    const displayResults = results => {
        movieList.innerHTML = "";
        results.forEach((movie, index) => {
            movieList.innerHTML += `
            <div class="movie" data-aos="fade-up-right" data-aos-duration="3000"></div>`;
            const movieEl = document.getElementsByClassName("movie");

            if(movie.Poster){
                const moviePoster = document.createElement("img");
                moviePoster.src = movie.Poster;
                movieEl[index].appendChild(moviePoster);
            }

            if(movie.Title){
                const movieTitle = document.createElement("h3");
                movieTitle.innerText = movie.Title;
                movieEl[index].appendChild(movieTitle);
            }

            if(movie.Year){
                const movieYear = document.createElement("p");
                movieYear.innerText = movie.Year;
                movieEl[index].appendChild(movieYear);
            }

            if(movie.imdbID){
                console.log(movie.imdbID)
                const readMoreBtn = document.createElement("button");
                readMoreBtn.classList = "btn btn-primary";
                readMoreBtn.innerText = "Read More";
                

                movieEl[index].appendChild(readMoreBtn);
            }
            const allButtons = document.getElementsByClassName("btn btn-primary");
            for(let i = 0; i < allButtons.length; i++){
                allButtons[i].addEventListener("click", () => {
                    console.log("yoyoyoyo");

                    const exitPopup = document.getElementById("exit-popup");
                    const exitPopupOverlay = document.getElementById("exit-popup-overlay");
                    exitPopup.style.display = "block";
                    exitPopupOverlay.style.display = "block";
                    displayMovieDetails(results[i].imdbID);
                });
            };
            
            
            movieList.appendChild(movieEl[index]);
        });
    };

    const displayMovieDetails = imdbID => {
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=d61ac1b7`)
            .then(response => response.json())
            .then(movie => {
                // Select the pop-up elements
                const moviePoster = document.querySelector("#movie-poster");
                const movieTitle = document.querySelector("#movie-title");
                const movieYear = document.querySelector("#movie-year");
                const movieGenre = document.querySelector("#movie-genre");
                const moviePlot = document.querySelector("#movie-plot");
    
                // Update the elements with the movie data
                moviePoster.src = movie.Poster;
                movieTitle.innerHTML = movie.Title;
                movieYear.innerHTML = movie.Year;
                movieGenre.innerHTML = movie.Genre;
                moviePlot.innerHTML = movie.Plot;
    
            });
    };
};

const closeButton = document.getElementById("close-popup-btn");
const exitPopup = document.getElementById("exit-popup");
const exitPopupOverlay = document.getElementById("exit-popup-overlay");
console.log("closeButton", closeButton);
closeButton.addEventListener("click", () => {
    console.log("bblablal");
    // Cacher la pop-up
    exitPopup.style.display = "none";
    exitPopupOverlay.style.display = "none";
});