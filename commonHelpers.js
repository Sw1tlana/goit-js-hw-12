import{i as u,a as p,S as y}from"./assets/vendor-bad0427b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h=document.getElementById("searchForm"),l=document.querySelector("ul.gallery"),c=document.querySelector(".loader"),b=document.querySelector(".load-btn");let m=20,i=1;h.addEventListener("submit",L);c.style.display="none";b.style.display="none";async function L(s){s.preventDefault(),l.innerHTML="";const r=s.currentTarget,o=r.elements.searchQuery.value.trim();if(o==="")return;i=1;const n=Math.ceil(40/m);if(i>n)return u.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});try{const e=await S(o);$(e.hits),i+=1}catch(e){console.log(e),c.style.display="none",r.reset()}}async function S(s){const r=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,_limit:m,_page:i}),o=await p.get(`https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1&q=${s}&${r}`);if(c.style.display="block",!o.data.total)return u.show({message:"❌Sorry, there are no images matching your search query.Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",maxWidth:"420px",close:!1}),l.innerHTML="";o.data.hits}function $(s){const r=s.map(({webformatURL:n,largeImageURL:e,tags:t,likes:a,views:f,comments:d,downloads:g})=>`
 <li class="gallery-item">
 <a class="link-gallery" href="${e}">
 <img class="gallery-images" src="${n}" alt="${t}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${a}</p>
     <p class="info-number"><strong>Views</strong> ${f}</p>
     <p class="info-number"><strong>Comments</strong> ${d}</p>
     <p class="info-number"><strong>Downloads</strong> ${g}</p> 
 </div>
 </li>
`).join("");l.insertAdjacentHTML("beforeend",r),new y(document.querySelectorAll(".gallery a")).refresh()}
//# sourceMappingURL=commonHelpers.js.map
