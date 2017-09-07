import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import {registerTypeCheck} from '../../ControlType'

export default class Panel extends Component {
	render(props, state) {
		return (
			<div class="panel">
				<h1>Preact App 1s</h1>
			</div>
		);
	}
}

registerTypeCheck(Panel, 'object', val => {
	let score = 0
	let non$keys = Object.keys(val).filter(key => key.charAt(0) !== '$').length
	if (non$keys > 0)
		score = 1
	return score
})

Panel.propTypes = {
	optionalArray: PropTypes.array,
}
