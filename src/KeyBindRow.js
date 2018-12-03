/*global chrome*/
import React, { Component } from 'react';

import KeyBinder from "./KeyBinder.js";

import './styles/KeyBindRow.css';

class KeyBindRow extends Component {
    constructor(props) {
        super(props);

        this.kebabTitle = this.props.title.replace(/\s+/g, '-').toLowerCase();
    }

    render() {
        return (
            <div className={this.props.subrow ? "keybind-row keybind-subrow": "keybind-row"}>
                <label className="keybind-label">
                    {this.props.title}
                </label>
                <div className="keybind-left-group">
                    <KeyBinder
                        id={this.kebabTitle + "-primary"}
                        value={this.props.value[0]}
                        onChange={(value) => {
                            this.props.value[0] = value;
                            this.props.onChange(this.props.value);
                        }}
                    />
                    <KeyBinder
                        id={this.kebabTitle + "-secondary"}
                        value={this.props.value[1]}
                        onChange={(value) => {
                            this.props.value[1] = value;
                            this.props.onChange(this.props.value);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default KeyBindRow;
