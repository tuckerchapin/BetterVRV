// insertJS("content_scripts/const.js");
// insertJS("content_scripts/player/js/injected.js");
//
// var port = chrome.runtime.connect();
//
// // Listens for messages from listeners on the VJS object in injected.js
// window.addEventListener(
//     "message",
//     (message) => {
//         if (message.data.type && message.data.type === MESSAGE_TYPES.listenerFired) {
//             MESSAGE_LISTENERS[message.data.event.type]();
//         }
//     },
//     false
// );

insertJS("content_scripts/const.js");
insertJS("content_scripts/player/js/observer.js");
insertJS("content_scripts/player/js/initBVRV.js");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => window.postMessage(
        {
            sender: "bvrv",
            options,
        },
        "*"
    )
);
