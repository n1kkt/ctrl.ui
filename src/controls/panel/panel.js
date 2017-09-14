import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import { Base } from '@@/components/base';
import { ExpandChevron } from '@@/components/expand-chevron';
import {collapseObject} from '@/utils'

export default class Panel extends Base {

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

		this.state.expanded = props.expanded
		if (props.origin)
			this.state.value = props.origin[props.name]

		let onTagChange = { $filteredList : [] }
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
							onTagChange.$filteredList.push([tag, val])
					})
					tagsStack = []
				}
			})
		} else if (props.onTagChange instanceof Object) {
			onTagChange = props.onTagChange
		}

		if (Object.keys(onTagChange).length)
			this.state.onTagChange = onTagChange


		this.linkValueToOrigin(true, false)
	}

    /* ------- OVERRIDES ------- */

	/*componentDidMount() {
		super.componentDidMount()
	}*/

	@bind
	getFormattedValue() {
		return this.state.value
	}

	/* ------- METHODS ------- */

    @bind
    onChildChange(newValue, child) {
        let { name } = child.state
        let { tags } = child.props
        let { onTagChange } = this.state

		// notify tag specific callbacks
		if (onTagChange && tags) {
			tags.forEach(tag => {
				if (tag in onTagChange)
					onTagChange[tag](newValue, name, tag)
				onTagChange.$filteredList.forEach(([regexp, func]) => {
					if (regexp.test(tag))
						func(newValue, name, tag)
				})
			})
		}

		console.log(' __ child changed:', name, newValue)
		if (this.props.collapseOnChange) {
			super.onChange(collapseObject({ [name]: newValue }))
		} else {
			super.onChange({ [name]: newValue })
		}

    }



	@bind
	toggleExpanded() {
		this.setState({ expanded: !this.state.expanded });
	}

	/* ----------------------- */

    render({content, onChange, notifyParentOnChange, onTagChange}, {expanded, label}) {
    	let pcb = onChange || notifyParentOnChange || onTagChange ? this.onChildChange : null
        return (
            <div class="panel">
                <div class="label" onClick={this.toggleExpanded}>
                    <div class="text">{label}</div>
					<div class="expand-symbol">
                    {/*<span class="fa fa-chevron-right"/>*/}
                    	<ExpandChevron expanded={expanded}/>
					</div>
                </div>
                <div class={`content ${(expanded ? "expanded": "collapsed")}`}>{/*//`;*/}
				{content.map(childData => Panel.constructChild(childData, {
                    notifyParentOnChange: pcb
                }))}
                </div>
            </div>
        );
    }
}
export { Panel }

Panel.valueTypes = {
    object: val => {
        return Object.keys(val).filter(key => key.charAt(0) !== '$').length ? 1 : 0
    },
}

Panel.defaultProps = {
	expanded: true,
};

Panel.propTypes = {
	onTagChange: PropTypes.oneOfType([
		PropTypes.objectOf(PropTypes.func),
		PropTypes.arrayOf(PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string,
		])),
	]),
	expanded: PropTypes.bool,
	collapseOnChange: PropTypes.bool,
}

