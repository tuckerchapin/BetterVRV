chrome.storage.sync.get(
    {"hideThumbnails"},
    (data) => {
        if (data.hideThumbnails) {
            thumbnails = document.getElementsByClassName("c-content-image image");
            for (let i = 0; i < thumbnails.length; i++) {
                thumbnails[i].classList.add("hidden-thumbnail");
            }
        } else {
            thumbnails = document.getElementsByClassName("hidden-thumbnail");
            for (let i = 0; i < thumbnails.length; i++) {
                thumbnails[i].classList.remove("hidden-thumbnail");
            }
        }
    }
);
