let vrvPlayer = document.querySelector("video#player_html5_api");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        stylePlayer(options);

        vrvPlayer.defaultPlaybackRate = options.defaultSpeed;

        document.onkeydown = (e) => handleKeycuts(options, e);
    }
);
