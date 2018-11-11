// When the options change propagate to all open VRV tabs
chrome.storage.onChanged.addListener(
    (changes, namespace) => {
        chrome.tabs.query(
            {"url": "https://vrv.co/*"},
            (tabs) => {
                for (let i = 0; i < tabs.length; i++) {
                    for (key in changes) {
                        if (key in options) {
                            optionFunctions[key](changes[key].newValue, tabs[i].id);
                        }
                    }
                }
            }
        );
    }
);

// On navigating to VRV or within VRV, apply the options.
chrome.tabs.onUpdated.addListener(
    (tabId, changes, tab) => {
        // Check that the tab is a VRV tab
        if (/^https:\/\/vrv\.co(\/.*)?$/.test(tab.url)) {
            // Get and apply settings
            chrome.storage.sync.get(
                options,
                (data) => {
                    for (const [key, value] of Object.entries(data)) {
                        if (key in options) {
                            optionFunctions[key](value, tab.id);
                        }
                    }
                }
            );
        }
    }
)

const optionFunctions = {
    "hideThumbnails": function(value, tabId) {
            // chrome.tabs.insertCSS(tabId, {file: "injections/css/hideThumbnails.css"});

            if (value) { // Hide thumbnails
                chrome.tabs.executeScript(tabId, {file: "injections/js/hideThumbnailsTRUE.js"});
            } else { // Show thumbnails
                chrome.tabs.executeScript(tabId, {file: "injections/js/hideThumbnailsFALSE.js"});
            }
        },
    "showWatchedThumbnails": (value) => {
            // console.log("User wants already seen thumbnails " + (value ? "hidden." : "shown."));
        },
    "hideDescriptions": (value) => {
            // console.log("User wants descriptions " + (value ? "hidden." : "shown."));
        },
    "autoSkipPreviews": (value) => {
            // console.log("User wants to " + (value ? "skip" : "watch") + " previews.");
        },
};
