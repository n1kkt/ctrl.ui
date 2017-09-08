import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import Base from '@@/base';
// import all components so they could register type association
import * as components from "@@";

import {registerTypeCheck, getComponentByType} from '../../ControlType'

export default class Panel extends Base {
	render({label, content}, state) {
		console.log(this.props)
		console.log(state)
		return (
			<div class="panel">
				<h1>{state.label}</h1>
				{ content.map(childData => getChild(childData)) }
			</div>
		);
	}
}

const getChild = (childData) => {
	const Comp = getComponentByType(childData.options.type)
	return Comp ?
		<Comp name={childData.name} {...childData.options} content={childData.content} origin={childData.content} ></Comp>
		: null
}

registerTypeCheck(Panel, 'panel', 'object', val => {
	let score = 0
	let non$keys = Object.keys(val).filter(key => key.charAt(0) !== '$').length
	if (non$keys > 0)
		score = 1
	return score
})

Panel.propTypes = {
	optionalArray: PropTypes.array,
}
