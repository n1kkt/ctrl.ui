let labelCaseRegexMatch = /([a-z]+)|([A-Z][a-z]+)|([A-Z]+)|([0-9]+)/g

// camelCase|kebab-case|snake_case => "Label case"
export const toLabelCase = (name) => {
  let label = name.match(labelCaseRegexMatch).join(" ")
  label = label.charAt(0).toUpperCase() + label.substr(1)
  return label
};

// { a: { b: { c: 123, d: 456}}} => { 'a.b.c': 123, 'a.b.d': 456 }
export const collapseObject = (obj, sep) => {
  sep = sep || '.'
  let result = {}
  Object.keys(obj).forEach(key => {
    let val = obj[key]
    if (val && val.constructor === Object || Array.isArray(val)) {
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

// { a: 0, b: { c: 1 } }, { a: 2, b: { d: 3 } } => { a: 2, b: { c: 1, d: 3 } }
export const deepMergeObj = (objA, objB, level) => {
  if (level === undefined)
    level = -1
  if (objB)
    Object.keys(objB).forEach(key => {
      let valA = objA[key]
      let valB = objB[key]
      if (level !== 0 && valA && valA.constructor === Object && valB && valB.constructor === Object) {
        deepMergeObj(valA, valB, level - 1)
      } else {
        objA[key] = valB
      }
    })
  return objA
}


