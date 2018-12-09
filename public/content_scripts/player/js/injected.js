let vjsObject = videojs("player_html5_api");

// vjsObject.poster("");

// Listen for messages from the content scripts
window.addEventListener(
    "message",
    (message) => {
        if (message.data.type) {
            // Fire a listener from the content scripts
            if (message.data.type === MESSAGE_TYPES.fireListener) {
                vjsObject[message.data.listener]();
            }

            // Return a value to the content scripts
        }
    },
    false
);

// Event listeners to send messages to the content scripts
vjsObject.on("useractive", function(e) {
    window.postMessage(
        {
            type: MESSAGE_TYPES.listenerFired,
            event: JSON.parse(JSON.stringify(e))
        },
        "*"
    );
});

vjsObject.on("userinactive", function(e) {
    window.postMessage(
        {
            type: MESSAGE_TYPES.listenerFired,
            event: JSON.parse(JSON.stringify(e))
        },
        "*"
    );
});
