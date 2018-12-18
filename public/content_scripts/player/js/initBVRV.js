function initBVRV(player) {
    setDefaults(player);
    insertUI(player);
    getParseTimestamp(player);
    document.onkeydown = (e) => handleKeycuts(player, e);
}

function setDefaults(player) {
    player.playbackRate(options.defaultSpeed);
    player.volume(parseFloat(options.defaultVolume / 100));
    player.muted(options.muteByDefault);
}

function getParseTimestamp(player) {
    Parse.serverURL = 'https://parseapi.back4app.com'; // server
    Parse.initialize(
      'CfnxYFbrcy0Eh517CcjOAlrAOH9hfe7dpOqfMcJj', // app id
      'Ke0lTaWiPPvLmpDOLLrukkbdAq34GTxVIEh4wcAU' // js key
    );

    if (episodeId === undefined) {
        episodeId = document.referrer.split("/")[4];
    }

    const Timestamps = Parse.Object.extend('Timestamps');
    const query = new Parse.Query(Timestamps);
    query.equalTo("episodeId", episodeId);
    query.first().then(
        (result) => {
            if (result) {
                handleTiming(player, result);
            }
        },
        (error) => {
            console.error(error);
        }
    );
}
