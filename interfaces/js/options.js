// Load the existing settings
// Will set new settings if there are none
const defaultOptions = {
    "hideThumbnails": true,
    "showWatchedThumbnails": true,
    "hideDescriptions": true,
    "autoSkipPreviews": true,
}

chrome.storage.sync.get(
    defaultOptions,
    (data) => {
        for (const [key, value] of Object.entries(data)) {
            let elem = document.getElementById(camel2kebab(key));

            // Set the UI to match the settings
            switch (typeof value) {
                case "boolean":
                    elem.checked = value;

                    break;
                default:
                    console.error('Error getting user option for "' + key + '"');
            }

            // Fire a changed event to update dependent styling
            // SMALL CANCER TODO
            // var event = new Event(
            //     "changed",
            //     {"detail": 'Pseudo-changed event loading in "' + key + '" setting.'}
            // );
            elem.dispatchEvent(new Event("change"));
        }
    }
);

// Control listeners

let inputs = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(
        'change',
        (e) => {
            console.log(e.target.id + " turned " + (e.target.checked ? "on" : "off"));

            // Save the setting that changed
            let newSetting = {};
            newSetting[kebab2camel(e.target.id)] = e.target.checked;
            chrome.storage.sync.set(
                newSetting,
                () => {
                    if (chrome.runtime.lastError)
                        console.error(chrome.runtime.lastError);
                }
            );


            // Affect conditional controls
            let conditionals = document.querySelectorAll(
                ".control-subrow[data-conditional='" + inputs[i].id + "'] input[type='checkbox']"
            );

            if (conditionals.length > 0) {
                // Enable or disable the control with the value of the parent control's setting.
                for (let j = 0; j < conditionals.length; j++) {
                    if (e.target.checked) {
                        // Parent control is enabled, this setting is valid.
                        conditionals[j].removeAttribute("disabled");

                        // This is the BIG CANCER. TODO
                        conditionals[j].parentElement.nextSibling.nextSibling.setAttribute("style", "opacity: 1;");
                    } else {
                        // Parent control is disabled, this setting is invalid.
                        conditionals[j].setAttribute("disabled", true);

                        // This is the BIG CANCER. TODO
                        conditionals[j].parentElement.nextSibling.nextSibling.setAttribute("style", "opacity: .5;");
                    }
                }
            }
        }
    );
}


// Helpers

function camel2kebab(str) {
    return str.replace( /([A-Z])/g, "-$1").toLowerCase();
}

function kebab2camel(str) {
    let words = str.split("-");
    let camel = words[0];
    for (let i = 1; i < words.length; i++) {
        camel += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return camel;
}

// console.log(camel2kebab("helloMyNameIsFred"));
// console.log(kebab2camel("hello-my-name-is-fred"));
// console.log("hello-my-name-is-fred" === camel2kebab(kebab2camel("hello-my-name-is-fred")));
// console.log("helloMyNameIsFred" === kebab2camel(camel2kebab("helloMyNameIsFred")));
