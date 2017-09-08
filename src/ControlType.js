const typeChecks = []
const componentTypeMap = []

/**
 * This registers component type association
 * @param component - Preact component
 * @param componentType - component string type
 * @param matchingType - type or types component can match to
 * @param check - function that check if calue matches certain criteria and returns matching score
 */
export const registerTypeCheck = (component, componentType, matchingType, check) => {
	if (Array.isArray(matchingType)) {
		matchingType.forEach(type => {
			Array.isArray(type)
				? registerTypeCheck(component, componentType, type[0], type[1])
				: registerTypeCheck(component, componentType, type, check)
		})
	} else {
		componentTypeMap[componentType] = component
		typeChecks.push([matchingType, check, component, componentType])
	}
}

export const getComponentTypeForValue = (value) => {
    let maxScore = 0;
    let conponentType = undefined
    let valueType = typeof value
    typeChecks.forEach(([type, check, comp, compType]) => {
        if (valueType === type) {
            let score = check(value)
            if (score > maxScore) {
				maxScore = score
				conponentType = compType
			}
        }
    })
	if (conponentType === undefined)
    	console.error(`Value Type wasn't matched! type: ${valueType}, value: ${value}`)
    return conponentType
}

export const getComponentByType = (compType) => componentTypeMap[compType]
