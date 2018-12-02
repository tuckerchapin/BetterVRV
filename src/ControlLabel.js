import React, { Component } from 'react';

import './styles/ControlLabel.css';

class ControlLabel extends Component {
    render() {
        return (
            <label className="control-label" for={this.props.for}>
                <div className="control-title">
                    {this.props.title}
                </div>
                <div className="control-description">
                    {this.props.description}
                </div>
            </label>
        );
    }
}

export default ControlLabel;
