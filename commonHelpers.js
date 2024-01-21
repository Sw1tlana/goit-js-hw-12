import{a as L,i as S,S as w}from"./assets/vendor-bad0427b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const $=document.getElementById("searchForm"),y=document.querySelector("ul.gallery"),m=document.querySelector(".loader"),a=document.querySelector(".load-btn");let d=40,l=1,u="",c=0;$.addEventListener("submit",k);a.addEventListener("click",q);m.style.display="none";a.style.display="none";async function k(n){n.preventDefault(),y.innerHTML="";const s=n.currentTarget,o=s.elements.searchQuery.value.trim();if(o!==""){l=1,u=o,a.style.display="none";try{const r=await f(u);g(r),r.length<d&&(a.style.display="none")}catch(r){console.log(r),m.style.display="none",s.reset()}}}async function q(){const n=await f(u);g(n),l+=1,l*d<=c?a.style.display="block":a.style.display="none"}async function f(n){const s=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,_limit:d,_page:l});a.style.display="block";try{const o=await L.get(`https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1&q=${n}&${s}`);return console.log("Page:",l),c=o.data.totalHits,console.log("Total Hits:",c),console.log("Condition:",l*d<=c),o.data.total||(S.show({message:"❌Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",maxWidth:"420px",close:!1}),y.innerHTML="",a.style.display="none"),o.data.hits}catch(o){console.log(o),m.style.display="none"}}function g(n){const s=n.map(({webformatURL:r,largeImageURL:e,tags:t,likes:i,views:p,comments:h,downloads:b})=>`
 <li class="gallery-item">
 <a class="link-gallery" href="${e}">
 <img class="gallery-images" src="${r}" alt="${t}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${i}</p>
     <p class="info-number"><strong>Views</strong> ${p}</p>
     <p class="info-number"><strong>Comments</strong> ${h}</p>
     <p class="info-number"><strong>Downloads</strong> ${b}</p> 
 </div>
 </li>
`).join("");y.insertAdjacentHTML("beforeend",s),new w(document.querySelectorAll(".gallery a")).refresh()}
//# sourceMappingURL=commonHelpers.js.map
