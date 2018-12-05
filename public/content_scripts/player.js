let vrvPlayer = document.querySelector("video#player_html5_api");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        vrvPlayer.defaultPlaybackRate = options.defaultSpeed;
        vrvPlayer.volume = options.defaultVolume;
        vrvPlayer.defaultMuted = options.muteByDefault;

        window.onload = () => stylePlayer(options);

        document.onkeydown = (e) => handleKeycuts(options, e);
    }
);
