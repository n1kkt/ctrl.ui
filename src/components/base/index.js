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

}

Base.propTypes = {
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
