export * from '@/ctrl.ui'
import {collapseObject} from '@/utils'

var setts = {
    $debounce: "A",
	number_1: 100,
	label_1: "text",
	panel_1: {
		$aggregate: 1,
        $collapse: true,
		$onChange: function (val) {
			console.log('panel_1 values changed:', this, val)
			this.label_2 = "asd"
		},
		$onTagChange: [
			"nnn", function (newVal, tag) {
				console.log('panel_1 onTagChange:', this, tag, newVal)
			}
		],
		number_21: 101,
		label_2: "text1",
		panel_1_2: {
			$onChange: (newVal) => {
				console.log('panel_1_2 values changed:', newVal)
			},
            $onTagChange: [
                "nnn", (newVal, tag) => {
                    console.log('panel_1_2 onTagChange:', tag, newVal)
                }
            ],
			number_3: 102,
			label_3: "text2",
			panel_1_2_3: {
				number_4: 102,
				label_4: {$value: "text3", $tags: ["nnn", 'sss']},
				texta: {
					$invalidOk: 1,

					$value: "A",
					$pattern: /^[A-Z]*$/,
					$tags: ["nnn", 'sss'],
					$onChange: function (newVal) {
						console.log('it changes to : ' + newVal)
						console.log('and it is : ' + setts.panel_1.panel_1_2.panel_1_2_3.texta)
						setts.panel_1.panel_1_2.panel_1_2_3.texta = "AAA"
						console.log('and now it is : ' + setts.panel_1.panel_1_2.panel_1_2_3.texta)
						console.log('changing number')
						setts.panel_1.panel_1_2.number_3 = 654321
                        setts.panel_1.panel_1_2.panel_1_2_3.label_4 = '----'
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