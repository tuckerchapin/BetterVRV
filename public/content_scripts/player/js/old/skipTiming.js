let timestamps = {
    "intro": [35, 125],
    "outro": [1417, 1420],
    "preview": [1420, 1435],
    "isAfterCredits": false, // <-- CHECK FOR THIS
};

let introPlaying = false;
let outroPlaying = false;

vrvPlayer.addEventListener(
    "timeupdate",
    (e) => {
        if (introPlaying) {
            // check if the time is greater than the intro
            if (vrvPlayer.currentTime > timestamps.intro[1] || vrvPlayer.currentTime < timestamps.intro[0]) {
                introPlaying = false;
                let introSkipButton = document.getElementById("bvrv-skip-intro-button");
                introSkipButton.classList.add("bvrv-display-none");
            }
        } else if (outroPlaying) {
            // check if the time is greater than the outro
            if (vrvPlayer.currentTime < timestamps.outro[0] || vrvPlayer.currentTime > timestamps.outro[1]) {
                outroPlaying = false;
                let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                nextEpisodeButton.classList.remove("bvrv-display-none");
            }
        } else {
            if (vrvPlayer.currentTime >= timestamps.intro[0] && vrvPlayer.currentTime <= timestamps.intro[1]) {
                // intro is playing
                introPlaying = true;
                let introSkipButton = document.getElementById("bvrv-skip-intro-button");
                introSkipButton.onclick = () => {
                    vrvPlayer.currentTime = parseFloat(timestamps.intro[1]);
                    introPlaying = false;
                    introSkipButton.classList.add("bvrv-display-none");
                };
                introSkipButton.classList.remove("bvrv-display-none");
            } else if (vrvPlayer.currentTime >= timestamps.outro[0] && vrvPlayer.currentTime <= timestamps.outro[1]) {
                // outro is playing
                outroPlaying = true;
                let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                nextEpisodeButton.onclick = () => {
                    vrvPlayer.currentTime = vrvPlayer.duration; //parseFloat(timestamps.intro[1]);
                    outroPlaying = false;
                    nextEpisodeButton.classList.add("bvrv-display-none");
                };
                nextEpisodeButton.classList.remove("bvrv-display-none");
            }
        }
    }
);
