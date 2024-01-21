import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById("searchForm");
const galleryImages = document.querySelector("ul.gallery");
const loader = document.querySelector(".loader");
const loadBtn = document.querySelector(".load-btn");

let perPage = 40;
let page = 1;
let currentQuery = "";
let totalHits = 0;

searchForm.addEventListener("submit", searchFormSubmit);
loadBtn.addEventListener("click", loadMoreImages);

loader.style.display = "none";
loadBtn.style.display = "none";

async function searchFormSubmit(evt) {
    evt.preventDefault();
    galleryImages.innerHTML = "";
    const form = evt.currentTarget;
    const query = form.elements.searchQuery.value.trim();

    if (query === "") {
        return;
    }

   page = 1; 
   currentQuery = query;

    loadBtn.style.display = "none";

        try {
            const images = await fetchImages(currentQuery);
            renderImages(images);

            if(images.length < perPage) {
                loadBtn.style.display = "none";
              }

        } catch (error) {
            console.log(error);
            loader.style.display = "none";
            form.reset();
        }
    }

    async function loadMoreImages() {
      const images = await fetchImages(currentQuery);
      renderImages(images);

      page += 1;

      if ((page * perPage) <= totalHits) {
        loadBtn.style.display = "block";
    } else {
        loadBtn.style.display = "none";
    }
      
    }

    async function fetchImages(currentQuery) {
        const params = new URLSearchParams({
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            _limit: perPage,
            _page: page,
        })

        loadBtn.style.display = "block";

        try {
            const response = await axios.get(`https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1&q=${currentQuery}&${params}`);
            console.log('Page:', page);
            totalHits = response.data.totalHits; // оновіть totalHits на рівні модуля
            console.log('Total Hits:', totalHits);
            console.log('Condition:', (page * perPage) <= totalHits);
            if (!response.data.total) {
                iziToast.show({
                    message: '❌Sorry, there are no images matching your search query. Please try again!',
                    messageColor: '#ffffff',
                    backgroundColor: '#EF4040',
                    position: 'topRight',
                    maxWidth: '420px',
                    close: false,
                });
                galleryImages.innerHTML = "";
                loadBtn.style.display = "none";
            }
    
            const data = response.data.hits;
            return data;

        } catch (error) {
            console.log(error);
            loader.style.display = "none";
        }   
}

function renderImages(images) { 
const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
 <li class="gallery-item">
 <a class="link-gallery" href="${largeImageURL}">
 <img class="gallery-images" src="${webformatURL}" alt="${tags}">
 </a>
 <div class="photo-info">
     <p class="info-number"><strong>Like</strong> ${likes}</p>
     <p class="info-number"><strong>Views</strong> ${views}</p>
     <p class="info-number"><strong>Comments</strong> ${comments}</p>
     <p class="info-number"><strong>Downloads</strong> ${downloads}</p> 
 </div>
 </li>
`
}).join("");

galleryImages.insertAdjacentHTML("beforeend", markup);
    
const lightbox = new SimpleLightbox(document.querySelectorAll('.gallery a'));

lightbox.refresh();
}



