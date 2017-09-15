export * from '@/ctrl.ui'
import {collapseObject} from '@/utils'

var setts = {
	number_1: 100,
	label_1: "text",
	panel_1: {
		$onChangeCollapveValues: true,
		$onChange: function (val) {
			console.log('panel_1 values changed:', val)
			this.label_2 = "asd"
		},
		$onTagChange: [
			"nnn", (newVal) => {
				console.log('panel_1 onTagChange:', newVal)
			}
		],
		number_2: 101,
		label_2: "text1",
		panel_1_2: {
			$onChange: (newVal) => {
				console.log('panel_1_2 values changed:', newVal)
			},
			number_3: 102,
			label_3: "text2",
			panel_1_2_3: {
				number_4: 102,
				label_4: "text3",
				texta: {
					$value: "A",
					$pattern: /^[A-Z]*$/,
					$tags: ["nnn"],
					$onChange: function (newVal) {
						console.log('it changes to : ' + newVal)
						console.log('and it is : ' + setts.panel_1.panel_1_2.panel_1_2_3.texta)
						setts.panel_1.panel_1_2.panel_1_2_3.texta = "AAA"
						console.log('and now it is : ' + setts.panel_1.panel_1_2.panel_1_2_3.texta)
						console.log('changing number')
						setts.panel_1.panel_1_2.number_3 = 654321
					}
				}
			}
		}
	},
	color: {$value: "#ff00ff", $type: 'color'},
	color_2: "#ff00ff",
	color_3: {$v: "#ff00ff", t: 'color'},
	panel_2: {
		number_4: 102,
		label_4: "text2",
	}
}

window.setts = setts

console.log("hey")
console.log(setts)
console.log("hoy1")
console.log(collapseObject(setts))

ctrl.ui(setts)