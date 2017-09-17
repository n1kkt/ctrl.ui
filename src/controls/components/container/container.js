import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import {toLabelCase} from '@/utils'
import { Base } from "@@/components/base"
import { collapseObject, deepMergeObj } from "../../../utils"
import { extendPropTypes } from '@/dtors'

@extendPropTypes
export default class Container extends Base {

	static constructChild(childData, otherProps) {
		const Comp = childData.options.comp
		if (Comp)
			return <Comp {...childData.options}
						 name={childData.name}
						 content={childData.content}
						 origin={childData.origin}
						 {...otherProps}/>
		else
			return null
	}

    /* ------- PROPS ------- */

    static propTypes = {
        onTagChange: PropTypes.oneOfType([
            PropTypes.objectOf(PropTypes.func),
            PropTypes.arrayOf(PropTypes.oneOfType([
                PropTypes.func,
                PropTypes.string,
            ])),
        ]),
        collapse: PropTypes.bool,
        aggregate: PropTypes.bool,
    }


    /* ------- CTOR ------- */

	constructor(props) {
		super(props)

		let onTagChange = { $filterList : [] }
		if (Array.isArray(props.onTagChange)) {
			let tagsStack = []
			props.onTagChange.forEach(val => {
				if (typeof val === 'string') {
					tagsStack.push(val)
				} else if (typeof val === 'function') {
					tagsStack.forEach(tag => {onTagChange[tag] = val})
					tagsStack = []
				}
			})
		} else if (props.onTagChange instanceof Object) {
			onTagChange = props.onTagChange
		}

		if (Object.keys(onTagChange).length)
			this.state.onTagChange = onTagChange

		this.__changeQueue = []
	}

	/* ------- OVERRIDES ------- */

	setValue(newValue) {
		/*if (this.willChange(newValue)) {
			this.setState({value: newValue})
			this.didChange(newValue)
		}*/
	}

	willChange(newValue, child) {
		let canChange = super.willChange(newValue, child) !== false
		if (canChange && this.props.aggregate)
			this.__changeQueue.push(child)
		return canChange
	}

	didChange(newValue, child, tail=[]) {
        newValue = {[child.state.name]: newValue}
        this.props.aggregate
            ? this.handleAggregatedOnChange(newValue, tail)
            : this.handleOnChange(newValue, tail)

		if (this.props.parent)
			this.props.parent.didChange(newValue, this, [child].concat(tail))
	}

	/* ------- METHODS ------- */

	handleOnChange(newValue, tail) {
        if (this.props.onChange || this.state.onTagChange) {
			this.invokeCallbacks(newValue, tail)
        }
	}

	handleAggregatedOnChange(newValue, tail) {
        if (this.props.onChange || this.state.onTagChange) {
            this.__changeQueue.pop()

            if (!this.__changeQueue.length) {
                // merge values from change cache, new override old
                if (this.__childChangeCache) {
                    newValue = deepMergeObj(newValue, this.__childChangeCache, tail.length)
                    this.__childChangeCache = undefined
                }
                // invoke callbacks
                this.invokeCallbacks(newValue, tail)
            } else {
                this.__childChangeCache = deepMergeObj(newValue, this.__childChangeCache, tail.length)
            }
        }
	}

	invokeCallbacks(newValue, tail) {
		let callback = this.props.onChange,
			tagCallbacks = this.state.onTagChange

		// notify tag specific callbacks
		if (tagCallbacks && tail) {
			let called = {}
            tail.forEach( ({props:{tags}}) => {
				tags && tags.forEach(tag => {
                    if (tag in tagCallbacks && !called[tag]) {
                        let cb = tagCallbacks[tag]
                        cb.length === 0
							? this.loopGuard(cb, this.state.value)
							: this.props.collapse
								? this.loopGuard(cb, this.state.value, collapseObject(newValue), tag)
								: this.loopGuard(cb, this.state.value, newValue, tag)
                        called[tag] = true
                    }
                })
			})
		}

		if (callback) {
            callback.length === 0
				? this.loopGuard(callback, this.state.value)
				: this.props.collapse
					? this.loopGuard(callback, this.state.value, collapseObject(newValue))
					: this.loopGuard(callback, this.state.value, newValue)
		}
	}

}
export { Container }
