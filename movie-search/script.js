const input = document.getElementById("input");
const movieList = document.querySelector(".movie-list");

document.getElementById("btn").addEventListener("click", async () => {
  const search = input.value;
  movieList.innerHTML = "";

  if (!search) {
    showToast("Please enter a movie name");
    return;
  }

  const res = await fetch(`https://www.omdbapi.com/?apikey=37ff94c&t=${encodeURIComponent(search)}`);
  const data = await res.json();

  if (data.Response === 'False') {
    movieList.innerHTML = "<p>Movie not found.</p>";
  } else {
    movieList.innerHTML=`
    <div class="movie">
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/150'}" alt="${data.Title}">
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
      </div>
    `
  }
});


function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;
  toast.style.bottom = "50px";
  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.bottom = "30px";
  }, 3000);
}
