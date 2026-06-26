import{E as f,F as b,w as L,x as w,z as $,G as E,H as M,I as v,J as k,K as B,A as I}from"./ui-BKFUaX52.js";import{i as S}from"./header--t6qlfhh.js";const c=document.getElementById("weeklyList"),g=document.getElementById("upcomingWrapper");async function x(){f();try{await Promise.allSettled([T(),A()])}catch(s){console.error(s)}finally{b()}}async function T(){if(!c)return;const n=(await L("week")).results.slice(0,3),o=await Promise.all(n.map(async e=>{const t=e.vote_average||0,d=w(t,"movie-card__star"),l=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"./img/oops-logo.png",r=e.release_date?e.release_date.slice(0,4):e.first_air_date?e.first_air_date.slice(0,4):"—";return`
      <li class="movie-card" data-id="${e.id}">
        <div class="movie-card__thumb">
          <img class="movie-card__img" src="${l}" alt="${e.title||e.name}" loading="lazy" />
          <div class="movie-card__overlay">
            <span class="movie-card__rating">${t.toFixed(1)}</span>
          </div>
        </div>
        <h3 class="movie-card__title">${e.title||e.name}</h3>
        <div class="movie-card__meta">
          <p>${e.genre_names?e.genre_names.slice(0,2).join(", "):"Movie"} | ${r}</p>
          <div class="movie-card__stars">${d}</div>
        </div>
      </li>
    `}));c.innerHTML=o.join(""),c.querySelectorAll(".movie-card").forEach(e=>{e.addEventListener("click",()=>{$(e.dataset.id)})})}async function A(){if(!g)return;const n=(await E()).results;if(!n||n.length===0)return;const o=Math.floor(Math.random()*Math.min(n.length,10)),e=n[o],t=await M(e.id),d=t.vote_average||0,l=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"./img/oops-logo.png",r=t.release_date||"—",h=t.genres.map(p=>p.name).slice(0,2).join(", ")||"—";g.innerHTML=`
    <div class="upcoming__poster">
      <img src="${l}" alt="${t.title}" loading="lazy" />
    </div>
    <div class="upcoming__info">
      <h3 class="upcoming__movie-title">${t.title}</h3>
      <div class="upcoming__meta">
        <p><span class="meta-label">Release date</span><span class="meta-value">${r}</span></p>
        <p><span class="meta-label">Vote / Votes</span><span class="meta-value"><span class="movie-card__rating">${d.toFixed(1)}</span> / ${t.vote_count}</span></p>
        <p><span class="meta-label">Popularity</span><span class="meta-value">${t.popularity.toFixed(1)}</span></p>
        <p><span class="meta-label">Genre</span><span class="meta-value">${h}</span></p>
      </div>
      <p class="upcoming__overview">${t.overview||"No description available."}</p>
      <button class="btn btn--primary upcoming__btn" id="upcomingAddBtn" type="button">
        Add to my library
      </button>
    </div>
  `;const i=document.getElementById("upcomingAddBtn"),m=()=>{v(e.id)?(i.textContent="Remove from my library",i.classList.add("upcoming__btn--remove")):(i.textContent="Add to my library",i.classList.remove("upcoming__btn--remove"))};m(),i.addEventListener("click",()=>{v(e.id)?k(e.id):B(e),m()})}var a=document.getElementById("teamModalOverlay"),u=document.getElementById("openTeamModal"),_=document.getElementById("closeTeamModal");a&&u&&_&&(u.addEventListener("click",function(){a.classList.remove("hidden"),document.body.style.overflow="hidden"}),_.addEventListener("click",function(){a.classList.add("hidden"),document.body.style.overflow=""}),a.addEventListener("click",function(s){s.target===a&&(a.classList.add("hidden"),document.body.style.overflow="")}),document.addEventListener("keydown",function(s){s.key==="Escape"&&!a.classList.contains("hidden")&&(a.classList.add("hidden"),document.body.style.overflow="")}));async function y(){I(),S(),f();try{await x()}finally{b()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y,{once:!0}):y();
