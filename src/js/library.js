'use strict';

import { getTrending, getGenres, convertGenreIdsToNames, getMovieDetails } from './api.js';
import { readSavedMovies } from './library-storage.js';
import { showMovieSpotlight, showMovieTrailerSpotlight } from './movie-spotlight.js';
import { generateStarIconsMarkup } from './star-icons.js';
import { showGlobalLoader, hideGlobalLoader } from './ui.js';

let visibleCount = 9;
const limit = 9;
const libraryRender = document.querySelector('.libraryRender');
let selectedGenreName = 'All Genres';
let genres = [];
let movies = [];
let currentMovies = [];

const getMovieOfTheDay = async () => {
  try {
    const response = await getTrending('day');
    return response.results[0];
  } catch (error) {
    console.error(error);
  }
};

const fetchMovies = async () => {
  try {
    return readSavedMovies();
  } catch (error) {
    console.error(error);
  }
};

const fetchGenres = async () => {
  try {
    const genreMap = await getGenres();
    return Array.from(genreMap.entries()).map(([id, name]) => ({ id, name }));
  } catch (error) {
    console.error(error);
  }
};

const createRatingStars = (rating = 0) => {
  return generateStarIconsMarkup(rating, 'rating_icon');
};

const renderLibrary = (items) => {
  const getPoster = path => {
    if (!path) {
      return './img/oops-logo.png';
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return items.map(movie => {
    const rate = createRatingStars(movie?.vote_average);
    const title = movie?.title;
    const imgUrl = getPoster(movie.poster_path);
    const genresList = movie.genre_names ? movie.genre_names.slice(0, 2).join(', ') : '';
    const year = movie?.release_date?.slice(0, 4) || '';

    return `
      <li class="movieItem" data-id="${movie.id}">
        <img src="${imgUrl}" alt="${title}" />
        <div class="movieInfo">
          <div class="movieDescription">
            <p>${title}</p>
            <p class="genres">${genresList} | ${year}</p>
          </div>
          <ul class="rating_list">${rate}</ul>
        </div>
      </li>
    `;
  });
};

const renderDropdown = (genresData) => {
  return `
    <div class="dropdown">
      <button class="dropdown-btn" id="genreBtn">
        <span class="dropdown-text">${selectedGenreName}</span>
        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#595959" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <ul class="dropdown-menu" id="genreMenu">
        <li data-id="">All Genres</li>
        ${genresData.map(genre => `<li data-id="${genre.id}">${genre.name}</li>`).join('')}
      </ul>
    </div>
  `;
};

const renderTrendDay = (item) => {
  const trendDaySelector = document.querySelector('.trendDay');
  if (!trendDaySelector || !item) return;

  const poster = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
  trendDaySelector.style.backgroundImage = `
    linear-gradient(to right, rgba(14, 14, 14, 1), rgba(14, 14, 14, 0)),
    url("${poster}")
  `;
  const starTrend = generateStarIconsMarkup(item.vote_average, 'rating_icon');
  const showOverView = item.overview.length > 98 ? item.overview.slice(0, 98) + '...' : item.overview;

  trendDaySelector.innerHTML = `
    <div class="container hero__container">
      <div class="hero__content">
        <p class="trendTitle myCinemaHeader">${item.title}</p>
        <ul class="starTrend rating_list">${starTrend}</ul>
        <p class="showOverView myCinemaTitle">${showOverView}</p>
        <div class="trendBtnContainer">
          <button class="trendTrailer libraryButtons" id="heroTrailerBtn" type="button">Watch trailer</button>
          <button class="trendDetails libraryButtons" id="heroDetailsBtn" type="button">More details</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('heroTrailerBtn').addEventListener('click', async () => {
    try {
      const details = await getMovieDetails(item.id);
      if (details.videos?.results) {
        const trailer = details.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
          showMovieTrailerSpotlight(item.id);
          return;
        }
      }
      showMovieTrailerSpotlight(item.id);
    } catch (e) {
      showMovieTrailerSpotlight(item.id);
    }
  });

  document.getElementById('heroDetailsBtn').addEventListener('click', () => {
    showMovieSpotlight(item.id);
  });
};

const renderPage = (moviesData = movies, genresData = genres) => {
  const myLibrary = renderLibrary(moviesData);
  const realLibrary = readSavedMovies();

  if (!realLibrary || realLibrary.length === 0) {
    libraryRender.innerHTML = `
      <div class="errorContainer">
        <p class="libraryErrorMessage">
          OOPS...<br>
          We are very sorry!<br>
          You don't have any movies at your library.
        </p>
        <a href="./catalog.html" class="libraryButtons searchRouting">Search movie</a>
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
    <ul class="libraryList">${visibleMovies.join('')}</ul>
    <button class="libraryButtons" id="loadMore">Load More</button>
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
    showMovieSpotlight(selectedMovie.dataset.id);
  });

  initDropdown(genresData);
};

const initDropdown = (genresData) => {
  const genreMenu = document.querySelector('#genreMenu');
  const genreBtn = document.querySelector('#genreBtn');
  const dropdown = document.querySelector('.dropdown');

  if (!genreMenu || !genreBtn) return;

  genreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  genreMenu.addEventListener('click', e => {
    const selectedItem = e.target.closest('li');
    if (!selectedItem) return;

    selectedGenreName = selectedItem.textContent.trim();
    dropdown.classList.remove('active');
    visibleCount = 9;

    const selectedGenre = selectedItem.dataset.id;
    if (!selectedGenre) {
      currentMovies = movies;
      renderPage(currentMovies, genresData);
      return;
    }

    currentMovies = movies.filter(movie => {
      return movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre));
    });
    renderPage(currentMovies, genresData);
  });

  document.addEventListener('click', () => {
    if (dropdown) dropdown.classList.remove('active');
  });
};

const init = async () => {
  showGlobalLoader();
  try {
    genres = await fetchGenres();
    const trendDay = await getMovieOfTheDay();
    if (trendDay) renderTrendDay(trendDay);
    movies = await fetchMovies();
    currentMovies = movies;
    renderPage(currentMovies, genres);
  } catch (error) {
    console.error(error);
  } finally {
    hideGlobalLoader();
  }
};

document.addEventListener('DOMContentLoaded', init);
