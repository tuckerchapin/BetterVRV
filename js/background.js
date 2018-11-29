chrome.storage.onChanged.addListener(
    (changes, namespace) => {
        for (key in changes) {
            options[key] = changes[key].newValue;

            chrome.tabs.query(
               {"url": "https://vrv.co/*"},
               (tabs) => {
                   for (let i = 0; i < tabs.length; i++) {
                       for (key in changes) {
                           if (key in optionFunctions) {
                               optionFunctions[key](changes[key].newValue, tabs[i].id);
                           }
                       }
                   }
               }
           );
        }
    }
);

chrome.tabs.onUpdated.addListener(
    (tabId, changes, tab) => {
        let url = new URL(tab.url);
        console.log(url.hostname, url.hostname === "vrv.co");
        if (url.hostname === "vrv.co") {
            for (const [key, value] of Object.entries(options)) {
                if (key in optionFunctions) {
                    optionFunctions[key](value, tab.id);
                }
            }
        }
    }
)

// // When the options change propagate to all open VRV tabs
// chrome.storage.onChanged.addListener(
//     (changes, namespace) => {
//         chrome.tabs.query(
//             {"url": "https://vrv.co/*"},
//             (tabs) => {
//                 for (let i = 0; i < tabs.length; i++) {
//                     for (key in changes) {
//                         if (key in optionFunctions) {
//                             optionFunctions[key](changes[key].newValue, tabs[i].id);
//                         }
//                     }
//                 }
//             }
//         );
//     }
// );
//
// // On navigating to VRV, apply settings.
// chrome.tabs.onUpdated.addListener(
//     (tabId, changes, tab) => {
//         let url = new URL(tab.url);
//         console.log(url.hostname, url.hostname === "vrv.co");
//         if (url.hostname === "vrv.co") {
//             chrome.storage.sync.get(
//                 options,
//                 (data) => {
//                     for (const [key, value] of Object.entries(data)) {
//                         if (key in optionFunctions) {
//                             optionFunctions[key](value, tab.id);
//                         }
//                     }
//                 }
//             );
//         }
//     }
// )

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
