
document.addEventListener("DOMContentLoaded", () => {
  async function fetchMovies() {
      try {
          const response = await fetch("http://localhost:3000/movies");
          
          if (!response.ok) {
              console.error("Error fetching movies:", response.statusText);
              return;
          }
          const movies = await response.json(); 
          console.log(movies);
          displayMovies(movies); 
          window.movies = movies;
      } catch (error) {
          console.error("Failed to fetch movies:", error);
      }
  }
  fetchMovies(); 

  const searchInput = document.getElementById("search");
  if (searchInput) {
      searchInput.addEventListener("input", () => {
          const searchvalue = searchInput.value.toLowerCase();
          const filteredMovies = window.movies.filter(movie =>
              movie.title.toLowerCase().includes(searchvalue)
          );
          displayMovies(filteredMovies);
      });
  } else {
      console.error("Search input element not found");
  }
});

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");

  if (!movieList) {
      console.error('Movie list container not found');
      return;
  }

  movieList.innerHTML = "";

  if (movies.length === 0) {
      movieList.innerHTML = "<p>No movies found.</p>";
  } else {
      movies.forEach(movie => {
          const movieDiv = document.createElement("div");
          movieDiv.classList.add("movie");
          movieDiv.innerHTML = `
              <img src="${movie.poster}" alt="${movie.title}">
              <h3>${movie.title}</h3>
              <p><strong>Year:</strong> ${movie.year}</p>
              <p><strong>Genre:</strong> ${movie.genre.join(", ")}</p>
              <p><strong>⭐</strong> ${movie.rating}</p>
          `;
          movieList.appendChild(movieDiv);
      });
  }
}
