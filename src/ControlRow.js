/*global chrome*/
import React, { Component } from 'react';

import Toggle from "./Toggle";
import ControlLabel from "./ControlLabel";

import './styles/ControlRow.css';

class ControlRow extends Component {
    render() {
        let kebabTitle = this.props.title.replace(/\s+/g, '-').toLowerCase();

        return (
            <div className={this.props.subrow ? "control-row control-subrow": "control-row"}>
                <Toggle id={kebabTitle}/>
                <ControlLabel
                    for={kebabTitle}
                    title={this.props.title}
                    description={this.props.description}
                />
            </div>
        );
    }
}

export default ControlRow;
