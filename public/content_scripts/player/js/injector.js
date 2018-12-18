insertJS("lib/parse.min.js");

let statusIcons = {
    "muted": chrome.runtime.getURL("images/status_icons/muted.svg"),
    "majorSeekBackward": chrome.runtime.getURL("images/status_icons/seekBackward.svg"),
    "majorSeekForward": chrome.runtime.getURL("images/status_icons/seekForward.svg"),
    "minorSeekBackward": chrome.runtime.getURL("images/status_icons/seekBackward.svg"),
    "minorSeekForward": chrome.runtime.getURL("images/status_icons/seekForward.svg"),
    "slowDown": chrome.runtime.getURL("images/status_icons/slowDown.svg"),
    "speedUp": chrome.runtime.getURL("images/status_icons/speedUp.svg"),
    "resetSpeed": chrome.runtime.getURL("images/status_icons/resetSpeed.svg"),
    "unmuted": chrome.runtime.getURL("images/status_icons/unmuted.svg"),
    "volumeDown": chrome.runtime.getURL("images/status_icons/volumeDown.svg"),
    "volumeMax": chrome.runtime.getURL("images/status_icons/volumeMax.svg"),
    "volumeUp": chrome.runtime.getURL("images/status_icons/volumeUp.svg"),
    "volumeZero": chrome.runtime.getURL("images/status_icons/volumeZero.svg")
};

window.addEventListener(
    'message',
    (event) => {
        if (event.data.sender && event.data.sender === "bvrv") {
            if (event.data.content === "requestEpisodeId") {
                chrome.runtime.sendMessage(
                    {
                        target: "background",
                        get: "episodeId",
                    },
                    (response) => {
                        window.postMessage(
                            {
                                sender: "bvrv",
                                content: "episodeId",
                                episodeId: response.episodeId
                            },
                            "*"
                        );
                    }
                );
            }
        }
    },
    false
);

insertJS("content_scripts/defaultOptions.js");
insertJS("content_scripts/player/js/getReverseKeyMap.js");
insertJS("content_scripts/player/js/formattedValues.js");
insertJS("content_scripts/player/js/handleKeycuts.js");
insertJS("content_scripts/player/js/insertUI.js");
insertJS("content_scripts/player/js/handleTiming.js");

insertJS("content_scripts/player/js/observer.js");
insertJS("content_scripts/player/js/initBVRV.js");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        window.postMessage(
            {
                sender: "bvrv",
                content: "chromeOptions",
                options,
                statusIcons,
            },
            "*"
        )
    }
);
