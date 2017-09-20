import {h, render, Component} from 'preact';
import CtrlUI from '@/ctrl.ui/ctrl.ui'
import * as components from "@@";

let ctrlui = new CtrlUI()
Object.keys(components).forEach(name => {
  ctrlui.registerComponent(components[name])
})

let ui = (opts) => {
  return ctrlui.init(opts)
}

ui.components = {}
Object.keys(components).forEach(key => {
  ui.components[key] = components[key]
})

ui.registerComponent = ctrlui.registerComponent

let crtl = window.ctrl || (window.ctrl = {})
crtl.ui = ui

export default ui


//---------------
