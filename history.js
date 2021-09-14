import { getEditor, registerClick, registerHover } from './helpers.js'
import { init as initAudio } from './audio.js'
import { init as initTextAreaElements } from './textarea.js'
import { openMenu, toggleToolbar } from './toolbar.js'
import {
   deleteItem,
   hoverListeners,
   locate as locateController,
} from './controller.js'

const histories = new Map()
const memory = 50 // step count to keep in memory

// UNDO
export function undo(editor) {
   // get history
   const current = histories.get(editor)

   if (!current) {
      init()
      return
   }

   // get page
   const page = editor.querySelector('.pe-page')

   // undo if history is not empty
   if (current.pointer > 0) {
      current.pointer--
      page.outerHTML = current.history[current.pointer]
   }

   // refresh page
   refresh(editor)
}

// REDO
export function redo(editor) {
   // get history
   const current = histories.get(editor)

   if (!current) {
      init()
      return
   }

   // get page
   const page = editor.querySelector('.pe-page')

   // redo if pointer is not the last index
   if (current.pointer + 1 < current.history.length) {
      current.pointer++
      page.outerHTML = current.history[current.pointer]
   }

   // refresh page
   refresh(editor)
}

export function undoListener(event) {
   // get editor
   const editor = getEditor(event.target)
   // call undo
   undo(editor)
}

export function redoListener(event) {
   // get editor
   const editor = getEditor(event.target)
   // call redo
   redo(editor)
}

// MARK STATE
export function markState(editor) {
   // get history
   const current = histories.get(editor)

   // get page
   const page = editor.querySelector('.pe-page')

   // if memory is full
   if (
      current.history.length >= memory &&
      current.pointer + 1 === current.history.length
   ) {
      current.history.push(page.outerHTML)
      current.history = current.history.slice(1, memory + 1)
   }
   // if last
   else if (current.pointer + 1 === current.history.length) {
      current.history.push(page.outerHTML)
      current.pointer++
   }
   // else
   else {
      current.history = current.history.slice(0, current.pointer + 1)
      current.history.push(page.outerHTML)
      current.pointer++
   }

   // refresh buttons
   refreshButtons(editor)
}

// INIT
export function init() {
   const editors = document.querySelectorAll('.pe-editor')
   for (const editor of editors) {
      const page = editor.querySelector('.pe-page')
      if (!histories.get(editor)) {
         histories.set(editor, {
            pointer: -1,
            history: [page.outerHTML],
         })
      }
   }
}

// REFRESH UNDO REDO STYLE
function refreshButtons(editor) {
   // get history
   const current = histories.get(editor)

   // undo button
   const undoBtn = editor.querySelector('.pe-undo')
   if (current.pointer > 0 && current.history.length > 1) {
      undoBtn.classList.remove('is-disabled')
   } else {
      undoBtn.classList.add('is-disabled')
   }

   // redo button
   const redoBtn = editor.querySelector('.pe-redo')
   if (current.pointer < current.history.length - 1) {
      redoBtn.classList.remove('is-disabled')
   } else {
      redoBtn.classList.add('is-disabled')
   }
}

// REFRESH EDITOR
function refresh(editor) {
   // delete-handle
   registerClick('.pe-delete-handle', deleteItem, editor)

   // toggle toolbar
   registerClick('.element', toggleToolbar, editor)

   // hide toolbar
   registerClick('.pe-page', toggleToolbar, editor)

   // init audio
   initAudio()

   // init text area elements
   initTextAreaElements()

   // element hover
   const { start, end } = hoverListeners
   registerHover('.element', start, end, editor)

   // locate controller
   locateController(editor)

   // open menu
   openMenu(editor)

   // refresh buttons
   refreshButtons(editor)
}
