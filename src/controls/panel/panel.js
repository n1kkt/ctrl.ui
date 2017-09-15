import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import { Container } from '@@/components/container';
import { ExpandChevron } from '@@/components/expand-chevron';
import { collapseObject } from '@/utils'

export default class Panel extends Container {

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
		//if (props.origin)
		//	this.state.value = props.origin[props.name]

	}

    /* ------- OVERRIDES ------- */

	/*componentDidMount() {
		super.componentDidMount()
	}*/

	/*@bind
	getValue() {
		return this.state.value
	}*/

	/* ------- METHODS ------- */

	@bind
	toggleExpanded() {
		this.setState({ expanded: !this.state.expanded });
	}

	/* ----------------------- */

    render({content, onChange, notifyParentOnChange, onTagChange}, {expanded, label}) {
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
				{content.map(childData => Panel.constructChild(childData, {parent: this}))}
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

	expanded: PropTypes.bool,
}

