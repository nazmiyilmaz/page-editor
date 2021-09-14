// TOOL LIST FOR DIFFERENT TYPE OF ELEMETS
const tools = {
   image: [
      'flip-horizontal',
      'flip-vertical',
      'flip-back',
      'flip-front',
      'change-alpha',
   ],
   text: [
      'change-alpha',
      'change-font',
      'change-font-size',
      'change-color',
      'change-align',
      'toggle-bold',
      'toggle-italic',
      'toggle-strike',
      'flip-back',
      'flip-front',
   ],
   audio: ['flip-back', 'flip-front'],
}

import { markState } from './history.js'
import {
   queryParent,
   toggleFlipH,
   toggleFlipV,
   getMinZ,
   raiseAllElements,
   getMaxZ,
   resolveType,
   getEditor,
} from './helpers.js'

import { load as loadAudio } from './audio.js'
import { load as loadText, updateFontColorIndicator } from './textarea.js'
import { load as loadImage } from './image.js'

import {
   locate as locateController,
   hide as hideController,
} from './controller.js'

import align from './align.js'
import alpha from './alpha.js'

// FLIP FRONT
export function flipFront(event) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const element = editor.querySelector('.pe-element.pe-is-active')
   // find page
   const page = editor.querySelector('.pe-page')
   // get max index
   const max = getMaxZ(page)
   // set a value more than max
   element.style['z-index'] = max + 1
   // mark state
   markState(editor)
}

// FLIP BACK
export function flipBack(event) {
   // get editor
   const editor = getEditor(event.target)
   // find element
   const element = editor.querySelector('.pe-element.pe-is-active')
   // find page
   const page = editor.querySelector('.pe-page')
   // find minimum index
   const min = getMinZ(page)
   // if index is negative
   if (min <= 0) {
      // raise others
      raiseAllElements(page)
      // put current below
      element.style['z-index'] = 0
   }
   // else
   else {
      // decrease z to a value less than minimum
      element.style['z-index'] = min - 1
   }
   // mark state
   markState(editor)
}

// FLIP HORIZONTAL
export function flipHorizontal(event) {
   // get editor
   const editor = getEditor(event.target)
   // find target
   const target = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // flip item horizontally
   target.style.transform = toggleFlipH(target?.style?.transform)
   // mark state
   markState(editor)
}

// FLIP VERTICAL
export function flipVertical() {
   // get editor
   const editor = getEditor(event.target)
   // find target
   const target = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // flip item vertically
   target.style.transform = toggleFlipV(target?.style?.transform)
   // mark state
   markState(editor)
}

// BOLD
export function toggleBold(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // toggle bold
   text.classList.toggle('pe-is-bold')
   // update checkbox value
   const cb = editor.querySelector('.pe-toggle-bold-btn')
   cb.checked = !cb.checked
   // mark state
   markState(editor)
}

// ITALIC
export function toggleItalic(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // toggle italic
   text.classList.toggle('pe-is-italic')
   // update checkbox value
   const cb = editor.querySelector('.pe-toggle-italic-btn')
   cb.checked = !cb.checked
   // mark state
   markState(editor)
}

// STRIKE
export function toggleStrike(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // toggle strike
   text.classList.toggle('pe-is-strike')
   // update checkbox value
   const cb = editor.querySelector('.pe-toggle-strike-btn')
   cb.checked = !cb.checked
   // mark state
   markState(editor)
}

// FONT FAMILY
export function changeFontFamily(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // change font
   text.style.fontFamily = event.target.value
   // mark state
   markState(editor)
}

// FONT SIZE
export function changeFontSize(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // change font size
   text.style.fontSize = event.target.value
   // mark state
   markState(editor)
}

// COLOR
export function changeColor(event) {
   // get editor
   const editor = getEditor(event.target)
   // find item
   const text = editor.querySelector('.pe-element.pe-is-active .pe-item')
   // change color
   text.style.color = `${event.target.value}`
   // update indicator
   updateFontColorIndicator(editor, text.style.color)
   // mark state
   markState(editor)
}

// SETUP ALIGN
export function setupAlign() {
   // find related components
   const pickers = document.querySelectorAll('.pe-tool.pe-change-align')
   for (const alg of pickers) {
      // show menu when clicked to the align picker
      alg.addEventListener('click', align.toggle)
      // right
      const right = alg.querySelector('.pe-right-alg')
      right?.addEventListener('click', align.right)
      // left
      const left = alg.querySelector('.pe-left-alg')
      left?.addEventListener('click', align.left)
      // center
      const center = alg.querySelector('.pe-center-alg')
      center?.addEventListener('click', align.center)
   }
}

// SETUP ALPHA
export function setupAlpha() {
   const pickers = document.querySelectorAll('.pe-change-alpha')
   for (const alp of pickers) {
      // show slider when clicked to the alpha picker
      alp.addEventListener('click', alpha.toggle)
      // slider
      const slider = alp.querySelector('.pe-alpha-slider')
      slider?.addEventListener('change', alpha.change)
   }
}

// TOGGLE TOOLBAR
export function toggleToolbar(event) {
   // get editor
   const editor = getEditor(event?.target || event)
   // check if origin is delete button
   const isControl = queryParent(event.target, 'pe-controller')
   // check if click origin is delete button
   const isDel = queryParent(event.target, 'pe-delete-handle')
   // ignore if the origin is controller
   if (isControl && !isDel) {
      return
   }
   // hide controller
   hideController(editor)
   // de-activate all elements at first
   deActivateAll(editor)
   // if origin is delete button then return
   if (isDel) {
      hideAll(editor)
      return
   }
   // check if click origin is page
   const isPage = event.target.classList.contains('pe-page')
   // if origin is page then de activate all elements and return
   if (isPage) {
      hideAll(editor)
      return
   }
   // set active class
   const el = queryParent(event.target, 'pe-element')
   el?.classList.add('pe-is-active')
   locateController(editor)
   // open menu
   openMenu(editor)
}

// OPEN MENU FOR SPECIFIC TYPE OF ELEMENT
export function openMenu(editor) {
   // hide all at first
   hideAll(editor)
   // find element
   const el = editor.querySelector('.pe-element.pe-is-active')
   // if no element is active return
   if (!el) {
      return
   }
   // init type
   const type = resolveType(el)
   // get tool list based on type
   const items = tools[type]
   if (items) {
      // show all related tools
      for (const item of items) {
         editor.querySelector(`.pe-${item}`).style.display = 'unset'
      }
   }
   // load settings of item
   loadToolbar(editor, type)
}

// HIDE ALL TOOLBAR ITEMS
export function hideAll(editor) {
   // find toolbar
   const toolbar = editor.querySelector('.pe-options-toolbar')
   // set display none to all toolbar components
   toolbar?.querySelectorAll('.pe-tool').forEach(function (el) {
      el.style.display = 'none'
   })
}

// DE ACTIVATE ALL ELEMENTS
export function deActivateAll(editor) {
   // get page
   const page = editor.querySelector('.pe-page')
   // deactivate all
   page.querySelectorAll('.pe-element').forEach(function (e) {
      e.classList.remove('pe-is-active')
   })
}

// SET VALUES OF ELEMENT IN THE TOOLBAR
function loadToolbar(editor, type) {
   // LOAD TEXT TOOLBAR
   if (type === 'text') {
      loadText(editor)
   }
   // LOAD IMAGE TOOLBAR
   if (type === 'image') {
      loadImage(editor)
   }
   // LOAD AUDIO TOOLBAR
   if (type === 'audio') {
      loadAudio(editor)
   }
}
