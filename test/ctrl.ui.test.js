import ui from '@/ctrl.ui'

describe( 'ctrl.ui', () => {
  
  afterEach(() => {
    
    while( document.body.children.length > 0 ){
      document.body.children[0].remove()
    }
    
  })
  
  it( 'should only redraw the default panel, not add new ones', () => {
  
    ctrl.ui({ prop: 1 })
    
    expect( document.body.querySelector('.control-ui-container') ).toBeDefined();
    
  })
  
})