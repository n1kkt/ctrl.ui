import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import { Base } from '@@/components/base';

export default class Input extends Base {

	constructor() {
		super()

		this.state.patternCheck = null
		this.state.value = null
	}

	/* ------- OVERRIDES ------- */

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

		this.setState({
			patternCheck: patternCheck,
			value: this.props.value,
		});
	}

	onChange(evt, overrideCallback) {
		let newValue = evt.target.value

		// if pattern specified check if new value matches it
		let ptrn = this.props.pattern
		if (this.state.patternCheck && !this.state.patternCheck(newValue)) {
			//evt.target.value = this.state.value
			this.setState({
				value: this.state.value,
			});
			return
		}

		console.log('input changed', this.props.name, newValue)

		this.setState({
			value: newValue,
		});

		super.onChange(newValue, overrideCallback)
	}

	/* ------- METHODS ------- */
	@bind
	onKeyDown(evt) {
		if (evt.keyCode === 0)
			return true
		let newValue = evt.target.value + String.fromCharCode(evt.keyCode)
		// if pattern specified check if new value matches it
		let ptrn = this.props.pattern
		if (this.state.patternCheck && !this.state.patternCheck(newValue)) {
			return false
		}
		return true
	}

    @bind
	onFinishChange(evt) {
		const cb = this.props.onFinishChange
		if (cb)
			this.onChange(evt, cb)
	}

	/* ----------------------- */

	render({}, {value, label}) {
		return (
			<div class="control">
				<div class="label">{label}</div>
				<div class="value">
					<input type="text" value={value}
						   onInput={this.onChange}
						   onChange={this.onFinishChange}
						   />
				</div>
			</div>
		);
	}
}
export { Input }

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

