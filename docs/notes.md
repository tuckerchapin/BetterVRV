backgrounds:
color: #302e42;
color: #474658;
color: #1b1a26;

title: #f9f9fa
description: #b0aebb

yellow: #fd0

highlight blue: #00b4ff

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
    .description:hover {
        filter: blur(0px);
    }
    p.episode-description {
        filter: blur(1em);
    }
    p.episode-description:hover {
        filter: blur(0px);
    }

do what bttv does for it's popup/button


/* Rubik font declarations */
    /* normal */
    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 300;
        src: url('../fonts/Rubik/Rubik-Light.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        src: url('../fonts/Rubik/Rubik-Regular.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        src: url('../fonts/Rubik/Rubik-Medium.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
        src: url('../fonts/Rubik/Rubik-Bold.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 900;
        src: url('../fonts/Rubik/Rubik-Black.ttf');
    }

    /* italic */
    @font-face {
        font-family: 'Rubik';
        font-style: italic;
        font-weight: 300;
        src: url('../fonts/Rubik/Rubik-LightItalic.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: italic;
        font-weight: 400;
        src: url('../fonts/Rubik/Rubik-Italic.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: italic;
        font-weight: 500;
        src: url('../fonts/Rubik/Rubik-MediumItalic.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: italic;
        font-weight: 700;
        src: url('../fonts/Rubik/Rubik-BoldItalic.ttf');
    }

    @font-face {
        font-family: 'Rubik';
        font-style: italic;
        font-weight: 900;
        src: url('../fonts/Rubik/Rubik-BlackItalic.ttf');
    }

@font-face {
    font-family: 'Days';
    font-style: normal;
    font-weight: 400;
    src: url('../fonts/Days/days.ttf');
}

<input id="toggleA" class="toggle" type="checkbox" />
<label for="toggleA" class="toggle" /><div /></label>



"page_action": {
    "default_popup": "interfaces/popup.html",
    "default_icon": {
        "705": "images/icon.png"
    }
},


"background": {
    "scripts": [
        "js/bgInstalled.js"
    ],
    "persistent": false
},
