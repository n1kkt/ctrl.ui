//import test from 'ava'
import { Component, h } from 'preact'
import CtrlUI from './ctrl.ui'

class Comp_str1num1 extends Component {
  static valueTypes = {
    string: val => 1,
    number: val => 1,
  }
}

class Comp_str05num2 extends Component {
  static valueTypes = {
    string: val => 0.5,
    number: val => 2,
  }
}

describe( 'CtrlUI', () => {
  
  beforeAll(() => {
    $ = $j
  });
  
  beforeEach(() => {
  });
  
  afterEach(() => {
    while( document.body.children.length > 0 ){
      document.body.children[0].remove()
    }
  })
  
  it( 'registers multiple components', () => {
    let ui = new CtrlUI()
    
    ui.registerComponent(Comp_str1num1, 'Comp_str1num1')
    ui.registerComponent(Comp_str05num2, 'Comp_str05num2')

    expect( ui.getComponentsListArr() ).toContain(Comp_str1num1);
    expect( ui.getComponentsListArr() ).toContain(Comp_str05num2);
    
    expect( ui.getComponentsListObj()['comp_str1num1'] ).toBe(Comp_str1num1);
    expect( ui.getComponentsListObj()['comp_str05num2'] ).toBe(Comp_str05num2);
  })
  
  
  it( 'matches correct types', () => {
    let ui = new CtrlUI(),
      val
    
    ui.registerComponent(Comp_str1num1, 'Comp_str1num1')
    ui.registerComponent(Comp_str05num2, 'Comp_str05num2')
    
    expect( ui.getComponentByType('Comp_str1num1') ).toBe(Comp_str1num1);
    expect( ui.getComponentByType('Comp_str05num2') ).toBe(Comp_str05num2);
    expect( ui.getComponentByType('comp_str1num1') ).toBe(Comp_str1num1);
    expect( ui.getComponentByType('comp_str05num2') ).toBe(Comp_str05num2);
    
    expect( ui.getComponentByValue('string val') ).toBe(Comp_str1num1);
    expect( ui.getComponentByValue(123) ).toBe(Comp_str05num2);
  })
  
  
  it( 'renders dom element', () => {
    let ui = new CtrlUI()
  
    ui.init({number_1: 100})
    expect($('.ctrl-ui')).toBeInDOM()
    expect($('body')).toContainElement('.ctrl-ui')
  })
  
})