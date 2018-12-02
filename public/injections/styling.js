let defaultOptions = {
    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,

    // "majorSeekIncrement": 10,
    // "minorSeekIncrement": 5,
    //
    // "majorSeekForward": ["Shift+KeyL"],
    // "majorSeekBackward": ["Shift+KeyJ"],
    // "minorSeekForward": ["ArrowRight", "KeyL"],
    // "minorSeekBackward": ["ArrowLeft", "KeyJ"],
    // "playPause": ["KeyK", "Space"],
    // "pause": ["KeyP"]
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
