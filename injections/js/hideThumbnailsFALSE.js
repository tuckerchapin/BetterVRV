thumbnails = document.getElementsByClassName("hidden-thumbnail");
// thumbnails = document.getElementsByClassName("h-thumbnail");
// thumbnails.concat(document.querySelector("img.c-content-image.image"));

for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.remove("hidden-thumbnail");
}
