import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import {fieldNameToLabel} from '@/utils'

export default class Base extends Component {

	constructor(props) {
		super()
		this.state.label = props.label || fieldNameToLabel(props.name)
		this.state.name = props.name
		this.state.origin = props.origin
		if (props.debounce > 0)
			this.onChange = debounce(this.onChange, props.debounce)
	}

	componentDidMount() {

	}

	linkValueToOrigin(getter, setter) {
		let oo = this.state.origin,
			name = this.state.name,
			self = this
		if (oo) {
			delete oo[name]
			let definition = {}
			if (getter !== false)
				definition.get = typeof getter === 'function' ? getter : () => self.getFormattedValue()
			if (setter !== false)
				definition.set = typeof setter === 'function' ? setter : newValue => { self.onChange(newValue) }
			Object.defineProperty(oo, name, definition);
		}
	}

	//@bind
	getControlLabel() {
        return this.props ? this.props.label || fieldNameToLabel(this.props.name) : '_Unnamed_';
    }

	getFormattedValue() {
		return this.state.value
	}

    onChange(newValue, overrideCallback) {
		const caalback = overrideCallback || this.props.onChange
		if (caalback) {
			if (this.__onChange_infiniteLoopGuard === caalback) {
				console.log(`Infinite loop prevention! Field: ${this.props.name} modified during onChange event. Same callback won't be called twice in same stack.`)
				this.__onChange_infiniteLoopGuard_lastValue = newValue
				return;
			} else {
				this.__onChange_infiniteLoopGuard = caalback
				caalback(newValue)
				this.__onChange_infiniteLoopGuard = undefined
			}
		}

		if (this.props.notifyParentOnChange) {
			if (this.__onChange_infiniteLoopGuard_lastValue !== undefined) {
				newValue = this.__onChange_infiniteLoopGuard_lastValue
				this.__onChange_infiniteLoopGuard_lastValue = undefined
			}
			this.props.notifyParentOnChange(newValue, this.state.name)
		}
    }
}
export { Base }

Base.propTypes = {
	// required
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	// optional
	origin: PropTypes.object,
	onChange: PropTypes.func,
	debounce: PropTypes.number,
    notifyParentOnChange: PropTypes.func,
}
