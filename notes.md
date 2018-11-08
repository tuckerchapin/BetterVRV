for the blurring of spoiler thumbnails:

    .h-thumbnail {
        overflow: hidden;
    }
    img.c-content-image.image {
        filter: blur(10px);
    }

for 'watched' episodes discard the blur:

    `<span class="watched-info">WATCHED</span>`
