import{i as y,a as h,S as b}from"./assets/vendor-bad0427b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const L=document.getElementById("searchForm"),c=document.querySelector("ul.gallery"),l=document.querySelector(".loader"),u=document.querySelector(".load-btn");let m=40,i=1,f="";L.addEventListener("submit",k);u.addEventListener("click",q);async function k(r){r.preventDefault(),c.innerHTML="";const o=r.currentTarget,n=o.elements.searchQuery.value.trim();if(n!==""){i=1,f=n,l.style.display="block";try{const s=await S(f);if(l.style.display="block",!s.length)return y.show({message:"❌Sorry, there are no images matching your search query.Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",maxWidth:"420px",close:!1}),c.innerHTML="";v(s)}catch(s){w(s)}finally{l.style.display="none",o.reset()}}}async function S(r){return(await h.get("https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1",{params:{q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:i}})).data.hits}function q(){i+=1,i*m>=totalHits?u.style.display="none":(u.style.display="block",searchMoreImages())}function v(r){const o=r.map(({webformatURL:s,largeImageURL:e,tags:t,likes:a,views:d,comments:g,downloads:p})=>`
 <li class="gallery-item">
 <a class="link-gallery" href="${e}">
 <img class="gallery-images" src="${s}" alt="${t}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${a}</p>
     <p class="info-number"><strong>Views</strong> ${d}</p>
     <p class="info-number"><strong>Comments</strong> ${g}</p>
     <p class="info-number"><strong>Downloads</strong> ${p}</p> 
 </div>
 </li>
`).join("");c.insertAdjacentHTML("beforeend",o),new b(document.querySelectorAll(".gallery a")).refresh()}function w(r){console.log(r),l.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
