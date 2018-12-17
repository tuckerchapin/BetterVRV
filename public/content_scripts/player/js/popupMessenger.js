chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.target === "player") {
            if (request.get === "currentInfo") {
                sendResponse({
                    currentTime: document.getElementById("player_html5_api").currentTime,
                    duration: document.getElementById("player_html5_api").duration
                });
            }
        }
    }
);
