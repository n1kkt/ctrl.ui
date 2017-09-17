import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import {bind, memoize, debounce} from 'decko';
import {Container} from '@@/components/container';
import {ExpandChevron} from '@@/components/expand-chevron';
import {collapseObject} from '@/utils'
import {extendPropTypes} from '@/dtors'

@extendPropTypes
export default class Panel extends Container {
  
  static valueTypes = {
    object: val => {
      return Object.keys(val).filter(key => key.charAt(0) !== '$').length ? 1 : 0
    },
  }
  
  /* ------- PROPS ------- */
  
  static defaultProps = {
    expanded: true,
  }
  
  static propTypes = {
    expanded: PropTypes.bool,
  }
  
  /* ------- CTOR ------- */
  
  constructor(props) {
    super(props)
    
    this.state.expanded = props.expanded
    
  }
  
  /* ------- OVERRIDES ------- */
  
  /* ------- METHODS ------- */
  
  @bind
  toggleExpanded() {
    this.setState({expanded: !this.state.expanded});
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
        <div class={`content ${(expanded ? "expanded" : "collapsed")}`}>{/*//`;*/}
          {content.map(childData => Panel.constructChild(childData, {parent: this}))}
        </div>
      </div>
    );
  }
}
export {Panel}

