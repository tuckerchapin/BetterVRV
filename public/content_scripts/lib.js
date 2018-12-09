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
};

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

function insertJS(path) {
    var s = document.createElement("script");
    s.src = chrome.extension.getURL(path);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}
