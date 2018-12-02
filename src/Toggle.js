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
                />
                <label for={this.props.id} className="toggle"><div></div></label>
            </div>
        );
    }
}

export default Toggle;
