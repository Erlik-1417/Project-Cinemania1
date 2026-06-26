'use strict';
import axios from 'axios';

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWExYjZkOTQ2MjQ1ZmMyZTAxZWU2ZmI4ZGE2OGQ2OCIsIm5iZiI6MTc4MDYxMDk4NS43MzIsInN1YiI6IjZhMjFmN2E5Y2Q4MDY3NGRiMWZmNTQ0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IDISWkX8S_WyVkDRhvpj-o_ynavrIa5vUsE7G-7B4Mw';
const STAR_SPRITE = './img/star.svg';
const url = 'https://api.themoviedb.org/3/';
let visibleCount = 9;
const limit = 9;
const libraryRender = document.querySelector('.libraryRender');
let selectedGenreName = 'All Genres';
const api = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    accept: 'application / json',
  },
});

//Storage functions..........................................

export const getLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('library'));
  if (!data) return [];
  return data;
};

export const addLocalStorage = item => {
  const data = getLocalStorage();

  if (!data) {
    localStorage.setItem('library', JSON.stringify([item]));
  } else {
    localStorage.setItem('library', JSON.stringify([...data, item]));
  }
};

export const deleteMovieId = movieId => {
  const data = getLocalStorage() || [];

  const removedData = data.filter(id => movieId !== id);

  localStorage.setItem('library', JSON.stringify(removedData));
};

//Async Functions...................................

const getMovieOfTheDay = async () => {
  try {
    const response = await api.get('trending/movie/day');

    return response.data.results[0];
  } catch (error) {
    console.log(error);
  }
};

const fetchMovies = async items => {
  try {
    const movies = await Promise.all(
      items.map(async id => {
        const response = await api.get(`movie/${id}`);
        return response.data;
      })
    );

    return movies;
  } catch (error) {
    console.log(error);
  }
};

const getGenres = async () => {
  try {
    const response = await api.get('genre/movie/list?language=en');
    return response.data.genres;
  } catch (error) {
    console.log(error);
  }
};

//Helper Functions..............................

const createRatingStars = (rating = 0) => {
  const stars = [];

  const fullStars = Math.floor(rating / 2);
  const hasHalf = rating % 2 >= 1;

  for (let i = 0; i < 5; i++) {
    let type = 'empty';

    if (i < fullStars) {
      type = 'full';
    } else if (i === fullStars && hasHalf) {
      type = 'half';
    }

    stars.push(`
      <li class="rating_item">
        <svg class="rating_icon">
          <use href="${STAR_SPRITE}#${type}" />
        </svg>
      </li>
    `);
  }

  return stars.join('');
};

//Render Functions...........................................

const renderLibrary = item => {
  const getPoster = path => {
    if (!path) {
      return './assets/no-image.jpg';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };
  const genresBuilder = (genres = []) => {
    return genres.map(gen => gen.name).join(', ');
  };

  return item.map(movie => {
    const rate = createRatingStars(movie?.vote_average);

    const title = movie?.title;

    const imgUrl = getPoster(movie.poster_path);

    const genres = genresBuilder(movie?.genres);

    const year = movie?.release_date?.slice(0, 4) || '';

    return `
      <li class="movieItem" data-id="${movie.id}">
        <img 
          src="${imgUrl}" 
          alt="${title}"
        />
        <div class="movieInfo">
        <div class="movieDescription">
        <p>${title}</p>
        <p class="genres">${genres} | ${year}</p>
        </div>
        <ul class="rating_list">${rate}</ul>
        </div>
      </li>
    `;
  });
};

const genres = await getGenres();
const renderDropdown = genres => {
  return `
    <div class="dropdown">
      <button class="dropdown-btn" id="genreBtn">
        <span class="dropdown-text">
          ${selectedGenreName}
        </span>

        <svg class="dropdown-arrow">
          <use href="./src/assets/star.svg#dropdown"></use>
        </svg>
      </button>

      <ul class="dropdown-menu" id="genreMenu">
        <li data-id="">All Genres</li>

        ${genres
          .map(
            genre => `
              <li data-id="${genre.id}">
                ${genre.name}
              </li>
            `
          )
          .join('')}
      </ul>
    </div>
  `;
};

const trendDay = await getMovieOfTheDay();
const movies = await fetchMovies(getLocalStorage());
let currentMovies = movies;
const trendDaySelector = document.querySelector('.trendDay');
const trendDayPlaceHolder = document.querySelector('.trendDayPlaceHolder');

const renderTrendDay = item => {
  if (!item || !item.backdrop_path) {
    return;
  }

  const poster = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;

  trendDaySelector.style.backgroundImage = `
    linear-gradient(to right,
      rgba(14, 14, 14, 1),
      rgba(14, 14, 14, 0)
    ),
    url("${poster}")
  `;
  trendDayPlaceHolder.style.display = 'none';
  const starTrend = createRatingStars(item.vote_average);
  const showOverView =
    item.overview.length > 98
      ? item.overview.slice(0, 98).padEnd(101, '.')
      : item.overview;
  trendDaySelector.innerHTML = `<p class="trendTitle myCinemaHeader">${item.title}</p>
  <ul class="starTrend">${starTrend}</ul>
  <p class="showOverView myCinemaTitle">${showOverView}</p>
  <div class="trendBtnContainer">
  <button class="trendTrailer libraryButtons" type="button">Watch trailer</button>
  <button class="trendDetails libraryButtons" type="button">More details</button>
  </div>
  `;
};

renderTrendDay(trendDay);

const renderPage = (moviesData = movies, genresData = genres) => {
  const myLibrary = renderLibrary(moviesData);

  const realLibrary = getLocalStorage();

  if (!realLibrary || realLibrary.length === 0) {
    libraryRender.innerHTML = `
    <div class="errorContainer">
      <p class="libraryErrorMessage">
        OOPS...<br>
        We are very sorry!<br>
        You don't have any movies at your library.
      </p>
      <a href="/" class="libraryButtons searchRouting">
        Search movie
      </a>
    </div>
    `;

    return;
  }

  if (myLibrary.length === 0) {
    libraryRender.innerHTML = `
      ${renderDropdown(genresData)}

      <div class="errorContainer">
        <p class="libraryErrorMessage">
          OOPS...<br>
          We couldn't find any movies in this genre.
        </p>
      </div>
    `;

    initDropdown(genresData);

    return;
  }

  const visibleMovies = myLibrary.slice(0, visibleCount);

  libraryRender.innerHTML = `
    ${renderDropdown(genresData)}

    <ul class="libraryList">
      ${visibleMovies.join('')}
    </ul>

    <button class="libraryButtons" id="loadMore">
      Load More
    </button>
  `;

  const loadMoreBtn = document.querySelector('#loadMore');

  if (visibleCount >= myLibrary.length) {
    loadMoreBtn.innerText = 'No more';
    loadMoreBtn.disabled = true;
  }

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += limit;

    renderPage(currentMovies, genresData);
  });

  const libraryList = document.querySelector('.libraryList');

  libraryList.addEventListener('click', e => {
    const selectedMovie = e.target.closest('.movieItem');

    if (!selectedMovie) return;

    console.log(selectedMovie.dataset.id);
  });

  initDropdown(genresData);
};

const initDropdown = genres => {
  const genreMenu = document.querySelector('#genreMenu');
  const genreBtn = document.querySelector('#genreBtn');
  const dropdown = document.querySelector('.dropdown');

  if (!genreMenu || !genreBtn) return;

  genreBtn.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });

  genreMenu.addEventListener('click', e => {
    const selectedItem = e.target.closest('li');

    if (!selectedItem) return;

    selectedGenreName = selectedItem.textContent.trim();

    dropdown.classList.remove('active');

    visibleCount = 9;

    const selectedGenre = Number(selectedItem.dataset.id);

    if (!selectedGenre) {
      currentMovies = movies;

      renderPage(currentMovies, genres);

      return;
    }

    currentMovies = movies.filter(movie => {
      return movie.genres.some(genre => genre.id === selectedGenre);
    });

    renderPage(currentMovies, genres);
  });
};

renderPage(currentMovies, genres);

const mediaQuery = window.matchMedia('(max-width: 360px)');

mediaQuery.addEventListener('change', () => {
  renderPage(currentMovies, genres);
});
