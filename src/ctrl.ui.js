import { h, render, Component } from 'preact';
import {settingsParser} from '@/OptionsParser'
import * as components from "@@";
import Panel from '@@/panel'

console.log("-------")
console.log(components)

function ui (opts) {
	console.log('ui')
	let data = settingsParser(opts, 'Options')
	render(<Panel name={data.name} {...data.options} content={data.content} origin={data.content}/>, data.options.mount || document.body);
	return opts
}

let crtl = window.ctrl || (window.ctrl = {})
crtl.ui = ui

export default ui