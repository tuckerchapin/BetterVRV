const DEFAULT_OPTIONS = {
    "firstInstall": true,

    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,
    "hideLoadingPoster": false,

    "majorSeekIncrement": 10,
    "minorSeekIncrement": 5,
    "volumeIncrement": 10,
    "defaultVolume": 100,
    "muteByDefault": false,
    "speedIncrement": 0.25,
    "defaultSpeed": 1,

    "showControlsOnShortcut": false,

    "toggleFullscreen": ["70", ""],
    "playPause": ["32", "75"],
    "pause": ["80", ""],

    "majorSeekForward": ["76", ""],
    "majorSeekBackward": ["74", ""],
    "minorSeekForward": ["39", "16+76"],
    "minorSeekBackward": ["37", "16+74"],

    "toggleMute": ["77", ""],
    "volumeUp": ["38", ""],
    "volumeDown": ["40", ""],

    "speedUp": ["187", ""],
    "slowDown": ["189", ""],
    "resetSpeed": ["16+48", ""],
};

const MOD_KEY = {
    "shiftKey": 16,
    "ctrlKey": 17,
    "altKey": 18,
}

function insertCSS(path) {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<link
            rel="stylesheet"
            type="text/css"
            href="${chrome.runtime.getURL(path)}"
            >`
    );
}
