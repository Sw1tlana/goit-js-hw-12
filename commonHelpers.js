import{a as g,i as d,S as p}from"./assets/vendor-bad0427b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const y=document.getElementById("searchForm"),i=document.querySelector("ul.gallery"),l=document.querySelector(".loader");let h=40,c=1;y.addEventListener("submit",b);l.style.display="none";async function b(s){s.preventDefault(),i.innerHTML="";const t=s.currentTarget;if(t.elements.searchQuery.value.trim()!==""){c+=1;try{const o=await L();q(o)}catch(o){console.log(o),l.style.display="none",t.reset()}}}async function L(){const s=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,_limit:h,_page:c}),t=await g.get(`https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1&q=${query}&${s}`);return l.style.display="block",data.total?t.data:(d.show({message:"❌Sorry, there are no images matching your search query.Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",maxWidth:"420px",close:!1}),i.innerHTML="")}function q(s){const t=s.map(({webformatURL:o,largeImageURL:e,tags:r,likes:n,views:u,comments:m,downloads:f})=>`
 <li class="gallery-item">
 <a class="link-gallery" href="${e}">
 <img class="gallery-images" src="${o}" alt="${r}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${n}</p>
     <p class="info-number"><strong>Views</strong> ${u}</p>
     <p class="info-number"><strong>Comments</strong> ${m}</p>
     <p class="info-number"><strong>Downloads</strong> ${f}</p> 
 </div>
 </li>
`).join("");i.insertAdjacentHTML("beforeend",t),new p(document.querySelectorAll(".gallery a")).refresh()}
//# sourceMappingURL=commonHelpers.js.map
