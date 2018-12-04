let vrvPlayer = document.querySelector("video#player_html5_api");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        vrvPlayer.defaultPlaybackRate = options.defaultSpeed;

        window.onload = () => stylePlayer(options);

        document.onkeydown = (e) => handleKeycuts(options, e);
    }
);
