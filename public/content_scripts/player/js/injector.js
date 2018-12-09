insertJS("content_scripts/const.js");
insertJS("content_scripts/player/js/injected.js");

var port = chrome.runtime.connect();

window.addEventListener(
    "message",
    (message) => {
        if (message.data.type && message.data.type === MESSAGE_TYPES.listenerFired) {
            console.log(message.data.event.type);
        }
    },
    false
);
