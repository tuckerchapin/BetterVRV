function initBVRV(player) {
    player.playbackRate(options.defaultSpeed);
    player.volume(parseFloat(options.defaultVolume / 100));
    player.muted(options.muteByDefault);

    // window.onload = () => stylePlayer(options);

    document.onkeydown = (e) => handleKeycuts(player, e);
}
