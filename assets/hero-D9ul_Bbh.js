import{_ as j,m as T,n as H,o as M,p as I,q as S,t as A,u as B,v as q,w as O,x as z,y as R,z as W,A as C,B as F,C as U,D,E as G,F as V,G as Y,H as K,I as N,J as X,e as f,b as w,K as J,s as P}from"./ui-DrZ8pvwq.js";function ae(){Q(),Z(),ee()}const p="cinemania-theme";function Q(){const e=window.location.pathname;let t="home";e.includes("catalog")?t="catalog":e.includes("library")&&(t="library"),document.querySelectorAll(".nav-link").forEach(o=>{o.classList.remove("active")}),document.querySelectorAll(`[data-page="${t}"]`).forEach(o=>{o.classList.add("active")})}function Z(){const e=document.getElementById("menuToggle"),t=document.querySelector(".mobile-nav");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("open"),document.body.classList.toggle("nav-open")}),document.addEventListener("click",o=>{t.classList.contains("open")&&!t.contains(o.target)&&o.target!==e&&(t.classList.remove("open"),document.body.classList.remove("nav-open"))}))}function ee(){const e=document.querySelector(".theme-toggle");if(!e)return;const o=localStorage.getItem(p)==="light";document.body.classList.toggle("light-theme",o),e.classList.toggle("active",o),e.addEventListener("click",()=>{const i=!document.body.classList.contains("light-theme");document.body.classList.toggle("light-theme",i),e.classList.toggle("active",i),localStorage.setItem(p,i?"light":"dark")})}function te(...e){}const oe=1279,y=192,ie="Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";let s=null,g=!1,d=null,c=null;window.addEventListener("resize",ne);async function le(){if(document.getElementById("hero")){if(window.location.pathname.toLowerCase().includes("library")){g=!0,await E();return}try{const t=await f("day");if(!t||!t.results){s=null,h(),te("API data error:",t);return}const o=t.results.filter(a=>a.backdrop_path);if(o.length===0){s=null,h();return}const i=Math.floor(Math.random()*o.length),n=o[i];s=n,g=!1,L(n)}catch{s=null,h()}}}function r(e){return new URL(Object.assign({"../img/close-outline.svg":X,"../img/empty.svg":N,"../img/favorite.svg":K,"../img/full.svg":Y,"../img/half.svg":V,"../img/header-logo.png":G,"../img/hero-desktop.jpg":D,"../img/hero-desktop@2x.jpg":U,"../img/hero-mobile.jpg":F,"../img/hero-mobile@2x.jpg":C,"../img/hero-tablet.jpg":W,"../img/hero-tablet@2x.jpg":R,"../img/library-desktop.jpg":z,"../img/library-desktop@2x.jpg":O,"../img/library-mobile.jpg":q,"../img/library-mobile@2x.jpg":B,"../img/library-tablet.jpg":A,"../img/library-tablet@2x.jpg":S,"../img/logo.svg":I,"../img/moon.svg":M,"../img/oops-logo.png":H,"../img/star.svg":T,"../img/sun.svg":j})[`../img/${e}`],import.meta.url).href}function re(){return window.innerWidth<=oe}function x(e){return e?window.innerWidth<768?`https://image.tmdb.org/t/p/w780${e}`:`https://image.tmdb.org/t/p/w1280${e}`:""}function m(e){const t=(e==null?void 0:e.trim())||"No description";return!re()||t.length<=y?t:`${t.slice(0,y).trimEnd()}...`}function ne(){d&&cancelAnimationFrame(d),d=requestAnimationFrame(()=>{if(d=null,!!document.getElementById("hero")){if(g){if(c){k(c);return}E();return}if(s){L(s);return}h()}})}function L(e){const t=document.getElementById("hero"),o=x(e.backdrop_path),i=w(e.vote_average,"hero__star");t.innerHTML=`
    <img
      class="hero__bg"
      src="${o}"
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
          <div class="hero__rating">${i}</div>
          <p class="hero__overview">
            ${m(e.overview)}
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary">Watch trailer</button>
            <button class="btn btn--secondary">More details</button>
          </div>
        </div>
      </div>
    </div>
  `,$(e.id)}function h(){var l;const e=document.getElementById("hero");if(!e)return;g=!1;const t=r("hero-mobile.jpg"),o=r("hero-mobile@2x.jpg"),i=r("hero-tablet.jpg"),n=r("hero-tablet@2x.jpg"),a=r("hero-desktop.jpg"),u=r("hero-desktop@2x.jpg");e.innerHTML=`
    <picture class="hero__bg-picture">
      <source media="(min-width: 1280px)" srcset="${a} 1x, ${u} 2x" />
      <source media="(min-width: 768px)" srcset="${i} 1x, ${n} 2x" />
      <img
        class="hero__bg"
        src="${t}"
        srcset="${t} 1x, ${o} 2x"
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
            ${m(ie)}
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary">Get started</button>
          </div>
        </div>
      </div>
    </div>
  `,(l=e.querySelector(".btn--primary"))==null||l.addEventListener("click",()=>{window.location.href="./catalog.html"})}async function E(){var l;const e=document.getElementById("hero");if(!e)return;g=!0;try{const _=await f("day"),v=((l=_==null?void 0:_.results)==null?void 0:l.filter(b=>b.backdrop_path))||[];if(v.length>0){const b=Math.floor(Math.random()*v.length);c=v[b],k(c);return}}catch{}c=null;const t=r("library-mobile.jpg"),o=r("library-mobile@2x.jpg"),i=r("library-tablet.jpg"),n=r("library-tablet@2x.jpg"),a=r("library-desktop.jpg"),u=r("library-desktop@2x.jpg");e.innerHTML=`
    <picture class="hero__bg-picture">
      <source media="(min-width: 1280px)" srcset="${a} 1x, ${u} 2x" />
      <source media="(min-width: 768px)" srcset="${i} 1x, ${n} 2x" />
      <img
        class="hero__bg"
        src="${t}"
        srcset="${t} 1x, ${o} 2x"
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
            ${m("Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.")}
          </p>
        </div>
      </div>
    </div>
  `}function k(e){const t=document.getElementById("hero");if(!t)return;const o=x(e.backdrop_path),i=w(e.vote_average,"hero__star");t.innerHTML=`
    <img
      class="hero__bg"
      src="${o}"
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
          <div class="hero__rating">${i}</div>
          <p class="hero__overview">
            ${m(e.overview)}
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary">Watch trailer</button>
            <button class="btn btn--secondary">More details</button>
          </div>
        </div>
      </div>
    </div>
  `,$(e.id)}function $(e){const t=document.getElementById("hero");if(!t||!e)return;const o=t.querySelector(".btn--primary"),i=t.querySelector(".btn--secondary");o==null||o.addEventListener("click",()=>{J(e)}),i==null||i.addEventListener("click",()=>{P(e)})}export{le as a,ae as i};
