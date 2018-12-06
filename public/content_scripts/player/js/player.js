let vrvPlayer = document.querySelector("video#player_html5_api");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        vrvPlayer.defaultPlaybackRate = options.defaultSpeed;
        vrvPlayer.volume = parseFloat(options.defaultVolume / 100);
        // vrvPlayer.defaultMuted = options.muteByDefault; // Does not work for some reason
        vrvPlayer.muted = options.muteByDefault;

        window.onload = () => stylePlayer(options);

        document.onkeydown = (e) => handleKeycuts(options, e);
    }
);
