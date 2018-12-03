import React, { Component } from 'react';

import './styles/ControlPanel.css';

class ControlPanel extends Component {
    render() {
        return (
            <div id="spoilers" className="control-panel-container">
                <div className="control-panel-title">
                    {this.props.title}
                </div>
                <div className="control-panel">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ControlPanel;
