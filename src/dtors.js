
export const extendPropTypes = (Class) => {
    const parent = Object.getPrototypeOf(Class)
    if (parent && 'propTypes' in parent) {
        Class.propTypes = Object.assign(Class.propTypes || {}, parent.propTypes)
    }
    if (parent && 'defaultProps' in parent) {
        Class.defaultProps = Object.assign(Class.defaultProps || {}, parent.defaultProps)
    }
    return Class;
}