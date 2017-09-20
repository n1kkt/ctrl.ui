import ui from '@/index'

describe( 'ctrl.ui', () => {
  
  afterEach(() => {
    
    while( document.body.children.length > 0 ){
      document.body.children[0].remove()
    }
    
  })
  
  it( 'should make dom element', () => {
  
    ctrl.ui({
      number_1: 100,
    })
    
    expect( document.body.querySelector('.control-ui-container') ).toBeDefined();
    
  })
  
})