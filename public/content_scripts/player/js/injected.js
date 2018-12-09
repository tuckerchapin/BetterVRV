let vjsObject = videojs("player_html5_api");

// vjsObject.poster("");

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
