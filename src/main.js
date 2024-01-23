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

searchForm.addEventListener("submit", searchFormSubmit);
loadBtn.addEventListener("click", loadMoreImages);

async function searchFormSubmit (evt) {
    evt.preventDefault();
    galleryImages.innerHTML = "";
    const form = evt.currentTarget;
    const query = form.elements.searchQuery.value.trim();
    
    if (query === "") {
        return;
    }

    page = 1; 
    currentQuery = query;

    loader.style.display = "block";

try {
const response = await fetchImages(currentQuery);

loader.style.display = "block";
        if (!response.length) {
            iziToast.show({
                message: '❌Sorry, there are no images matching your search query.Please try again!',
                messageColor: '#ffffff',
                backgroundColor: '#EF4040',
                position: 'topRight',
                maxWidth: '420px',
                close: false,
            });
                return galleryImages.innerHTML = "";
            }
            renderImages(response);
        } catch(error) {
            onFetchError(error);
        } finally {
                loader.style.display = "none";
                form.reset();
    };

}

async function fetchImages(currentQuery) {
    const response = await axios.get(`https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1`, {
        params: {
            q: currentQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: perPage,
            page: page,
        }
    });
    // galleryImages.innerHTML = "";
    return response.data.hits;
    }  

    function loadMoreImages() {
        page += 1;
        if (page * perPage >= totalHits) {
            loadBtn.style.display = "none";
        } else {
            loadBtn.style.display = "block";
            searchMoreImages();
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

function onFetchError(error) {
    console.log(error);
    loader.style.display = "none";
}