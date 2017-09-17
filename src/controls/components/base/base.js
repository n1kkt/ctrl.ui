import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import { toLabelCase } from '@/utils'
import { Container } from "@@/components/container"

export default class Base extends Component {

	static propTypes = {
        // required
        name: PropTypes.string.isRequired,
        parent: PropTypes.instanceOf(Container),
        value: PropTypes.any.isRequired,
        // optional
        id: PropTypes.string,
        tags: PropTypes.array,
        origin: PropTypes.object,
        onChange: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.arrayOf(PropTypes.func),
        ]),
        debounce: PropTypes.number.isRequired,
        notifyParentOnChange: PropTypes.func,
    }

    static defaultProps = {
        name: "",
        parent: null,
        value: null,
        id: null,
        tags: null,
        origin: null,
        onChange: null,
        debounce: 0,
        notifyParentOnChange: false,
    }

	constructor(props) {
		super()
		this.state.label = props.label || toLabelCase(props.name)
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
                enumerable: true,
				get: () => self.getValue(),
				set: newValue => { self.setValue(newValue) }
			});
		}
	}

	//@bind
	getControlLabel() {
        return this.props ? this.props.label || toLabelCase(this.props.name) : '_Unnamed_';
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
        return this.props.parent
			? this.props.parent.willChange(newValue, this)
			: true
    }

	didChange(newValue, child) {
		let cb = this.props.onChange
		if (cb)
            cb.length === 0
				? this.loopGuard(this.props.onChange)
				: this.loopGuard(this.props.onChange, null, newValue)

		if (this.props.parent) {
            this.props.parent.didChange(newValue, this)
        }
	}

    loopGuard(func, thisObj, ...args) {
        if (!this.__loopGueard) {
            this.__loopGueard = true
            func.apply(thisObj, args)
            this.__loopGueard = false
        }
    }
}
export { Base }
