/*global chrome*/
import React, { Component } from 'react';

import './styles/KeyBinder.css';

const MOD_KEY = {
    "16": true,
    "17": true,
    "18": true,
}

const KEY_DISPLAY = {
    "16": "shift",
    "17": "ctrl",
    "18": "alt",
    "32": "space",
    "37": "←",
    "38": "↑",
    "39": '→',
    "40": "↓",
    "48": "0",
    "49": "1",
    "50": "2",
    "51": "3",
    "52": "4",
    "53": "5",
    "54": "6",
    "55": "7",
    "56": "8",
    "57": "9",
    "65": "a",
    "66": "b",
    "67": "c",
    "68": "d",
    "69": "e",
    "70": "f",
    "71": "g",
    "72": "h",
    "73": "i",
    "74": "j",
    "75": "k",
    "76": "l",
    "77": "m",
    "78": "n",
    "79": "o",
    "80": "p",
    "81": "q",
    "82": "r",
    "83": "s",
    "84": "t",
    "85": "u",
    "86": "v",
    "87": "w",
    "88": "x",
    "89": "y",
    "90": "z",
    "186": ";",
    "187": "=",
    "188": ",",
    "189": "-",
    "190": ".",
    "191": "/",
    "192": "`",
    "219": "[",
    "220": "\\",
    "221": "]",
    "222": "'",
};

class KeyBinder extends Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            value: this.props.value,
            lastValue: this.props.value,
            lastKeyPressed: "",
            focused: false,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value,
            lastValue: newProps.value,
            lastKeyPressed: "",
        });
    }

    save() {
        this.props.onChange(this.state.value);
    }

    loseFocus() {
        this.inputRef.current.blur();
    }

    onBlur() {
        let newState = {focused: false}
        if (this.state.value === "" || MOD_KEY[this.state.value]) {
            newState.value = this.state.lastValue
        }

        this.setState(newState, () => this.save());
    }

    onKeyDown(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.key === "Escape" || e.key === "Enter") {
            this.loseFocus();
            return;
        }

        if (e.key === "Backspace") {
            this.loseFocus();
            this.setState({
                value: "",
                lastValue: this.props.value,
                lastKeyPressed: "",
            }, () => this.save());
            return;
        }

        if (!!KEY_DISPLAY[e.keyCode]) {
            let newState = {lastKeyPressed: e.keyCode};

            if (MOD_KEY[e.keyCode]) {
                // A mod is pressed
                // Add this to the value and wait for another key
                newState.value = e.keyCode;
            } else if (e.ctrlKey|| e.shiftKey || e.altKey) {
                // A non-mod key is pressed with a mod
                // Assign the key
                newState.value = `${this.state.lastKeyPressed}+${e.keyCode}`;
                this.loseFocus();
            } else {
                // A single key that is not a mod has been pressed
                // Assign the key
                newState.value = e.keyCode;
                this.loseFocus();
            }

            this.setState(newState);
        }
    }

    onKeyUp(e) {
        if (e.keyCode === this.state.lastKeyPressed && MOD_KEY[e.keyCode]) {
            this.setState({
                value: "",
                lastKeyPressed: "",
            });
        }
    }

    renderKeys(value) {
        let keyText = String(value);

        if (keyText === "") {
            return null;
        }

        if (keyText.indexOf("+") !== -1) {
            let [mod, key] = keyText.split("+");
            return keyText = `${KEY_DISPLAY[mod]} + ${KEY_DISPLAY[key]}`;
        }

        return keyText = KEY_DISPLAY[keyText];
    }

    renderKeyDisplay() {
        let keyDisplayText = this.renderKeys(this.state.value);
        let classes = "keybind-display keybind-shaper";

        if (keyDisplayText === null) {
            if (this.state.focused === true) {
                classes += " keybind-assign";
                keyDisplayText = "ASSIGN";
            } else {
                classes += " keybind-none";
                keyDisplayText = "NONE";
            }
        }

        return (
            <div className={classes}>
                {keyDisplayText}
            </div>
        );
    }

    render() {
        return (
            <div className="keybind-container">
                <input
                    ref={this.inputRef}
                    id={this.props.id}
                    className="keybind-input keybind-shaper"
                    type="text"
                    onFocus={() => this.setState({
                        value: "",
                        lastValue: this.state.value,
                        lastKeyPressed: "",
                        focused: true,
                    })}
                    onBlur={() => this.onBlur()}
                    onKeyDown={(e) => this.onKeyDown(e)}
                    onKeyUp={(e) => this.onKeyUp(e)}
                />
                {this.renderKeyDisplay()}
            </div>
        );
    }
}

export default KeyBinder;
