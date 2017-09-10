import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import Base from '@@/base';

export default class Input extends Base {
	constructor() {
		super()

		this.state.patternCheck = null
	}

	componentDidMount() {
		super.componentDidMount()

		let patternCheck,
			ptrn = this.props.pattern

		if (typeof ptrn === 'function') {
			patternCheck = val => ptrn(val)
		} else if (typeof ptrn === 'string') {
			let exp = new RegExp(ptrn)
			patternCheck = val => exp.test(val)
		} else if (ptrn instanceof RegExp) {
			patternCheck = val => ptrn.test(val)
		}

		this.setState({ patternCheck: patternCheck });
	}

	@bind
	onChange(evt, overrideCallback) {
		let newValue = evt.target.value
        console.log('input changed', this.props.name, newValue)
		// if pattern specified check if new value matches it
        let ptrn = this.props.pattern
        if (this.state.patternCheck && !this.state.patternCheck(newValue))
            return evt.preventDefault()

		super.onChange(newValue)
	}

    @bind
	onFinishChange(evt) {
		const cb = this.props.onFinishChange
		if (cb)
			this.onChange(evt, cb)
	}

	render({label, value, name}, state) {
		let labelText = label || state.label
		return (
			<div class="control">
				<div class="label">{labelText}</div>
				<div class="value">
					<input type="text" value={value}
						   onInput={this.onChange}
						   onChange={this.onFinishChange} />
				</div>
			</div>
		);
	}
}


Input.valueTypes = {
	string: val => 1,
    number: val => 1,
}

Input.propTypes = {
	pattern: PropTypes.oneOfType([
		PropTypes.instanceOf(RegExp),
		PropTypes.func,
		PropTypes.string,
	]),
}

export { Input }