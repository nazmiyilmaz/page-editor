import { getEditor } from './helpers.js'

let active = null

export function setActive(event) {
   const editor = getEditor(event?.target || event)
   active = editor
}

import { undo, redo } from './history.js'

import { copy, cut, paste } from './clipboard.js'

export function init() {
   document.addEventListener('keydown', keyListener)
}

function keyListener(event) {
   // CTRL+Z
   if (checkKey(event, 'ctrl+z')) {
      if (active) {
         undo(active)
      }
   }

   // CTRL+Y
   if (checkKey(event, 'ctrl+y')) {
      if (active) {
         redo(active)
      }
   }

   // CTRL+C
   if (checkKey(event, 'ctrl+c')) {
      if (active) {
         copy(active)
      }
   }

   // CTRL+X
   if (checkKey(event, 'ctrl+x')) {
      if (active) {
         cut(active)
      }
   }

   // CTRL+V
   if (checkKey(event, 'ctrl+v')) {
      if (active) {
         paste(active)
      }
   }
}

function checkKey(event, pattern = '') {
   const keys = pattern.split('+')
   if (keys.length === 1) {
      return event.key === keys[0]
   } else if (keys.length === 2) {
      let first = false
      if (keys[0] === 'ctrl' && event.ctrlKey) {
         first = true
      }
      return first && event.key === keys[1]
   } else {
      return false
   }
}
