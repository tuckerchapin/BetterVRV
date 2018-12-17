function handleTiming(player, timestamp) {
    let introPlaying = false;
    let outroPlaying = false;
    let previewPlaying = false;
    let postScenePlaying = false;

    player.on(
        "timeupdate",
        (e) => {
            console.log(introPlaying, outroPlaying, previewPlaying, postScenePlaying);
            let currentTime = player.currentTime();

            if (introPlaying) {
                // check if the time is outside the intro
                if (currentTime < timestamp.get("introStart") || currentTime > timestamp.get("introEnd")) {
                    introPlaying = false;

                    let introSkipButton = document.getElementById("bvrv-skip-intro-button");
                    introSkipButton.classList.add("bvrv-display-none");
                }
            } else if (outroPlaying) {
                // check if the time is outside the outro
                if (currentTime < timestamp.get("outroStart") || currentTime > timestamp.get("outroEnd")) {
                    outroPlaying = false;

                    let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                    nextEpisodeButton.classList.remove("bvrv-display-none");
                }
            } else if (previewPlaying) {
                // check if the time is outside the preview
                if (currentTime < timestamp.get("previewStart") || currentTime > timestamp.get("previewEnd")) {
                    previewPlaying = false;
                }
            } else if (postScenePlaying) {
                // check if the time is outside the postscene
                if (currentTime < timestamp.get("postSceneStart") || currentTime > timestamp.get("postSceneEnd")) {
                    postScenePlaying = false;
                }
            } else {
                if (
                    currentTime >= timestamp.get("introStart") && currentTime <= timestamp.get("introEnd")
                ) {
                    introPlaying = true;

                    if (timestamp.get("hasIntro")) {
                        if (timestamp.get("introStart") !== undefined && timestamp.get("introEnd") !== undefined) {
                            if (options.autoSkipIntro) {
                                player.currentTime(parseFloat(timestamp.get("introEnd")));
                            } else {
                                let introSkipButton = document.getElementById("bvrv-skip-intro-button");
                                introSkipButton.onclick = () => {
                                    player.currentTime(parseFloat(timestamp.get("introEnd")));
                                    introPlaying = false;
                                    introSkipButton.classList.add("bvrv-display-none");
                                };
                                introSkipButton.classList.remove("bvrv-display-none");
                            }
                        }
                    }
                } else if (
                    currentTime >= timestamp.get("outroStart") && currentTime <= timestamp.get("outroEnd")
                ) {
                    outroPlaying = true;
                } else if (
                    currentTime >= timestamp.get("previewStart") && currentTime <= timestamp.get("previewEnd")
                ) {
                    previewPlaying = true;
                } else if (
                    currentTime >= timestamp.get("postSceneStart") && currentTime <= timestamp.get("postSceneEnd")
                ) {
                    postScenePlaying = true;
                }
            }
        }
    );
}


// // outro is playing
// if (options.autoSkipOutro) {
//
// } else {
//
// }
// outroPlaying = true;
//
// if (timestamp.isPostScene) {
//     let outroSkipButton = document.getElementById("bvrv-skip-outro-button");
//     outroSkipButton.onclick = () => {
//         player.currentTime(timestamp.outro[1]);
//         outroPlaying = false;
//         outroSkipButton.classList.add("bvrv-display-none");
//     };
//     outroSkipButton.classList.remove("bvrv-display-none");
// } else {
//     let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
//     nextEpisodeButton.onclick = () => {
//         player.currentTime(player.duration());
//         outroPlaying = false;
//         nextEpisodeButton.classList.add("bvrv-display-none");
//     };
//     nextEpisodeButton.classList.remove("bvrv-display-none");
// }
