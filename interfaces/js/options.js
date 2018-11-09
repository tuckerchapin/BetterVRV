const defaultSettings = {
    "spoilers": {
        "hideThumbnails": true,
        "showWatchedThumbnails": true,
        "hideDescriptions": true,
        "autoSkipPreviews": true
    }
}

// Control listeners

let inputs = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(
        'change',
        (e) => {
            console.log(e.target.id + " turned " + (e.target.checked ? "on" : "off"));


            // Conditional controls
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


//
chrome.storage.sync.get(
    defaultSettings,
    (data) => {
    }
);


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
