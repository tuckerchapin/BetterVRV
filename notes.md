for the blurring of spoiler thumbnails:

    .h-thumbnail {
        overflow: hidden;
    }
    img.c-content-image.image {
        filter: blur(1.5em);
    }

for 'watched' episodes discard the blur:

    <span class="watched-info">WATCHED</span>

to blur the episode descriptions

    .description {
        filter: blur(1em);
    }
    .description:active {
        filter: blur(0px);
    }
    p.episode-description {
        filter: blur(1em);
    }
