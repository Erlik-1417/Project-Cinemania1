import{f as v,h as u,j as b,e as h,s as f,k as $,l as w,m,r as L,n as M,i as S,a as k,b as B}from"./ui--pnzi2WF.js";import"./footer-DMGsfcqA.js";const c=document.getElementById("weeklyList"),g=document.getElementById("upcomingWrapper");async function E(){v();try{await Promise.allSettled([x(),H()])}catch(n){console.error(n)}finally{u()}}async function x(){if(!c)return;const t=(await b("week")).results.slice(0,3),i=await Promise.all(t.map(async a=>{const e=a.vote_average||0,o=h(e,"movie-card__star"),r=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"./img/oops-logo.png",l=a.release_date?a.release_date.slice(0,4):a.first_air_date?a.first_air_date.slice(0,4):"—";return`
      <li class="movie-card" data-id="${a.id}">
        <div class="movie-card__thumb">
          <img class="movie-card__img" src="${r}" alt="${a.title||a.name}" loading="lazy" />
          <div class="movie-card__overlay">
            <span class="movie-card__rating">${e.toFixed(1)}</span>
          </div>
        </div>
        <h3 class="movie-card__title">${a.title||a.name}</h3>
        <div class="movie-card__meta">
          <p>${a.genre_names?a.genre_names.slice(0,2).join(", "):"Movie"} | ${l}</p>
          <div class="movie-card__stars">${o}</div>
        </div>
      </li>
    `}));c.innerHTML=i.join(""),c.querySelectorAll(".movie-card").forEach(a=>{a.addEventListener("click",()=>{f(a.dataset.id)})})}async function H(){if(!g)return;const t=(await $()).results;if(!t||t.length===0)return;const i=Math.floor(Math.random()*Math.min(t.length,10)),a=t[i],e=await w(a.id),o=e.vote_average||0,r=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"./img/oops-logo.png",l=e.release_date||"—",y=e.genres.map(p=>p.name).slice(0,2).join(", ")||"—";g.innerHTML=`
    <div class="upcoming__poster">
      <img src="${r}" alt="${e.title}" loading="lazy" />
    </div>
    <div class="upcoming__info">
      <h3 class="upcoming__movie-title">${e.title}</h3>
      <div class="upcoming__meta">
        <p><span class="meta-label">Release date</span><span class="meta-value">${l}</span></p>
        <p><span class="meta-label">Vote / Votes</span><span class="meta-value"><span class="movie-card__rating">${o.toFixed(1)}</span> / ${e.vote_count}</span></p>
        <p><span class="meta-label">Popularity</span><span class="meta-value">${e.popularity.toFixed(1)}</span></p>
        <p><span class="meta-label">Genre</span><span class="meta-value">${y}</span></p>
      </div>
      <p class="upcoming__overview">${e.overview||"No description available."}</p>
      <button class="btn btn--primary upcoming__btn" id="upcomingAddBtn" type="button">
        Add to my library
      </button>
    </div>
  `;const s=document.getElementById("upcomingAddBtn"),d=()=>{m(a.id)?(s.textContent="Remove from my library",s.classList.add("upcoming__btn--remove")):(s.textContent="Add to my library",s.classList.remove("upcoming__btn--remove"))};d(),s.addEventListener("click",()=>{m(a.id)?L(a.id):M(a),d()})}async function _(){S(),k(),v();try{await Promise.allSettled([B(),E()])}finally{u()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_,{once:!0}):_();
