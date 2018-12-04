insertCSS("injections/css/hideLoadingPoster.css");
document.querySelector("div#player").removeAttribute("poster");
document.querySelector("video#player_html5_api").removeAttribute("poster");
let poster = document.querySelector(".vjs-poster");
poster.parentNode.removeChild(poster);
