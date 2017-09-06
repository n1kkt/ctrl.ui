import { h, render, Component } from 'preact';
import Panel from './components/panel'

var setts = {
	number: 100,
	label: "text",
	panel: {
		another_number: 124,
		anotherLabel: "text 2",
		range: {$value: 200, $type: 'slider', $min: 10, $max: 2000}
	},
	color$: {v: "#ff00ff", t: 'color'},
	panel2: {
		$: {opt1: 1, op2: 2},
		someVal: 100,
	}
}

console.log("hey")
console.log(setts)
console.log("hoy")

render(<Panel />, document.body);

export default setts