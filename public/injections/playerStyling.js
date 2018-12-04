window.onload = () => {
    let playbackRate = document.querySelector("div.vjs-playback-rate");
    let playbackRateValue = playbackRate.querySelector("div.vjs-playback-rate-value");

    // playbackRate.classList.remove("vjs-hidden");
    console.log(playbackRate.classList.contains("vjs-hidden"));
    playbackRate.classList.remove("vjs-hidden");
    console.log(playbackRate.classList.contains("vjs-hidden"));
    playbackRateValue.innerText = 4;
}
