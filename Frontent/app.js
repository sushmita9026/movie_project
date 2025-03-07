const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('input');
const imgContainer = document.getElementById('img-container');
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault(); 

  const movieName = input.value.trim();

  if (movieName) {
    try {
      const response = await fetch(`http://localhost:3000/movies?name=${movieName}`);
      const data = await response.json();
      imgContainer.innerHTML = '';

      if (data && data.length > 0) {
        const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(movieName.toLowerCase()))

        if (filteredMovies.length > 0) {
          filteredMovies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const movieImg = document.createElement('img');
            movieImg.src = movie.poster || 'https://via.placeholder.com/150'; 
            movieImg.alt = movie.title || 'Movie Poster'; 

            const movieTitle = document.createElement('h2');
            movieTitle.textContent = movie.title || 'Untitled Movie';

            const movieRating = document.createElement('p');
            movieRating.textContent = `Rating: ${movie.rating || 'N/A'}`;

            const movieYear = document.createElement('p');
            movieYear.textContent = `Year: ${movie.year || 'Unknown'}`;

          
            const movieGenre = document.createElement('p');
            movieGenre.textContent = `Genre: ${movie.genre.join(', ') || 'Unknown'}`;

            movieDiv.appendChild(movieImg);
            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(movieRating);
            movieDiv.appendChild(movieYear);
            movieDiv.appendChild(movieGenre);
            imgContainer.appendChild(movieDiv);
          });
        } else {
          imgContainer.innerHTML = '<p>No movie found with that name.</p>';
        }
      } else {
        imgContainer.innerHTML = '<p>No results found for that movie.</p>';
      }
    } catch (error) {
      imgContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
  } else {
    imgContainer.innerHTML = '<p>Please enter a movie name.</p>';
  }
});
