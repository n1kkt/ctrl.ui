import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import { Base } from '@@/components/base';
import { ExpandChevron } from '@@/components/expand-chevron';

export default class Panel extends Base {

    static constructChild(childData, otherProps) {
        const Comp = childData.options.comp
        if (Comp)
            return <Comp name={childData.name}
                         {...childData.options}
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
    onChildChange(newValue, name) {
        console.log(' __ child changed:', name, newValue)
        super.onChange({[name]: newValue})
    }

	@bind
	toggleExpanded() {
		this.setState({ expanded: !this.state.expanded });
	}

	/* ----------------------- */

    render({content}, {expanded, label}) {
        return (
            <div class="panel">
                <div class="label" onClick={this.toggleExpanded}>
                    <div class="text">{label}</div>
					<div class="expand-symbol">
                    {/*<span class="fa fa-chevron-right"/>*/}
                    	<ExpandChevron expanded={expanded}/>
					</div>
                </div>
                <div class={`content ${expanded ? 'expanded': 'collapsed'}`}>
                {content.map(childData => Panel.constructChild(childData, {
                    notifyParentOnChange: this.onChildChange
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
	expanded: PropTypes.bool,
}

