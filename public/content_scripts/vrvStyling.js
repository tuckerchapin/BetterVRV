chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        if (options.hideDescriptions) {
            insertCSS("content_scripts/css/hideDescriptions.css");
        }

        if (options.hideThumbnails) {
            insertCSS("content_scripts/css/hideThumbnails.css");
        }

        if (options.showWatchedThumbnails) {
            insertCSS("content_scripts/css/showWatchedThumbnails.css");
        }
    }
);
