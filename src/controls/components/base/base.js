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
		this._changeLoopGuard = false
		if (props.debounce > 0)
			this.onChange = debounce(this.onChange, props.debounce)
	}

	/*componentDidMount() {

	}*/

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

    onChange(thisObj, args) {
		if (this._changeLoopGuard)
			return
		const callback = this.props.onChange
		if (callback) {
			if (this.$onChange_loopguard === callback) {
				console.log(`Infinite loop prevention! Field: ${this.props.name} modified during onChange event. Same callback won't be called twice in same stack.`)
				// in case of value change while callback was executing we save last value to pass it to the parent onchange event instead of old one
				this.$onChange_loopguard_lastval = newValue
				return;
			} else {
				this.$onChange_loopguard = callback
				callback.apply(thisObj, args)
				this.$onChange_loopguard = undefined
			}
		}

		if (this.props.notifyParentOnChange) {
			if (this.$onChange_loopguard_lastval !== undefined) {
				// value was modified while onchange callback was executed, use latest lavue instead of old one
				newValue = this.$onChange_loopguard_lastval
				this.$onChange_loopguard_lastval = undefined
			}
			this.props.notifyParentOnChange(thisObj, args, this)
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
	id: PropTypes.string,
	tags: PropTypes.array,
	origin: PropTypes.object,
	onChange: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.arrayOf(PropTypes.func),
	]),
	debounce: PropTypes.number,
    notifyParentOnChange: PropTypes.func,
}
