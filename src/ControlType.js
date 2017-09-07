const typeChecks = []

export const registerTypeCheck = (component, types, check) => {
	typeChecks.push([Array.isArray(types) ? types : [types], check, component])
}

export const registerTypeChecks = (component, checks) => {
	if (checks)
		checks.forEach(([types, check]) => {
			registerTypeCheck(types, check, component)
		})
}

export const getComponentForValue = (value) => {
    let maxScore = 0;
    let conponent = undefined
    let valueType = typeof value
    typeChecks.forEach(([types, check, comp]) => {
        if (valueType in types) {
            let score = check(value)
            if (score > maxScore) {
				maxScore = score
                conponent = comp
			}
        }
    })
	if (conponent === undefined)
    	console.error(`Value Type wasn't matched! type: ${valueType}, value: ${value}`)
    return conponent
}
