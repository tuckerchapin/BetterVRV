let options = DEFAULT_OPTIONS;
let statusIcons = {};
let reverseKeyMap = {};

window.addEventListener(
    'message',
    (event) => {
        if (event.data.sender && event.data.sender === "bvrv") {
            options = event.data.options;
            statusIcons = event.data.statusIcons;
            reverseKeyMap = getReverseKeyMap(options);
        }
    },
    false
);

function observerCallback(mutationsList, observer) {
    for(let mutation of mutationsList) {
        // console.log(document.querySelector("div.vjs-poster"));
        if (mutation.type == 'attributes') {

            if (mutation.attributeName === "src") {
                let player = videojs("player_html5_api");
                player.poster("");

                observer.disconnect();
                createObserver(document.getElementById("player_html5_api"), observerCallback);

                if (player.src() !== "") {
                    player.ready(() => initBVRV(player));
                } else {
                    console.log("no source");
                }
            }
        }
    }
}

function createObserver(element, callback) {
    let observer = new MutationObserver(callback);
    observer.observe(
        element,
        { attributes: true, childList: true, subtree: true }
    );
}

createObserver(document.getElementById("player_html5_api"), observerCallback);
