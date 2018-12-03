/*global chrome*/
import React, { Component } from 'react';

import './styles/KeyRow.css';

class KeyRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.subrow ? "control-row control-subrow": "control-row"}>
                {this.renderControl()}
                <ControlLabel
                    for={this.kebabTitle}
                    title={this.props.title}
                    description={this.props.description}
                />
            </div>
        );
    }
}

export default KeyRow;
