import{i as d,a as h,S as b}from"./assets/vendor-bad0427b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerpolicy&&(t.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?t.credentials="include":o.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(o){if(o.ep)return;o.ep=!0;const t=l(o);fetch(o.href,t)}})();const e={searchForm:document.getElementById("searchForm"),galleryImages:document.querySelector("ul.gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-btn")},a={perPage:40,page:1,query:"",maxPage:0};e.loader.style.display="none";e.loadBtn.style.display="none";e.searchForm.addEventListener("submit",B);async function B(r){r.preventDefault();const s=r.currentTarget;if(a.query=s.elements.searchQuery.value.trim(),!!a.query){e.galleryImages.innerHTML="",a.page=1,e.loader.style.display="block";try{const{hits:l,totalHits:n}=await g(a);a.maxPage=Math.ceil(n/a.perPage),console.log(a.maxPage),m(l,e.galleryImages),l.length>0&&l.length!==n?(e.loadBtn.style.display="block",e.loadBtn.addEventListener("click",y)):(e.loadBtn.style.display="none",e.loader.style.display="none",d.show({message:"❌Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",maxWidth:"420px",close:!1}))}catch{u()}finally{s.reset()}}}function g({query:r,page:s=1,perPage:l}){return h.get("https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1",{params:{q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,perPage:l,page:s}}).then(({data:n})=>n)}async function y(){a.page+=1,e.loader.style.display="block",e.loadBtn.disabled=!0;try{const{hits:r}=await g(a);m(r,e.galleryImages)}catch{u()}finally{e.loader.style.display="none",e.loadBtn.disabled=!1}a.page===a.maxPage&&(d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#ffffff",backgroundColor:"#808080",position:"bottomLeft",close:!1}),e.loadBtn.style.display="none",e.loader.style.display="none",e.loadBtn.removeEventListener("click",y))}let c=null;function m(r){const s=r.map(({webformatURL:l,largeImageURL:n,tags:o,likes:t,views:i,comments:f,downloads:p})=>`
 <li class="gallery-item">
 <a class="link-gallery" href="${n}">
 <img class="gallery-images" src="${l}" alt="${o}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${t}</p>
     <p class="info-number"><strong>Views</strong> ${i}</p>
     <p class="info-number"><strong>Comments</strong> ${f}</p>
     <p class="info-number"><strong>Downloads</strong> ${p}</p> 
 </div>
 </li>
`).join("");e.galleryImages.insertAdjacentHTML("beforeend",s),c?c.refresh():c=new b(".gallery a")}function u(r){d.error({title:"Error",message:"Wrong operation!!!"}),e.loader.style.display="none",e.loadBtn.style.display="none"}const I=document.querySelector(".gallery-item"),L=I.getBoundingClientRect().height;function k(){window.scrollBy({top:L*2,behavior:"smooth"})}k();
//# sourceMappingURL=commonHelpers.js.map
