import { h, render, Component } from 'preact';
import { Container } from '@@/components/container'
import style from './control-ui.scss'

export default class ControlUI {

    constructor() {
        this.typeChecks = []
        this.compMap = {}
    }

    registerComponent(comp, name) {
        let compName = name || comp.name
        if (compName)
		    this.compMap[compName] = comp
        else
            throw new Error(`No component name specified`)

        const info = comp.valueTypes
        if (!info) return
        Object.entries(info).forEach(([valueType, check]) => {
            let checkFunc
            if (typeof check === 'function') {
                checkFunc = check
            } else if (typeof check === 'number') {
                checkFunc = _ => check
            } else {
                return console.error(`Unsupported check value '${typeof check}'`
                    + ` for valueType '${valueType}' (should be a number or a function)`
                    + ` in component ${comp}`)
            }
            this.typeChecks.push([comp, valueType, check])
        })
    }

    getComponentByValue(value) {
        let maxScore = 0;
        let component = undefined
        let type = typeof value
        this.typeChecks.forEach(([comp, valueType, check]) => {
            if (valueType === type) {
                let score = check(value)
                if (score > maxScore) {
                    maxScore = score
                    component = comp
                }
            }
        })
        if (component === undefined)
            console.error(`Value type wasn't matched! type: ${type}, value: ${value}`)
        return component
    }

    getComponentByType(type) {
        let component = this.compMap[type.toLowerCase()]
        if (!component)
            console.error(`Component type wasn't matched! type: ${type}`)
        return component
    }

    parseSettings(settings, name) {
        const self = this
        const crumbs = []
        // called recursively on each complex value
        function parseSettingsObject(settObj, name, originObj) {
			crumbs.push(name)
            const opts = [], setts = []
            Object.keys(settObj).forEach(key => {
                (key.charAt(0) === '$' ? opts : setts).push(key)
            })

            const newCompData = (name, origin, options, content, comp) => {
                return {
                    name: name || '',
                    origin: origin,
                    options: options || {},
                    content: content || [],
                }
            }

            const compData = newCompData(name, originObj)

            // process option fields - $***
            opts.forEach(key => {
                const optName = key.substr(1),
                    optVal = settObj[key]
                // if option field is '$' it should be a collection of options
                // so just unpack object into options
                if (optName === '') {
                    if (typeof optVal !== 'object')
                        return console.error(`Options collection $ should be an object: { $: {...}}.`
							+` Location: '${crumbs.join('.')}', value type: '${typeof optVal}'`
							+ `, value: '${optVal}'`)
                    Object.entries(optVal).forEach(([key, value]) => {
                        compData.options[key] = value
                    })
                } else {
                    compData.options[optName] = optVal
                }
            })

            // for each setting (if any) either process it as comples type
            // or deffer it's component by it's value
            setts.forEach(settName => {
                const settVal = settObj[settName]
                let data = (settVal instanceof Object && !Array.isArray(settVal))
                    ? parseSettingsObject(settVal, settName, settObj)
                    : newCompData(settName, settObj, {
                    	comp: self.getComponentByValue(settVal),
						value: settVal
                    })
                // if (data.options.type)
                compData.content.push(data)
            })

            if (compData.options.value === undefined) {
				compData.options.value = settObj
            }

            if (!compData.options.comp) {
			    let comp
			    if (compData.options.type) {
					comp = self.getComponentByType(compData.options.type)
				} else {
					comp = self.getComponentByValue(settObj)
                    if (!comp && compData.options.value)
						comp = self.getComponentByValue(compData.options.value)
                }
				compData.options.comp = comp
			}
            // remove options from original object
            // opts.forEach(key => delete settObj[key])

            return compData
        }

        return parseSettingsObject(settings, name)
    }

    init(opts) {
        let data = this.parseSettings(opts, 'options')
        render(<div class='control-ui-container'>{Container.constructChild(data)}</div>, data.options.mount || document.body)
        return opts
    }
}