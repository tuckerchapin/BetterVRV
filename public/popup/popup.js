Parse.serverURL = 'https://parseapi.back4app.com'; // server
Parse.initialize(
  'CfnxYFbrcy0Eh517CcjOAlrAOH9hfe7dpOqfMcJj', // app id
  'Ke0lTaWiPPvLmpDOLLrukkbdAq34GTxVIEh4wcAU' // js key
);

chrome.tabs.query(
    {active: true, currentWindow: true},
    (tabs) => {
        let vrvContentId = tabs[0].url.split("/")[4];
        document.getElementById("vrv-content-id").innerText = vrvContentId;

        const Timestamps = Parse.Object.extend('Timestamps');
        const query = new Parse.Query(Timestamps);
        query.equalTo("vrvContentId", vrvContentId);
        query.find().then(
            (results) => {
                if (results.length === 0) {

                } else {
                    document.getElementById("intro-start").innerText = results[0].get("introStart");
                    document.getElementById("intro-end").innerText = results[0].get("introEnd");
                    document.getElementById("outro-start").innerText = results[0].get("outroStart");
                    document.getElementById("outro-end").innerText = results[0].get("outroEnd");
                    document.getElementById("preview-start").innerText = results[0].get("previewStart");
                    document.getElementById("preview-end").innerText = results[0].get("previewEnd");
                    document.getElementById("is-post-scene").innerText =
                        results[0].get("isPostScene") ? "a" : "no";
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }
);
//
// function getRandomToken() {
//     // E.g. 8 * 32 = 256 bits token
//     let randomPool = new Uint8Array(32);
//     crypto.getRandomValues(randomPool);
//     let hex = '';
//     for (let i = 0; i < randomPool.length; ++i) {
//         hex += randomPool[i].toString(16);
//     }
//     // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
//     return hex;
// }
//
// chrome.storage.sync.get(
//     {'userId': getRandomToken()},
//     (data) => {
//         document.getElementById("user-id").innerText = data.userId;
//     }
// );
//
// chrome.tabs.query(
//     {active: true, currentWindow: true},
//     (tabs) => {
//         document.getElementById("vrv-content-id").innerText = tabs[0].url.split("/")[4];
//         chrome.tabs.sendMessage(
//             tabs[0].id,
//             {
//                 get: "currentTime"
//             },
//             (response) => document.getElementById("current-time").innerText = response.currentTime
//         );
//     }
// );
