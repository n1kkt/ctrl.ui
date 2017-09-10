export * from '@/ctrl.ui'

var setts = {
	number: 100,
	label: "text",
	panel: {
		another_number: 124,
		anotherLabel: "text 2",
		range: {$value: 200, $type: 'slider', $min: 10, $max: 2000},
		subPanel: {
			subSubPanel: {
				texta: "A"
			}
		}
	},
	color: {$value: "#ff00ff", $type: 'color'},
	color2: "#ff00ff",
	color_3: {$v: "#ff00ff", t: 'color'},
	panel2: {
		$: {opt1: 1, op2: 2},
		someVal: 100,
	}
}

console.log("hey")
console.log(setts)
console.log("hoy1")

ctrl.ui(setts)