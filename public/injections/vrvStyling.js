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
