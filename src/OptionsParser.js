import {getComponentTypeForValue} from "./ControlType"

const newCompData = (name, origin, options, content) => {
	return {
		name: name || '',
		origin: origin,
		options: options || {},
		content: content || [],
	}
}

export function settingsParser(settings, name) {
	const crumbs = ['_root_']

	function parseSettingsObject(settObj, name) {
		const opts = [],
			setts = []
		Object.keys(settObj).forEach(key => {
			(key.charAt(0) === '$' ? opts : setts).push(key)
		})

		const compData = newCompData(name)

		opts.forEach(key => {
			const optName = key.substr(1),
				optVal = settObj[key]

			if (optName === '') {
				if (typeof optVal !== 'object')
					throw new Error(`Options collection $ should be an object: { $: {...}}. Location: '${crumbs.join('.')}', value type: '${typeof optVal}', value: '${optVal}'`)
				Object.entries(optVal).forEach(([key, value]) => {
					compData.options[key] = value
				})
			} else {
				compData.options[optName] = optVal
			}
		})

		setts.forEach(settName => {
			const settVal = settObj[settName]
			let data = (typeof settVal === 'object' && !Array.isArray(settVal))
				? parseSettingsObject(settVal, settName)
				: newCompData(settName, settObj, {type: getComponentTypeForValue(settVal), value: settVal})
			data.origin = settObj
			// if (data.options.type)
				compData.content.push(data)
		})

		if (!compData.options.type)
			compData.options.type = getComponentTypeForValue(settObj)

		// remove options from original object, since it may be a simple value
		// opts.forEach(key => delete settObj[key])

		return compData
	}

	return parseSettingsObject(settings, name)
}
