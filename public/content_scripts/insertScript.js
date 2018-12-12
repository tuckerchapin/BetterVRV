function insertCSS(path) {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<link
            rel="stylesheet"
            type="text/css"
            href="${chrome.runtime.getURL(path)}"
            >`
    );
}

function insertJS(path) {
    var s = document.createElement("script");
    s.src = chrome.extension.getURL(path);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}
