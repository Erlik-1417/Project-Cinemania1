import{E as m,F as $,L as T,w as _,x as w,H as B,y,z as L,M}from"./ui-BKFUaX52.js";let u=9;const S=9,p=document.querySelector(".libraryRender");let f="All Genres",v=[],d=[],c=[];const E=async()=>{try{return(await _("day")).results[0]}catch(e){console.error(e)}},k=async()=>{try{return M()}catch(e){console.error(e)}},C=async()=>{try{const e=await T();return Array.from(e.entries()).map(([t,r])=>({id:t,name:r}))}catch(e){console.error(e)}},D=(e=0)=>w(e,"rating_icon"),G=e=>{const t=r=>r?`https://image.tmdb.org/t/p/w500${r}`:"./img/oops-logo.png";return e.map(r=>{var a;const s=D(r==null?void 0:r.vote_average),o=r==null?void 0:r.title,n=t(r.poster_path),i=r.genre_names?r.genre_names.slice(0,2).join(", "):"",l=((a=r==null?void 0:r.release_date)==null?void 0:a.slice(0,4))||"";return`
      <li class="movieItem" data-id="${r.id}">
        <img src="${n}" alt="${o}" />
        <div class="movieInfo">
          <div class="movieDescription">
            <p>${o}</p>
            <p class="genres">${i} | ${l}</p>
          </div>
          <ul class="rating_list">${s}</ul>
        </div>
      </li>
    `})},b=e=>`
    <div class="dropdown">
      <button class="dropdown-btn" id="genreBtn">
        <span class="dropdown-text">${f}</span>
        <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#595959" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <ul class="dropdown-menu" id="genreMenu">
        <li data-id="">All Genres</li>
        ${e.map(t=>`<li data-id="${t.id}">${t.name}</li>`).join("")}
      </ul>
    </div>
  `,I=e=>{const t=document.querySelector(".trendDay");if(!t||!e)return;const r=`https://image.tmdb.org/t/p/original${e.backdrop_path}`;t.style.backgroundImage=`
    linear-gradient(to right, rgba(14, 14, 14, 1), rgba(14, 14, 14, 0)),
    url("${r}")
  `;const s=w(e.vote_average,"rating_icon"),o=e.overview.length>98?e.overview.slice(0,98)+"...":e.overview;t.innerHTML=`
    <div class="container hero__container">
      <div class="hero__content">
        <p class="trendTitle myCinemaHeader">${e.title}</p>
        <ul class="starTrend rating_list">${s}</ul>
        <p class="showOverView myCinemaTitle">${o}</p>
        <div class="trendBtnContainer">
          <button class="trendTrailer libraryButtons" id="heroTrailerBtn" type="button">Watch trailer</button>
          <button class="trendDetails libraryButtons" id="heroDetailsBtn" type="button">More details</button>
        </div>
      </div>
    </div>
  `,document.getElementById("heroTrailerBtn").addEventListener("click",async()=>{var n;try{const i=await B(e.id);if((n=i.videos)!=null&&n.results&&i.videos.results.find(a=>a.type==="Trailer"&&a.site==="YouTube")){y(e.id);return}y(e.id)}catch{y(e.id)}}),document.getElementById("heroDetailsBtn").addEventListener("click",()=>{L(e.id)})},g=(e=d,t=v)=>{const r=G(e),s=M();if(!s||s.length===0){p.innerHTML=`
      <div class="errorContainer">
        <p class="libraryErrorMessage">
          OOPS...<br>
          We are very sorry!<br>
          You don't have any movies at your library.
        </p>
        <a href="./catalog.html" class="libraryButtons searchRouting">Search movie</a>
      </div>
    `;return}if(r.length===0){p.innerHTML=`
      ${b(t)}
      <div class="errorContainer">
        <p class="libraryErrorMessage">
          OOPS...<br>
          We couldn't find any movies in this genre.
        </p>
      </div>
    `,h(t);return}const o=r.slice(0,u);p.innerHTML=`
    ${b(t)}
    <ul class="libraryList">${o.join("")}</ul>
    <button class="libraryButtons" id="loadMore">Load More</button>
  `;const n=document.querySelector("#loadMore");u>=r.length&&(n.innerText="No more",n.disabled=!0),n.addEventListener("click",()=>{u+=S,g(c,t)}),document.querySelector(".libraryList").addEventListener("click",l=>{const a=l.target.closest(".movieItem");a&&L(a.dataset.id)}),h(t)},h=e=>{const t=document.querySelector("#genreMenu"),r=document.querySelector("#genreBtn"),s=document.querySelector(".dropdown");!t||!r||(r.addEventListener("click",o=>{o.stopPropagation(),s.classList.toggle("active")}),t.addEventListener("click",o=>{const n=o.target.closest("li");if(!n)return;f=n.textContent.trim(),s.classList.remove("active"),u=9;const i=n.dataset.id;if(!i){c=d,g(c,e);return}c=d.filter(l=>l.genre_ids&&l.genre_ids.includes(Number(i))),g(c,e)}),document.addEventListener("click",()=>{s&&s.classList.remove("active")}))},O=async()=>{m();try{v=await C();const e=await E();e&&I(e),d=await k(),c=d,g(c,v)}catch(e){console.error(e)}finally{$()}};document.addEventListener("DOMContentLoaded",O);
