let episodeIds = {};

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if (changeInfo.url) {
            let splitURL = changeInfo.url.split("/");
            if (splitURL[2] === "vrv.co" && splitURL[3] === "watch") {
                if (splitURL[2] === "vrv.co" && splitURL[3] === "watch") {
                    episodeIds[tab.id] = splitURL[4];
                }
            }
        }
    }
);

chrome.tabs.onRemoved.addListener(
    (tabId, removed) => {
        delete episodeIds[tabId];
    }
);

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.target === "background") {
            if (request.get === "episodeId") {
                sendResponse({episodeId: episodeIds[sender.tab.id]})
            }
        }
    }
);

// chrome.tabs.sendMessage(
//     tab.id,
//     {
//         target: "top-site",
//         get: "info",
//     },
//     (response) => console.log(response)
// );
