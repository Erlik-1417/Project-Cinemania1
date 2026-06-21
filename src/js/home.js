import { getTrendingDay, getTrendingWeek, getUpcoming, getMovieDetails, getMovieVideos } from './api.js';
import { openModal, showLoader, hideLoader } from './ui.js';
import { getYearFromDate, createStarRating, truncateText } from './utils.js';

const heroBg = document.getElementById('heroBg');
const heroTitle = document.getElementById('heroTitle');
const heroMeta = document.getElementById('heroMeta');
const heroOverview = document.getElementById('heroOverview');
const heroTrailerBtn = document.getElementById('heroTrailerBtn');
const heroDetailsBtn = document.getElementById('heroDetailsBtn');
const weeklyList = document.getElementById('weeklyList');
const upcomingWrapper = document.getElementById('upcomingWrapper');

let currentHeroMovie = null;

async function initHome() {
  showLoader();
  try {
    await Promise.all([
      renderHero(),
      renderWeeklyTrends(),
      renderUpcoming()
    ]);
  } catch (err) {
    console.error('Home init error:', err);
  } finally {
    hideLoader();
  }
}

async function renderHero() {
  const data = await getTrendingDay();
  const movies = data.results;
  if (!movies || movies.length === 0) return;

  const randomIndex = Math.floor(Math.random() * Math.min(movies.length, 5));
  const movie = movies[randomIndex];
  currentHeroMovie = movie;

  const details = await getMovieDetails(movie.id);
  const genres = details.genres.map(g => g.name).slice(0, 2).join(', ');
  const year = getYearFromDate(details.release_date || details.first_air_date);
  const rating = details.vote_average.toFixed(1);

  heroBg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`;
  heroTitle.textContent = details.title || details.name;
  heroMeta.innerHTML = `
    <span class="hero__year">${year}</span>
    <span class="hero__genres">${genres}</span>
    <span class="hero__rating">${createStarRating(rating)} ${rating}</span>
  `;
  heroOverview.textContent = truncateText(details.overview, 180);

  heroTrailerBtn.onclick = async () => {
    const videos = await getMovieVideos(movie.id);
    const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    if (trailer) {
      openModal('trailer', `https://www.youtube.com/embed/${trailer.key}`);
    } else {
      openModal('oops', 'Trailer not available');
    }
  };

  heroDetailsBtn.onclick = () => {
    openModal('movie', movie.id);
  };
}

async function renderWeeklyTrends() {
  const data = await getTrendingWeek();
  const movies = data.results.slice(0, 3);

  weeklyList.innerHTML = movies.map(movie => {
    const year = getYearFromDate(movie.release_date || movie.first_air_date);
    const rating = movie.vote_average.toFixed(1);
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/img/no-poster.jpg';

    return `
      <li class="movie-card" data-id="${movie.id}">
        <div class="movie-card__thumb">
          <img class="movie-card__img" src="${poster}" alt="${movie.title || movie.name}" loading="lazy" />
          <div class="movie-card__overlay">
            <span class="movie-card__rating">${createStarRating(rating)} ${rating}</span>
          </div>
        </div>
        <h3 class="movie-card__title">${movie.title || movie.name}</h3>
        <p class="movie-card__meta">${movie.genre_ids.slice(0, 2).join(', ')} | ${year}</p>
      </li>
    `;
  }).join('');

  weeklyList.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
      openModal('movie', card.dataset.id);
    });
  });
}

async function renderUpcoming() {
  const data = await getUpcoming();
  const movies = data.results;
  if (!movies || movies.length === 0) return;

  const movie = movies[0];
  const details = await getMovieDetails(movie.id);
  const year = getYearFromDate(details.release_date);
  const rating = details.vote_average.toFixed(1);
  const poster = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : '/img/no-poster.jpg';

  upcomingWrapper.innerHTML = `
    <div class="upcoming__poster">
      <img src="${poster}" alt="${details.title}" loading="lazy" />
    </div>
    <div class="upcoming__info">
      <h3 class="upcoming__movie-title">${details.title}</h3>
      <div class="upcoming__meta">
        <p><span class="meta-label">Release date</span><span class="meta-value">${details.release_date}</span></p>
        <p><span class="meta-label">Vote / Votes</span><span class="meta-value">${createStarRating(rating)} ${rating} / ${details.vote_count}</span></p>
        <p><span class="meta-label">Popularity</span><span class="meta-value">${details.popularity.toFixed(1)}</span></p>
        <p><span class="meta-label">Genre</span><span class="meta-value">${details.genres.map(g => g.name).join(', ')}</span></p>
      </div>
      <p class="upcoming__overview">${truncateText(details.overview, 240)}</p>
      <button class="btn btn--primary upcoming__btn" id="upcomingAddBtn" type="button">
        Add to my library
      </button>
    </div>
  `;

  const addBtn = document.getElementById('upcomingAddBtn');
  const library = JSON.parse(localStorage.getItem('library') || '[]');
  const isSaved = library.some(m => m.id === movie.id);

  if (isSaved) {
    addBtn.textContent = 'Remove from my library';
    addBtn.classList.add('upcoming__btn--remove');
  }

  addBtn.addEventListener('click', () => {
    const currentLibrary = JSON.parse(localStorage.getItem('library') || '[]');
    const idx = currentLibrary.findIndex(m => m.id === movie.id);

    if (idx === -1) {
      currentLibrary.push({ id: movie.id, poster_path: movie.poster_path, title: movie.title, genre_ids: movie.genre_ids, release_date: movie.release_date, vote_average: movie.vote_average });
      addBtn.textContent = 'Remove from my library';
      addBtn.classList.add('upcoming__btn--remove');
    } else {
      currentLibrary.splice(idx, 1);
      addBtn.textContent = 'Add to my library';
      addBtn.classList.remove('upcoming__btn--remove');
    }

    localStorage.setItem('library', JSON.stringify(currentLibrary));
  });
}

initHome();