// Control listeners

let inputs = document.querySelectorAll("input[type='checkbox']");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(
        'change',
        (e) => {
            console.log(e.target.id + " turned " + (e.target.checked ? "on" : "off"));

            let conditionals = document.querySelectorAll(
                "input[type='checkbox'][data-conditional='" + inputs[i].id + "']"
            );

            if (conditionals.length > 0) {
                // Enable or disable the control with the value of the parent control's setting.
                for (let j = 0; j < conditionals.length; j++) {
                    if (e.target.checked) {
                        // Parent control is enabled, this setting is valid.
                        conditionals[j].removeAttribute("disabled");
                    } else {
                        // Parent control is disabled, this setting is invalid.
                        conditionals[j].setAttribute("disabled", true);
                    }
                }
            }
        }
    );
}
