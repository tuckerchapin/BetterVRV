import React, { Component } from 'react';

import './styles/NumberInput.css';

class NumberInput extends Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
        this.decimal = !!this.props.decimal;

        let formattedInitialValue = this.formatValue(this.props.value);
        this.state = {
            value: formattedInitialValue,
            lastValue: formattedInitialValue,
            focused: false,
        }
    }

    componentWillReceiveProps(newProps) {
        let newValue = this.formatValue(newProps.value);
        this.setState({
            value: newValue,
            lastValue: newValue,
        });
    }

    save() {
        this.props.onChange(this.state.value);
    }

    setValue(newValue) {
        this.setState({
            value: this.formatValue(newValue),
            lastValue: this.state.value
        }, () => this.save());
    }

    onKeyPress(e) {
        if (e.key === "Escape" || e.key === "Enter") {
            this.inputRef.current.blur();
        } else if (e.key === "ArrowUp") {
            let newValue = parseFloat(this.state.value) + parseFloat(this.props.increment);
            if (!this.props.max || (this.props.max && newValue <= this.props.max)) {
                this.setValue(newValue);
            }
            e.stopPropagation();
            e.preventDefault();
        } else if (e.key === "ArrowDown") {
            let newValue = parseFloat(this.state.value) - parseFloat(this.props.increment);
            if (!this.props.min || (this.props.min && newValue >= this.props.min)) {
                this.setValue(newValue);
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }

    formatValue(value) {
        if (!!this.decimal) {
            return parseFloat(value).toFixed(2);
        }
        return parseInt(value).toFixed(0);
    }

    onChange(value) {
        this.setState({value});
    }

    onBlur() {
        // Check that any user-inputted values are valid.
        if (
            (!this.props.max ||
                (this.props.max && this.state.value <= this.props.max)
            ) &&
            (!this.props.min ||
                (this.props.min && this.state.value >= this.props.min)
            )
        ) {
            // If there is a max, it is leq.
            // If there is a min, it is geq.
            this.setState({focused: false}, () => this.setValue(this.state.value));
        } else {
            this.setState({focused: false}, () => this.setValue(this.state.lastValue));
        }
    }

    render() {
        return (
            <div className="number-input-container">
                <input
                    ref={this.inputRef}
                    id={this.props.id}
                    className="number-input"
                    type="number"
                    value={this.state.value}
                    disabled={this.props.disabled}
                    onChange={(e) => this.onChange(e.target.value)}
                    onFocus={(e) => this.setState({focused: true})}
                    onBlur={(e) => this.onBlur(e)}
                    onKeyDown={(e) => this.onKeyPress(e)}
                />
                <div className="unit-label">
                    {this.props.displayUnit}
                </div>
            </div>
        );
    }
}

export default NumberInput;
