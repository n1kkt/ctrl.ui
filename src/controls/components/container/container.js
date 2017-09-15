import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import {fieldNameToLabel} from '@/utils'
import { Base } from "@@/components/base"
import {collapseObject} from "../../../utils"

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

	/* ------- CTOR ------- */

	constructor(props) {
		super(props)

		let onTagChange = { $filterList : [] }
		if (Array.isArray(props.onTagChange)) {
			let tagsStack = []
			props.onTagChange.forEach(val => {
				if (typeof val === 'string' || val instanceof RegExp) {
					tagsStack.push(val)
				} else if (typeof val === 'function') {
					tagsStack.forEach(tag =>  {
						if (typeof tag === 'string')
							onTagChange[tag] = val
						else
							onTagChange.$filterList.push([tag, val])
					})
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
		//console.log("__willChange", newValue, child)
		let canChange = super.willChange(newValue, child) !== false
		if (canChange && this.props.aggregateUpdates)
			this.__changeQueue.push(child)
		//console.log("__willChange", this.__changeQueue.length, newValue, child)
		return canChange
	}

	didChange(newValue, child, tags) {
		if (this.props.aggregateUpdates)
            this.handleAggregatedOnChange(newValue, child, tags)
		else
            this.handleOnChange(newValue, child, tags)

		if (this.props.parent) {
			if (tags || child.props.tags)
				tags = (tags || []).concat(child.props.tags)
			this.props.parent.didChange(newValue, this, tags)
		}
	}

	/* ------- METHODS ------- */

	handleOnChange(newValue, child, tags) {
        if (this.props.onChange || this.state.onTagChange) {
            newValue = {[child.state.name]: newValue}
			this.invokeCallbacks(newValue, child, tags)
        }
	}

	handleAggregatedOnChange(newValue, child, tags) {
        if (this.props.onChange || this.state.onTagChange) {
            this.__changeQueue.pop()
            newValue = {[child.state.name]: newValue}
            if (!this.__changeQueue.length) {
                // merge values from change cache, new override old
                if (this.__childChangeCache) {
                    newValue = Object.assign(this.__childChangeCache, newValue)
                    this.__childChangeCache = undefined
                }
                // invoke callbacks
                this.invokeCallbacks(newValue, child, tags)
            } else {
                this.__childChangeCache = Object.assign(this.__childChangeCache || {}, newValue)
            }
        }
	}

	invokeCallbacks(newValue, child, tags) {
		let callback = this.props.onChange,
			tagCallbacks = this.state.onTagChange,
			args

		// notify tag specific callbacks
		if (tagCallbacks && tags) {
			let called = {}
			tags.forEach(tag => {
				if (tag in tagCallbacks && !called[tag]) {
					let cb = tagCallbacks[tag]
					args = cb.length ? [this.props.onChangeCollapveValues ? collapseObject(newValue) : newValue] : null
					this.loopGuard(cb, this.state.value, args)
					called[tag] = true
				}
			})
		}

		if (callback) {
			args = callback.length ? [this.props.onChangeCollapveValues ? collapseObject(newValue) : newValue] : null
			this.loopGuard(callback, this.state.value, args)
		}
	}

}
export { Container }

Container.propTypes = {
	onTagChange: PropTypes.oneOfType([
		PropTypes.objectOf(PropTypes.func),
		PropTypes.arrayOf(PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string,
		])),
	]),
	onChangeCollapveValues: PropTypes.bool,
	aggregateUpdates: PropTypes.bool,
}
