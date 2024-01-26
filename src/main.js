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
galleryItem: document.querySelector("ul.gallery-item"),
};

const queryParams = {
perPage: 40,
page: 1,
query: "",
maxPage: 0,
};

refs.searchForm.addEventListener("submit", searchFormSubmit);

function attachLoadMoreEvent() {
    refs.loadBtn.addEventListener("click", loadMoreImagesBtn);
}

function detachLoadMoreEvent() {
    refs.loadBtn.removeEventListener("click", loadMoreImagesBtn);
}

async function searchFormSubmit (evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    queryParams.query = form.elements.searchQuery.value.trim();
    
    if (!queryParams.query) {
        return;
    }
    refs.loadBtn.classList.add("is-hidden");  
    
    refs.galleryImages.innerHTML = "";
    queryParams.page = 1;
    refs.loader.classList.remove("is-hidden");
 
    try {
        const { hits, totalHits } = await fetchImages(queryParams);

        queryParams.maxPage = Math.ceil(totalHits / queryParams.perPage);

        renderImages(hits, refs.galleryImages);

        smoothScrollToNextGroup();

        if (hits.length >= queryParams.perPage) {
            refs.loadBtn.classList.remove("is-hidden"); 
    attachLoadMoreEvent();

        } else {
            refs.loader.classList.add("is-hidden");
            refs.loadBtn.classList.add("is-hidden");  
        }

        if(hits.length === 0) {
            refs.loader.classList.add("is-hidden");
            refs.loadBtn.classList.add("is-hidden")
            iziToast.show({
                message: '❌Sorry, there are no images matching your search query. Please try again!',
                messageColor: '#ffffff',
                backgroundColor: '#EF4040',
                position: 'topRight',
                maxWidth: '420px',
                close: false,
            });
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
            per_page: perPage,
            page,
        }
    })
    .then(({ data }) => data);
} 

   async function loadMoreImagesBtn() {
    queryParams.page += 1;
    refs.loader.classList.remove("is-hidden");
    refs.loadBtn.disabled = true;

    try {
        const { hits } = await fetchImages(queryParams);

         renderImages(hits, refs.galleryImages);

        if (hits.length < queryParams.perPage) {
            refs.loadBtn.classList.add("is-hidden");
            detachLoadMoreEvent();
        }       

    } catch (error) {
        onFetchError(error);
    } finally {
        refs.loader.classList.add("is-hidden");
        refs.loadBtn.disabled = false;
    }

    if (queryParams.page === queryParams.maxPage) {
        iziToast.show({
            message: "We're sorry, but you've reached the end of search results.",
            messageColor: '#ffffff',
            backgroundColor: '#808080',
            position: 'bottomLeft',
            close: false,
        });
        refs.loadBtn.classList.add("is-hidden");
        detachLoadMoreEvent();
    }
    }

let lightboxInstance = null;
   
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
    
    if (!lightboxInstance) {
        lightboxInstance = new SimpleLightbox('.gallery a');
    } else {
        lightboxInstance.refresh();
    }
}

function onFetchError(error) {
    iziToast.error({
        title: 'Error',
        message: 'Wrong operation!!!',
    });
    refs.loader.classList.add("is-hidden");
    refs.loadBtn.classList.add("is-hidden");
}

function smoothScrollToNextGroup() {
    if (refs.galleryItem) {
      const galleryItemHeight = refs.galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: galleryItemHeight * 2, 
        behavior: "smooth",
      });
    }
  }
 