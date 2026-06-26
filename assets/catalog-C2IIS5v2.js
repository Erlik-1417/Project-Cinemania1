import{_ as Z,a as ee,b as te,c as re,d as ne,e as ie,f as ae,g as oe,h as se,i as le,j as ce,k as de,l as _e,m as ge,n as ue,o as he,p as me,q as pe,r as ve,s as fe,t as be,u as ye,v as D,w as P,x as we,y as F,z as xe,A as Ee,B as Le,C as ke,D as $e}from"./ui-bYA6f8x1.js";function Me(...e){}const He=1279,z=192,je="Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";let v=null,x=!1,L=null,y=null;window.addEventListener("resize",Te);async function Ce(){if(document.getElementById("hero")){if(window.location.pathname.toLowerCase().includes("library")){x=!0,await W();return}try{const t=await D("day");if(!t||!t.results){v=null,$(),Me("API data error:",t);return}const r=t.results.filter(i=>i.backdrop_path);if(r.length===0){v=null,$();return}const n=Math.floor(Math.random()*r.length),d=r[n];v=d,x=!1,N(d)}catch{v=null,$()}}}function o(e){return new URL(Object.assign({"../img/close-outline.svg":ye,"../img/empty.svg":be,"../img/favorite.svg":fe,"../img/full.svg":ve,"../img/half.svg":pe,"../img/header-logo.png":me,"../img/hero-desktop.jpg":he,"../img/hero-desktop@2x.jpg":ue,"../img/hero-mobile.jpg":ge,"../img/hero-mobile@2x.jpg":_e,"../img/hero-tablet.jpg":de,"../img/hero-tablet@2x.jpg":ce,"../img/library-desktop.jpg":le,"../img/library-desktop@2x.jpg":se,"../img/library-mobile.jpg":oe,"../img/library-mobile@2x.jpg":ae,"../img/library-tablet.jpg":ie,"../img/library-tablet@2x.jpg":ne,"../img/logo.svg":re,"../img/moon.svg":te,"../img/oops-logo.png":ee,"../img/sun.svg":Z})[`../img/${e}`],import.meta.url).href}function Ie(){return window.innerWidth<=He}function R(e){return e?window.innerWidth<768?`https://image.tmdb.org/t/p/w780${e}`:`https://image.tmdb.org/t/p/w1280${e}`:""}function j(e){const t=(e==null?void 0:e.trim())||"No description";return!Ie()||t.length<=z?t:`${t.slice(0,z).trimEnd()}...`}function Te(){L&&cancelAnimationFrame(L),L=requestAnimationFrame(()=>{if(L=null,!!document.getElementById("hero")){if(x){if(y){G(y);return}W();return}if(v){N(v);return}$()}})}function N(e){const t=document.getElementById("hero"),r=R(e.backdrop_path),n=P(e.vote_average,"hero__star");t.innerHTML=`
    <img
      class="hero__bg"
      src="${r}"
      alt=""
      fetchpriority="high"
      decoding="async"
      width="1280"
      height="660"
    />

    <div class="hero__overlay">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">${e.title}</h1>
          <div class="hero__rating">${n}</div>
          <p class="hero__overview">
            ${j(e.overview)}
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary">Watch trailer</button>
            <button class="btn btn--secondary">More details</button>
          </div>
        </div>
      </div>
    </div>
  `,U(e.id)}function $(){var a;const e=document.getElementById("hero");if(!e)return;x=!1;const t=o("hero-mobile.jpg"),r=o("hero-mobile@2x.jpg"),n=o("hero-tablet.jpg"),d=o("hero-tablet@2x.jpg"),i=o("hero-desktop.jpg"),c=o("hero-desktop@2x.jpg");e.innerHTML=`
    <picture class="hero__bg-picture">
      <source media="(min-width: 1280px)" srcset="${i} 1x, ${c} 2x" />
      <source media="(min-width: 768px)" srcset="${n} 1x, ${d} 2x" />
      <img
        class="hero__bg"
        src="${t}"
        srcset="${t} 1x, ${r} 2x"
        alt="Cinema hero background"
        fetchpriority="high"
        decoding="async"
        width="1280"
        height="660"
      />
    </picture>

    <div class="hero__overlay">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">Let's Make Your Own Cinema</h1>
          <div class="hero__rating"></div>
          <p class="hero__overview">
            ${j(je)}
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary">Get started</button>
          </div>
        </div>
      </div>
    </div>
  `,(a=e.querySelector(".btn--primary"))==null||a.addEventListener("click",()=>{window.location.href="./catalog.html"})}async function W(){var a;const e=document.getElementById("hero");if(!e)return;x=!0;try{const g=await D("day"),C=((a=g==null?void 0:g.results)==null?void 0:a.filter(I=>I.backdrop_path))||[];if(C.length>0){const I=Math.floor(Math.random()*C.length);y=C[I],G(y);return}}catch{}y=null;const t=o("library-mobile.jpg"),r=o("library-mobile@2x.jpg"),n=o("library-tablet.jpg"),d=o("library-tablet@2x.jpg"),i=o("library-desktop.jpg"),c=o("library-desktop@2x.jpg");e.innerHTML=`
    <picture class="hero__bg-picture">
      <source media="(min-width: 1280px)" srcset="${i} 1x, ${c} 2x" />
      <source media="(min-width: 768px)" srcset="${n} 1x, ${d} 2x" />
      <img
        class="hero__bg"
        src="${t}"
        srcset="${t} 1x, ${r} 2x"
        alt="Library background"
        fetchpriority="high"
        decoding="async"
        width="1280"
        height="660"
      />
    </picture>

    <div class="hero__overlay">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">Create Your Dream Cinema</h1>
          <div class="hero__rating"></div>
          <p class="hero__overview">
            ${j("Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.")}
          </p>
        </div>
      </div>
    </div>
  `}function G(e){const t=document.getElementById("hero");if(!t)return;const r=R(e.backdrop_path),n=P(e.vote_average,"hero__star");t.innerHTML=`
    <img
      class="hero__bg"
      src="${r}"
      alt="${e.title}"
      fetchpriority="high"
      decoding="async"
      width="1280"
      height="660"
    />

    <div class="hero__overlay">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">${e.title}</h1>
          <div class="hero__rating">${n}</div>
          <p class="hero__overview">
            ${j(e.overview)}
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary">Watch trailer</button>
            <button class="btn btn--secondary">More details</button>
          </div>
        </div>
      </div>
    </div>
  `,U(e.id)}function U(e){const t=document.getElementById("hero");if(!t||!e)return;const r=t.querySelector(".btn--primary"),n=t.querySelector(".btn--secondary");r==null||r.addEventListener("click",()=>{we(e)}),n==null||n.addEventListener("click",()=>{F(e)})}let _,m,l,T,h,p,u,b,w,M,s,H=1,E=1,B="",q="",O=!1;function V(){_&&(_.innerHTML='<li class="global-loader__spinner" style="margin: 40px auto; display: block;"></li>'),m&&m.classList.add("hidden")}function f(e){e?(m&&m.classList.remove("hidden"),_&&(_.innerHTML="")):m&&m.classList.add("hidden")}function X(e,t){if(!l||(l.innerHTML="",t<=1))return;const r=Math.min(t,20),n=document.createElement("button");n.className="pagination__btn",n.textContent="←",n.disabled=e===1,n.addEventListener("click",()=>S(e-1)),l.appendChild(n),Se(e,r).forEach(c=>{if(c==="..."){const g=document.createElement("span");g.className="pagination__dots",g.textContent="...",l.appendChild(g);return}const a=document.createElement("button");a.className="pagination__btn",a.textContent=c,c===e&&a.classList.add("active"),a.addEventListener("click",()=>S(c)),l.appendChild(a)});const i=document.createElement("button");i.className="pagination__btn",i.textContent="→",i.disabled=e===r,i.addEventListener("click",()=>S(e+1)),l.appendChild(i)}function Se(e,t){if(t<=7){const r=[];for(let n=1;n<=t;n++)r.push(n);return r}return e<=4?[1,2,3,4,5,"...",t]:e>=t-3?[1,"...",t-4,t-3,t-2,t-1,t]:[1,"...",e-1,e,e+1,"...",t]}function k(e){!s||!w||(s.classList.toggle("hide",!e),w.setAttribute("aria-expanded",e?"true":"false"))}function A(e,t){u&&(u.value=e),M&&(M.textContent=t),s&&s.querySelectorAll("li").forEach(r=>{r.classList.toggle("selected",r.dataset.value===String(e))})}function Be(){if(b=document.getElementById("yearSelectCustom"),!b||!u||(w=b.querySelector(".custom-select__btn"),M=b.querySelector(".custom-select__label"),s=b.querySelector(".custom-select__list"),!w||!M||!s))return;s.innerHTML="";const e=document.createElement("li");e.dataset.value="",e.textContent="Year",s.appendChild(e),Array.from(u.options).forEach(t=>{if(t.value==="")return;const r=document.createElement("li");r.dataset.value=t.value,r.textContent=t.textContent,s.appendChild(r)}),A(u.value,"Year"),k(!1),w.addEventListener("click",t=>{t.stopPropagation();const r=!s.classList.contains("hide");k(!r)}),s.addEventListener("click",t=>{const r=t.target.closest("li");r&&(A(r.dataset.value,r.textContent),k(!1))}),document.addEventListener("click",()=>{k(!1)})}function S(e){e<1||e>Math.min(E,20)||(O?K(B,e,q):Y(e))}function Q(){const e=document.querySelector(".catalog-section");if(e){const t=document.querySelector(".header"),r=t?t.offsetHeight:0,n=Math.max(e.offsetTop-r-40,0);window.scrollTo({top:n,behavior:"smooth"})}}async function J(e){if(!_)return;const t=await Promise.all(e.map(async r=>{const n=await $e(r.genre_ids||[]),d=r.release_date?r.release_date.slice(0,4):"—",i=r.poster_path?`https://image.tmdb.org/t/p/w500${r.poster_path}`:"./img/oops-logo.png",c=r.vote_average||0,a=P(c,"movie-card__star");return`
      <li class="movie-card" data-id="${r.id}">
        <img src="${i}" alt="${r.title}" class="movie-card__poster" loading="lazy" />
        <div class="movie-card__info">
          <h3 class="movie-card__title">${r.title}</h3>
          <div class="movie-card__meta">
            <span class="movie-card__text">${n.slice(0,2).join(", ")} | ${d}</span>
            <div class="movie-card__stars">${a}</div>
          </div>
        </div>
      </li>
    `}));_.innerHTML=t.join("")}async function Y(e){V();try{const t=await Le(e);if(H=e,E=t.total_pages,!t.results||t.results.length===0){f(!0),l&&(l.innerHTML="");return}f(!1),await J(t.results),X(H,E),Q()}catch(t){console.error(t),f(!0)}}async function K(e,t,r=""){V();try{const n=await ke(e,t,r);if(H=t,E=n.total_pages,!n.results||n.results.length===0){f(!0),l&&(l.innerHTML="");return}f(!1),await J(n.results),X(H,E),Q()}catch(n){console.error(n),f(!0)}}async function qe(){xe(),Ee(),_=document.getElementById("movieGrid"),m=document.getElementById("oopsMessage"),l=document.getElementById("pagination"),T=document.getElementById("searchForm"),h=document.getElementById("searchInput"),p=document.getElementById("clearBtn"),u=document.getElementById("yearSelect");const e=new Date().getFullYear();for(let t=e;t>=1900;t--){const r=document.createElement("option");r.value=t,r.textContent=t,u.appendChild(r)}Be(),h&&h.addEventListener("input",()=>{p&&(p.hidden=h.value.trim()==="")}),p&&p.addEventListener("click",()=>{h.value="",A("","Year"),p.hidden=!0,h.focus(),O=!1,B="",q="",Y(1)}),T&&T.addEventListener("submit",t=>{t.preventDefault();const r=h.value.trim(),n=u.value;r&&(O=!0,B=r,q=n,K(r,1,n))}),_&&_.addEventListener("click",t=>{const r=t.target.closest(".movie-card");r&&F(r.dataset.id)}),await Promise.allSettled([Ce(),Y(1)])}document.addEventListener("DOMContentLoaded",qe,{once:!0});
