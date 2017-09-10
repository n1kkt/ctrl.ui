// camelCase|kebab-case|snake_case => "Label case"
export const fieldNameToLabel = (name) => {
	let label = name.split(/(?=[A-Z0-9])|[\-\_]/)
		.map(s => s.toLowerCase())
		.join(" ")
	label = label.charAt(0).toUpperCase() + label.substr(1)
	return label
};
