let s = document.createElement('script');
s.src = chrome.extension.getURL('injections/js/hideThumbnails');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
