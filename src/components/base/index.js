import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import {fieldNameToLabel} from '@/utils'

export default class Base extends Component {
	constructor() {
		super()

		this.state.label = this.getControlLabel()
	}

	componentDidMount() {
		this.setState({ label: this.getControlLabel() });
	}

	@bind
	getControlLabel() {
		return this.props ? this.props.label || fieldNameToLabel(this.props.name) : '_Unnamed_';
	}

    @bind
    onChange(newValue, overrideCallback) {
        const cb = overrideCallback || this.props.onChange
        if (cb)
            cb(newValue)

		if (this.props.notifyParentOnChange)
            this.props.notifyParentOnChange(this.props.name, newValue)
    }
}

Base.propTypes = {
	// required
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	// optional
	onChange: PropTypes.func,
    notifyParentOnChange: PropTypes.func,
}
