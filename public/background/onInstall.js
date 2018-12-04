chrome.runtime.onInstalled.addListener(
    (details) => {
        if(details.reason == "install"){
            alert(`Thanks for installing BetterVRV!\n\nDo note that content blockers like uBlock Origin and AdBlock may impact BetterVRV's functionality. Consider disabling these on VRV.`);
        }else if(details.reason == "update"){
            //
        }
    }
);
