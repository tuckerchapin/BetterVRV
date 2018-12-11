let vjsPlayer;

function observerCallback(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type == 'attributes') {
            if (mutation.attributeName === "src") {
                vjsPlayer = videojs("player_html5_api");
                observer.disconnect();
                createObserver(document.getElementById("player_html5_api"), observerCallback);

                if (vjsPlayer.src() !== "") {
                    console.log(vjsPlayer.src());
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
