chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.get === "currentTime") {
            sendResponse({
                currentTime: document.getElementById("player_html5_api").currentTime
            });
        }
    }
);