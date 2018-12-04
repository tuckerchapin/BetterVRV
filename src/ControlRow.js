import React, { Component } from 'react';

import ControlLabel from "./ControlLabel";
import NumberInput from "./NumberInput";
import Toggle from "./Toggle";

import './styles/ControlRow.css';

class ControlRow extends Component {
    constructor(props) {
        super(props);

        this.kebabTitle = this.props.title.replace(/\s+/g, '-').toLowerCase();
    }

    renderControl() {
        switch (this.props.controlType) {
            case "toggle":
                return this.renderToggle();
            case "number":
                return this.renderNumber();
            default:
                return null;
        }
    }

    renderToggle() {
        return (
            <Toggle
                id={this.kebabTitle}
                value={this.props.value}
                disabled={this.props.disabled}
                onChange={(value) => this.props.onChange(value)}
            />
        );
    }

    renderNumber() {
        return (
            <NumberInput
                id={this.kebabTitle}
                value={this.props.value}
                displayUnit={this.props.displayUnit}
                min={this.props.min}
                max={this.props.max}
                increment={this.props.increment}
                decimal={this.props.decimal}
                disabled={this.props.disabled}
                onChange={(value) => this.props.onChange(value)}
            />
        );
    }

    render() {
        return (
            <div className={this.props.subrow ? "control-row control-subrow": "control-row"}>
                <ControlLabel
                    for={this.kebabTitle}
                    title={this.props.title}
                    description={this.props.description}
                />
                {this.renderControl()}
            </div>
        );
    }
}

export default ControlRow;
