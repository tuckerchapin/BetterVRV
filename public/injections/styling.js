let defaultOptions = {
    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,

    "majorSeekIncrement": 10,
    "minorSeekIncrement": 5,

    "majorSeekForward": ["16+76", ""],
    "majorSeekBackward": ["16+74", ""],
    "minorSeekForward": ["39", "76"],
    "minorSeekBackward": ["37", "74"],
    "playPause": ["32", "75"],
    "pause": ["80", ""],
    "toggleFullscreen": ["70", ""],
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

chrome.storage.sync.get(defaultOptions,
    (settings) => {
        if (settings.hideDescriptions) {
            insertCSS("injections/css/hideDescriptions.css");
        }

        if (settings.hideThumbnails) {
            insertCSS("injections/css/hideThumbnails.css");
        }

        if (settings.showWatchedThumbnails) {
            insertCSS("injections/css/showWatchedThumbnails.css");
        }
    }
);
