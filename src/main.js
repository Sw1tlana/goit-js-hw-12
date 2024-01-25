import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
searchForm: document.getElementById("searchForm"),
galleryImages: document.querySelector("ul.gallery"),
loader: document.querySelector(".loader"),
loadBtn: document.querySelector(".load-btn"),
}

const queryParams = {
perPage: 40,
page: 1,
query: "",
maxPage: 0,
}

const classHidden = "is-hidden";

refs.loader.style.display = "none";

refs.searchForm.addEventListener("submit", searchFormSubmit);
refs.loadBtn.addEventListener("click", loadMoreImagesBtn);

async function searchFormSubmit (evt) {
    evt.preventDefault();

    refs.galleryImages.innerHTML = "";

    const form = evt.currentTarget;
    queryParams.query = form.elements.searchQuery.value.trim();
    
    if (!queryParams.query) {
        return;
    }

    queryParams.page = 1; 

    refs.loader.style.display = "block";

    try {
        const { hits, totalHits } = await fetchImages(queryParams);

        queryParams.maxPage = Math.ceil(totalHits / queryParams.perPage);
        
        if (hits.length > 0 && hits.length !== totalHits) {
            refs.loadBtn.classList.remove(classHidden);

           renderImages(hits, refs.galleryImages);

        } else {
            refs.loadBtn.classList.add(classHidden);
            iziToast.show({
                message: '❌Sorry, there are no images matching your search query. Please try again!',
                messageColor: '#ffffff',
                backgroundColor: '#EF4040',
                position: 'topRight',
                maxWidth: '420px',
                close: false,
            });

            refs.galleryImages.innerHTML = "";
        }
    } catch(error) {
        onFetchError(error);
    } finally {
        form.reset();
    }
}

function fetchImages({ query, page = 1, perPage }) {
    return axios.get(`https://pixabay.com/api/?key=41802498-7aef04e1b4b4791f33c618bc1`, {
        params: {
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            perPage,
            page,
        }
    })
    .then(({ data }) => data);
} 

   async function loadMoreImagesBtn() {
        queryParams.page += 1;

        refs.loader.style.display = "none";
        refs.loadBtn.disablet = true;
        
    try {

        const { hits } = await fetchImages(queryParams);

           renderImages(hits, refs.galleryImages);

        } catch(error) {
            onFetchError(error);
        } finally {
            refs.loader.style.display = "none";
            refs.loadBtn.disablet = false;
        }

        if(queryParams.page === queryParams.maxPage) {
            refs.loadBtn.classList.add(classHidden);
            refs.loader.style.display = "none";
            refs.loadBtn.removeEventListener("click", loadMoreImagesBtn);
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

refs.galleryImages.insertAdjacentHTML("beforeend", markup);
    
const lightbox = new SimpleLightbox(document.querySelectorAll('.gallery a'));

    lightbox.refresh();
}

function onFetchError(error) {
    console.log(error);
    refs.loader.style.display = "none";
}