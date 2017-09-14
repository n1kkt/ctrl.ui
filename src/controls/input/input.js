import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import { Base } from '@@/components/base';
import style from './style.scss';


export default class Input extends Base {

	constructor(props) {
		super(props)

		this.state.value = props.value
		this.state.initialValue = props.value
		this.state.initialValueType = typeof props.value

		let patternCheck,
			ptrn = props.pattern

		if (!ptrn && this.state.initialValueType === 'number')
			ptrn = /^[\-\+]?\d+\.?(\d+)?$/

		// make pattern check closure for current value
		if (typeof ptrn === 'function') {
			patternCheck = val => ptrn(val)
		} else if (typeof ptrn === 'string') {
			let exp = new RegExp(ptrn)
			patternCheck = val => exp.test(val)
		} else if (ptrn instanceof RegExp) {
			patternCheck = val => ptrn.test(val)
		}

		this.state.patternCheck = patternCheck
		this.state.hasInvalidInput = false
		this.linkValueToOrigin()
	}

	/* ------- OVERRIDES ------- */

	/*componentDidMount() {
		super.componentDidMount()
	}*/

	@bind
	getFormattedValue() {
		return this.state.value
	}

	@bind
	onChange(evt, overrideCallback) {
		let newValue = evt.target.value
		let inputValid = !this.state.patternCheck || this.state.patternCheck(newValue)
		if (!inputValid && !this.props.invalidOk) {
			//evt.target.value = this.state.value
			this.setState({
				value: this.state.value,
				hasInvalidInput: false,
			});
			return
		}

		console.log(' __ input changed', this.props.name, newValue)

		if (inputValid && this.state.initialValueType === 'number')
			newValue = parseFloat(newValue)

		this.setState({
			value: newValue,
			hasInvalidInput: !inputValid,
		});

		if (inputValid)
			super.dispatchOnChange(newValue, overrideCallback)
	}

	/* ------- METHODS ------- */

    @bind
	onFinishChange(evt) {
		const cb = this.props.onFinishChange
		if (cb)
			this.onChange(evt, cb)
	}

	/* ----------------------- */

	render({}, {value, label, hasInvalidInput}) {
		return (
			<div class="control input-control">
				<div class="label">{label}</div>
				<div class="value">
					<input type="text" value={value}
						   onInput={evt => this.onChange}
						   onChange={this.onFinishChange}
						   class={hasInvalidInput ? 'invalid' : ''}/>
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
    invalidOk: PropTypes.bool,
}


Input.defaultProps = {
    pattern: null,
    invalidOk: false,
};

