import{i as c,a as L,S as b}from"./assets/vendor-bad0427b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const e={searchForm:document.getElementById("searchForm"),galleryImages:document.querySelector("ul.gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-btn")},a={perPage:40,page:1,query:"",maxPage:0};e.searchForm.addEventListener("submit",B);function v(){e.loadBtn.addEventListener("click",u)}function g(){e.loadBtn.removeEventListener("click",u)}async function B(r){r.preventDefault();const o=r.currentTarget;if(a.query=o.elements.searchQuery.value.trim(),!!a.query){e.loader.classList.remove("is-hidden"),e.loadBtn.classList.add("is-hidden"),e.galleryImages.innerHTML="",a.page=1;try{const{hits:n,totalHits:i}=await f(a);a.maxPage=Math.ceil(i/a.perPage),m(n,e.galleryImages),I(),n.length>=a.perPage?(e.loadBtn.classList.remove("is-hidden"),v()):(e.loader.classList.add("is-hidden"),e.loadBtn.classList.add("is-hidden")),n.length===0&&(e.loader.classList.add("is-hidden"),e.loadBtn.classList.add("is-hidden"),c.show({message:"❌Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",maxWidth:"420px",close:!1}))}catch{h()}finally{o.reset()}}}function f({query:r,page:o=1,perPage:n}){return L.get("https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1",{params:{q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:n,page:o}}).then(({data:i})=>i)}async function u(){a.page+=1,e.loader.classList.remove("is-hidden"),e.loadBtn.disabled=!0;try{const{hits:r}=await f(a);m(r,e.galleryImages),r.length<a.perPage&&(e.loadBtn.classList.add("is-hidden"),g())}catch{h()}finally{e.loader.classList.add("is-hidden"),e.loadBtn.disabled=!1}a.page===a.maxPage&&(c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#ffffff",backgroundColor:"#808080",position:"bottomLeft",close:!1}),e.loadBtn.classList.add("is-hidden"),g())}let d=null;function m(r){const o=r.map(({webformatURL:n,largeImageURL:i,tags:t,likes:s,views:l,comments:y,downloads:p})=>`
 <li class="gallery-item">
 <a class="link-gallery" href="${i}">
 <img class="gallery-images" src="${n}" alt="${t}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${s}</p>
     <p class="info-number"><strong>Views</strong> ${l}</p>
     <p class="info-number"><strong>Comments</strong> ${y}</p>
     <p class="info-number"><strong>Downloads</strong> ${p}</p> 
 </div>
 </li>
`).join("");e.galleryImages.insertAdjacentHTML("beforeend",o),d?d.refresh():d=new b(".gallery a")}function h(r){c.error({title:"Error",message:"Wrong operation!!!"}),e.loader.classList.add("is-hidden"),e.loadBtn.classList.add("is-hidden")}function I(){const r=document.querySelector("ul.gallery-item");if(r){const o=r.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
