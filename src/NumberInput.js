import React, { Component } from 'react';

import './styles/Control.css';
import './styles/NumberInput.css';

class NumberInput extends Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            value: this.props.value,
            lastValue: this.props.value,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value,
            lastValue: newProps.value
        });
    }

    sanitiseAndSet(value) {
        if (value !== "") {
            value = parseInt(value);
            if (value < 1) {
                value = 1;
            } else if (value > 90) {
                value = 90;
            }
            this.setState({
                value: value,
                lastValue: this.state.value,
            });
        } else {
            this.setState({value: value});
        }
    }

    onLoseFocus() {
        if (this.state.value === "") {
            this.setState({value: this.state.lastValue});
        }
        this.props.onChange(this.state.value);
    }

    onKeyPress(e) {
        if (e.key === "Enter") {
            this.inputRef.current.blur();
        }
    }

    render() {
        return (
            <div className="control-container">
                <input
                    ref={this.inputRef}
                    id={this.props.id}
                    className="number-input"
                    type="number"
                    value={this.state.value}
                    disabled={this.props.disabled}
                    onChange={(e) => this.sanitiseAndSet(e.target.value)}
                    onBlur={() => this.onLoseFocus()}
                    onKeyPress={(e) => this.onKeyPress(e)}
                />
                <div className="seconds-label">
                    sec
                </div>
            </div>
        );
    }
}

export default NumberInput;
