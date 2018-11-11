// thumbnails = document.querySelectorAll("img.c-content-image.image");
thumbnails = document.getElementsByClassName("c-content-image image");
// thumbnails.concat(document.querySelector("img.c-content-image.image"));

for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.add("hidden-thumbnail");
}
