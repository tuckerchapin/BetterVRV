function handleTiming(player) {
    let timestamps = {
        "intro": [35, 125],
        "outro": [1417, 1420],
        "preview": [1420, 1435],
        "isPostScene": false, // <-- CHECK FOR THIS
    };

    let introPlaying = false;
    let outroPlaying = false;

    player.on(
        "timeupdate",
        (e) => {
            let currentTime = player.currentTime();

            if (introPlaying) {
                // check if the time is greater than the intro
                if (currentTime > timestamps.intro[1] || currentTime < timestamps.intro[0]) {
                    introPlaying = false;

                    let introSkipButton = document.getElementById("bvrv-skip-intro-button");
                    introSkipButton.classList.add("bvrv-display-none");
                }
            } else if (outroPlaying) {
                // check if the time is greater than the outro
                if (currentTime < timestamps.outro[0] || currentTime > timestamps.outro[1]) {
                    outroPlaying = false;

                    if (timestamps.isPostScene) {
                        let outroSkipButton = document.getElementById("bvrv-skip-outro-button");
                        outroSkipButton.classList.remove("bvrv-display-none");
                    } else {
                        let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                        nextEpisodeButton.classList.remove("bvrv-display-none");
                    }
                }
            } else {
                if (currentTime >= timestamps.intro[0] && currentTime <= timestamps.intro[1]) {
                    // intro is playing
                    if (options.autoSkipIntro) {
                        player.currentTime(parseFloat(timestamps.intro[1]));
                    } else {
                        introPlaying = true;

                        let introSkipButton = document.getElementById("bvrv-skip-intro-button");
                        introSkipButton.onclick = () => {
                            player.currentTime(parseFloat(timestamps.intro[1]));
                            introPlaying = false;
                            introSkipButton.classList.add("bvrv-display-none");
                        };
                        introSkipButton.classList.remove("bvrv-display-none");
                    }
                } else if (currentTime >= timestamps.outro[0] && currentTime <= timestamps.outro[1]) {
                    // outro is playing
                    outroPlaying = true;

                    if (timestamps.isPostScene) {
                        let outroSkipButton = document.getElementById("bvrv-skip-outro-button");
                        outroSkipButton.onclick = () => {
                            player.currentTime(timestamps.outro[1]);
                            outroPlaying = false;
                            outroSkipButton.classList.add("bvrv-display-none");
                        };
                        outroSkipButton.classList.remove("bvrv-display-none");
                    } else {
                        let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                        nextEpisodeButton.onclick = () => {
                            player.currentTime(player.duration());
                            outroPlaying = false;
                            nextEpisodeButton.classList.add("bvrv-display-none");
                        };
                        nextEpisodeButton.classList.remove("bvrv-display-none");
                    }
                }
            }
        }
    );
}
