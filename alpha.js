import { queryParent, getEditor } from './helpers.js'
import { markState } from './history.js'

function toggle(event) {
   console.log('alpha clicked...')
   const current = queryParent(event.target, 'pe-change-alpha')
   const menu = current.querySelector('.menu')
   menu.classList.toggle('has-display-none')
}

function change(event) {
   setAlpha(event, event.target.value)
}

function setAlpha(event, val) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const item = editor.querySelector('.pe-element.is-active .item')
   // change opacity
   item.style.opacity = val / 100
   // mark state
   markState(editor)
}

export default {
   toggle,
   change,
}
