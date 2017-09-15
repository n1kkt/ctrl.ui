import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import {fieldNameToLabel} from '@/utils'
import { Container } from "@@/components/container"

export default class Base extends Component {

	constructor(props) {
		super()
		this.state.label = props.label || fieldNameToLabel(props.name)
		this.state.name = props.name
		this.state.origin = props.origin
		this.state.value = props.value
		this._changeLoopGuard = false
		if (props.debounce > 0)
			this.onChange = debounce(this.onChange, props.debounce)
		this.linkValueToOrigin()

		this.__loopGueard = false
	}

	/*componentDidMount() {

	}*/

	linkValueToOrigin() {
		let origin = this.state.origin,
			name = this.state.name,
			self = this
		if (origin) {
			delete origin[name]
			Object.defineProperty(origin, name, {
				get: () => self.getValue(),
				set: newValue => { self.setValue(newValue) }
			});
		}
	}

	//@bind
	getControlLabel() {
        return this.props ? this.props.label || fieldNameToLabel(this.props.name) : '_Unnamed_';
    }

	getValue() {
		return this.state.value
	}

	setValue(newValue) {
		if (this.willChange(newValue) !== false) {
			this.setState({value: newValue})
			this.didChange(newValue)
		}
	}

	willChange(newValue, child) {
		if (this.props.parent)
			return this.props.parent.willChange(newValue, this)
		else
			return true
	}

	loopGuard(func, thisObj, args) {
		if (!this.__loopGueard) {
			this.__loopGueard = true
			func.apply(thisObj, args)
			this.__loopGueard = false
		}
	}

	didChange(newValue, child) {
		let cb = this.props.onChange
		if (cb)
			this.loopGuard(this.props.onChange, null, cb.length ? [newValue] : null)

		if (this.props.parent) {
			this.props.parent.didChange(newValue, this)
		}
	}
}
export { Base }

Base.propTypes = {
	// required
	name: PropTypes.string.isRequired,
	parent: PropTypes.instanceOf(Container),
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
