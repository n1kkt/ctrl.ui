import { h, render, Component } from 'preact';
import {settingsParser} from './OptionsParser'
import {Panel} from './components'

function ui (opts) {
	let data = settingsParser(opts)
	render(<Panel {...data.options} />, data.options.mount || document.body);
	return opts
}

export default ui