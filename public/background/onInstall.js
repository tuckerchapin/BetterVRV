function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.runtime.onInstalled.addListener(
    (details) => {
        if (details.reason == "install") {
            chrome.storage.sync.get(
                {
                    "firstInstall": true,
                    "userId": getRandomToken()
                },
                (firstInstall) => {
                    if (firstInstall) {
                        alert(`Thanks for installing BetterVRV!\n\nThe default controls are similar to YouTube's keyboard shortcuts, but you can customize the controls (and the rest of this extension) to your liking in the options page.\n\nDo note that content blockers like uBlock Origin or AdBlock may impact BetterVRV's functionality. Consider disabling these on https://vrv.co/.`);

                        chrome.storage.sync.set({"firstInstall": false});
                    }
                }
            );
        } else if (details.reason == "update") {
            //
        }

        chrome.declarativeContent.onPageChanged.removeRules(
            undefined,
            function() {
                chrome.declarativeContent.onPageChanged.addRules(
                    [
                        {
                            conditions: [
                                new chrome.declarativeContent.PageStateMatcher(
                                    {pageUrl: {
                                        hostEquals: 'vrv.co',
                                        pathPrefix: '/watch/'
                                    }}
                                )
                            ],
                            actions: [
                                new chrome.declarativeContent.ShowPageAction()
                            ]
                        }
                    ]
                );
            }
        );
    }
);
