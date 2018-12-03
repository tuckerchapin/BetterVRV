const DEFAULT_OPTIONS = {
    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,

    "majorSeekIncrement": 10,
    "minorSeekIncrement": 5,

    "toggleFullscreen": ["70", ""],

    "majorSeekForward": ["76", ""],
    "majorSeekBackward": ["74", ""],
    "minorSeekForward": ["39", "16+76"],
    "minorSeekBackward": ["37", "16+74"],
    "playPause": ["32", "75"],
    "pause": ["80", ""],
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

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        if (options.hideDescriptions) {
            insertCSS("injections/css/hideDescriptions.css");
        }

        if (options.hideThumbnails) {
            insertCSS("injections/css/hideThumbnails.css");
        }

        if (options.showWatchedThumbnails) {
            insertCSS("injections/css/showWatchedThumbnails.css");
        }
    }
);
