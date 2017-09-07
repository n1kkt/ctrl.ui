import { h, render, Component } from 'preact';
import Panel from './components/panel'

function ui (opts) {

	render(<Panel />, document.body);
}

export default ui