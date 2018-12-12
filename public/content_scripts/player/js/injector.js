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

insertJS("content_scripts/const.js");
insertJS("content_scripts/player/js/observer.js");
insertJS("content_scripts/player/js/initBVRV.js");
insertJS("content_scripts/player/js/handleKeycuts.js");
insertJS("content_scripts/player/js/insertUI.js");
insertJS("content_scripts/player/js/getReverseKeyMap.js");
insertJS("content_scripts/player/js/formattedValues.js");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => window.postMessage(
        {
            sender: "bvrv",
            options,
            statusIcons,
        },
        "*"
    )
);
