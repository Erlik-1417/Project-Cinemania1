const movieGrid = document.getElementById('movieGrid');
const oopsMessage = document.getElementById('oopsMessage');
const pagination = document.getElementById('pagination');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

const modalTitle = document.getElementById('modalTitle');
const modalPoster = document.getElementById('modalPoster');
const modalVote = document.getElementById('modalVote');
const modalVotesCount = document.getElementById('modalVotesCount');
const modalPop = document.getElementById('modalPop');
const modalGenre = document.getElementById('modalGenre');
const modalOverview = document.getElementById('modalOverview');
const movieModal = document.getElementById('movieModal');

let currentMoviesList = [];

// ==========================================================
// FIGMA'DAKİ TAM 20 FİLM LİSTESİ (Benzersiz Orijinal Linkler)
// ==========================================================
const mockTmdbData = [
  { title: "GHOSTED", genre_names: "Drama, Action", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/liLN69YgoovHVgmlHJ876o18aY.jpg", vote_average: 9.0, vote_count: 850, popularity: 90.1, overview: "Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she's a secret agent." },
  { title: "QUANTUMANIA", genre_names: "Drama, Action", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg", vote_average: 7.0, vote_count: 1850, popularity: 85.5, overview: "Super-Hero partners Scott Lang and Hope Van Dyne return to continue their adventures." },
  { title: "EVIL DEAD RISE", genre_names: "Horror, Thriller", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg", vote_average: 9.0, vote_count: 1100, popularity: 95.0, overview: "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons." },
  { title: "THE SUPER MARIO BROS", genre_names: "Animation, Family", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", vote_average: 8.0, vote_count: 3200, popularity: 150.4, overview: "Brooklyn plumbers Mario and brother Luigi are transported down a mysterious pipe." },
  { title: "DEAD RINGERS", genre_names: "Documentary", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/z2yhlCwpzpug4ejIYkjo1H3OCG.jpg", vote_average: 7.0, vote_count: 450, popularity: 70.1, overview: "A modern take on David Cronenberg's 1988 thriller." },
  { title: "MANDALORIAN", genre_names: "Sci-Fi, Action", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg", vote_average: 9.0, vote_count: 5000, popularity: 200.0, overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy." },
  { title: "A TOURIST'S GUIDE TO LOVE", genre_names: "Sci-Fi, Action", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/uWBZJrzofmIwn5hYj10Y6yI1c8.jpg", vote_average: 8.0, vote_count: 540, popularity: 60.5, overview: "An executive goes through an unexpected breakup, then accepts an assignment in Vietnam." },
  { title: "THE DIPLOMAT", genre_names: "Western", release_date: "2022", poster_path: "https://image.tmdb.org/t/p/w500/8Zsmvw8sczKWnOIriq59XmO5O74.jpg", vote_average: 8.0, vote_count: 980, popularity: 88.2, overview: "In the midst of an international crisis, a career diplomat lands in a high-profile job." },
  { title: "AVATAR: THE WAY OF WATER", genre_names: "Action, Comedy", release_date: "2022", poster_path: "https://image.tmdb.org/t/p/w500/t6HIqrNdZv1PTU7pIu4fWnO8k0W.jpg", vote_average: 10.0, vote_count: 5000, popularity: 200.0, overview: "Set more than a decade after the events of the first film, learn the story of the Sully family." },
  { title: "JOHN WICK: CHAPTER 4", genre_names: "Thriller", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", vote_average: 9.0, vote_count: 2450, popularity: 120.5, overview: "John Wick takes on his most lethal adversaries yet in the upcoming fourth instalment." },
  { title: "THE MOTHER", genre_names: "Thriller", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/vnRthEZz16Q9VWcP5homkHxyHoy.jpg", vote_average: 10.0, vote_count: 950, popularity: 75.2, overview: "A deadly female assassin comes out of hiding to protect the daughter that she gave up years before." },
  { title: "AIR", genre_names: "Drama, History", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/76AKKvw63NWxcOQKN8Xp7mC977z.jpg", vote_average: 10.0, vote_count: 1300, popularity: 110.0, overview: "Follows the history of shoe salesman Sonny Vaccaro, and how he led Nike." },
  { title: "EVIL DEAD RISE", genre_names: "Horror, Thriller", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/a2ikEwX0wWw8HtcF0WJbW6P9G9H.jpg", vote_average: 9.0, vote_count: 1100, popularity: 95.0, overview: "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons." },
  { title: "CRATER", genre_names: "Science Fiction", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/n8ZpMw3CCKqM9vKyy6tOQkZ5T1D.jpg", vote_average: 9.0, vote_count: 320, popularity: 45.3, overview: "After the death of his father, a boy growing up on a lunar mining colony takes a trip to explore a legendary crater." },
  { title: "BLACK KNIGHT", genre_names: "Science Fiction", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/8r4vJ1sEUW182z4Z315Wd9xV4T2.jpg", vote_average: 9.0, vote_count: 890, popularity: 105.6, overview: "In a dystopian 2071 devastated by air pollution, the survival of humanity depends on the Black Knights." },
  { title: "THE COVENANT", genre_names: "Action, Drama, War", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/kVG8zSYPUjQeRie6y0iQ6Xo3Pnt.jpg", vote_average: 10.0, vote_count: 1560, popularity: 112.4, overview: "During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant." },
  { title: "FAST X", genre_names: "Action, Crime", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclRVc.jpg", vote_average: 9.0, vote_count: 3100, popularity: 180.2, overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted every foe." },
  { title: "THE POPE'S EXORCIST", genre_names: "Horror, Thriller", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg", vote_average: 10.0, vote_count: 1450, popularity: 98.7, overview: "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a terrifying possession." },
  { title: "CITADEL", genre_names: "Comedy, Science", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/q2iEusBExwN1sQ1sFpQ29t9k3z.jpg", vote_average: 10.0, vote_count: 1120, popularity: 102.5, overview: "Global spy agency Citadel has fallen, and its agents' memories were wiped clean." },
  { title: "CITY ON FIRE", genre_names: "Science Fiction", release_date: "2023", poster_path: "https://image.tmdb.org/t/p/w500/fR8tG0c10q7kY16d5R8L2M8H1k.jpg", vote_average: 10.0, vote_count: 420, popularity: 55.4, overview: "An NYU student is shot in Central Park on the Fourth of July, 2003." }
];

function generateStarsHtml(rating) {
    const starRating = Math.round(rating / 2);
    let html = '';
    const fullStarSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="url(#grad)" stroke="url(#grad)"><defs><linearGradient id="grad"><stop offset="0%" stop-color="#FFC226"/><stop offset="100%" stop-color="#F84119"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    const emptyStarSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="url(#grad)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

    for (let i = 0; i < starRating; i++) html += fullStarSvg;
    for (let i = 0; i < (5 - starRating); i++) html += emptyStarSvg;
    return html;
}

function renderMovies(movies) {
    if (!movieGrid) return;
    currentMoviesList = movies; 

    if (movies.length === 0) {
        movieGrid.style.display = 'none';
        if(pagination) pagination.style.display = 'none';
        if(oopsMessage) oopsMessage.style.display = 'block';
        return;
    }

    movieGrid.style.display = 'grid';
    if(pagination) pagination.style.display = 'flex';
    if(oopsMessage) oopsMessage.style.display = 'none';

    movieGrid.innerHTML = movies.map((movie, index) => {
        const rating = movie.vote_average || 0;
        return `
        <li class="movie-card" data-index="${index}">
            <img src="${movie.poster_path}" alt="${movie.title}" class="movie-card__poster" />
            <div class="movie-card__info">
                <h3 class="movie-card__title">${movie.title}</h3>
                <div class="movie-card__meta">
                    <span class="movie-card__text">${movie.genre_names} | ${movie.release_date}</span>
                    <div class="movie-card__stars">${generateStarsHtml(rating)}</div>
                </div>
            </div>
        </li>
        `;
    }).join('');
}

// Tüm tıklamaları buradan yakalıyoruz
document.addEventListener('click', (e) => {
    // Karta Tıklanırsa Popup (Modal) Açılsın
    const clickedCard = e.target.closest('.movie-card');
    if (clickedCard) {
        const index = clickedCard.getAttribute('data-index');
        const movie = currentMoviesList[index]; 
        
        if(modalTitle) modalTitle.textContent = movie.title;
        if(modalVote) modalVote.textContent = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";
        if(modalVotesCount) modalVotesCount.textContent = movie.vote_count;
        if(modalPop) modalPop.textContent = movie.popularity ? movie.popularity.toFixed(1) : "000.0";
        if(modalGenre) modalGenre.textContent = movie.genre_names;
        if(modalOverview) modalOverview.textContent = movie.overview;
        if(modalPoster) modalPoster.src = movie.poster_path;
        
        if(movieModal) movieModal.style.display = 'flex';
        return;
    }

    // Dropdown (Açılır Menü) Kontrolü
    if (e.target.closest('.custom-select__btn')) {
        const btn = e.target.closest('.custom-select__btn');
        const container = btn.parentElement;
        const list = container.querySelector('.custom-select__list');
        const arrow = container.querySelector('.custom-select__arrow');
        
        document.querySelectorAll('.custom-select__list').forEach(l => {
            if (l !== list) l.classList.add('hide');
        });

        if(list) {
            const isHidden = list.classList.contains('hide');
            list.classList.toggle('hide');
            if(arrow) arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        return;
    }

    // Dropdown Menüsünden Liste Seçimi Yapıldığında
    if (e.target.tagName === 'LI' && e.target.closest('.custom-select__list')) {
        const li = e.target;
        const container = li.closest('.custom-select');
        const label = container.querySelector('.custom-select__label');
        const list = container.querySelector('.custom-select__list');
        const arrow = container.querySelector('.custom-select__arrow');

        if(label) label.textContent = li.textContent;
        list.querySelectorAll('li').forEach(item => item.classList.remove('active-orange'));
        li.classList.add('active-orange');
        list.classList.add('hide');
        if(arrow) arrow.style.transform = 'rotate(0deg)';
        return;
    }

    // Ekranda boşluğa tıklanınca açık kalan listeleri kapat
    document.querySelectorAll('.custom-select__list').forEach(l => l.classList.add('hide'));
});

// Arama Motoru İşlevi
if(searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        if (query === 'hata' || query === 'yok') {
            renderMovies([]); 
        } else if (query !== '') {
            const filteredMovies = mockTmdbData.filter(m => m.title.toLowerCase().includes(query));
            renderMovies(filteredMovies);
        } else {
            renderMovies(mockTmdbData);
        }
    });
}

// Başlangıç
document.addEventListener('DOMContentLoaded', () => {
    renderMovies(mockTmdbData); 
});