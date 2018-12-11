let vrvPlayer = document.getElementById("player_html5_api");

function setUpPlayer(options) {
    vrvPlayer.defaultPlaybackRate = options.defaultSpeed;
    vrvPlayer.volume = parseFloat(options.defaultVolume / 100);
    vrvPlayer.muted = options.muteByDefault;

    window.onload = () => stylePlayer(options);

    document.onkeydown = (e) => handleKeycuts(options, e);
}

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => setUpPlayer(options)
);
