chrome.storage.sync.get(
    options,
    (data) => {
        for (const [key, value] of Object.entries(data)) {
            optionFunctions[key](value);
        }
    }
);

chrome.storage.onChanged.addListener(
    (changes, namespace) => {
        for (key in changes) {
            if (key in options) {
                optionFunctions[key](changes[key].newValue);
            }
        }
    }
);

const optionFunctions = {
    "hideThumbnails": (setting) => {
            console.log("User wants thumbnails " + (setting ? "hidden." : "shown."));
        },
    "showWatchedThumbnails": (setting) => {
            console.log("User wants already seen thumbnails " + (setting ? "hidden." : "shown."));
        },
    "hideDescriptions": (setting) => {
            console.log("User wants descriptions " + (setting ? "hidden." : "shown."));
        },
    "autoSkipPreviews": (setting) => {
            console.log("User wants to " + (setting ? "skip" : "watch") + " previews.");
        },
};
