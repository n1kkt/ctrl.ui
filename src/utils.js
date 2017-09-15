// camelCase|kebab-case|snake_case => "Label case"
export const fieldNameToLabel = (name) => {
	let label = name.split(/(?=[A-Z0-9])|[\-\_]/)
		.map(s => s.toLowerCase())
		.join(" ")
	label = label.charAt(0).toUpperCase() + label.substr(1)
	return label
};

// { a : { b : { c : 123, d : 456}}} => { 'a.b.c' : 123, 'a.b.d' : 456 }
export const collapseObject = (obj, sep) => {
	sep = sep || '.'
	let result = {}
	Object.keys(obj).forEach(key => {
		let val = obj[key]
		if (val && val.constructor == Object || Array.isArray(val)) {
			val = collapseObject(val, sep)
			Object.keys(val).forEach(subkey => {
				result[key + sep + subkey] = val[subkey]
			})
		} else {
			result[key] = val
		}
	})
	return result
}

export const deepMergeObj = (obj, sep) => {
	sep = sep || '.'
	let result = {}
	Object.keys(obj).forEach(key => {
		let val = obj[key]
		if (val && val.constructor == Object || Array.isArray(val)) {
			val = collapseObject(val, sep)
			Object.keys(val).forEach(subkey => {
				result[key + sep + subkey] = val[subkey]
			})
		} else {
			result[key] = val
		}
	})
	return result
}