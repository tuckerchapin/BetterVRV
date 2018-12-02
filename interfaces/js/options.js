let defaultOptions = {
    "content": {
        "hideDescriptions": true,
        "hideThumbnails": true,
        "showWatchedThumbnails": false,
    },
    "tuning": {
        "majorSeekIncrement": 10,
        "minorSeekIncrement": 5,
    },
    "keyAssignments": {
        "majorSeekForward": ["Shift+KeyL"],
        "majorSeekBackward": ["Shift+KeyJ"],
        "minorSeekForward": ["ArrowRight", "KeyL"],
        "minorSeekBackward": ["ArrowLeft", "KeyJ"],
        "playPause": ["KeyK", "Space"],
        "pause": ["KeyP"],
    }
};

chrome.storage.sync.get(defaultOptions,
    (options) => {
        // do something for content
        // do something for tuning
        // do something for keyAssignments
    }
);
