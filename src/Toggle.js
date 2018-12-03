import React, { Component } from 'react';

import './styles/Control.css';
import './styles/Toggle.css';

class Toggle extends Component {
    render() {
        return (
            <div className="control-container">
                <input
                    id={this.props.id}
                    className="toggle"
                    type="checkbox"
                    checked={this.props.value}
                    disabled={this.props.disabled}
                    onChange={(e) => this.props.onChange(e.target.checked)}
                />
                <label htmlFor={this.props.id} className="toggle"><div></div></label>
            </div>
        );
    }
}

export default Toggle;
