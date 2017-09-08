import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import Base from '@@/base';

import {registerTypeCheck, getComponentByType} from '../../ControlType'

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

		// if pattern specified check if new value matches it
		let ptrn = this.props.pattern
		if (state.patternCheck && !state.patternCheck(newValue))
			return evt.preventDefault()

		const cb = overrideCallback || this.props.onChange
		if (cb)
			cb(newValue)
	}

	onFinishChange(evt) {
		const cb = this.props.onFinishChange
		if (cb)
			this.onChange(evt, cb)
	}

	render({label, value, name}, state) {
		let labelText = label || state.label
		return (
			<div class="inputControl">
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


registerTypeCheck(Input, 'input', [
	['string', val => 1],
	['number', val => 1],
])

Input.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	onChange: PropTypes.func,
	onFinishChange: PropTypes.func,
	pattern: PropTypes.oneOfType([
		PropTypes.instanceOf(RegExp),
		PropTypes.func,
		PropTypes.string,
	]),
}
