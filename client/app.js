// console.log("Image Gallery");
const thumbContainer = document.getElementById("thumb-container");
const displayImage = document.getElementById("image-container");
const movieWrapper = document.getElementById("movieWrapper");
const images = [
  {
    url: "https://upload.wikimedia.org/wikipedia/en/f/f5/Damsel_2024_poster2.jpg",
    alt: "",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/en/3/37/Road_House_2024_poster.jpg",
    alt: "",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg",
    alt: "",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/en/b/be/Godzilla_x_kong_the_new_empire_poster.jpg",
    alt: "",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/en/3/31/Ghostbusters_(2024)_poster.jpg",
    alt: "",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/en/3/31/Ghostbusters_(2024)_poster.jpg",
    alt: "",
  },
];
async function getMovie() {
  const response = await fetch("http://localhost:8080/movies");
  const movies = await response.json();
  console.log(movies);
  createThumbnail(movies);

  if (movies.length > 0) {
    createMainImage(movies[0]);
  }
}

getMovie();

function preloadImage(url) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = "image";
  document.head.appendChild(link);
}

//Creates Thumbnail
function createThumbnail(movies) {
  thumbContainer.textContent = "";
  movies.forEach(function (movie) {
    const img = document.createElement("img");
    const deleteBtn = document.createElement("button");
    const innerContainer = document.createElement("div");
    innerContainer.classList.add("innerContainer");
    thumbContainer.appendChild(innerContainer);
    img.src = movie.imageurl;
    img.alt = movie.name;
    img.dataset.movieId = movie.id;
    img.tabIndex = 0; // Add tabindex for accessibility
    innerContainer.appendChild(img);
    img.addEventListener("click", function () {
      createMainImage(movie);
      img.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      }); //scrolls the thumbnail to the centre
    });
    // added for accessibility for the enter key
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Check if the pressed key is the return key
        createMainImage(movie);
      }
    });
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteMovie(movie.id));
    innerContainer.appendChild(deleteBtn);
    preloadImage(movie.name);
  });
}

//Creates
function createMainImage(movie) {
  displayImage.innerHTML = "";
  const mainImg = document.createElement("img");
  mainImg.src = movie.imageurl;
  mainImg.alt = movie.name;
  displayImage.appendChild(mainImg);

  const movieTitle = document.getElementById("movie-title");
  const genre = document.getElementById("genre");
  const score = document.getElementById("score");

  movieTitle.textContent = movie.name;
  genre.textContent = movie.genre;
  score.textContent = movie.rating;
}

async function deleteMovie(movieId) {
  const response = await fetch(`http://localhost:8080/moviedelete/${movieId}`, {
    method: "DELETE",
  });

  getMovie();
  console.log("deleted");
}
//sets to first image in the array
