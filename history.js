import { registerClick } from './helpers.js'
import { switchController, deleteItem, openMenu } from './controls.js'
import { init as initTextAreaElements } from './textarea.js'

export let pointer = -1
export let history = []
export const memory = 30 // step count to keep in memory

// UNDO
export function undo() {
   // find page
   const page = document.getElementById('active-page')

   // undo if history is not empty
   if (pointer > 0) {
      pointer--
      page.outerHTML = history[pointer]
   }

   // refresh page
   refresh()
}

// REDO
export function redo() {
   // find page
   const page = document.getElementById('active-page')

   // redo if pointer is not the last index
   if (pointer + 1 < history.length) {
      pointer++
      page.outerHTML = history[pointer]
   }

   // refresh page
   refresh()
}

// MARK STATE
export function markState() {
   const page = document.getElementById('active-page')

   // if memory is full
   if (history.length >= memory && pointer + 1 === history.length) {
      history.push(page.outerHTML)
      history = history.slice(1, memory + 1)
   }
   // if last
   else if (pointer + 1 === history.length) {
      history.push(page.outerHTML)
      pointer++
   }
   // else
   else {
      history = history.slice(0, pointer + 1)
      history.push(page.outerHTML)
      pointer++
   }

   // refresh page
   refresh()
}

// INIT
export function init() {
   markState()
}

// REFRESH
function refresh() {
   console.log(`history: ${history.length}   `, `pointer: ${pointer}`)
   // HIDE CONTROLLER
   registerClick('#active-page', switchController)
   // SWITCH CONTROLLER
   registerClick('.element', switchController)
   // DELETE HANDLE
   registerClick('.delete-handle', deleteItem)
   // INIT TEXTAREA ELEMENTS
   initTextAreaElements()
   // OPEN CONTROLLER MENU
   openMenu()
   // REFRESH UNDO REDO BUTTON STYLE
   refreshUndoRedoStyle()
}

// REFRESH UNDO REDO STYLE
export function refreshUndoRedoStyle() {
   const undoBtn = document.getElementById('undo')

   if (pointer > 0 && history.length > 1) {
      undoBtn.classList.remove('is-disabled')
   } else {
      undoBtn.classList.add('is-disabled')
   }

   const redoBtn = document.getElementById('redo')

   if (pointer < history.length - 1) {
      redoBtn.classList.remove('is-disabled')
   } else {
      redoBtn.classList.add('is-disabled')
   }
}
