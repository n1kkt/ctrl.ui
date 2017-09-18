import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import {bind, memoize, debounce} from 'decko';
import {Base} from '@@/core/base';
import style from './style.scss';
import {extendPropTypes} from '@/dtors'

@extendPropTypes
export default class Input extends Base {
  
  /* ------- PROPS ------- */
  
  static valueTypes = {
    string: val => 1,
    number: val => 1,
  }
  
  static propTypes = {
    pattern: PropTypes.oneOfType([
      PropTypes.instanceOf(RegExp),
      PropTypes.func,
      PropTypes.string,
    ]),
    invalidOk: PropTypes.bool,
  }
  
  static defaultProps = {
    pattern: null,
    invalidOk: false,
  }
  
  constructor(props) {
    super(props)
    
    this.state.value = props.value
    this.state.initialValue = props.value
    this.state.initialValueType = typeof props.value
    
    let patternCheck,
      ptrn = props.pattern
    
    if (!ptrn && this.state.initialValueType === 'number')
      ptrn = /^[\-\+]?\d+\.?(\d+)?$/
    
    // make pattern check closure for current value
    if (typeof ptrn === 'function') {
      patternCheck = val => ptrn(val)
    } else if (typeof ptrn === 'string') {
      let exp = new RegExp(ptrn)
      patternCheck = val => exp.test(val)
    } else if (ptrn instanceof RegExp) {
      patternCheck = val => ptrn.test(val)
    }
    
    this.state.patternCheck = patternCheck
    this.state.inputValid = true
  }
  
  /* ------- OVERRIDES ------- */
  
  /*componentDidMount() {
    super.componentDidMount()
  }*/
  
  @bind
  getValue() {
    return this.state.value
  }
  
  @bind
  setValue(newValue) {
    let inputValid = !this.state.patternCheck || this.state.patternCheck(newValue)
    if (!inputValid && !this.props.invalidOk) {
      this.setState({
        value: this.state.value,
        hasInvalidInput: false,
      });
      return
    }
    
    //let oldValue = this.getValue()
    
    if (inputValid && this.state.initialValueType === 'number')
      newValue = parseFloat(newValue)
    
    this.setState({
      inputValid: inputValid,
    });
    
    super.setValue(newValue)
  }
  
  /* ------- METHODS ------- */
  
  @bind
  onInputChange(evt) {
    this.setValue(evt.target.value)
  }
  
  @bind
  onInputFinishChange(evt) {
    if (this.props.onFinishChange) {
      let temp = this.props.onChange
      this.props.onChange = this.props.onFinishChange
      this.setValue(evt.target.value)
      this.props.onChange = temp
    }
  }
  
  /* ----------------------- */
  
  render({}, {value, label, inputValid}) {
    return (
      <div class="control input-control">
        <div class="label">{label}</div>
        <div class="value">
          <input type="text" value={value}
                 onInput={this.onInputChange}
                 onChange={this.onInputFinishChange}
                 class={!inputValid ? 'invalid' : ''}/>
        </div>
      </div>
    );
  }
}
export {Input}



