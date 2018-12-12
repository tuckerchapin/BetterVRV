function userActive() {
    let skipButtons = document.getElementsByClassName("bvrv-skip-button");
    for (let i = 0; i < skipButtons.length; i++) {
        let classList = skipButtons[i].classList
        classList.remove("bvrv-skip-button-userinactive");
        classList.add("bvrv-skip-button-useractive");
    }
}

function userInactive() {
    let skipButtons = document.getElementsByClassName("bvrv-skip-button");
    for (let i = 0; i < skipButtons.length; i++) {
        let classList = skipButtons[i].classList
        classList.remove("bvrv-skip-button-useractive");
        classList.add("bvrv-skip-button-userinactive");
    }
}

const MESSAGE_LISTENERS = {
    useractive: userActive,
    userinactive: userInactive,
}
