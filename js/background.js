chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        hideThumbnails: true,
        hideDescriptions: true,
    }, function() {
        console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: 'vrv.co'
                        }
                    })],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});
