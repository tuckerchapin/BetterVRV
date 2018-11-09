// Control listeners

let inputs = document.getElementsByTagName('input');

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'checkbox') {
        inputs[i].addEventListener(
            'change',
            (e) => {
                console.log(e.target.id + " turned " + (e.target.checked ? 'on' : 'off'));
            }
        );
    }
}
