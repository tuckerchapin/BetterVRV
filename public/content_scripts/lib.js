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

    "showControlsOnShortcut": true,

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

const STATUS_ICONS = {
    "muted": "images/status_icons/muted.svg",
    "majorSeekBackward": "images/status_icons/seekBackward.svg",
    "majorSeekForward": "images/status_icons/seekForward.svg",
    "minorSeekBackward": "images/status_icons/seekBackward.svg",
    "minorSeekForward": "images/status_icons/seekForward.svg",
    "slowDown": "images/status_icons/slowDown.svg",
    "speedUp": "images/status_icons/speedUp.svg",
    "resetSpeed": "images/status_icons/resetSpeed.svg",
    "unmuted": "images/status_icons/unmuted.svg",
    "volumeDown": "images/status_icons/volumeDown.svg",
    "volumeMax": "images/status_icons/volumeMax.svg",
    "volumeUp": "images/status_icons/volumeUp.svg",
    "volumeZero": "images/status_icons/volumeZero.svg",
}

function getSpeed(options) {
    return String(parseFloat(vrvPlayer.playbackRate).toFixed(2)) + "x";
}

function getVolume(options) {
    return String(parseInt(vrvPlayer.volume * 100)) + "%";
}

function getMajorTimeSkip(options) {
    return String(parseInt(options["majorSeekIncrement"])) + "s";
}

function getMinorTimeSkip(options) {
    return String(parseInt(options["minorSeekIncrement"])) + "s";
}

const FORMATTED_VALUES = {
    "majorSeekBackward": getMajorTimeSkip,
    "majorSeekForward": getMajorTimeSkip,
    "minorSeekBackward": getMinorTimeSkip,
    "minorSeekForward": getMinorTimeSkip,
    "slowDown": getSpeed,
    "speedUp": getSpeed,
    "resetSpeed": getSpeed,
    "unmuted": getVolume,
    "volumeDown": getVolume,
    "volumeMax": getVolume,
    "volumeUp": getVolume,
    "volumeZero": getVolume,
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
