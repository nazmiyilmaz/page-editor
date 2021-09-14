import { queryParent, getEditor } from './helpers.js'
import { markState } from './history.js'

function toggle(event) {
   // register toggle menu
   const current = queryParent(event.target, 'pe-change-align')
   const menu = current.querySelector('.menu')
   menu.classList.toggle('has-display-none')
}

function right(event) {
   const current = queryParent(event.target, 'pe-change-align')
   const selected = current.querySelector('.selected')
   selected.src = 'icos/align-right.svg'
   alignText(event, 'right')
}

function left(event) {
   const current = queryParent(event.target, 'pe-change-align')
   const selected = current.querySelector('.selected')
   selected.src = 'icos/align-left.svg'
   alignText(event, 'left')
}

function center(event) {
   const current = queryParent(event.target, 'pe-change-align')
   const selected = current.querySelector('.selected')
   selected.src = 'icos/align-center.svg'
   alignText(event, 'center')
}

function alignText(event, orientation) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const text = editor.querySelector('.pe-element.is-active .item')
   // change align
   text.style.textAlign = orientation
   // mark state
   markState(editor)
}

export default {
   toggle,
   right,
   left,
   center,
}
