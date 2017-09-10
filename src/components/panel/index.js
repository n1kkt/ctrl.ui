import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import Base from '@@/base';
// import all components so they could register type association
import * as components from "@@";

import {registerTypeCheck, getComponentByType} from '../../ControlUI'

export default class Panel extends Base {

    static constructChild(childData, otherProps) {
        const Comp = childData.options.comp
        if (Comp)
            return <Comp name={childData.name}
                         {...childData.options}
                         content={childData.content}
                         origin={childData.content}
                         {...otherProps}/>
        else
            return null
    }

    @bind
    onChildChange(name, newValue) {
        console.log('child changed', name, newValue)
        super.onChange({[name]: newValue})
    }

    render({label, content}, state) {
        return (
            <div class="panel">
                <div class="label">
                    <div class="text">{state.label}</div>
                    <div class="expand-symbol"><span class="fa fa-chevron-right"/></div>
                </div>
                <div class="content">
                {content.map(childData => Panel.constructChild(childData, {
                    notifyParentOnChange: this.onChildChange
                }))}
                </div>
            </div>
        );
    }
}

Panel.valueTypes = {
    object: val => {
        return Object.keys(val).filter(key => key.charAt(0) !== '$').length ? 1 : 0
    },
}

Panel.propTypes = {
    // required
    // optional
}

export { Panel }