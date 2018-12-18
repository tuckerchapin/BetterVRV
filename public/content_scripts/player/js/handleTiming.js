function handleTiming(player, timestamp) {
    let introPlaying = false;
    let outroPlaying = false;
    let previewPlaying = false;
    let postScenePlaying = false;

    player.on(
        "timeupdate",
        (e) => {
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

                    let skipOutroButton = document.getElementById("bvrv-skip-outro-button");
                    skipOutroButton.classList.add("bvrv-display-none");
                    let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                    nextEpisodeButton.classList.add("bvrv-display-none");
                }
            } else if (previewPlaying) {
                // check if the time is outside the preview
                if (currentTime < timestamp.get("previewStart") || currentTime > timestamp.get("previewEnd")) {
                    previewPlaying = false;
                    let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                    nextEpisodeButton.classList.add("bvrv-display-none");
                }
            } else if (postScenePlaying) {
                // check if the time is outside the postscene
                if (currentTime < timestamp.get("postSceneStart") || currentTime > timestamp.get("postSceneEnd")) {
                    postScenePlaying = false;
                    let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                    nextEpisodeButton.classList.add("bvrv-display-none");
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

                    if (timestamp.get("hasOutro")) {
                        if (timestamp.get("outroStart") !== undefined && timestamp.get("outroEnd") !== undefined) {
                            if (timestamp.get("hasPostScene")) {
                                if (options.autoPlayNextEpisode) {
                                    player.currentTime(parseFloat(timestamp.get("outroEnd")));
                                } else {
                                    let skipOutroButton = document.getElementById("bvrv-skip-outro-button");
                                    skipOutroButton.onclick = () => {
                                        player.currentTime(parseFloat(timestamp.get("outroEnd")));
                                        outroPlaying = false;
                                        skipOutroButton.classList.add("bvrv-display-none");
                                    };
                                    skipOutroButton.classList.remove("bvrv-display-none");
                                }
                            } else {
                                if (options.autoPlayNextEpisode) {
                                    player.currentTime(player.duration());
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
                } else if (
                    currentTime >= timestamp.get("previewStart") && currentTime <= timestamp.get("previewEnd")
                ) {
                    previewPlaying = true;

                    if (timestamp.get("hasPreview")) {
                        if (timestamp.get("previewStart") !== undefined && timestamp.get("previewEnd") !== undefined) {
                            if (options.autoPlayNextEpisode) {
                                player.currentTime(player.duration());
                            } else {
                                let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                                nextEpisodeButton.onclick = () => {
                                    player.currentTime(player.duration());
                                    previewPlaying = false;
                                    nextEpisodeButton.classList.add("bvrv-display-none");
                                };
                                nextEpisodeButton.classList.remove("bvrv-display-none");
                            }
                        }
                    }
                } else if (
                    currentTime >= timestamp.get("postSceneStart") && currentTime <= timestamp.get("postSceneEnd")
                ) {
                    postScenePlaying = true;

                    if (timestamp.get("hasPostScene")) {
                        if (timestamp.get("postSceneStart") !== undefined && timestamp.get("postSceneEnd") !== undefined) {
                            if (options.autoPlayNextEpisode) {
                                player.currentTime(player.duration());
                            } else {
                                let nextEpisodeButton = document.getElementById("bvrv-next-episode-button");
                                nextEpisodeButton.onclick = () => {
                                    player.currentTime(player.duration());
                                    postScenePlaying = false;
                                    nextEpisodeButton.classList.add("bvrv-display-none");
                                };
                                nextEpisodeButton.classList.remove("bvrv-display-none");
                            }
                        }
                    }
                }
            }
        }
    );
}
