import { queryParent, getEditor } from './helpers.js'
import { markState } from './history.js'

function toggle(event) {
   // register toggle menu
   const current = queryParent(event.target, 'pe-change-align')
   const menu = current.querySelector('.pe-align-menu')
   menu.classList.toggle('pe-hidden')
}

function right(event) {
   const current = queryParent(event.target, 'pe-change-align')
   const selected = current.querySelector('.pe-align-selected')
   selected.src = 'icons/align-right.svg'
   alignText(event, 'right')
}

function left(event) {
   const current = queryParent(event.target, 'pe-change-align')
   const selected = current.querySelector('.pe-align-selected')
   selected.src = 'icons/align-left.svg'
   alignText(event, 'left')
}

function center(event) {
   const current = queryParent(event.target, 'pe-change-align')
   const selected = current.querySelector('.pe-align-selected')
   selected.src = 'icons/align-center.svg'
   alignText(event, 'center')
}

function alignText(event, orientation) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
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
