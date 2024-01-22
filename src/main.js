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
    
    try {
        await loadMoreImages();
    } catch (error) {
        console.error(error);
        loader.style.display = "none";
        form.reset();
    }
}

async function loadMoreImages() {
    try {
        const images = await fetchImages(currentQuery);       
            renderImages(images);
            page += 1;
            if (page > 1 ) {
                loadBtn.style.display = "none";
            } else {
                loadBtn.style.display = "block";
            }
        
    } catch (error) {
        console.error(error);
        loadBtn.style.display = "none";
        showErrorNotification("Sorry, an error occurred. Please try again.");
    }
}

async function fetchImages(currentQuery) {
    try {
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
        loadBtn.style.display = "block";
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
    }
        return response.data.hits;

    } catch (error) {
        console.error(error);
        throw error;
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
        `;
    }).join("");

    galleryImages.insertAdjacentHTML("beforeend", markup);

    const lightbox = new SimpleLightbox(document.querySelectorAll('.gallery a'));
    // const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function showErrorNotification(message) {
    iziToast.show({
        message: `❌ ${message}`,
        messageColor: '#ffffff',
        backgroundColor: '#EF4040',
        position: 'topRight',
        maxWidth: '420px',
        close: false,
    });
}

// function showInfoNotification(message) {
//     iziToast.show({
//         message: `✅ ${message}`,
//         messageColor: '#ffffff',
//         backgroundColor: '#41B883',
//         position: 'topRight',
//         maxWidth: '420px',
//         close: false,
//     });
// }

