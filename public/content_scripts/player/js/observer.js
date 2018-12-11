let options = DEFAULT_OPTIONS;
let reverseKeyMap = {};

function getReverseKeyMap() {
    let reverseKeyMap = {};
    for (const [key, value] of Object.entries(options)) {
        if (Array.isArray(value) && value.length === 2) {
            if (value[0] !== "") {
                if (String(value[0]).indexOf("+") !== -1) {
                    // command uses modifier
                    let [modifier, keystroke] = String(value[0]).split("+");
                    if (!reverseKeyMap[modifier]) {
                        // mod dictionary empty
                        reverseKeyMap[modifier] = {};
                    }
                    reverseKeyMap[modifier][keystroke] = key
                } else {
                    // no modifier
                    reverseKeyMap[value[0]] = key;
                }
            }
            if (value[1] !== "") {
                if (String(value[1]).indexOf("+") !== -1) {
                    // command uses modifier
                    let [modifier, keystroke] = String(value[1]).split("+");
                    if (!reverseKeyMap[modifier]) {
                        // mod dictionary empty
                        reverseKeyMap[modifier] = {};
                    }
                    reverseKeyMap[modifier][keystroke] = key
                } else {
                    // no modifier
                    reverseKeyMap[value[1]] = key;
                }
            }
        }
    }
    return reverseKeyMap;
}

window.addEventListener(
    'message',
    (event) => {
        if (event.data.sender && event.data.sender === "bvrv") {
            options = event.data.options;
            reverseKeyMap = getReverseKeyMap()
        }
    },
    false
);

function observerCallback(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type == 'attributes') {
            if (mutation.attributeName === "src") {
                let player = videojs("player_html5_api");

                observer.disconnect();
                createObserver(document.getElementById("player_html5_api"), observerCallback);

                if (player.src() !== "") {
                    console.log(player.src());

                    // consider changing this to on ready
                    // player.on(
                    //     "loadedmetadata",
                    //     (e) => {
                    //         console.log("loaded meta data");
                    //         initBVRV(player);
                    //     }
                    // );

                    player.ready(
                        () => {
                            console.log("player ready");
                            initBVRV(player);
                        }
                    );
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
